"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { brand } from "@/lib/data";

const primaryNav = [
  { label: "Home", href: "/" },
  { label: "AP Physics", href: "/ap-physics" },
  { label: "Opportunities Hub", href: "/opportunities" },
  { label: "About", href: "/about" },
  { label: "Sign In", href: "/sign-in" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => { void fetch("/api/auth/session", {cache:"no-store"}).then(r=>r.json() as Promise<{user?:unknown}>).then(data=>setSignedIn(Boolean(data.user))).catch(()=>{}); }, []);

  return (
    <header className="site-header">
      <Link className="brand-lockup" href="/" aria-label="Girls Beyond Gravity home">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="40" height="40" role="presentation">
            <ellipse cx="24" cy="25" rx="19" ry="9" transform="rotate(-35 24 25)" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M24 8 L27 19 L38 22 L27 25 L24 36 L21 25 L10 22 L21 19Z" fill="currentColor" />
            <circle cx="38" cy="13" r="3" fill="currentColor" />
          </svg>
        </span>
        <span>
          <strong>{brand.organizationName}</strong>
          <small>AP Physics + aerospace opportunities</small>
        </span>
      </Link>
      <button
        className="menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        Menu
      </button>
      <nav
        id="primary-navigation"
        className={menuOpen ? "nav nav-open" : "nav"}
        aria-label="Primary navigation"
      >
        {primaryNav.map((item) => (
          <Link key={item.label} href={item.label === "Sign In" && signedIn ? "/account" : item.href}>
            {item.label === "Sign In" && signedIn ? "My Account" : item.label}
          </Link>
        ))}
      </nav>
      <Link className="cta-link" href="/ap-physics">
        Start Learning
      </Link>
    </header>
  );
}
