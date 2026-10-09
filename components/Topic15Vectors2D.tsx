import { PhysicsChildren } from "./PhysicsText";
import Link from "next/link";

import { SvgVectorArrow } from "./SvgArrowMarker";
import {
  ComponentCalculationCheck,
  ComponentSignsExplorer,
  DropComparison,
  ExperimentalReasoning,
  GraphConstructionActivity,
  ProjectileMotionExplorer,
  Topic15ChoiceCheck,
  Topic15MasteryCheck,
  VectorAdditionLab,
  VectorComponentExplorer,
} from "./Topic15Interactions";

function Equation({ children }: { children: React.ReactNode }) {
  return <div className="equation"><PhysicsChildren>{children}</PhysicsChildren></div>;
}

function DiagonalMotionIntro() {
  return (
    <figure className="physics-diagram" aria-label="Ball moving diagonally upward and right">
      <svg viewBox="0 0 720 300" role="img">
        <line className="axis-line" x1="90" y1="240" x2="640" y2="240" />
        <line className="axis-line" x1="120" y1="55" x2="120" y2="260" />
        <polyline className="path-line" points="145,226 230,186 315,148 400,112 485,82 570,58" />
        <circle className="finish-dot" cx="400" cy="112" r="11" />
        <SvgVectorArrow className="vector-line" x1={145} y1={226} x2={400} y2={112} />
        <SvgVectorArrow className="secondary-vector" x1={145} y1={258} x2={400} y2={258} />
        <SvgVectorArrow className="result-vector" x1={430} y1={226} x2={430} y2={112} />
        <text x="232" y="282">horizontal component</text>
        <text x="446" y="170">vertical component</text>
      </svg>
    </figure>
  );
}

function ComponentTriangle() {
  return (
    <figure className="physics-diagram" aria-label="Right triangle used to find vector components">
      <svg viewBox="0 0 720 330" role="img">
        <line className="axis-line" x1="100" y1="250" x2="630" y2="250" />
        <line className="axis-line" x1="150" y1="50" x2="150" y2="270" />
        <SvgVectorArrow className="vector-line" x1={180} y1={250} x2={520} y2={105} />
        <SvgVectorArrow className="secondary-vector" x1={180} y1={282} x2={520} y2={282} />
        <SvgVectorArrow className="result-vector" x1={548} y1={250} x2={548} y2={105} />
        <line className="axis-guide" x1="520" y1="250" x2="520" y2="105" />
        <text x="338" y="92">A</text>
        <text x="330" y="306">A_x = A cos θ</text>
        <text x="558" y="194">A_y = A sin θ</text>
        <text x="226" y="236">θ</text>
      </svg>
    </figure>
  );
}

function RebuildVectorDiagram() {
  return (
    <figure className="physics-diagram" aria-label="Rebuilding a vector from components">
      <svg viewBox="0 0 720 320" role="img">
        <line className="axis-line" x1="90" y1="245" x2="640" y2="245" />
        <line className="axis-line" x1="150" y1="55" x2="150" y2="265" />
        <SvgVectorArrow className="secondary-vector" x1={185} y1={250} x2={305} y2={250} />
        <SvgVectorArrow className="result-vector" x1={305} y1={250} x2={305} y2={90} />
        <SvgVectorArrow className="vector-line" x1={185} y1={250} x2={305} y2={90} />
        <text x="205" y="280">A_x = +6 m</text>
        <text x="325" y="176">A_y = +8 m</text>
        <text x="192" y="125">A = 10 m</text>
      </svg>
    </figure>
  );
}

function ProjectileMotionDiagram() {
  return (
    <figure className="physics-diagram" aria-label="Projectile trajectory with tangent velocity and downward acceleration">
      <svg viewBox="0 0 720 360" role="img">
        <line className="axis-line" x1="80" y1="310" x2="650" y2="310" />
        <path className="path-line" d="M 100 270 Q 390 -50 680 270" />
        <circle className="finish-dot" cx="390" cy="110" r="10" />
        <SvgVectorArrow className="vector-line" x1={390} y1={110} x2={485} y2={110} />
        <SvgVectorArrow className="result-vector" x1={390} y1={110} x2={390} y2={205} />
        <text x="482" y="94">velocity</text>
        <text x="482" y="122">tangent to path</text>
        <text x="404" y="174">acceleration downward</text>
      </svg>
    </figure>
  );
}

function ProjectileTimeline() {
  const points = [
    { x: 120, y: 260, vy: -70, label: "launch" },
    { x: 245, y: 152, vy: -35, label: "ascending" },
    { x: 370, y: 116, vy: 0, label: "highest point" },
    { x: 495, y: 152, vy: 35, label: "descending" },
    { x: 620, y: 260, vy: 70, label: "landing" },
  ];

  return (
    <figure className="physics-diagram" aria-label="Velocity and acceleration throughout projectile flight">
      <svg viewBox="0 0 720 360" role="img">
        <line className="axis-line" x1="80" y1="305" x2="650" y2="305" />
        <path className="path-line" d="M 120 260 Q 370 -28 620 260" />
        {points.map((point) => (
          <g key={point.label}>
            <circle className="finish-dot" cx={point.x} cy={point.y} r="7" />
            <SvgVectorArrow className="secondary-vector" x1={point.x} y1={point.y} x2={point.x + 58} y2={point.y} />
            {point.vy !== 0 ? <SvgVectorArrow className="vector-line" x1={point.x} y1={point.y} x2={point.x} y2={point.y + point.vy} /> : null}
            <SvgVectorArrow className="result-vector" x1={point.x + 18} y1={point.y + 15} x2={point.x + 18} y2={point.y + 70} />
            <text x={point.x - 42} y={point.y - 18}>{point.label}</text>
          </g>
        ))}
      </svg>
      <figcaption>Equal-time snapshots: horizontal velocity stays constant, vertical velocity changes uniformly, and acceleration always points down. Arrow lengths compare each quantity within its own set.</figcaption>
    </figure>
  );
}

function RepresentationTabsStatic() {
  return (
    <div className="comparison-grid" id="section-graphs">
      <article className="interactive-card">
        <h3>Trajectory and Motion Diagram</h3>
        <p>The dots get equal horizontal spacing in equal time intervals, while vertical spacing changes because vertical velocity changes.</p>
      </article>
      <article className="interactive-card">
        <h3>x-position vs time</h3>
        <p>A straight increasing line: horizontal velocity is constant.</p>
      </article>
      <article className="interactive-card">
        <h3>y-position vs time</h3>
        <p>A curved graph because vertical acceleration is constant downward.</p>
      </article>
      <article className="interactive-card">
        <h3>Velocity and Acceleration Graphs</h3>
        <p>v_x is constant, v_y changes linearly, a_x = 0, and a_y = -g.</p>
      </article>
    </div>
  );
}

export function Topic15Vectors2D() {
  return (
    <div className="topic-module" data-topic="Vectors and Motion in Two Dimensions">
      <section className="lesson-section">
        <div className="topic-meta">
          <span>Estimated time: 70-90 minutes</span>
          <span>Difficulty: Intermediate to Advanced</span>
          <span>Skills: representations, vector reasoning, mathematical routines, graphical reasoning, translation, scientific argumentation</span>
        </div>
        <p className="eyebrow">What You&apos;ll Learn</p>
        <h2>What You&apos;ll Learn</h2>
        <ul>
          <li>Represent vectors in two dimensions and resolve them into perpendicular components.</li>
          <li>Use trigonometry to determine horizontal and vertical components.</li>
          <li>Add vectors with components and reconstruct magnitude and direction.</li>
          <li>Analyze two-dimensional motion using independent perpendicular components.</li>
          <li>Explain and represent ideal projectile motion.</li>
          <li>Translate between diagrams, equations, graphs, and verbal descriptions.</li>
        </ul>
      </section>

      <section className="lesson-section">
        <h2>1. From One Dimension to Two</h2>
        <p>A ball can move diagonally upward and right. That motion is not only horizontal, and it is not only vertical.</p>
        <DiagonalMotionIntro />
        <div className="concept-callout key-idea">Two-dimensional motion has both an x-direction component and a y-direction component.</div>
      </section>

      <section className="lesson-section" id="section-components">
        <h2>2. One Vector, Two Components</h2>
        <p>A diagonal displacement can be represented as the combination of a horizontal component and a vertical component.</p>
        <p>The components are not extra motion. They are a useful way to describe the original vector using perpendicular directions.</p>
        <VectorComponentExplorer />
      </section>

      <section className="lesson-section">
        <h2>3. Finding Components</h2>
        <p>If angle θ is measured from the +x direction, the horizontal component is adjacent to the angle and the vertical component is opposite the angle.</p>
        <ComponentTriangle />
        <Equation>cos θ = adjacent / hypotenuse, so A_x = A cos θ</Equation>
        <Equation>sin θ = opposite / hypotenuse, so A_y = A sin θ</Equation>
      </section>

      <section className="lesson-section">
        <h2>4. Worked Example: Components</h2>
        <p>A displacement vector has magnitude 10 m and direction 30° above +x. Which component should be larger?</p>
        <p>Because 30° is closer to the horizontal axis than the vertical axis, the horizontal component should be larger.</p>
        <Equation>Δx = 10 cos 30° = 8.7 m</Equation>
        <Equation>Δy = 10 sin 30° = 5.0 m</Equation>
        <p>Physically, the vector represents 8.7 m right and 5.0 m up.</p>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Quick Check 1</p>
        <h2>5. Components of a New Vector</h2>
        <ComponentCalculationCheck />
      </section>

      <section className="lesson-section" id="section-signs">
        <h2>6. Signs of Components</h2>
        <p>Do not memorize quadrant signs blindly. Connect signs to physical direction.</p>
        <ul>
          <li>Right means positive x. Left means negative x.</li>
          <li>Up means positive y. Down means negative y.</li>
        </ul>
        <ComponentSignsExplorer />
      </section>

      <section className="lesson-section" id="section-rebuilding">
        <h2>7. Rebuilding a Vector</h2>
        <p>Sometimes the components are given and the original vector must be reconstructed.</p>
        <RebuildVectorDiagram />
        <Equation>A = √(A_x² + A_y²)</Equation>
        <Equation>tan θ = A_y / A_x</Equation>
        <p>Use inverse tangent carefully. The component signs and the diagram determine the physical quadrant.</p>
        <p>For A_x = +6 m and A_y = +8 m, the magnitude is 10 m and the direction is 53° above +x.</p>
      </section>

      <section className="lesson-section">
        <h2>8. Adding Vectors With Components</h2>
        <p>Add horizontal components together and vertical components together. Then rebuild the resultant vector.</p>
        <Equation>R_x = A_x + B_x</Equation>
        <Equation>R_y = A_y + B_y</Equation>
        <VectorAdditionLab />
      </section>

      <section className="lesson-section" id="section-independent">
        <h2>9. Two Motions at Once</h2>
        <p>A ball rolling off a table has horizontal motion and vertical motion at the same time.</p>
        <div className="concept-callout key-idea">The same object can have different motion behavior in perpendicular directions at the same time.</div>
      </section>

      <section className="lesson-section">
        <h2>10. Projectile Motion</h2>
        <p>A projectile is an object that, after launch, moves under the influence of gravity alone when air resistance is neglected.</p>
        <ProjectileMotionDiagram />
        <p>The velocity is tangent to the path. The acceleration is downward. The projectile is not pushed along the curved path.</p>
      </section>

      <section className="lesson-section">
        <h2>11. Horizontal and Vertical Motion</h2>
        <p>For ideal projectile motion, horizontal acceleration is zero, so horizontal velocity remains constant.</p>
        <Equation>a_x = 0</Equation>
        <p>Vertically, acceleration is downward. If upward is positive:</p>
        <Equation>a_y = -g</Equation>
      </section>

      <section className="lesson-section">
        <h2>12. The Two Directions Share Time</h2>
        <p>Horizontal and vertical motion occur simultaneously. If the projectile has been moving for 2 seconds horizontally, it has also been moving for 2 seconds vertically.</p>
        <div className="concept-callout key-idea">SAME OBJECT → SAME TIME</div>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Interactive 4</p>
        <h2>13. Projectile Motion Explorer</h2>
        <ProjectileMotionExplorer />
      </section>

      <section className="lesson-section">
        <h2>14. Horizontal Launch</h2>
        <p>For a ball rolling off a table, initial vertical velocity is zero but initial horizontal velocity is not zero.</p>
        <Equation>v_y0 = 0</Equation>
        <Equation>v_x0 ≠ 0</Equation>
        <p>The ball moves horizontally at constant velocity while its vertical velocity changes due to gravity.</p>
      </section>

      <section className="lesson-section" id="section-drop-comparison">
        <h2>15. The Drop Comparison</h2>
        <DropComparison />
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Quick Check 2</p>
        <h2>16. Horizontal Speed and Fall Time</h2>
        <Topic15ChoiceCheck
          question={{
            id: "topic15-horizontal-speed",
            prompt: "Two balls are launched horizontally from the same height at the same instant. Ball B has greater horizontal speed. Which statement is correct?",
            choices: ["Ball B stays in the air longer.", "Ball A stays in the air longer.", "They have the same fall time, but Ball B lands farther away.", "They land at the same horizontal range."],
            answer: "They have the same fall time, but Ball B lands farther away.",
            hint: "Compare vertical motion for fall time, then compare horizontal motion for range.",
            explanation: "The vertical motion is identical, so fall time is the same. The faster horizontal launch covers more horizontal distance during that same time.",
          }}
        />
      </section>

      <section className="lesson-section">
        <h2>17. Projectile at the Highest Point</h2>
        <div className="interactive-card">
          <h3>Misconception</h3>
          <p>At the highest point, the projectile&apos;s velocity is zero.</p>
          <h3>Correction</h3>
          <p>No. The vertical velocity is zero momentarily, but horizontal velocity is still nonzero. Acceleration is still downward.</p>
        </div>
      </section>

      <section className="lesson-section">
        <h2>18. Velocity Throughout Flight</h2>
        <ProjectileTimeline />
        <ul>
          <li>v_x remains constant.</li>
          <li>v_y decreases while ascending.</li>
          <li>v_y = 0 at the peak.</li>
          <li>v_y is negative while descending.</li>
          <li>Acceleration remains downward throughout flight.</li>
        </ul>
      </section>

      <section className="lesson-section">
        <h2>19. Representing Projectile Motion</h2>
        <RepresentationTabsStatic />
      </section>

      <section className="lesson-section">
        <h2>20. Student Graph Construction</h2>
        <GraphConstructionActivity />
      </section>

      <section className="lesson-section">
        <h2>21. Projectile Calculations</h2>
        <p>Use a structured process instead of memorizing a single projectile formula.</p>
        <ol>
          <li>Draw a diagram.</li>
          <li>Choose a coordinate system.</li>
          <li>Separate x and y quantities.</li>
          <li>Identify shared time.</li>
          <li>Solve one direction.</li>
          <li>Use shared time in the other direction.</li>
        </ol>
        <p>Example: a ball leaves a 1.25 m table horizontally at 4.0 m/s.</p>
        <Equation>vertical: Δy = -1.25 m, v_y0 = 0, a_y = -9.8 m/s²</Equation>
        <Equation>-1.25 = 0 + 1/2(-9.8)t², so t = 0.51 s</Equation>
        <Equation>horizontal: Δx = v_x t = 4.0(0.51) = 2.0 m</Equation>
      </section>

      <section className="lesson-section">
        <h2>22. Angled Launch</h2>
        <p>For an initial velocity at an angle, first resolve the launch velocity into components.</p>
        <Equation>v_x0 = v_0 cos θ</Equation>
        <Equation>v_y0 = v_0 sin θ</Equation>
        <p>Then analyze horizontal and vertical motion independently. Specialized range formulas are less important than component-based reasoning.</p>
      </section>

      <section className="lesson-section">
        <h2>23. Experimental and AP-Style Reasoning</h2>
        <ExperimentalReasoning />
        <div className="interactive-card">
          <h3>AP-Style Translation</h3>
          <p>For any projectile diagram, be ready to draw velocity components at a point, identify acceleration as downward, select matching graphs, and justify relationships using independent components.</p>
        </div>
        <div className="interactive-card">
          <h3>Symbolic Reasoning</h3>
          <p>For a projectile launched horizontally from height h with horizontal speed v_0:</p>
          <Equation>t = √(2h/g)</Equation>
          <Equation>range = v_0√(2h/g)</Equation>
        </div>
      </section>

      <section className="lesson-section">
        <h2>Common Mistakes</h2>
        <div className="comparison-grid">
          {[
            ["Horizontal velocity decreases because the projectile slows down.", "With negligible air resistance, horizontal acceleration is zero."],
            ["At the highest point velocity is zero.", "Only vertical velocity is zero; horizontal velocity remains."],
            ["Gravity disappears at the top.", "Acceleration due to gravity remains downward."],
            ["A faster horizontal launch takes longer to hit the ground.", "From the same height with the same initial vertical motion, fall time is unchanged."],
            ["The projectile is pushed along its curved path.", "After launch, gravity acts downward; the path comes from horizontal velocity plus vertical acceleration."],
            ["x and y motions occur at different times.", "They are components of the same object's motion and share elapsed time."],
          ].map(([mistake, correction]) => (
            <article className="interactive-card" key={mistake}>
              <h3>Mistake</h3>
              <p>{mistake}</p>
              <h3>Correction</h3>
              <p>{correction}</p>
            </article>
          ))}
        </div>
      </section>

      <Topic15MasteryCheck />

      <section className="lesson-section">
        <h2>Topic 1.5 Summary</h2>
        <ul>
          <li>A two-dimensional vector can be represented with perpendicular x and y components.</li>
          <li>If θ is measured from +x, A_x = A cos θ and A_y = A sin θ.</li>
          <li>Component signs come from physical direction.</li>
          <li>Vector resultants are found by adding components and rebuilding the vector.</li>
          <li>Projectile motion is analyzed by separating horizontal and vertical motion.</li>
          <li>The x and y directions share the same elapsed time.</li>
          <li>With negligible air resistance, a_x = 0 and a_y = -g.</li>
        </ul>
        <div className="lesson-nav">
          <Link className="button secondary" href="/ap-physics/physics-1/kinematics/reference-frames-relative-motion">Previous Lesson: Topic 1.4</Link>
          <Link className="button primary" href="/ap-physics/physics-1/kinematics/review">Next: Unit 1 Review</Link>
        </div>
      </section>
    </div>
  );
}
