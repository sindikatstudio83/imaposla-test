# imaposla.me

Produkcioni Next.js paket za imaposla.me. UI je presvucen u NextHire stil, ali aplikacija ostaje tvoj sajt: oglasi, kandidati, firme, brzi poslovi, baneri, prijave, korisnicke uloge, admin i Supabase sloj.

## Sta je u paketu

- Pocetna u creative/job-portal rasporedu.
- Oglasi sa list/grid prikazom.
- Kandidati/radnici sa list/grid prikazom.
- Firme i profil firme.
- Kandidat panel: CV, prijave, sacuvani oglasi, upozorenja, brzi profil.
- Firma panel: oglasi, novi oglas, kandidati, selekcija, brzi angazmani, baneri, pretplata. 
- Admin panel: oglasi, firme, korisnici, paketi, baneri, brzi poslovi, uplate, audit.
- Supabase migracije, seed i edge funkcije u `supabase/`.

## Pokretanje lokalno

```bash
npm install
npm run dev
```

Ako pravis lokalni env fajl, koristi `env.example` kao primjer i napravi `.env.local`.

Obavezne varijable:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=
```

Na Vercel-u ove varijable ostaju u Project Settings -> Environment Variables. Postojecu bazu ne treba mijenjati ako vec imas iste Supabase tabele/migracije.

## Upload preko GitHub Desktop

Ako ovaj paket raspakujes preko starog repozitorijuma:

1. Sacuvaj postojeci `.env.local` ako ga imas lokalno.
2. Ne diraj `.git` folder.
3. Obrisi stari kod iz radnog foldera.
4. Raspakuj sadrzaj ovog ZIP-a direktno u root repozitorijuma.
5. U GitHub Desktop uradi commit i push.

Vercel treba da prepozna Next.js automatski:

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: automatski Next.js output

## Provjera

Ovaj paket je provjeren kroz:

- `npm run typecheck`
- `npm run lint`
- `npm run build`

Build je testiran sa probnim Supabase URL-om, zato lokalni build moze prikazati `fetch failed` za podatke dok ne stavis prave env varijable. To ne zaustavlja build.

## Vazno

U ZIP ne treba ubacivati `node_modules`, `.next`, lokalne screenshot/provjera foldere ni stare prototipe. To Vercel sam napravi tokom deploy-a.
