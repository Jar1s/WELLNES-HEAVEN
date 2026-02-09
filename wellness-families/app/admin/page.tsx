'use client';

import { useEffect, useState } from 'react';

type PopupForm = {
  id?: string;
  image_url: string;
  popup_size: 'sm' | 'md' | 'lg';
  enabled: boolean;
  start_at: string;
  end_at: string;
};

const emptyForm: PopupForm = {
  image_url: '',
  popup_size: 'md',
  enabled: true,
  start_at: '',
  end_at: '',
};

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<PopupForm>(emptyForm);
  const [message, setMessage] = useState('');

  const getAuthHeader = () => ({
    'x-admin-password': password.trim(),
  });

  const getErrorMessage = async (res: Response) => {
    let apiError = '';
    try {
      const body = await res.json();
      if (body?.error && typeof body.error === 'string') {
        apiError = body.error;
      }
    } catch {
      // Ignore JSON parse errors and fall back to status based messages.
    }

    if (res.status === 401) return 'Nesprávne heslo.';
    if (res.status === 429) return 'Príliš veľa pokusov. Skús znovu o minútu.';
    if (apiError) return `Chyba: ${apiError}`;
    return 'Serverová chyba. Skús obnoviť stránku.';
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_password');
    if (saved?.trim()) {
      setPassword(saved.trim());
      setAuthed(true);
    }
  }, []);

  useEffect(() => {
    if (!authed || !password.trim()) return;
    loadPopup(password).catch((err) => {
      setAuthed(false);
      sessionStorage.removeItem('admin_password');
      setMessage(err instanceof Error ? err.message : 'Nepodarilo sa načítať admin dáta.');
    });

    const handleFocus = () => {
      loadPopup(password);
    };

    window.addEventListener('focus', handleFocus);
    const interval = setInterval(() => {
      loadPopup(password);
    }, 30000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [authed, password]);

  const loadPopup = async (pwd: string) => {
    const res = await fetch('/api/admin/popup', {
      headers: { 'x-admin-password': pwd.trim() },
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error(await getErrorMessage(res));
    }
    const json = await res.json();
    if (json?.popup) {
      const p = json.popup;
      setForm({
        id: p.id,
        image_url: p.image_url || '',
        popup_size: p.popup_size === 'lg' || p.popup_size === 'sm' ? p.popup_size : 'md',
        enabled: Boolean(p.enabled),
        start_at: p.start_at ? p.start_at.slice(0, 16) : '',
        end_at: p.end_at ? p.end_at.slice(0, 16) : '',
      });
      if (!p.image_url) {
        setMessage('Žiadny obrázok nie je uložený.');
      }
    } else {
      setForm(emptyForm);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const normalizedPassword = password.trim();
      if (!normalizedPassword) {
        throw new Error('Zadaj heslo.');
      }

      await loadPopup(normalizedPassword);
      sessionStorage.setItem('admin_password', normalizedPassword);
      setPassword(normalizedPassword);
      setAuthed(true);
      setMessage('Načítané.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Prihlásenie zlyhalo.');
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  const savePopup = async (payload: PopupForm) => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/popup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          id: payload.id,
          image_url: payload.image_url,
          popup_size: payload.popup_size,
          enabled: payload.enabled,
          start_at: payload.start_at ? new Date(payload.start_at).toISOString() : null,
          end_at: payload.end_at ? new Date(payload.end_at).toISOString() : null,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || (await getErrorMessage(res)));
      }
      setForm((prev) => ({ ...prev, id: json.popup?.id || prev.id }));
      setMessage('Uložené.');
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Ukladanie zlyhalo.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file: File) => {
    setLoading(true);
    setMessage('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: getAuthHeader(),
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json?.error || 'Upload zlyhal.');
      }

      const nextForm = { ...form, image_url: json.url };
      setForm(nextForm);
      setMessage('Obrázok nahraný. Ukladám...');
      await savePopup(nextForm);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Upload zlyhal.');
      setLoading(false);
    }
  };

  const handleSave = async () => {
    await savePopup(form);
  };

  const handleClearAll = async () => {
    const confirmed = window.confirm('Naozaj chceš vymazať všetky popup záznamy?');
    if (!confirmed) return;

    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin/popup', {
        method: 'DELETE',
        headers: getAuthHeader(),
      });

      let json: { error?: string; deleted?: number } = {};
      try {
        json = await res.json();
      } catch {
        // Ignore JSON parse errors and use default fallback.
      }

      if (!res.ok) {
        throw new Error(json?.error || (await getErrorMessage(res)));
      }

      setForm(emptyForm);
      setMessage(`Vymazané: ${json?.deleted ?? 0}`);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Mazanie zlyhalo.');
    } finally {
      setLoading(false);
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#faf9f7] flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-6 rounded-2xl shadow-lg border border-[#e8e6e3] w-full max-w-sm space-y-4"
        >
          <h1 className="text-xl font-display font-bold text-[#2c2c2c]">Admin</h1>
          <input
            type="password"
            placeholder="Heslo"
            className="w-full border border-[#e8e6e3] rounded-lg px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#6bb8ff] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#4d9be0] transition-colors"
          >
            {loading ? 'Načítavam...' : 'Prihlásiť'}
          </button>
          {message && <p className="text-sm text-[#6b6b6b]">{message}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-[#e8e6e3] space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-[#2c2c2c]">Popup admin</h1>
            <p className="text-sm text-[#6b6b6b]">Nastav akciu, obrázok a obdobie.</p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={loading}
              onClick={() => loadPopup(password)}
              className="bg-white text-[#2c2c2c] px-4 py-3 rounded-lg font-semibold border border-[#e8e6e3] hover:bg-[#f5f3f0] transition-colors"
            >
              Obnoviť
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleSave}
              className="bg-[#6bb8ff] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#4d9be0] transition-colors"
            >
              {loading ? 'Ukladám...' : 'Uložiť'}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleClearAll}
              className="bg-[#b42318] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#912018] transition-colors"
            >
              Vymazať všetko
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#2c2c2c]">Obrázok</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                handleUpload(file);
              }
            }}
          />
          <p className="text-xs text-[#6b6b6b]">Po nahraní obrázka sa nastavenie uloží automaticky.</p>
          {form.image_url && (
            <div className="space-y-2">
              <div className="text-xs text-[#6b6b6b] break-all">{form.image_url}</div>
              <div className="rounded-lg overflow-hidden border border-[#e8e6e3] max-w-[240px]">
                <img src={form.image_url} alt="Popup preview" className="w-full h-auto" />
              </div>
            </div>
          )}
          {!form.image_url && (
            <div className="text-xs text-[#6b6b6b]">Momentálne nie je uložený žiadny obrázok.</div>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#2c2c2c]">Veľkosť popupu</label>
          <select
            className="w-full border border-[#e8e6e3] rounded-lg px-3 py-2 bg-white"
            value={form.popup_size}
            onChange={(e) => {
              const nextForm = {
                ...form,
                popup_size: e.target.value as PopupForm['popup_size'],
              };
              setForm(nextForm);
              savePopup(nextForm);
            }}
          >
            <option value="sm">Malý</option>
            <option value="md">Stredný</option>
            <option value="lg">Veľký</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-[#2c2c2c]">Začiatok</label>
            <input
              type="datetime-local"
              className="w-full border border-[#e8e6e3] rounded-lg px-3 py-2"
              value={form.start_at}
              onChange={(e) => setForm((prev) => ({ ...prev, start_at: e.target.value }))}
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm font-medium text-[#2c2c2c]">Koniec</label>
            <input
              type="datetime-local"
              className="w-full border border-[#e8e6e3] rounded-lg px-3 py-2"
              value={form.end_at}
              onChange={(e) => setForm((prev) => ({ ...prev, end_at: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="enabled"
            type="checkbox"
            checked={form.enabled}
            onChange={(e) => {
              const nextForm = { ...form, enabled: e.target.checked };
              setForm(nextForm);
              savePopup(nextForm);
            }}
          />
          <label htmlFor="enabled" className="text-sm text-[#2c2c2c]">
            Aktivovať popup
          </label>
        </div>

        {message && <p className="text-sm text-[#6b6b6b]">{message}</p>}
      </div>

      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <button
          type="button"
          disabled={loading}
          onClick={handleSave}
          className="bg-[#6bb8ff] text-white px-6 py-3 rounded-full font-semibold shadow-xl hover:bg-[#4d9be0] transition-colors"
        >
          {loading ? 'Ukladám...' : 'Uložiť'}
        </button>
      </div>
    </div>
  );
}
