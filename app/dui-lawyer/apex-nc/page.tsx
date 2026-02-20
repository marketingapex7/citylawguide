import type { Metadata } from "next";
import Link from "next/link";
import city from "@/data/cities/apex-nc.json";

export const metadata: Metadata = {
  title: `DUI Lawyer Information in ${city.city}, ${city.state_abbr} | City Law Guide`,
  description: `General information about DUI charges, court process, and driver’s license considerations in ${city.city}, ${city.state_abbr}. Educational content only.`,
  alternates: {
    canonical: `https://citylawguide.com/dui-lawyer/${city.slug}`,
  },
};

export default function ApexDuiPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-10">
      <header className="space-y-4">
        <h1 className="text-3xl font-semibold text-neutral-900">
          DUI Laws and Process in {city.city}, {city.state_abbr}
        </h1>
        <p className="text-lg text-neutral-700">
          This page provides general information about DUI charges, procedures,
          and consequences as they typically apply in {city.city},{" "}
          {city.state}. Laws and outcomes vary by case, and this content is for
          educational purposes only.
        </p>
      </header>
        <p className="text-sm text-neutral-600">
  Last reviewed: {new Date().toLocaleDateString()}
</p>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          DUI Charges in {city.city}
        </h2>
        <p className="text-neutral-700">
          DUI charges in {city.city} are generally enforced by local and state
          law enforcement agencies and prosecuted in {city.county}. Although
          DUI laws are established at the state level, local procedures and
          court processes play an important role.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Local Law Enforcement
        </h2>
        <p className="text-neutral-700">
          DUI arrests in and around {city.city} may involve one or more of the
          following agencies:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-neutral-700">
          {city.law_enforcement.map((agency: string) => (
            <li key={agency}>{agency}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          DUI Court Process in {city.county}
        </h2>
        <p className="text-neutral-700">
          DUI cases arising in {city.city} are typically handled in the
          following court:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-neutral-700">
          {city.courts.map((court: { name: string; location: string }) => (
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
          In North Carolina, DUI cases often involve both criminal court
          proceedings and administrative actions by the {city.dmv.agency}. These
          processes are separate and may move on different timelines.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Potential Consequences of a DUI in {city.city}
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-neutral-700">
          <li>Fines and court costs</li>
          <li>Driver’s license suspension or restriction</li>
          <li>Mandatory education or treatment programs</li>
          <li>Probation or incarceration in some cases</li>
          <li>Long-term insurance and employment impacts</li>
        </ul>
      </section>

      <section className="rounded-xl border border-neutral-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-neutral-900">
          Featured DUI Attorney in {city.city}
        </h2>
        <p className="text-neutral-700">
          This section may display a clearly labeled featured attorney who
          sponsors this page. Featured placements are not rankings or
          endorsements.
        </p>
        <p className="text-sm text-neutral-600">
          <Link href="/sponsorship-disclosure" className="underline underline-offset-4">
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