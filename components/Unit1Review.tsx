import { PhysicsChildren } from "./PhysicsText";
import Link from "next/link";

import {
  FRQSkillStations,
  ReadinessDiagnostic,
  RepresentationReviewActivity,
  Unit1ReviewPracticeSet,
} from "./Unit1ReviewInteractions";

function Equation({ children }: { children: React.ReactNode }) {
  return <div className="equation"><PhysicsChildren>{children}</PhysicsChildren></div>;
}

const skills = [
  "Scalars vs vectors",
  "One-dimensional direction/sign conventions",
  "Position and displacement",
  "Distance vs displacement",
  "Average velocity",
  "Acceleration",
  "Speeding up/slowing down",
  "Motion diagrams",
  "Position-time graphs",
  "Slope and velocity",
  "Translation between representations",
  "Reference frames",
  "Relative velocity",
  "Vector components",
  "Vector addition",
  "Two-dimensional motion",
  "Projectile motion",
];

export function Unit1Review() {
  return (
    <div className="topic-module" data-unit-review="kinematics">
      <section className="lesson-section">
        <div className="topic-meta">
          <span>Estimated time: 60-90 minutes</span>
          <span>Purpose: integrate Topics 1.1-1.5</span>
          <span>Feedback: immediate hints and explanations</span>
        </div>
        <p className="eyebrow">Review Dashboard</p>
        <h2>Unit 1 Skill Dashboard</h2>
        <p>This page is not another chapter. It is a practice workshop for connecting every major Kinematics skill before the Unit Test.</p>
        <div className="filter-row">
          {skills.map((skill) => <span className="chip" key={skill}>{skill}</span>)}
        </div>
        <ReadinessDiagnostic />
      </section>

      <section className="lesson-section">
        <h2>Core Equation Map</h2>
        <p>Equations are tools. Use them after identifying the physical quantity, direction, and assumptions.</p>
        <div className="comparison-grid">
          <article className="interactive-card" id="review-section-position">
            <h3>Position, Displacement, and Velocity</h3>
            <Equation>Δx = x_f - x_i</Equation>
            <Equation>v_avg = Δx / Δt</Equation>
            <p>Useful when comparing initial/final position or finding average velocity over an interval.</p>
          </article>
          <article className="interactive-card" id="review-section-acceleration">
            <h3>Velocity and Acceleration</h3>
            <Equation>Δv = v_f - v_i</Equation>
            <Equation>a_avg = Δv / Δt</Equation>
            <p>Useful when velocity changes. Sign tells acceleration direction, not automatically speeding up.</p>
          </article>
          <article className="interactive-card" id="review-section-relative">
            <h3>Reference Frames</h3>
            <Equation>v_student,ground = v_student,train + v_train,ground</Equation>
            <Equation>v_A,B = v_A,ground - v_B,ground</Equation>
            <p>Useful only after identifying what is moving and relative to which observer.</p>
          </article>
          <article className="interactive-card" id="review-section-vectors">
            <h3>Two-Dimensional Vectors</h3>
            <Equation>A_x = A cos θ</Equation>
            <Equation>A_y = A sin θ</Equation>
            <Equation>A = √(A_x² + A_y²)</Equation>
            <p>Assumes θ is measured from +x. Use signs and the diagram for the quadrant.</p>
          </article>
          <article className="interactive-card" id="review-section-projectiles">
            <h3>Projectile Motion</h3>
            <Equation>a_x = 0</Equation>
            <Equation>a_y = -g</Equation>
            <p>Separate horizontal and vertical motion, then connect them with the same elapsed time.</p>
          </article>
        </div>
      </section>

      <section className="lesson-section" id="review-section-representations">
        <h2>Representation Review</h2>
        <RepresentationReviewActivity />
      </section>

      <section className="lesson-section" id="review-section-graphs">
        <h2>Graph Review</h2>
        <p>For position-time graphs, slope is velocity. Read values from axes, calculate displacement from positions, and use slope magnitude to compare speed.</p>
        <ul>
          <li>Horizontal line: position constant, velocity zero.</li>
          <li>Positive slope: positive velocity.</li>
          <li>Negative slope: negative velocity.</li>
          <li>Steeper slope magnitude: greater speed.</li>
        </ul>
      </section>

      <section className="lesson-section">
        <h2>Vector and Projectile Review</h2>
        <p>When a problem becomes two-dimensional, components are the bridge from geometry to kinematics. Projectile motion uses that same idea with one important addition: x and y share time.</p>
        <div className="concept-callout key-idea">Separate directions. Preserve signs. Share time.</div>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Unit Review Practice Set</p>
        <h2>16 Original AP-Style Review Questions</h2>
        <Unit1ReviewPracticeSet />
      </section>

      <section className="lesson-section">
        <p className="eyebrow">FRQ Skill Workshop</p>
        <h2>Four Short Practice Stations</h2>
        <FRQSkillStations />
      </section>

      <section className="lesson-section">
        <h2>Ready for the Test?</h2>
        <p>Use the dashboard above to revisit weak skills, then start the cumulative Unit 1 assessment.</p>
        <div className="lesson-nav">
          <Link className="button secondary" href="/ap-physics/physics-1/kinematics/vectors-motion-two-dimensions">Review Topic 1.5</Link>
          <Link className="button primary" href="/ap-physics/physics-1/kinematics/test">Start Unit Test</Link>
        </div>
      </section>
    </div>
  );
}
