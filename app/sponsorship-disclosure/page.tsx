export default function SponsorshipDisclosurePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-neutral-900">
          Sponsorship Disclosure
        </h1>
        <p className="text-neutral-700">
          Transparency is important to us. This Sponsorship Disclosure explains
          how sponsored placements appear on City Law Guide.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Sponsored and Featured Placements
        </h2>
        <p className="text-neutral-700">
          Some pages on City Law Guide may include a clearly labeled{" "}
          <span className="font-medium">Featured Attorney</span> or{" "}
          <span className="font-medium">Sponsored</span> placement. These
          placements are paid sponsorships purchased by individual attorneys or
          law firms.
        </p>
        <p className="text-neutral-700">
          Sponsored placements are presented for visibility purposes only and
          are not endorsements, recommendations, or evaluations of legal
          services.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          No Rankings or Comparisons
        </h2>
        <p className="text-neutral-700">
          City Law Guide does not rank attorneys, compare attorneys, or imply that
          one attorney is better, more qualified, or more successful than
          another. The presence of a featured or sponsored placement does not
          indicate quality, expertise, or likelihood of a particular outcome.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Editorial Independence
        </h2>
        <p className="text-neutral-700">
          Sponsorship does not influence our editorial content. Legal
          information, explanations, and educational material are developed
          independently and are not reviewed, approved, or modified by
          sponsoring attorneys.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Limited Availability
        </h2>
        <p className="text-neutral-700">
          Sponsored placements are offered on a limited, non-rotating basis and
          may be restricted by geographic area and legal practice. Availability
          may change over time, and not all pages include sponsored placements.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Not Legal Advice
        </h2>
        <p className="text-neutral-700">
          City Law Guide provides general legal information for educational
          purposes only. Sponsored placements do not create an attorney-client
          relationship and do not constitute legal advice.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Questions
        </h2>
        <p className="text-neutral-700">
          Questions regarding sponsorships or disclosures may be directed to{" "}
          <a
            href="mailto:info@citylawguide.com"
            className="underline underline-offset-4"
          >
            info@citylawguide.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}