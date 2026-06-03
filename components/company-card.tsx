import Link from "next/link";
import { Avatar } from "@/components/avatar";
import { companyUrl } from "@/lib/format";
import type { Company } from "@/types/domain";

export function CompanyCard({ company }: { company: Company }) {
  const href = companyUrl(company);

  return (
    <article className="company-card">
      <Link className="company-card__logo" href={href} aria-label={company.name}>
        <Avatar bucket="company-logos" path={company.logo_path} fallback={company.name} size={108} shape="rounded" />
      </Link>
      <div className="company-card__body">
        <h3><Link href={href}>{company.name}</Link></h3>
        <div className="meta-line">
          {company.city && <span>{company.city}</span>}
          {company.industry && <span>{company.industry}</span>}
        </div>
        {company.description && <p>{company.description}</p>}
      </div>
      <Link className="btn ghost sm" href={href}>Profil firme</Link>
    </article>
  );
}
