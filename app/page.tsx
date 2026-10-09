import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { brand } from "@/lib/data";

const pillarCards = [
  {
    title: "AP Physics",
    href: "/ap-physics",
    items: [
      "AP Physics 1",
      "AP Physics 2",
      "AP Physics C",
      "Course maps",
      "Unit pages",
      "Lesson pages",
    ],
  },
  {
    title: "Opportunities",
    href: "/opportunities",
    items: [
      "Scholarships",
      "Undergraduate Programs",
      "Internships",
      "Research",
      "Competitions",
      "Summer Programs",
    ],
  },
];

export default function Home() {
  return (
    <PageShell>
      <section className="hero" id="content">
        <div className="hero-copy">
          <p className="eyebrow">Free aerospace preparation platform</p>
          <h1>{brand.organizationName}</h1>
          <p className="tagline">
            Preparing the next generation of women in aerospace.
          </p>
          <p>Master AP Physics. Discover global aerospace opportunities.</p>
          <div className="action-row">
            <Link className="button primary" href="/ap-physics">
              Start Learning
            </Link>
            <Link className="button secondary" href="/opportunities">
              Browse Opportunities
            </Link>
          </div>
          <p className="notice">
            Girls Beyond Gravity is a free platform that helps aspiring aerospace
            students master AP Physics and discover scholarships, undergraduate
            programs, internships, research opportunities, and competitions.
          </p>
        </div>
        <div className="orbital-visual" aria-label="Abstract aerospace path diagram">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="orbit orbit-three" />
          <span className="satellite" />
          <span className="flight-path" />
          <div className="mission-panel">
            <strong>AP Physics → Opportunity Hub</strong>
            <small>
              A simpler path from physics readiness to aerospace programs,
              scholarships, internships, research, and competitions.
            </small>
          </div>
        </div>
      </section>

      <section className="band problem">
        <div>
          <p className="eyebrow">What is Girls Beyond Gravity?</p>
          <h2>One place for AP Physics preparation and aerospace discovery.</h2>
        </div>
        <p>
          Students interested in aerospace often have to search across many
          websites for educational resources, scholarships, undergraduate
          programs, internships, research programs, and competitions. Girls Beyond
          Gravity brings the two essentials together in a focused, student-ready
          platform.
        </p>
      </section>

      <section className="section" aria-labelledby="pillars-heading">
        <div className="section-heading">
          <p className="eyebrow">Two core pillars</p>
          <h2 id="pillars-heading">Focused on learning and opportunity.</h2>
        </div>
        <div className="step-grid two-pillar-grid">
          {pillarCards.map((pillar, index) => (
            <article className="step" key={pillar.title}>
              <span>{index + 1}</span>
              <h3>{pillar.title}</h3>
              <ul>
                {pillar.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className="button secondary" href={pillar.href}>
                Open {pillar.title}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section mission-section">
        <div className="section-heading">
          <p className="eyebrow">Mission</p>
          <h2>Free, focused support for aerospace-ready students.</h2>
          <p>{brand.shortMission}</p>
        </div>
      </section>
    </PageShell>
  );
}
