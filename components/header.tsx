"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { roleHomes, roleLabels } from "@/lib/labels";
import { desktopNavItems } from "@/lib/navigation";
import { NotificationCenter } from "@/components/notification-center";
import { Logo } from "@/components/logo";

export function Header() {
  const { role } = useAuth();
  const [theme, setTheme] = useState("light");
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem("imaposlaTheme") || "light";
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  useEffect(() => {
    function close(event: MouseEvent) {
      if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) setMobileOpen(false);
    }
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.localStorage.setItem("imaposlaTheme", next);
  }

  const isLoggedIn = role !== "guest";
  const dashHref = isLoggedIn ? roleHomes[role as Exclude<typeof role, "guest">] : "/login";
  const navItems = desktopNavItems[role];

  return (
    <header className="top">
      <div className="top-in">
        <Link className="brand" href="/" aria-label="imaposla.me pocetna">
          <Logo size={36} />
        </Link>

        <nav className="nav desktop-nav" aria-label="Glavna navigacija">
          {navItems.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>

        <div className="top-actions">
          {isLoggedIn && <NotificationCenter />}
          {isLoggedIn && <span className="role-pill">{roleLabels[role]}</span>}
          <button className="icon-btn" type="button" onClick={toggleTheme} aria-label="Promijeni temu">
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          {!isLoggedIn ? (
            <>
              <Link className="btn ghost" href="/login">Prijava</Link>
              <Link className="btn red" href="/registracija">Registracija</Link>
            </>
          ) : (
            <>
              <Link className="btn ghost" href={dashHref}>{roleLabels[role]}</Link>
              <Link className="btn red" href="/logout">Odjava</Link>
            </>
          )}
          <button className="icon-btn hamb" type="button" onClick={() => setMobileOpen((open) => !open)} aria-label="Meni">
            Menu
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-nav open" ref={mobileRef}>
          {navItems.map((item) => <Link href={item.href} key={item.href} onClick={() => setMobileOpen(false)}>{item.label}</Link>)}
          {!isLoggedIn ? (
            <>
              <Link href="/login" onClick={() => setMobileOpen(false)}>Prijava</Link>
              <Link href="/registracija" onClick={() => setMobileOpen(false)}>Registracija</Link>
            </>
          ) : (
            <>
              <Link href={dashHref} onClick={() => setMobileOpen(false)}>Dashboard</Link>
              <Link href="/logout" onClick={() => setMobileOpen(false)}>Odjava</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
