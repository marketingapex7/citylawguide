// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      {/* Header */}
      <header className="space-y-4">
        <p className="text-sm text-neutral-600">
          Public-first legal information • City-by-city • Practice-by-practice
        </p>

        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
          City Law Guide
        </h1>

        <p className="max-w-3xl text-lg leading-relaxed text-neutral-700">
          City Law Guide publishes practical, plain-language legal information
          organized by city and legal topic. Our goal is to help the public
          understand common legal situations and find the right next steps —
          without rankings, hype, or outcome promises.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/dui-lawyer"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
          >
            DUI Information
          </Link>
          <Link
            href="/personal-injury-lawyer"
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
          >
            Personal Injury Information
          </Link>
          <Link
            href="/sponsorship-disclosure"
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
          >
            Sponsorship Disclosure
          </Link>
        </div>
      </header>

      {/* Mission blocks */}
      <section className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            What you’ll find here
          </h2>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>• City-specific guides for common legal situations</li>
            <li>• Court and agency information (where applicable)</li>
            <li>• Step-by-step explanations of typical processes</li>
            <li>• FAQs written for non-lawyers</li>
          </ul>
        </div>

        <div className="rounded-xl border border-neutral-200 p-6">
          <h2 className="text-lg font-semibold text-neutral-900">
            What you won’t find here
          </h2>
          <ul className="mt-3 space-y-2 text-neutral-700">
            <li>• No “best” / “top” lawyer rankings</li>
            <li>• No guarantees about outcomes</li>
            <li>• No comparative claims between attorneys</li>
            <li>• No pay-per-lead or pay-per-call marketplace</li>
          </ul>
        </div>
      </section>

      {/* How featured placements work */}
      <section className="mt-12 rounded-xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-900">
          Featured attorneys (not ranked)
        </h2>
        <p className="mt-3 max-w-3xl text-neutral-700">
          Some pages may include a clearly labeled <span className="font-medium">Featured Attorney</span>{" "}
          placement. These placements are sponsorships. City Law Guide does not
          rank attorneys, compare attorneys, or imply that a featured attorney is
          superior to others.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/editorial-policy"
            className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-700"
          >
            Read our editorial policy
          </Link>
          <Link
            href="/sponsorship-disclosure"
            className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-700"
          >
            Read our sponsorship disclosure
          </Link>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="mt-12 space-y-3 rounded-xl bg-neutral-50 p-6">
        <h2 className="text-base font-semibold text-neutral-900">
          Important disclaimer
        </h2>
        <p className="text-neutral-700">
          City Law Guide provides general legal information for educational
          purposes only. It is not legal advice, does not create an attorney-client
          relationship, and may not reflect the most current legal developments.
          If you need advice for your specific situation, consult a licensed
          attorney in your jurisdiction.
        </p>
        <p className="text-neutral-700">
          Emergency? Contact local emergency services immediately.
        </p>
      </section>

      {/* Footer */}
      <footer className="mt-14 border-t border-neutral-200 pt-6 text-sm text-neutral-600">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/editorial-policy" className="hover:text-neutral-800">
            Editorial Policy
          </Link>
          <Link href="/sponsorship-disclosure" className="hover:text-neutral-800">
            Sponsorship Disclosure
          </Link>
          <Link href="/contact" className="hover:text-neutral-800">
            Contact
          </Link>
        </div>
        <p className="mt-4">© {new Date().getFullYear()} CityLawGuide.com</p>
      </footer>
    </main>
  );
}