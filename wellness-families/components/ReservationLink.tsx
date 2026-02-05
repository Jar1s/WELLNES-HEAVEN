'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { reportConversion } from '@/lib/gtag';

type ReservationLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

export default function ReservationLink({
  href,
  children,
  className,
  target,
  rel,
}: ReservationLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={() => reportConversion()}
    >
      {children}
    </Link>
  );
}
