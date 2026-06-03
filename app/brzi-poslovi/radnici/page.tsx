import type { Metadata } from "next";
import Link from "next/link";
import { BannerSlot } from "@/components/banner-slot";
import { WorkerCard } from "@/components/worker-card";
import { availabilityLabels } from "@/lib/labels";
import { getProfessions, getPublicWorkers } from "@/lib/queries/brzi-poslovi";
import type { AvailabilityType } from "@/types/domain";

export const metadata: Metadata = {
  title: "Kandidati i radnici - imaposla.me",
  description: "Pregled dostupnih kandidata i radnika za brze angazmane u Crnoj Gori.",
};

export const revalidate = 120;

type Props = {
  searchParams: Promise<{ profession?: string; city?: string; availability?: string; view?: string }>;
};

export default async function WorkersPage({ searchParams }: Props) {
  const params = await searchParams;
  const view = params.view === "list" ? "list" : "grid";
  const [workers, professions] = await Promise.all([
    getPublicWorkers({ profession: params.profession, city: params.city, availability: params.availability, limit: 90 }),
    getProfessions(),
  ]);

  function urlWith(patch: Record<string, string | undefined>) {
    const search = new URLSearchParams();
    const next = {
      profession: params.profession,
      city: params.city,
      availability: params.availability,
      view: view === "list" ? "list" : undefined,
      ...patch,
    };
    Object.entries(next).forEach(([key, value]) => { if (value) search.set(key, value); });
    const query = search.toString();
    return query ? `/brzi-poslovi/radnici?${query}` : "/brzi-poslovi/radnici";
  }

  return (
    <main className="listing-page">
      <section className="page-hero">
        <span className="eyebrow">Kandidati</span>
        <h1>Dostupni radnici</h1>
        <p>Pronadji radnika za kratak angazman ili pregledaj premium profile kandidata.</p>
      </section>

      <nav className="segment-tabs" aria-label="Brzi poslovi">
        <Link href="/brzi-poslovi">Pregled</Link>
        <Link className="active" href="/brzi-poslovi/radnici">Kandidati</Link>
        <Link href="/brzi-poslovi/angazmani">Brzi angazmani</Link>
      </nav>

      <BannerSlot placement="jobs_list_top" className="page-banner-slot" />

      <section className="listing-layout">
        <aside className="filter-panel">
          <form className="filter-form" method="get" action="/brzi-poslovi/radnici">
            <select className="select" name="profession" defaultValue={params.profession || ""}>
              <option value="">Sva zanimanja</option>
              {professions.map((profession) => <option key={profession.id} value={profession.slug}>{profession.name}</option>)}
            </select>
            <input className="field" name="city" placeholder="Grad" defaultValue={params.city || ""} />
            <select className="select" name="availability" defaultValue={params.availability || ""}>
              <option value="">Sva dostupnost</option>
              {(Object.keys(availabilityLabels) as AvailabilityType[]).map((key) => (
                <option key={key} value={key}>{availabilityLabels[key]}</option>
              ))}
            </select>
            {view === "list" && <input type="hidden" name="view" value="list" />}
            <button className="btn red" type="submit">Filtriraj</button>
          </form>

          <div className="quick-filter">
            <h3>Zanimanja</h3>
            <Link className={`filter-link${!params.profession ? " active" : ""}`} href={urlWith({ profession: undefined })}>Svi kandidati</Link>
            {professions.slice(0, 10).map((profession) => (
              <Link key={profession.id} className={`filter-link${params.profession === profession.slug ? " active" : ""}`} href={urlWith({ profession: params.profession === profession.slug ? undefined : profession.slug })}>
                {profession.name}
              </Link>
            ))}
          </div>
        </aside>

        <section className="listing-results">
          <div className="results-bar">
            <strong>{workers.length} {workers.length === 1 ? "kandidat" : "kandidata"}</strong>
            <div className="view-toggle" aria-label="Prikaz kandidata">
              <Link className={view === "grid" ? "active" : ""} href={urlWith({ view: undefined })}>Grid</Link>
              <Link className={view === "list" ? "active" : ""} href={urlWith({ view: "list" })}>Lista</Link>
            </div>
          </div>

          {workers.length ? (
            <div className={view === "list" ? "worker-list" : "worker-grid"}>
              {workers.map((worker) => <WorkerCard worker={worker} key={worker.id} />)}
            </div>
          ) : (
            <div className="empty">
              <strong>Nema kandidata za zadate filtere.</strong>
              <p>Probaj drugi grad ili zanimanje.</p>
              <Link className="btn red sm" href="/profil/brzi-profil">Napravi brzi profil</Link>
            </div>
          )}
        </section>
      </section>

      <BannerSlot placement="jobs_list_bottom" className="page-banner-slot" />
    </main>
  );
}
