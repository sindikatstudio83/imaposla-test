import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { availabilityShort } from "@/lib/labels";
import type { PublicWorkerProfile } from "@/types/domain";

export function WorkerCard({ worker }: { worker: PublicWorkerProfile }) {
  const profession = worker.professions?.name || worker.profession_text || "Radnik";
  const href = worker.is_premium && worker.slug ? `/radnici/${worker.slug}` : `/brzi-poslovi/radnici/${worker.id}`;
  const cityLabel = worker.cities.length ? worker.cities.slice(0, 2).join(", ") : "Crna Gora";

  return (
    <article className={`worker-card${worker.is_premium ? " worker-card--premium" : ""}`}>
      <Link className="worker-card__photo" href={href} aria-label={worker.display_name}>
        <Avatar bucket="worker-photos" path={worker.photo_path} fallback={worker.display_name} size={104} shape="rounded" />
      </Link>

      <div className="worker-card__body">
        <Link className="worker-card__name" href={href}>
          {worker.display_name}
          {worker.is_verified && <span className="verified-dot">Verifikovan</span>}
        </Link>
        <span className="worker-card__role">{profession}</span>
        <div className="meta-line">
          <span>{cityLabel}</span>
          <span>{availabilityShort[worker.availability]}</span>
          {worker.experience_years > 0 && <span>{worker.experience_years} god. iskustva</span>}
        </div>
        {worker.price_text && <span className="tag tag-red">{worker.price_text}</span>}
        {worker.bio && <p>{worker.bio}</p>}
      </div>

      <div className="worker-card__actions">
        <Link className="btn red sm" href={href}>Vidi profil</Link>
        <Link className="btn ghost sm" href={`${href}#kontakt`}>Kontakt</Link>
      </div>
    </article>
  );
}
