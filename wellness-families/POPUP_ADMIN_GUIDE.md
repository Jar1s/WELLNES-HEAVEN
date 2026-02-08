# Popup Admin + Notifikacie (wellness-families)

Tento dokument popisuje aktualnu implementaciu popup systemu:
- admin stranka `/admin`
- upload obrazka do Supabase Storage
- zobrazenie popupu na webe (vpravo dole)
- aktivacia podla casu `start_at` / `end_at`
- zavretie popupu raz na klientovi (localStorage)

## 1) Co je implementovane

### Admin UI
- Stranka: `app/admin/page.tsx`
- Prihlasenie je jednoduche heslo cez `ADMIN_PASSWORD`.
- Admin vie:
  - nahrat obrazok
  - nastavit velkost popupu (`sm|md|lg`)
  - zapnut/vypnut popup (`enabled`)
  - nastavit zaciatok a koniec (`start_at`, `end_at`)
- Upload obrazka sa po dokonceni uklada automaticky.
- Data sa v admine automaticky refreshuju:
  - hned po otvoreni
  - pri fokusnuti okna
  - kazdych 30s
- Je tam aj manualne tlacidlo `Obnovit`.

### Frontend popup
- Komponent: `components/PromoPopup.tsx`
- Nacitava data z `GET /api/popup`.
- Zobrazi sa len ak je aktivny zaznam.
- Zavretie uklada kluc do `localStorage`:
  - kluc obsahuje `id` + `updated_at`
  - ked sa zaznam zmeni (novy `updated_at`), popup sa moze ukazat znovu

### Vypnutie chrome na /admin
- Komponent: `components/SiteChrome.tsx`
- V `app/layout.tsx` sa Header/Footer/FloatingPhone/Popup nereslia na route `/admin`.

## 2) Backend API

### Verejny endpoint
- `app/api/popup/route.ts`
- Pouziva `SUPABASE_ANON_KEY` (public klient)
- Vracia len aktivny popup:
  - `enabled = true`
  - `start_at` je `NULL` alebo <= now
  - `end_at` je `NULL` alebo >= now
- Rate limit: `60 req / 60s / IP`

### Admin endpoint (read/write)
- `app/api/admin/popup/route.ts`
- Auth: header `x-admin-password` porovnany timing-safe
- Rate limit:
  - GET: `20 req / 60s / IP`
  - POST: `10 req / 60s / IP`
- POST validuje vstupy a uklada:
  - `image_url`
  - `popup_size`
  - `enabled`
  - `start_at`
  - `end_at`
- Chovanie pri viacerzch zaznamoch:
  - GET preferuje posledny `enabled` zaznam
  - POST bez `id` update-ne posledny existujuci zaznam (ak je), inak insert

### Upload endpoint
- `app/api/admin/upload/route.ts`
- `runtime = 'nodejs'` (kvoli `sharp`)
- Auth cez `x-admin-password`
- Rate limit: `5 req / 60s / IP`
- Kontroly:
  - iba `image/*`
  - max 5MB
- Obrazok sa spracuje cez `sharp`:
  - resize max `520x900`, `fit: inside`
  - output `jpeg`, quality `82`
- Upload do Supabase bucketu `popups` (public)

## 3) Databaza a RLS

SQL je v `supabase/popup.sql`:
- tabulka `public.popups`
- trigger na `updated_at`
- RLS zapnute
- policy `public read active popups` pre `anon` select aktivnych zaznamov
- stlpec `popup_size`

Dolezite:
- `start_at` a `end_at` su `timestamptz` (UTC ulozenie)
- admin `datetime-local` input odosiela cas po prepocte do ISO

## 4) Env premenne

Potrebne pre fungovanie:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`

Supabase helper:
- `lib/supabase.ts`
  - `getSupabasePublic()` pre public read
  - `getSupabaseServer()` pre admin/update/upload

## 5) Zoznam suborov (core)

- `app/admin/page.tsx`
- `app/api/popup/route.ts`
- `app/api/admin/popup/route.ts`
- `app/api/admin/upload/route.ts`
- `components/PromoPopup.tsx`
- `components/SiteChrome.tsx`
- `lib/supabase.ts`
- `lib/rateLimit.ts`
- `supabase/popup.sql`
- `app/layout.tsx`
- `next.config.ts` (Supabase remote image hostname)
- `package.json` (dependencies: `@supabase/supabase-js`, `sharp`)

## 6) Ako to preniest na druhy web (rychly postup)

Najrychlejsie je skopirovat rovnaky pattern do `wellness-adults`.

### Krok 1: dependencies
V `wellness-adults/package.json` dopln:
- `@supabase/supabase-js`
- `sharp`

### Krok 2: infra subory
Skopiruj:
- `lib/supabase.ts`
- `lib/rateLimit.ts`
- `supabase/popup.sql`

### Krok 3: API routes
Skopiruj:
- `app/api/popup/route.ts`
- `app/api/admin/popup/route.ts`
- `app/api/admin/upload/route.ts`

### Krok 4: UI
Skopiruj:
- `app/admin/page.tsx`
- `components/PromoPopup.tsx`
- `components/SiteChrome.tsx`

### Krok 5: layout
V `app/layout.tsx`:
- render `SiteChrome`
- nepouzivaj Header/Footer priamo v layoute ak ich uz kresli `SiteChrome`

### Krok 6: next image
Do `next.config.ts` pridaj Supabase `remotePatterns` host.

### Krok 7: env
Nastav env:
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`

### Krok 8: DB
Spusti `supabase/popup.sql` v Supabase SQL editore.

## 7) Shared zlozka: odporucany smer

Ak to chces mat "to iste" pre oba weby dlhodobo, copy/paste bude casom bolestive.
Lepsi smer je monorepo shared modul:

- `shared/popup-system/`
  - `components/PromoPopup.tsx`
  - `components/AdminPopupForm.tsx`
  - `lib/rateLimit.ts`
  - `lib/supabase.ts` (alebo thin wrappers)
- v kazdom webe ostanu iba:
  - app-specific route wrappers (`app/api/...`)
  - app-specific layout wiring (`SiteChrome`)

Prakticky:
- teraz nechaj copy variant (rychly rollout)
- nasledne refactor do shared modulu po stabilizacii

## 8) Prevadzka a limity

- Rate limit je in-memory map:
  - na Verceli je to per-instance, nie globalny distributed limit
- `ADMIN_PASSWORD` je jednoduchy mechanizmus:
  - vhodny pre low-traffic interny admin
  - nie je to plnohodnotny auth system
- localStorage "dismiss once" je per-browser/per-device

## 9) Co skontrolovat pri problemoch

1. `GET /api/admin/popup` vracia zaznam s `image_url`?
2. `GET /api/popup` vracia aktivny zaznam (`enabled`, interval)?
3. Je spravne nastaveny `popup_size`?
4. Nie je popup uz dismissnuty v localStorage?
5. Env premenne su nastavene lokalne aj vo Verceli?
6. SQL policy je aplikovana v Supabase?

