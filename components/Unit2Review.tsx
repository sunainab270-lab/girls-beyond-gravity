import { ReleasedPractice } from "./ReleasedPractice";
import { PhysicsChildren } from "./PhysicsText";
import Link from "next/link";

import {
  Unit2FbdBootcamp,
  Unit2FrqStations,
  Unit2ReviewPractice,
  unit2ReviewQuestionCount,
} from "./Unit2ReviewInteractions";

function Equation({ children }: { children: React.ReactNode }) {
  return <div className="equation"><PhysicsChildren>{children}</PhysicsChildren></div>;
}

const skills = [
  "Systems",
  "Center of Mass",
  "Force Identification",
  "Free-Body Diagrams",
  "Newton's Third Law",
  "Newton's First Law",
  "Newton's Second Law",
  "Net Force",
  "Gravity",
  "Gravitational Fields",
  "Apparent Weight",
  "Static Friction",
  "Kinetic Friction",
  "Spring Forces",
  "Circular Motion",
  "Centripetal Acceleration",
  "Circular Orbits",
];

export function Unit2Review() {
  return (
    <div className="topic-module" data-unit-review="force-translational-dynamics">
      <section className="lesson-section">
        <div className="topic-meta">
          <span>Estimated time: 90-120 minutes</span>
          <span>Purpose: integrate Topics 2.1-2.9</span>
          <span>Feedback: immediate hints and explanations</span>
        </div>
        <p className="eyebrow">Review Dashboard</p>
        <h2>Unit 2 Skill Dashboard</h2>
        <p>Use this workshop to connect system choice, real forces, free-body diagrams, and Newton&apos;s laws before the Unit 2 test.</p>
        <div className="filter-row">
          {skills.map((skill) => <span className="chip" key={skill}>{skill}</span>)}
        </div>
      </section>

      <section className="lesson-section" id="review-fbd">
        <p className="eyebrow">Diagram Practice</p>
        <h2>FBD Bootcamp</h2>
        <p>Every dynamics solution starts by selecting the object or system and drawing only real external forces.</p>
        <Unit2FbdBootcamp />
      </section>

      <section className="lesson-section">
        <h2>Equation and Model Map</h2>
        <div className="comparison-grid">
          <article className="interactive-card" id="review-systems">
            <h3>Systems and Center of Mass</h3>
            <Equation>x_cm = (m₁x₁ + m₂x₂) / (m₁ + m₂)</Equation>
            <p>Choose the boundary before deciding whether a force is internal or external.</p>
          </article>
          <article className="interactive-card" id="review-fbd-model">
            <h3>Free-Body Diagrams</h3>
            <Equation>ΣF_x = sum of real x-forces</Equation>
            <Equation>ΣF_y = sum of real y-forces</Equation>
            <p>Do not include force of motion, centripetal force as a separate force, or pair forces acting on another object.</p>
          </article>
          <article className="interactive-card" id="review-second-law">
            <span id="review-first-law" /><span id="review-third-law" /><h3>Newton&apos;s Laws</h3>
            <Equation>ΣF = ma</Equation>
            <Equation>ΣF = 0 → a = 0</Equation>
            <p>Constant velocity means zero net force; changing velocity means nonzero net force.</p>
          </article>
          <article className="interactive-card" id="review-gravity">
            <h3>Gravity and Apparent Weight</h3>
            <Equation>F_g = Gm₁m₂/r²</Equation>
            <Equation>F_g = mg near Earth</Equation>
            <Equation>apparent weight = F_N</Equation>
            <p>Free fall is not zero gravity; it is zero normal force.</p>
          </article>
          <article className="interactive-card" id="review-friction">
            <h3>Friction</h3>
            <Equation>f_s ≤ μ_sN</Equation>
            <Equation>f_k = μ_kN</Equation>
            <p>Static friction adjusts as needed until its maximum; kinetic friction acts while surfaces slide.</p>
          </article>
          <article className="interactive-card" id="review-spring-circular">
            <span id="review-springs" /><span id="review-circular" /><h3>Springs and Circular Motion</h3>
            <Equation>F_s = -kx</Equation>
            <Equation>a_c = v²/r</Equation>
            <Equation>ΣF_inward = mv²/r</Equation>
            <p>Spring force is restoring; circular motion requires an inward net force from real interactions.</p>
          </article>
        </div>
      </section>

      <section className="lesson-section" id="review-graphs">
        <h2>Graph Review</h2>
        <ul>
          <li>On a net force versus acceleration graph at fixed mass, slope represents mass.</li>
          <li>On a kinetic friction magnitude versus normal force graph, slope is μ_k. For maximum static friction versus normal force, slope is μ_s.</li>
          <li>On a spring force versus displacement graph, slope magnitude represents spring constant.</li>
          <li>Use graph shape and axis labels before choosing an equation.</li>
        </ul>
      </section>

      <section className="lesson-section" id="review-translation">
        <h2>Translation Between Representations</h2>
        <p>Practice moving from words to system boundary, then to FBD, then to component equations, then to a physical conclusion.</p>
        <div className="concept-callout key-idea">Scenario → system → FBD → components → ΣF equation → acceleration or equilibrium conclusion.</div>
      </section>

      <section className="lesson-section" id="review-experiments">
        <h2>Experimental Design</h2>
        <p>Good Unit 2 investigations identify independent and dependent variables, control other quantities, collect repeated trials, graph a linearized model, and interpret slope with units.</p>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Unit Review Practice Set</p>
        <h2>{unit2ReviewQuestionCount} Original AP-Style Review Questions</h2>
        <Unit2ReviewPractice />
      </section>

      <section className="lesson-section">
        <p className="eyebrow">FRQ Skill Workshop</p>
        <h2>Four Short Practice Stations</h2>
        <Unit2FrqStations />
      </section>

      <ReleasedPractice course="physics-1"/>
      <section className="lesson-section">
        <h2>Ready for the Test?</h2>
        <p>Revisit weak skills, then start the Unit 2 assessment when you are ready for no-hint test mode.</p>
        <div className="lesson-nav">
          <Link className="button secondary" href="/ap-physics/physics-1/force-translational-dynamics/circular-motion">Review Topic 2.9</Link>
          <Link className="button primary" href="/ap-physics/physics-1/force-translational-dynamics/test">Start Unit Test</Link>
        </div>
      </section>
    </div>
  );
}
