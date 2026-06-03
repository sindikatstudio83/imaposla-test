import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { BannerSlot } from "@/components/banner-slot";
import { JobCardClean } from "@/components/job-card-clean";
import { getLookups, getPublicJobs } from "@/lib/queries/public";
import type { LookupItem } from "@/types/domain";

export const metadata: Metadata = {
  title: "Oglasi za posao - imaposla.me",
  description: "Pretrazi oglase za posao u Crnoj Gori po gradu, kategoriji i kljucnoj rijeci.",
};

export const revalidate = 120;

type Props = {
  searchParams: Promise<{ q?: string; city?: string; category?: string; view?: string }>;
};

export default async function JobsPage({ searchParams }: Props) {
  const params = await searchParams;
  const view = params.view === "grid" ? "grid" : "list";
  const [jobs, lookups] = await Promise.all([
    getPublicJobs({ q: params.q, city: params.city, category: params.category, limit: 200 }),
    getLookups(),
  ]);

  const isFiltering = Boolean(params.q || params.city || params.category);

  function urlWith(patch: Record<string, string | undefined>) {
    const search = new URLSearchParams();
    const next = {
      q: params.q,
      city: params.city,
      category: params.category,
      view: view === "grid" ? "grid" : undefined,
      ...patch,
    };
    Object.entries(next).forEach(([key, value]) => { if (value) search.set(key, value); });
    const query = search.toString();
    return query ? `/oglasi?${query}` : "/oglasi";
  }

  return (
    <main className="listing-page">
      <section className="page-hero">
        <span className="eyebrow">Oglasi</span>
        <h1>Oglasi za posao</h1>
        <p>Filtriraj po gradu, kategoriji i kljucnoj rijeci. Prikazuju se odobreni aktivni oglasi.</p>
      </section>

      <BannerSlot placement="jobs_list_top" className="page-banner-slot" />

      <section className="listing-layout">
        <aside className="filter-panel">
          <form method="get" action="/oglasi" className="filter-form">
            <input className="field" name="q" placeholder="Naziv posla ili firma" defaultValue={params.q || ""} />
            <select className="select" name="city" defaultValue={params.city || ""}>
              <option value="">Svi gradovi</option>
              {lookups.cities.map((city: LookupItem) => <option key={city.id} value={city.name}>{city.name}</option>)}
            </select>
            <select className="select" name="category" defaultValue={params.category || ""}>
              <option value="">Sve kategorije</option>
              {lookups.categories.map((category: LookupItem) => <option key={category.id} value={category.name}>{category.name}</option>)}
            </select>
            {view === "grid" && <input type="hidden" name="view" value="grid" />}
            <button className="btn red" type="submit">Pretrazi</button>
          </form>

          <div className="quick-filter">
            <h3>Gradovi</h3>
            <Link className={`filter-link${!params.city ? " active" : ""}`} href={urlWith({ city: undefined })}>Svi gradovi</Link>
            {lookups.cities.slice(0, 10).map((city) => (
              <Link key={city.id} className={`filter-link${params.city === city.name ? " active" : ""}`} href={urlWith({ city: params.city === city.name ? undefined : city.name })}>
                {city.name}
              </Link>
            ))}
          </div>
        </aside>

        <section className="listing-results">
          <div className="results-bar">
            <div>
              <strong>{jobs.length} {jobs.length === 1 ? "oglas" : "oglasa"}</strong>
              {isFiltering && <Link href="/oglasi">Ponisti filtere</Link>}
            </div>
            <div className="view-toggle" aria-label="Prikaz oglasa">
              <Link className={view === "list" ? "active" : ""} href={urlWith({ view: undefined })}>Lista</Link>
              <Link className={view === "grid" ? "active" : ""} href={urlWith({ view: "grid" })}>Grid</Link>
            </div>
          </div>

          {jobs.length ? (
            <div className={view === "grid" ? "job-grid" : "job-list"}>
              {jobs.map((job, index) => (
                <React.Fragment key={job.id}>
                  <JobCardClean job={job} />
                  {(index + 1) % 12 === 0 && <BannerSlot placement="jobs_list_middle" className="inline-banner" />}
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="empty">
              <strong>Nema oglasa za zadatu pretragu.</strong>
              <p>Probaj drugi grad, kategoriju ili kljucnu rijec.</p>
              <Link className="btn red sm" href="/oglasi">Ocisti pretragu</Link>
            </div>
          )}
        </section>
      </section>

      <BannerSlot placement="jobs_list_bottom" className="page-banner-slot" />
    </main>
  );
}
