import type { Metadata } from "next";
import Link from "next/link";
import { BannerSlot } from "@/components/banner-slot";
import { CompanyCard } from "@/components/company-card";
import { getCompanies } from "@/lib/queries/public";

export const metadata: Metadata = {
  title: "Firme - imaposla.me",
  description: "Direktorijum odobrenih firmi i poslodavaca na imaposla.me.",
};

export const revalidate = 120;

export default async function CompaniesPage() {
  const companies = await getCompanies(120);

  return (
    <main className="listing-page">
      <section className="page-hero">
        <span className="eyebrow">Firme</span>
        <h1>Poslodavci na platformi</h1>
        <p>Javni profili firmi koje su odobrene i aktivno koriste imaposla.me.</p>
      </section>

      <BannerSlot placement="company_pages_top" className="page-banner-slot" />

      <section className="section-block">
        <div className="section-title">
          <div>
            <span className="eyebrow">Direktorijum</span>
            <h2>{companies.length} {companies.length === 1 ? "firma" : "firmi"}</h2>
          </div>
          <Link className="btn red sm" href="/za-firme">Dodaj firmu</Link>
        </div>

        {companies.length ? (
          <div className="card-grid card-grid-3">
            {companies.map((company) => <CompanyCard company={company} key={company.id} />)}
          </div>
        ) : (
          <div className="empty">
            <strong>Nema odobrenih firmi.</strong>
            <p>Firme se prikazuju nakon administratorske provjere.</p>
          </div>
        )}
      </section>

      <BannerSlot placement="company_pages_bottom" className="page-banner-slot" />
    </main>
  );
}
