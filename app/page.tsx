import type { Metadata } from "next";
import Link from "next/link";
import { BannerSlot } from "@/components/banner-slot";
import { CompanyCard } from "@/components/company-card";
import { JobCardClean } from "@/components/job-card-clean";
import { WorkerCard } from "@/components/worker-card";
import { getBrziPosloviOverview } from "@/lib/queries/brzi-poslovi";
import { getHomepageData, getPopularTags } from "@/lib/queries/public";

export const metadata: Metadata = {
  title: "imaposla.me - poslovi, firme i kandidati",
  description: "Pronadji posao, kandidata, firmu ili radnika za brzi angazman u Crnoj Gori.",
};

export const revalidate = 120;

export default async function HomePage() {
  const [home, tags, quick] = await Promise.all([
    getHomepageData(),
    getPopularTags(),
    getBrziPosloviOverview(),
  ]);

  const jobs = [...home.paidTopJobs, ...home.featuredJobs, ...home.regularJobs].slice(0, 6);
  const heroJobs = jobs.slice(0, 3);
  const companies = home.recommendedCompanies.slice(0, 6);
  const workers = quick.workers.slice(0, 3);

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <span className="eyebrow">imaposla.me</span>
          <h1>Poslovi, kandidati i firme na jednom mjestu.</h1>
          <p>
            Pretrazi oglase, napravi CV profil, pronadji radnika za kratak angazman ili vodi prijave kroz firmu panel.
          </p>
          <form className="hero-search" action="/oglasi">
            <input name="q" placeholder="Naziv posla, firma ili zanimanje" aria-label="Pretraga" />
            <button type="submit">Pretrazi</button>
          </form>
          <div className="hero-tags">
            {tags.slice(0, 5).map((tag) => <Link href={`/oglasi?q=${encodeURIComponent(tag.q)}`} key={tag.q}>{tag.label}</Link>)}
          </div>
        </div>

        <aside className="hero-panel">
          <div className="panel-head">
            <span>Istaknuto</span>
            <Link href="/oglasi">Svi oglasi</Link>
          </div>
          <div className="hero-job-list">
            {heroJobs.length ? heroJobs.map((job) => <JobCardClean job={job} key={job.id} compact />) : (
              <div className="empty compact">Aktivni oglasi ce se prikazati ovdje.</div>
            )}
          </div>
        </aside>
      </section>

      <BannerSlot placement="homepage_top" className="home-banner" />

      <section className="intent-grid">
        <Link className="intent-card" href="/oglasi">
          <span>01</span>
          <h2>Trazim posao</h2>
          <p>Otvori oglas, procitaj uslove, dopuni biografiju i posalji prijavu.</p>
        </Link>
        <Link className="intent-card" href="/profil/brzi-profil">
          <span>02</span>
          <h2>Nudim brze usluge</h2>
          <p>Napravi profil za kratke angazmane i dozvoli firmama da te kontaktiraju.</p>
        </Link>
        <Link className="intent-card" href="/za-firme">
          <span>03</span>
          <h2>Zaposljavam</h2>
          <p>Objavi oglas, pregledaj prijave, vodi selekciju i pronadji radnika.</p>
        </Link>
      </section>

      <section className="section-block">
        <div className="section-title">
          <div>
            <span className="eyebrow">Oglasi</span>
            <h2>Najnovije prilike</h2>
          </div>
          <Link className="btn ghost sm" href="/oglasi">Svi oglasi</Link>
        </div>
        <div className="card-grid card-grid-3">
          {jobs.length ? jobs.map((job) => <JobCardClean job={job} key={job.id} />) : (
            <div className="empty span-all">Trenutno nema aktivnih oglasa.</div>
          )}
        </div>
      </section>

      <BannerSlot placement="homepage_middle" className="home-banner" />

      <section className="section-block">
        <div className="section-title">
          <div>
            <span className="eyebrow">Kandidati</span>
            <h2>Dostupni radnici</h2>
          </div>
          <Link className="btn ghost sm" href="/brzi-poslovi/radnici">Svi kandidati</Link>
        </div>
        <div className="card-grid card-grid-3">
          {workers.length ? workers.map((worker) => <WorkerCard worker={worker} key={worker.id} />) : (
            <div className="empty span-all">Radnici ce se prikazati nakon odobrenja profila.</div>
          )}
        </div>
      </section>

      <section className="section-block">
        <div className="section-title">
          <div>
            <span className="eyebrow">Firme</span>
            <h2>Poslodavci na platformi</h2>
          </div>
          <Link className="btn ghost sm" href="/firme">Sve firme</Link>
        </div>
        <div className="card-grid card-grid-3">
          {companies.length ? companies.map((company) => <CompanyCard company={company} key={company.id} />) : (
            <div className="empty span-all">Firme se prikazuju nakon odobrenja.</div>
          )}
        </div>
      </section>

      <section className="final-cta">
        <h2>Imas firmu? Objavi oglas i vodi prijave iz jednog panela.</h2>
        <p>Firma dobija javni profil, oglase, ATS selekciju, brze angazmane i banere.</p>
        <Link className="btn red" href="/registracija?role=company">Kreni kao firma</Link>
      </section>

      <BannerSlot placement="homepage_bottom" className="home-banner" />
    </main>
  );
}
