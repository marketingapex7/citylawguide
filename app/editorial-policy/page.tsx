export default function EditorialPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-neutral-900">
          Editorial Policy
        </h1>
        <p className="text-neutral-700">
          City Law Guide is a public-first legal information platform. This
          Editorial Policy explains how our content is created, reviewed, and
          presented.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Our Mission
        </h2>
        <p className="text-neutral-700">
          Our mission is to publish clear, accurate, and accessible legal
          information organized by city and legal topic. We aim to help the
          public understand common legal situations and navigate available
          options without rankings, hype, or promotional language.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Editorial Independence
        </h2>
        <p className="text-neutral-700">
          City Law Guide maintains editorial independence from any sponsoring
          attorneys or firms. Sponsorships do not influence how legal topics are
          explained, which information is included, or how content is organized.
        </p>
        <p className="text-neutral-700">
          Attorneys featured on City Law Guide do not review, approve, or edit
          our editorial content.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Content Creation Process
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-neutral-700">
          <li>
            Content is developed using structured geographic and legal data,
            including publicly available court and agency information where
            applicable.
          </li>
          <li>
            Articles are written in plain language for a general audience and
            are intended to explain typical legal processes, not individual
            outcomes.
          </li>
          <li>
            Content may be assisted by automated tools and is reviewed for
            accuracy, clarity, and consistency prior to publication.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Scope and Limitations
        </h2>
        <p className="text-neutral-700">
          City Law Guide provides general legal information for educational
          purposes only. Our content:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-neutral-700">
          <li>Does not constitute legal advice</li>
          <li>Does not create an attorney-client relationship</li>
          <li>May not reflect the most current legal developments</li>
          <li>
            Should not be relied upon as a substitute for advice from a licensed
            attorney
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          No Rankings or Comparisons
        </h2>
        <p className="text-neutral-700">
          City Law Guide does not rank attorneys, compare attorneys, or evaluate
          attorneys based on quality, success rates, or outcomes. We do not use
          terms such as “best,” “top,” or similar comparative language anywhere
          on the site.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Corrections and Updates
        </h2>
        <p className="text-neutral-700">
          We strive for accuracy. If an error is identified or information
          becomes outdated, we may update or correct content as appropriate.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Contact
        </h2>
        <p className="text-neutral-700">
          Questions about our editorial standards may be directed to{" "}
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