import Link from "next/link";
import fs from "fs";
import path from "path";

type CityPack = {
  city: string;
  state: string;
  state_abbr: string;
  county: string;
  slug: string;
  practice: "dui";
  cluster?: { id: string; name: string };
};

function loadAllDuiCityPacks(): CityPack[] {
  const dir = path.join(process.cwd(), "data", "cities");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

  const packs: CityPack[] = [];
  for (const file of files) {
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw);

    // Only include DUI packs
    if (data?.practice !== "dui") continue;

    // Minimal requirements for listing
    if (!data?.city || !data?.state_abbr || !data?.slug) continue;

    packs.push({
      city: data.city,
      state: data.state,
      state_abbr: data.state_abbr,
      county: data.county,
      slug: data.slug,
      practice: "dui",
      cluster: data.cluster,
    });
  }

  // Sort: state_abbr then city
  packs.sort((a, b) => {
    if (a.state_abbr !== b.state_abbr) return a.state_abbr.localeCompare(b.state_abbr);
    return a.city.localeCompare(b.city);
  });

  return packs;
}

export default function DuiLawyerHubPage() {
  const cities = loadAllDuiCityPacks();

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-10">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold text-neutral-900">
          DUI Law: Charges, Process, and What to Expect
        </h1>

        <p className="text-lg text-neutral-700">
          Driving Under the Influence (DUI) laws govern offenses involving the
          operation of a vehicle while impaired by alcohol, drugs, or a
          combination of substances. This guide explains how DUI cases typically
          work, the consequences involved, and how the process may differ by
          location.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">What is a DUI?</h2>
        <p className="text-neutral-700">
          A DUI charge generally alleges that a driver operated a motor vehicle
          while impaired beyond a legally defined limit. Impairment may be based
          on blood alcohol concentration (BAC), observable behavior, chemical
          testing, or a combination of factors.
        </p>
        <p className="text-neutral-700">
          This hub focuses exclusively on DUI-related matters. Non-DUI criminal
          charges are covered separately in our criminal defense resources.
        </p>
      </section>

      <section className="space-y-4 rounded-xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">
          DUI information by city
        </h2>
        <p className="text-neutral-700">
          Select a city for localized DUI information, including courts and
          administrative considerations.
        </p>

        {cities.length === 0 ? (
          <p className="text-sm text-neutral-600">
            City-specific guides will appear here as they are published.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {cities.map((c) => (
              <li key={c.slug} className="rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50">
                <Link href={`/dui-lawyer/${c.slug}`} className="block">
                  <div className="font-medium text-neutral-900">
                    {c.city}, {c.state_abbr}
                  </div>
                  <div className="mt-1 text-sm text-neutral-600">
                    County: {c.county}
                    {c.cluster?.name ? ` • Cluster: ${c.cluster.name}` : ""}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3 rounded-xl bg-neutral-50 p-6">
        <h2 className="text-base font-semibold text-neutral-900">
          Legal Information Disclaimer
        </h2>
        <p className="text-neutral-700">
          This content is provided for general informational purposes only and
          does not constitute legal advice. Laws vary by jurisdiction, and
          outcomes depend on specific facts. Consult a licensed attorney for
          advice regarding your situation.
        </p>
      </section>

      <footer className="pt-6 border-t border-neutral-200 text-sm text-neutral-600">
        <Link href="/" className="hover:text-neutral-800">
          ← Back to City Law Guide
        </Link>
      </footer>
    </main>
  );
}