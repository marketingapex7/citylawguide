import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

type Court = { name: string; location: string };
type CityPack = {
  city: string;
  state: string;
  state_abbr: string;
  county: string;
  slug: string;
  practice: "dui";
  courts: Court[];
  law_enforcement: string[];
  dmv: { agency: string; notes?: string };
  geography?: { metro?: string; nearby_cities?: string[] };
  cluster?: { id: string; name: string };
};

// Load a city pack by slug from /data/cities
function loadCityPack(slug: string): CityPack | null {
  const filePath = path.join(process.cwd(), "data", "cities", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw);

    // Minimal strict validation (fail hard if malformed)
    const required = [
      "city",
      "state",
      "state_abbr",
      "county",
      "slug",
      "practice",
      "courts",
      "law_enforcement",
      "dmv",
    ];
    for (const key of required) {
      if (!(key in data)) throw new Error(`Missing required field: ${key}`);
    }
    if (data.practice !== "dui")
      throw new Error(`City pack practice must be "dui"`);
    if (data.slug !== slug)
      throw new Error(
        `Slug mismatch: filename "${slug}" vs pack slug "${data.slug}"`
      );
    if (!Array.isArray(data.courts) || data.courts.length < 1)
      throw new Error(`courts must be a non-empty array`);
    if (
      !Array.isArray(data.law_enforcement) ||
      data.law_enforcement.length < 1
    ) {
      throw new Error(`law_enforcement must be a non-empty array`);
    }
    if (!data.dmv?.agency) throw new Error(`dmv.agency is required`);

    return data as CityPack;
  } catch (e) {
    // Throwing here fails the build for bad data (good!)
    throw new Error(
      `Invalid city pack JSON for "${slug}": ${(e as Error).message}`
    );
  }
}

// Build-time static generation for all city packs
export function generateStaticParams() {
  const dir = path.join(process.cwd(), "data", "cities");
  const files = fs.readdirSync(dir);

  return files
    .filter((f) => f.endsWith(".json"))
    .map((f) => ({ city: f.replace(".json", "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const pack = loadCityPack(city);
  if (!pack) return {};

  return {
    title: `DUI Lawyer Information in ${pack.city}, ${pack.state_abbr} | City Law Guide`,
    description: `General information about DUI charges, court process, and driver’s license considerations in ${pack.city}, ${pack.state_abbr}. Educational content only.`,
    alternates: {
      canonical: `https://citylawguide.com/dui-lawyer/${pack.slug}`,
    },
  };
}

export default async function DuiCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;

  const pack = loadCityPack(city);
  if (!pack) return notFound();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-10">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold text-neutral-900">
          DUI Laws and Process in {pack.city}, {pack.state_abbr}
        </h1>

        <p className="text-lg text-neutral-700">
          This page provides general information about DUI charges, procedures,
          and consequences as they typically apply in {pack.city}, {pack.state}.
          Laws and outcomes vary by case, and this content is for educational
          purposes only.
        </p>

        <p className="text-sm text-neutral-600">
          County: {pack.county}
          {pack.cluster?.name ? ` • Cluster: ${pack.cluster.name}` : ""}
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          DUI Charges in {pack.city}
        </h2>
        <p className="text-neutral-700">
          DUI charges in {pack.city} are generally enforced by local and state
          law enforcement agencies and prosecuted in {pack.county}. Although DUI
          laws are established at the state level, local procedures and court
          processes play an important role.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Local Law Enforcement
        </h2>
        <p className="text-neutral-700">
          DUI arrests in and around {pack.city} may involve one or more of the
          following agencies:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-neutral-700">
          {pack.law_enforcement.map((agency) => (
            <li key={agency}>{agency}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          DUI Court Process in {pack.county}
        </h2>
        <p className="text-neutral-700">
          DUI cases arising in {pack.city} are typically handled in the
          following court:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-neutral-700">
          {pack.courts.map((court) => (
            <li key={court.name}>
              {court.name} ({court.location})
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Driver’s License and DMV Considerations
        </h2>
        <p className="text-neutral-700">
          In {pack.state}, DUI cases often involve both criminal court
          proceedings and administrative actions by the {pack.dmv.agency}. These
          processes are separate and may move on different timelines.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Potential Consequences of a DUI in {pack.city}
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-neutral-700">
          <li>Fines and court costs</li>
          <li>Driver’s license suspension or restriction</li>
          <li>Mandatory education or treatment programs</li>
          <li>Probation or incarceration in some cases</li>
          <li>Long-term insurance and employment impacts</li>
        </ul>
        <p className="text-neutral-700">
          Penalties depend on factors such as prior offenses and case-specific
          circumstances.
        </p>
      </section>

      <section className="rounded-xl border border-neutral-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900">
          Featured DUI Attorney in {pack.city}
        </h2>
        <p className="text-neutral-700">
          This section may display a clearly labeled featured attorney who
          sponsors this page. Featured placements are not rankings or
          endorsements.
        </p>
        <p className="text-sm text-neutral-600">
          <Link
            href="/sponsorship-disclosure"
            className="underline underline-offset-4"
          >
            Read our sponsorship disclosure
          </Link>
        </p>
      </section>

      <section className="space-y-3 rounded-xl bg-neutral-50 p-6">
        <h2 className="text-base font-semibold text-neutral-900">
          Legal Information Disclaimer
        </h2>
        <p className="text-neutral-700">
          This page provides general legal information and does not constitute
          legal advice. It does not create an attorney-client relationship.
          Consult a licensed attorney regarding your specific situation.
        </p>
      </section>

      <footer className="pt-6 border-t border-neutral-200 text-sm text-neutral-600">
        <Link href="/dui-lawyer" className="hover:text-neutral-800">
          ← Back to DUI Law Overview
        </Link>
      </footer>
    </main>
  );
}