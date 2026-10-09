import { OpportunityExplorer } from "@/components/OpportunityExplorer";
import { PageShell } from "@/components/PageShell";

const categories = ["Internships", "Scholarships", "Fellowships", "Research", "Competitions", "Summer Programs", "Mentorship"];

export default function OpportunitiesPage() {
  return (
    <PageShell>
      <section className="page-hero" id="content">
        <p className="eyebrow">Opportunity Hub</p>
        <h1>Find aerospace opportunities that can move your future forward.</h1>
        <p>
          Search internships, scholarships, fellowships, research programs,
          competitions, and summer experiences from reputable organizations.
          Every listing includes eligibility, funding, deadlines, and an
          official application link so students can explore with confidence.
        </p>
      </section>

      <section className="section">
        <div className="filter-row">
          {categories.map((category) => (
            <span className="chip" key={category}>
              {category}
            </span>
          ))}
        </div>
        <OpportunityExplorer />
      </section>
    </PageShell>
  );
}
