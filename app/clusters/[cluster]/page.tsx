import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

type ClusterCity = { slug: string; city: string; state_abbr: string };
type SponsorshipStatus = "available" | "reserved" | "sold";

type ClusterFile = {
  cluster_id: string;
  cluster_name: string;
  state?: string;
  state_abbr: string;
  counties?: string[];
  cities: ClusterCity[];
  pricing?: Record<string, { monthly_usd: number; setup_usd?: number }>;
  sponsorships?: Record<
    string,
    { status: SponsorshipStatus; sponsor_id?: string | null; effective_date?: string | null }
  >;
  rules?: Record<string, boolean>;
  meta?: { created_at?: string; updated_at?: string; version?: number };
};

function loadCluster(slug: string): ClusterFile | null {
  const filePath = path.join(process.cwd(), "data", "clusters", `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(raw);

    const required = ["cluster_id", "cluster_name", "state_abbr", "cities"];
    for (const key of required) {
      if (!(key in data)) throw new Error(`Missing required field: ${key}`);
    }

    if (!Array.isArray(data.cities) || data.cities.length < 1) {
      throw new Error(`cities must be a non-empty array`);
    }

    // Ensure filename matches cluster_id to prevent inventory mismatches
    if (data.cluster_id !== slug) {
      throw new Error(`cluster_id mismatch: filename "${slug}" vs cluster_id "${data.cluster_id}"`);
    }

    // Basic status validation if sponsorships exist
    if (data.sponsorships) {
      for (const [practice, s] of Object.entries(data.sponsorships)) {
        if (!["available", "reserved", "sold"].includes((s as any).status)) {
          throw new Error(`Invalid sponsorship status for "${practice}"`);
        }
      }
    }

    return data as ClusterFile;
  } catch (e) {
    // Failing here is good: catches bad inventory early
    throw new Error(`Invalid cluster JSON for "${slug}": ${(e as Error).message}`);
  }
}

export function generateStaticParams() {
  const dir = path.join(process.cwd(), "data", "clusters");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  return files.map((f) => ({ cluster: f.replace(".json", "") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string }>;
}): Promise<Metadata> {
  const { cluster } = await params;
  const c = loadCluster(cluster);
  if (!c) return {};

  return {
    title: `${c.cluster_name} Cluster | City Law Guide`,
    description: `Cluster overview for ${c.cluster_name} (${c.state_abbr}). Cities included and sponsorship availability by practice.`,
    // Cluster pages are sales/navigation only
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `https://citylawguide.com/clusters/${c.cluster_id}`,
    },
  };
}

function formatUsd(n?: number) {
  if (typeof n !== "number") return "—";
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function formatStatus(status?: SponsorshipStatus) {
  if (!status) return "—";
  if (status === "available") return "Available";
  if (status === "reserved") return "Reserved";
  return "Sold";
}

export default async function ClusterPage({
  params,
}: {
  params: Promise<{ cluster: string }>;
}) {
  const { cluster } = await params;
  const c = loadCluster(cluster);
  if (!c) return notFound();

  const practices = c.sponsorships ? Object.keys(c.sponsorships) : [];

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-neutral-900">
          {c.cluster_name} Cluster
        </h1>
        <p className="text-neutral-700">
          This page describes the cities included in this geographic cluster and
          summarizes sponsorship availability by practice. Cluster pages are for
          navigation and inventory only.
        </p>

        <p className="text-sm text-neutral-600">
          Cluster ID: <span className="font-mono">{c.cluster_id}</span> • State: {c.state_abbr}
          {c.counties?.length ? ` • Counties: ${c.counties.join(", ")}` : ""}
        </p>
      </header>

      <section className="space-y-3 rounded-xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Cities included</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {c.cities.map((city) => (
            <li key={city.slug} className="rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50">
              <div className="font-medium text-neutral-900">
                {city.city}, {city.state_abbr}
              </div>
              <div className="mt-2 flex flex-wrap gap-3 text-sm">
                <Link
                  className="underline underline-offset-4 text-neutral-800 hover:text-neutral-600"
                  href={`/dui-lawyer/${city.slug}`}
                >
                  DUI guide
                </Link>
                <span className="text-neutral-400">•</span>
                <span className="text-neutral-600">
                  Slug: <span className="font-mono">{city.slug}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3 rounded-xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">Sponsorship availability</h2>
        <p className="text-neutral-700">
          Sponsorships are limited by practice and are not rankings or endorsements.
          All sponsored placements are clearly labeled.
        </p>

        {practices.length === 0 ? (
          <p className="text-sm text-neutral-600">No sponsorship inventory is configured for this cluster yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="mt-3 w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-left text-neutral-600">
                  <th className="py-2 pr-4">Practice</th>
                  <th className="py-2 pr-4">Status</th>
                  <th className="py-2 pr-4">Monthly</th>
                  <th className="py-2 pr-4">Setup</th>
                </tr>
              </thead>
              <tbody>
                {practices.map((p) => {
                  const s = c.sponsorships?.[p];
                  const price = c.pricing?.[p];
                  return (
                    <tr key={p} className="border-b border-neutral-100">
                      <td className="py-2 pr-4 font-medium text-neutral-900">
                        {p.replaceAll("_", " ")}
                      </td>
                      <td className="py-2 pr-4 text-neutral-700">{formatStatus(s?.status)}</td>
                      <td className="py-2 pr-4 text-neutral-700">{formatUsd(price?.monthly_usd)}</td>
                      <td className="py-2 pr-4 text-neutral-700">{formatUsd(price?.setup_usd ?? 0)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-4 text-sm text-neutral-600">
          <Link href="/sponsorship-disclosure" className="underline underline-offset-4">
            Sponsorship disclosure
          </Link>
          <span className="mx-2 text-neutral-400">•</span>
          <Link href="/editorial-policy" className="underline underline-offset-4">
            Editorial policy
          </Link>
        </div>
      </section>

      <section className="space-y-3 rounded-xl bg-neutral-50 p-6">
        <h2 className="text-base font-semibold text-neutral-900">Contact</h2>
        <p className="text-neutral-700">
          For sponsorship inquiries, email{" "}
          <a className="underline underline-offset-4" href="mailto:info@citylawguide.com">
            info@citylawguide.com
          </a>
          .
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