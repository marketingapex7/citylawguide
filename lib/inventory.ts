import fs from "fs";
import path from "path";

export type SponsorshipStatus = "available" | "reserved" | "sold";

export type ClusterCity = { slug: string; city: string; state_abbr: string };

export type ClusterFile = {
  cluster_id: string;
  cluster_name: string;
  state_abbr: string;
  counties?: string[];
  cities: ClusterCity[];
  pricing?: Record<string, { monthly_usd: number; setup_usd?: number }>;
  sponsorships?: Record<
    string,
    { status: SponsorshipStatus; sponsor_id?: string | null; effective_date?: string | null }
  >;
};

export function loadClusterOrThrow(clusterId: string): ClusterFile {
  const filePath = path.join(process.cwd(), "data", "clusters", `${clusterId}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing cluster file: data/clusters/${clusterId}.json`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(raw);

  const required = ["cluster_id", "cluster_name", "state_abbr", "cities"];
  for (const key of required) {
    if (!(key in data)) throw new Error(`Invalid cluster "${clusterId}": missing field "${key}"`);
  }

  if (data.cluster_id !== clusterId) {
    throw new Error(`Cluster ID mismatch: filename "${clusterId}" vs cluster_id "${data.cluster_id}"`);
  }

  if (!Array.isArray(data.cities) || data.cities.length < 1) {
    throw new Error(`Invalid cluster "${clusterId}": cities must be a non-empty array`);
  }

  return data as ClusterFile;
}

export function assertCityInClusterOrThrow(cluster: ClusterFile, citySlug: string) {
  const exists = cluster.cities.some((c) => c.slug === citySlug);
  if (!exists) {
    throw new Error(
      `City slug "${citySlug}" not found in cluster "${cluster.cluster_id}". ` +
        `Fix either the city pack cluster assignment or the cluster city list.`
    );
  }
}

export function getSponsorship(cluster: ClusterFile, practiceKey: string) {
  const sponsorship = cluster.sponsorships?.[practiceKey];
  const pricing = cluster.pricing?.[practiceKey];

  return {
    status: sponsorship?.status as SponsorshipStatus | undefined,
    monthly_usd: pricing?.monthly_usd,
    setup_usd: pricing?.setup_usd ?? 0,
  };
}