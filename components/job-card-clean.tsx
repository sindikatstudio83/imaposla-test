import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { SaveJobButton } from "@/components/save-job-button";
import { formatDate, jobUrl } from "@/lib/format";
import type { Job, JobWithPromotion } from "@/types/domain";

type CardJob = Job | JobWithPromotion;

export function JobCardClean({ job, compact = false }: { job: CardJob; compact?: boolean }) {
  const company = job.companies;
  const href = jobUrl(job);
  const description = job.description ? job.description.slice(0, compact ? 90 : 150) : "";
  const meta = [job.cities?.name, job.categories?.name, job.contract_type, job.salary_text].filter(Boolean);

  return (
    <article className={`job-card-clean${compact ? " job-card-clean--compact" : ""}`}>
      <Link className="job-card-clean__logo" href={href} aria-label={job.title}>
        <Avatar bucket="company-logos" path={company?.logo_path ?? null} fallback={company?.name ?? "Firma"} size={compact ? 54 : 76} shape="rounded" />
      </Link>

      <div className="job-card-clean__body">
        <div className="job-card-clean__top">
          <div>
            <Link className="job-card-clean__title" href={href}>{job.title}</Link>
            <span className="job-card-clean__company">{company?.name || "Poslodavac"}</span>
          </div>
          {!compact && <span className="job-card-clean__date">Rok {formatDate(job.deadline)}</span>}
        </div>

        <div className="meta-line">
          {meta.slice(0, compact ? 2 : 4).map((item) => <span key={item}>{item}</span>)}
        </div>

        {!compact && (
          <>
            <div className="tag-row">
              {job.featured && <span className="tag tag-red">Istaknuto</span>}
              {job.contract_type && <span className="tag">{job.contract_type}</span>}
              {job.salary_text && <span className="tag tag-soft">{job.salary_text}</span>}
            </div>
            {description && <p className="job-card-clean__desc">{description}{(job.description ?? "").length > description.length ? "..." : ""}</p>}
          </>
        )}
      </div>

      <div className="job-card-clean__actions">
        <Link className="btn red sm" href={href}>Detalji</Link>
        {!compact && <SaveJobButton jobId={job.id} size="sm" />}
      </div>
    </article>
  );
}
