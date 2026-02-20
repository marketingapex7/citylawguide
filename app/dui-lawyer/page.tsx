import Link from "next/link";

export default function DuiLawyerHubPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-10">
      {/* Header */}
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

      {/* What is DUI */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          What is a DUI?
        </h2>
        <p className="text-neutral-700">
          A DUI charge generally alleges that a driver operated a motor vehicle
          while impaired beyond a legally defined limit. Impairment may be based
          on blood alcohol concentration (BAC), observable behavior, chemical
          testing, or a combination of factors.
        </p>
        <p className="text-neutral-700">
          While terminology and thresholds vary by state, DUI charges typically
          apply to alcohol-related impairment and may also include impairment
          caused by prescription medications or controlled substances.
        </p>
      </section>

      {/* DUI vs other criminal charges */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          DUI vs. Other Criminal Charges
        </h2>
        <p className="text-neutral-700">
          DUI offenses are usually handled separately from other criminal
          matters. Although a DUI is a criminal charge in many jurisdictions, it
          follows its own procedures, penalties, and administrative rules.
        </p>
        <p className="text-neutral-700">
          This guide focuses exclusively on DUI-related matters. Information
          about non-DUI criminal charges is covered separately in our criminal
          defense resources.
        </p>
      </section>

      {/* The DUI process */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          The DUI Process (General Overview)
        </h2>
        <ol className="list-decimal pl-6 space-y-2 text-neutral-700">
          <li>Traffic stop or checkpoint</li>
          <li>Field sobriety and/or chemical testing</li>
          <li>Arrest and formal charging</li>
          <li>Administrative license review or suspension</li>
          <li>Criminal court proceedings</li>
        </ol>
        <p className="text-neutral-700">
          The exact process, timelines, and available defenses depend on state
          law and local court procedures.
        </p>
      </section>

      {/* Penalties */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          Potential Consequences of a DUI
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-neutral-700">
          <li>Fines and court costs</li>
          <li>License suspension or revocation</li>
          <li>Mandatory education or treatment programs</li>
          <li>Probation or incarceration in some cases</li>
          <li>Increased insurance premiums</li>
        </ul>
        <p className="text-neutral-700">
          Penalties often increase for repeat offenses or cases involving
          aggravating factors.
        </p>
      </section>

      {/* City-specific guidance */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-neutral-900">
          DUI Laws by City and State
        </h2>
        <p className="text-neutral-700">
          DUI laws are defined at the state level but enforced locally. Court
          procedures, enforcement practices, and administrative processes can
          vary by city and county.
        </p>
        <p className="text-neutral-700">
          Our city-specific DUI guides provide localized information, including
          relevant courts, agencies, and procedural considerations.
        </p>
      </section>

      {/* CTA to city pages */}
      <section className="rounded-xl border border-neutral-200 p-6 space-y-3">
        <h3 className="text-lg font-semibold text-neutral-900">
          Find DUI information for your city
        </h3>
        <p className="text-neutral-700">
          Select a city to learn how DUI laws and procedures apply locally.
        </p>

        {/* Placeholder links — real cities added later */}
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="text-neutral-500">
            City-specific guides coming soon.
          </span>
        </div>
      </section>

      {/* Disclaimer */}
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

      {/* Footer nav */}
      <footer className="pt-6 border-t border-neutral-200 text-sm text-neutral-600">
        <Link href="/" className="hover:text-neutral-800">
          ← Back to City Law Guide
        </Link>
      </footer>
    </main>
  );
}