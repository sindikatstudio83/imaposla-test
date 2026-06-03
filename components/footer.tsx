import Link from "next/link";
import Image from "next/image";
import { BannerSlot } from "@/components/banner-slot";
import { getLookups } from "@/lib/queries/public";

export async function Footer() {
  const { cities, categories } = await getLookups();

  return (
    <footer className="footer">
      <BannerSlot placement="footer_banner" className="footer-banner-slot" />
      <div className="wrap foot-grid">
        <div className="foot-brand-col">
          <Link className="brand footer-brand" href="/">
            <Image src="/logo-mark-light.png" alt="" width={30} height={37} className="footer-logo-img" />
            <span>imaposla<span className="brand-red">.me</span></span>
          </Link>
          <p>Platforma za oglase, prijave, firme, kandidate, brze poslove i banere u Crnoj Gori.</p>
          <p className="copyright">2026 imaposla.me</p>
        </div>

        <div>
          <h4>Gradovi</h4>
          {cities.slice(0, 6).map((city) => (
            <Link key={city.id} href={`/gradovi/${city.slug || encodeURIComponent(city.name.toLowerCase())}`}>{city.name}</Link>
          ))}
          {!cities.length && <Link href="/gradovi">Pregled gradova</Link>}
        </div>

        <div>
          <h4>Kategorije</h4>
          {categories.slice(0, 6).map((category) => (
            <Link key={category.id} href={`/kategorije/${category.slug || encodeURIComponent(category.name.toLowerCase())}`}>{category.name}</Link>
          ))}
          {!categories.length && <Link href="/kategorije">Pregled kategorija</Link>}
        </div>

        <div>
          <h4>Platforma</h4>
          <Link href="/oglasi">Oglasi</Link>
          <Link href="/brzi-poslovi/radnici">Kandidati</Link>
          <Link href="/brzi-poslovi/angazmani">Brzi angazmani</Link>
          <Link href="/firme">Firme</Link>
          <Link href="/za-firme">Za firme</Link>
          <h4 className="foot-subtitle">Pravno</h4>
          <Link href="/privatnost">Privatnost</Link>
          <Link href="/uslovi-koriscenja">Uslovi koriscenja</Link>
        </div>
      </div>
    </footer>
  );
}
