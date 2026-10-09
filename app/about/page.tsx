import Link from "next/link";

import { PageShell } from "@/components/PageShell";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="page-hero about-hero" id="content">
        <p className="eyebrow">About Girls Beyond Gravity</p>
        <h1>A clearer path into aerospace starts with access.</h1>
        <p>
          Girls Beyond Gravity exists to make aerospace education and opportunity more
          accessible to young women, especially students who may not have access
          to extensive educational resources, guidance, or clear information
          about how to pursue the field.
        </p>
        <p>
          The platform currently focuses on two core pillars: free, rigorous AP
          Physics learning resources and accessible information about
          scholarships and undergraduate opportunities for students interested
          in aerospace.
        </p>
      </section>

      <section className="section founder-section">
        <div className="founder-photo-placeholder" aria-label="Founder photo placeholder">
          <span>Founder photo</span>
        </div>

        <article className="founder-story">
          <p className="eyebrow">Meet the Founder</p>
          <h2>Sunaina</h2>
          <p className="founder-role">Founder, Girls Beyond Gravity</p>

          <p>Hi, I’m Sunaina, the founder of Girls Beyond Gravity.</p>

          <p>
            My interest in space started long before I understood what aerospace
            engineering actually was. As I got older and began seriously
            exploring the field, I realized that wanting to pursue aerospace and
            knowing how to pursue it were two very different things.
          </p>

          <p>
            Physics resources existed. Scholarships existed. University programs
            and opportunities existed. But access to them was not always simple.
            Finding the right resources often meant searching across dozens of
            websites, navigating different eligibility requirements, and already
            knowing what to look for.
          </p>

          <p>
            For many young women interested in aerospace, especially those
            without access to strong educational resources or guidance, that gap
            can make an already challenging field feel even further out of
            reach. I created Girls Beyond Gravity because I don&apos;t believe a
            student&apos;s opportunity to explore aerospace should depend on where
            she lives, what her school can offer, or whether she already knows
            how to find her way into the field.
          </p>

          <p>
            Girls Beyond Gravity brings together two resources I believe can help
            close that gap: free, rigorous physics education and accessible
            information about scholarships and undergraduate opportunities in
            aerospace. My goal is not only to help young women prepare for the
            field academically, but to show them that there is a place for them
            within it.
          </p>

          <p>
            I’m building Girls Beyond Gravity as a student myself, shaped by many of
            the same questions and ambitions as the students I hope will use it.
            I want a girl who is curious about space but doesn&apos;t know where to
            begin to be able to come here, learn the physics, discover an
            opportunity she didn&apos;t know existed, and leave believing that
            aerospace is something she can actually pursue.
          </p>

          <p>
            Girls Beyond Gravity is still growing. But its purpose will remain the
            same: to make aerospace education and opportunity more accessible to
            the next generation of young women ready to reach beyond what once
            felt possible.
          </p>
        </article>
      </section>

      <section className="section about-mission-section">
        <div className="section-heading">
          <p className="eyebrow">Our Mission</p>
          <h2>To make aerospace education and opportunity more accessible to young women, regardless of where they live or what resources are available to them.</h2>
        </div>

        <div className="two-pillar-grid">
          <article className="pathway-card">
            <p className="eyebrow">Pillar 01</p>
            <h3>Learn</h3>
            <p>
              Free, rigorous physics resources designed to help students build
              the academic foundation needed to pursue STEM and aerospace.
            </p>
            <Link className="button secondary" href="/ap-physics">
              Explore AP Physics
            </Link>
          </article>
          <article className="pathway-card">
            <p className="eyebrow">Pillar 02</p>
            <h3>Discover</h3>
            <p>
              A curated directory of scholarships and undergraduate
              opportunities that helps students find pathways into aerospace
              that are actually available to them.
            </p>
            <Link className="button secondary" href="/opportunities">
              Explore Opportunities
            </Link>
          </article>
        </div>
      </section>

      <section className="band about-closing">
        <div>
          <p className="eyebrow">Start Here</p>
          <h2>Curiosity shouldn&apos;t be limited by access.</h2>
        </div>
        <div>
          <p>
            Whether you&apos;re here to understand your first physics concept or
            find an opportunity that could shape what comes next, Girls Beyond Gravity
            is here to help you take the next step.
          </p>
          <div className="action-row">
            <Link className="button primary" href="/ap-physics">
              Start Learning
            </Link>
            <Link className="button secondary" href="/opportunities">
              Explore Opportunities
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
