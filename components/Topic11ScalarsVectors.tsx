import { PhysicsChildren } from "./PhysicsText";
import {
  ChoicePractice,
  MasteryCheck,
  VectorBuilder,
  VectorExplorer,
  WrittenPractice,
} from "./Topic11Interactions";
import { SvgArrowMarker, SvgVectorArrow } from "./SvgArrowMarker";

const metadata = {
  course: "AP Physics 1",
  unit: "Kinematics",
  topic: "Scalars and Vectors in One Dimension",
  skills: [
    "scalar/vector classification",
    "representation",
    "vector magnitude",
    "one-dimensional vector addition",
    "comparison",
    "physical reasoning",
    "error analysis",
  ],
};

function Equation({ children }: { children: React.ReactNode }) {
  return <div className="equation"><PhysicsChildren>{children}</PhysicsChildren></div>;
}

function MiniTable({
  rows,
}: {
  rows: Array<{ quantity: string; example: string }>;
}) {
  return (
    <div className="lesson-table" role="table" aria-label="Scalar examples">
      <div role="row">
        <strong role="columnheader">Quantity</strong>
        <strong role="columnheader">Example</strong>
      </div>
      {rows.map((row) => (
        <div role="row" key={row.quantity}>
          <span role="cell">{row.quantity}</span>
          <span role="cell">{row.example}</span>
        </div>
      ))}
    </div>
  );
}

function CoordinateAxisDiagram() {
  return (
    <figure className="physics-diagram coordinate-axis-diagram" aria-label="Coordinate axis with right positive and left negative">
      <svg viewBox="0 0 720 150" role="img">
        <defs>
          <SvgArrowMarker id="coordinate-axis-positive" size="axis" />
          <SvgArrowMarker id="coordinate-axis-negative" direction="start" size="axis" />
        </defs>
        <line className="axis-line" x1="72" y1="78" x2="648" y2="78" markerStart="url(#coordinate-axis-negative)" markerEnd="url(#coordinate-axis-positive)" />
        <line className="origin-tick" x1="360" y1="48" x2="360" y2="108" />
        <text x="349" y="134">0</text>
        <text x="112" y="58">-</text>
        <text x="586" y="58">+</text>
        <text x="660" y="62">x</text>
      </svg>
      <figcaption>For this lesson, right is positive (+) and left is negative (-).</figcaption>
    </figure>
  );
}

function VectorPairDiagram() {
  return (
    <figure className="physics-diagram car-vector-diagram" aria-label="Two car velocities on a straight road">
      <div>
        <span className="car-dot">A</span>
        <svg viewBox="0 0 280 70" role="img" aria-label="Car A velocity points right">
          <line className="axis-guide" x1="16" y1="40" x2="264" y2="40" />
          <SvgVectorArrow className="vector-line" x1={112} y1={40} x2={184} y2={40} />
        </svg>
        <strong>4 m/s to the right</strong>
      </div>
      <div>
        <span className="car-dot">B</span>
        <svg viewBox="0 0 280 70" role="img" aria-label="Car B velocity points left">
          <line className="axis-guide" x1="16" y1="40" x2="264" y2="40" />
          <SvgVectorArrow className="vector-line" x1={210} y1={40} x2={58} y2={40} />
        </svg>
        <strong>9 m/s to the left</strong>
      </div>
    </figure>
  );
}

function VectorScaleDiagram() {
  return (
    <figure className="physics-diagram vector-scale-diagram" aria-label="Vector arrows comparing magnitude and direction">
      <div>
        <svg viewBox="0 0 320 92" role="img" aria-label="Vector A is longer than Vector B">
          <text x="18" y="28">A</text>
          <SvgVectorArrow className="vector-line" x1={54} y1={24} x2={288} y2={24} />
          <text x="18" y="68">B</text>
          <SvgVectorArrow className="vector-line secondary-vector" x1={54} y1={64} x2={168} y2={64} />
        </svg>
        <p>Vector A has greater magnitude because its arrow is longer.</p>
      </div>
      <div>
        <svg viewBox="0 0 320 92" role="img" aria-label="Equal length arrows point in opposite directions">
          <text x="18" y="28">A</text>
          <SvgVectorArrow className="vector-line" x1={76} y1={24} x2={244} y2={24} />
          <text x="18" y="68">B</text>
          <SvgVectorArrow className="vector-line secondary-vector" x1={244} y1={64} x2={76} y2={64} />
        </svg>
        <p>These vectors have equal magnitude, but they are different because they point in opposite directions.</p>
      </div>
    </figure>
  );
}

function AdditionDiagram() {
  return (
    <figure className="physics-diagram addition-diagram" aria-label="Two rightward displacements add to ten meters">
      <svg viewBox="0 0 720 180" role="img">
        <defs>
          <SvgArrowMarker id="addition-axis-arrow" size="axis" />
        </defs>
        <line className="axis-line" x1="72" y1="128" x2="648" y2="128" markerEnd="url(#addition-axis-arrow)" />
        <line className="origin-tick" x1="120" y1="104" x2="120" y2="148" />
        <text x="110" y="168">0</text>
        <text x="654" y="116">+x</text>
        <SvgVectorArrow className="vector-line secondary-vector" x1={120} y1={58} x2={410} y2={58} />
        <text x="232" y="38">+6 m</text>
        <SvgVectorArrow className="vector-line" x1={410} y1={88} x2={604} y2={88} />
        <text x="482" y="74">+4 m</text>
        <SvgVectorArrow className="result-vector" x1={120} y1={118} x2={604} y2={118} />
        <text x="332" y="108">total: +10 m</text>
      </svg>
      <figcaption>A 6 m displacement right followed by 4 m more right gives a total displacement of 10 m right.</figcaption>
    </figure>
  );
}

function TranslationDiagram() {
  return (
    <figure className="physics-diagram addition-diagram" aria-label="A positive ten meter vector and negative four meter vector produce positive six meters">
      <svg viewBox="0 0 720 170" role="img">
        <defs>
          <SvgArrowMarker id="translation-axis-arrow" size="axis" />
        </defs>
        <line className="axis-line" x1="72" y1="126" x2="648" y2="126" markerEnd="url(#translation-axis-arrow)" />
        <line className="origin-tick" x1="120" y1="104" x2="120" y2="148" />
        <text x="110" y="166">0</text>
        <text x="654" y="116">+x</text>
        <SvgVectorArrow className="vector-line" x1={120} y1={54} x2={604} y2={54} />
        <text x="336" y="34">A = +10 m</text>
        <SvgVectorArrow className="vector-line secondary-vector" x1={604} y1={86} x2={410} y2={86} />
        <text x="480" y="76">B = -4 m</text>
        <SvgVectorArrow className="result-vector" x1={120} y1={116} x2={410} y2={116} />
        <text x="226" y="106">R = +6 m</text>
      </svg>
    </figure>
  );
}

export function Topic11ScalarsVectors() {
  return (
    <div className="topic-module">
      <section className="lesson-section">
        <div className="topic-meta">
          <span>Estimated time: 35-45 minutes</span>
          <span>Difficulty: Introductory</span>
          <span>Skills: Creating representations, comparing quantities, making claims, justifying claims</span>
        </div>
        <p className="eyebrow">What You&apos;ll Learn</p>
        <h2>What You&apos;ll Learn</h2>
        <ul>
          <li>Distinguish between scalar and vector quantities.</li>
          <li>Describe a vector using both magnitude and direction.</li>
          <li>Determine the magnitude of a vector.</li>
          <li>Represent vectors using proportional arrows.</li>
          <li>Choose and use a coordinate system for one-dimensional motion.</li>
          <li>Interpret positive and negative vector components.</li>
          <li>Add vectors in one dimension.</li>
          <li>Compare vectors in different physical situations.</li>
          <li>Translate between verbal, visual, and mathematical representations of vectors.</li>
          <li>Justify conclusions using vector representations and physical reasoning.</li>
        </ul>
      </section>

      <section className="lesson-section">
        <h2>1. Scalars</h2>
        <p>Physics is built around physical quantities: things that can be measured or calculated.</p>
        <p>Some physical quantities can be completely described using only a number and a unit.</p>
        <p>Suppose a runner travels:</p>
        <Equation>50 m</Equation>
        <p>
          This tells us how much ground the runner covered. If we are interested
          in distance, we do not need to know which direction the runner traveled.
        </p>
        <p>A physical quantity that is completely described by its magnitude is called a scalar.</p>
        <div className="concept-callout">Scalar = magnitude only</div>
        <p>Magnitude refers to the size or amount of a quantity.</p>
        <MiniTable
          rows={[
            { quantity: "Distance", example: "20 m" },
            { quantity: "Speed", example: "12 m/s" },
            { quantity: "Time", example: "4 s" },
            { quantity: "Mass", example: "3 kg" },
            { quantity: "Energy", example: "50 J" },
            { quantity: "Temperature", example: "25°C" },
          ]}
        />
        <p>A scalar does not require a direction.</p>
        <blockquote>The car&apos;s speed is 15 m/s.</blockquote>
        <p>
          You have enough information to know its speed. You do not need to know
          whether the car is moving left, right, north, or south.
        </p>
      </section>

      <section className="lesson-section">
        <h2>2. Vectors</h2>
        <blockquote>A student moved 20 meters.</blockquote>
        <p>Can you determine where the student ended up relative to where they started? No.</p>
        <p>The student could have moved 20 m to the right, 20 m to the left, or traveled along some path and ended somewhere else entirely.</p>
        <blockquote>A student moved 20 meters to the right.</blockquote>
        <p>You now have two pieces of information.</p>
        <h3>Magnitude</h3>
        <Equation>20 m</Equation>
        <h3>Direction</h3>
        <p>Right.</p>
        <p>A physical quantity that requires both magnitude and direction is called a vector.</p>
        <div className="concept-callout">Vector = magnitude + direction</div>
        <p>Important vector quantities that you will encounter throughout AP Physics include position, displacement, velocity, acceleration, force, and momentum.</p>
        <p>The distinction between scalars and vectors will become extremely important as the course progresses.</p>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Quick Check 1</p>
        <h2>Classify each quantity as a scalar or vector.</h2>
        <ChoicePractice
          question={{
            id: "quick-check-1a",
            prompt: "A. 5 s",
            choices: ["Scalar", "Vector"],
            answer: "Scalar",
            explanation: "Time has magnitude but no direction.",
            hint: "Ask whether the quantity gives a direction. A time value only tells how long something lasts.",
            skill: "scalar/vector classification",
          }}
        />
        <ChoicePractice
          question={{
            id: "quick-check-1b",
            prompt: "B. 12 m/s east",
            choices: ["Scalar", "Vector"],
            answer: "Vector",
            explanation: "The quantity has a magnitude of 12 m/s and a direction of east.",
            hint: "Look for two ingredients: a size and a direction.",
            skill: "scalar/vector classification",
          }}
        />
        <ChoicePractice
          question={{
            id: "quick-check-1c",
            prompt: "C. 80 kg",
            choices: ["Scalar", "Vector"],
            answer: "Scalar",
            explanation: "Mass has magnitude but no direction.",
            hint: "Mass tells how much matter there is. It does not point left, right, up, or down.",
            skill: "scalar/vector classification",
          }}
        />
        <ChoicePractice
          question={{
            id: "quick-check-1d",
            prompt: "D. 4 m/s^2 downward",
            choices: ["Scalar", "Vector"],
            answer: "Vector",
            explanation: "The quantity has both magnitude and direction.",
            hint: "The word downward is direction information.",
            skill: "scalar/vector classification",
          }}
        />
        <div className="concept-callout">
          Units alone do not tell you whether something is a scalar or vector.
          For example, 12 m/s can represent speed, which is a scalar. But 12 m/s
          east can represent velocity, which is a vector.
        </div>
      </section>

      <section className="lesson-section">
        <h2>3. Representing Vectors</h2>
        <p>Vectors can be represented visually using arrows. Two features of the arrow communicate information.</p>
        <h3>Arrow length means magnitude</h3>
        <p>A longer arrow represents a vector with a greater magnitude when the vectors are drawn using the same scale.</p>
        <h3>Arrowhead means direction</h3>
        <p>The arrowhead shows the direction in which the vector points.</p>
        <VectorScaleDiagram />
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Vector Explorer</p>
        <h2>Vector Explorer</h2>
        <p>
          Adjust magnitude and direction. Observe how the vector arrow and
          signed component change. Magnitude 6 to the left has a component of
          -6. Changing direction to right gives +6. The magnitude remains 6.
          Only the direction changes.
        </p>
        <VectorExplorer />
      </section>

      <section className="lesson-section">
        <h2>4. Choosing a Coordinate System</h2>
        <p>When motion occurs along a straight line, we can describe it using a one-dimensional coordinate axis.</p>
        <CoordinateAxisDiagram />
        <p>For this lesson, we will use this convention:</p>
        <Equation>right = +</Equation>
        <Equation>left = -</Equation>
        <p>Under this coordinate system, +7 m represents a vector pointing 7 m to the right.</p>
        <p>Meanwhile, -7 m represents a vector pointing 7 m to the left.</p>
      </section>

      <section className="lesson-section">
        <h2>5. Does a Negative Sign Mean &quot;Less&quot;?</h2>
        <p>No. For a vector, a negative sign can tell us which direction the vector points. It does not automatically mean that the vector has a smaller size.</p>
        <p>Imagine two cars traveling on a straight road. We define right as the positive direction.</p>
        <VectorPairDiagram />
        <p>Because right is positive:</p>
        <Equation>Car A&apos;s velocity = +4 m/s</Equation>
        <p>Because left is negative:</p>
        <Equation>Car B&apos;s velocity = -9 m/s</Equation>
        <p>But Car B is still moving faster.</p>
        <p>Its speed is 9 m/s, while Car A&apos;s speed is 4 m/s.</p>
        <p><strong>The sign tells us direction. The size tells us how fast the object is moving.</strong></p>
        <div className="concept-callout key-idea">
          <strong>KEY IDEA</strong>
          <span>A negative velocity does not mean a smaller speed. The negative sign indicates direction according to the coordinate system.</span>
        </div>
      </section>

      <section className="lesson-section">
        <h2>6. Magnitude</h2>
        <p>The <strong>magnitude</strong> of a vector tells us its size without considering its direction.</p>
        <p>Suppose a car travels:</p>
        <Equation>18 m/s to the left</Equation>
        <p>With right defined as positive, its velocity can be written:</p>
        <Equation>Velocity = -18 m/s</Equation>
        <p>But the magnitude of its velocity is simply:</p>
        <Equation>Magnitude of velocity = 18 m/s</Equation>
        <p>The negative sign tells us that the car is traveling left.</p>
        <p>The number 18 tells us the magnitude of the velocity.</p>
        <div className="concept-callout">
          <strong>Remember:</strong> Magnitude describes size, so we report the
          magnitude as a nonnegative value.
        </div>
      </section>

      <section className="lesson-section">
        <h2>7. Vector Notation</h2>
        <p>Physicists need a way to distinguish vector quantities from scalar quantities in equations.</p>
        <p>One common method is to place a small arrow above the symbol for a vector.</p>
        <Equation>
          velocity vector ={" "}
          <math aria-label="v with a vector arrow above it">
            <mover>
              <mi>v</mi>
              <mo>→</mo>
            </mover>
          </math>
        </Equation>
        <p>The arrow above the symbol tells us that the quantity includes both magnitude and direction.</p>
        <div className="comparison-list">
          <p>
            <math aria-label="velocity vector">
              <mover>
                <mi>v</mi>
                <mo>→</mo>
              </mover>
            </math>{" "}
            → velocity vector (magnitude + direction)
          </p>
          <p><strong>speed</strong> → scalar (magnitude only)</p>
        </div>
        <p>For now, you only need to recognize this notation. We will use it more deeply after the core idea of vectors feels familiar.</p>
      </section>

      <section className="lesson-section">
        <h2>8. A New Symbol: Δ</h2>
        <p>
          In physics, you will often see the Greek letter <strong>Δ</strong>,
          pronounced <strong>&quot;delta.&quot;</strong>
        </p>
        <p>Delta means:</p>
        <Equation>Δ = &quot;change in&quot;</Equation>
        <p>For example, Δx means:</p>
        <Equation>
          Δx = change in position = displacement
        </Equation>
        <p>We often call a change in position <strong>displacement</strong>.</p>
        <p>So if an object&apos;s position changes by 6 meters to the right:</p>
        <Equation>
          Δx = +6 m
        </Equation>
        <div className="concept-callout">
          <strong>Δ (delta)</strong> — pronounced &quot;DEL-tuh&quot;
        </div>
      </section>

      <section className="lesson-section">
        <h2>9. Adding Vectors in One Dimension</h2>
        <p>A student walks 6 m to the right, then another 4 m to the right.</p>
        <AdditionDiagram />
        <p>First displacement:</p>
        <Equation>Δx<sub>1</sub> = +6 m</Equation>
        <p>Second displacement:</p>
        <Equation>Δx<sub>2</sub> = +4 m</Equation>
        <p>Total displacement = first displacement + second displacement</p>
        <Equation>Δx<sub>total</sub> = (+6 m) + (+4 m)</Equation>
        <Equation>Δx<sub>total</sub> = +10 m</Equation>
        <p><strong>The student ends 10 m to the right of where they started.</strong></p>
      </section>

      <section className="lesson-section">
        <h2>10. Adding Vectors in Opposite Directions</h2>
        <Equation>Δx<sub>1</sub> = +8 m</Equation>
        <Equation>Δx<sub>2</sub> = -3 m</Equation>
        <Equation>Δx<sub>total</sub> = 8 + (-3) = +5 m</Equation>
        <p>The resultant has magnitude 5 m and positive direction. If right was defined as positive, the final result is 5 m right.</p>
      </section>

      <section className="lesson-section">
        <h2>11. Worked Example — Build the Representation First</h2>
        <p>An object undergoes three successive displacements: 4 m right, 7 m left, and 5 m right. Determine the resultant displacement.</p>
        <h3>Step 1 — Establish a coordinate system</h3>
        <Equation>right = +</Equation>
        <Equation>left = -</Equation>
        <h3>Step 2 — Represent each displacement mathematically</h3>
        <Equation>Δx<sub>1</sub> = +4 m</Equation>
        <Equation>Δx<sub>2</sub> = -7 m</Equation>
        <Equation>Δx<sub>3</sub> = +5 m</Equation>
        <h3>Step 3 — Add the vectors</h3>
        <Equation>Δx<sub>total</sub> = Δx<sub>1</sub> + Δx<sub>2</sub> + Δx<sub>3</sub> = 4 - 7 + 5 = +2 m</Equation>
        <h3>Step 4 — Interpret the result</h3>
        <p>The positive sign tells us the resultant points to the right. Therefore, the resultant displacement is 2 m right.</p>
        <div className="concept-callout">Do not stop at +2. The sign has physical meaning and should be interpreted.</div>
      </section>

      <section className="lesson-section">
        <h2>12. Subtracting Vectors</h2>
        <p>Subtracting a vector is equivalent to adding the opposite vector.</p>
        <Equation>A = +8</Equation>
        <Equation>B = +3</Equation>
        <Equation>A - B = A + (-B)</Equation>
        <Equation>8 + (-3) = 5</Equation>
        <p>This idea will become especially important later when you calculate quantities such as change in velocity.</p>
      </section>

      <section className="lesson-section">
        <h2>13. Translation Between Representations</h2>
        <p>AP Physics frequently requires you to move between different representations of the same physical situation.</p>
        <TranslationDiagram />
        <Equation>A = +10 m</Equation>
        <Equation>B = -4 m</Equation>
        <h3>Visual representation</h3>
        <p>One long arrow points in the positive direction. One shorter arrow points in the negative direction.</p>
        <h3>Mathematical representation</h3>
        <Equation>R = A + B = 10 + (-4) = +6 m</Equation>
        <h3>Verbal representation</h3>
        <p>The resultant vector has a magnitude of 6 meters and points in the positive direction.</p>
        <p>We moved through diagram to equation to physical interpretation.</p>
      </section>

      <section className="lesson-section">
        <h2>14. Common Mistakes</h2>
        <div className="mistake-grid">
          <article>
            <h3>Mistake 1 — &quot;Negative means smaller.&quot;</h3>
            <p>For Object A traveling 12 m/s left and Object B traveling 5 m/s right, Object A has the greater speed. The negative sign indicates direction.</p>
          </article>
          <article>
            <h3>Mistake 2 — Giving a vector a negative magnitude</h3>
            <p>If v = -8 m/s, the velocity component is negative, but the magnitude is 8 m/s.</p>
          </article>
          <article>
            <h3>Mistake 3 — Forgetting this lesson&apos;s sign convention</h3>
            <p>In this topic, right is positive and left is negative. Use that convention consistently in every representation.</p>
          </article>
          <article>
            <h3>Mistake 4 — Assuming equal magnitude means equal vectors</h3>
            <p>A = +5 N and B = -5 N have equal magnitudes, but they are different vectors because they point in opposite directions.</p>
          </article>
          <article>
            <h3>Mistake 5 — Ignoring signs when adding vectors</h3>
            <p>A = +10 m and B = -4 m gives A + B = +6 m, not 14 m.</p>
          </article>
        </div>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">AP-Style Practice</p>
        <h2>15. AP-Style Practice</h2>
        <ChoicePractice
          question={{
            id: "mcq-1",
            prompt: "Two vectors are drawn using the same scale. Vector A points right and has twice the length of Vector B, which points left. If right is positive and B = -3 m, what is A?",
            choices: ["-6 m", "-1.5 m", "+1.5 m", "+6 m"],
            answer: "+6 m",
            explanation: "Vector A has twice the magnitude of Vector B, so its magnitude is 6 m. Because A points right and right is positive, A = +6 m.",
            hint: "First use the arrow length to find A's magnitude. Then use the direction to decide the sign.",
          }}
        />
        <ChoicePractice
          question={{
            id: "mcq-2",
            prompt: "Object X has velocity vX = -12 m/s. Object Y has velocity vY = +8 m/s. Which statement is correct?",
            choices: [
              "Y has the greater speed because its velocity is positive.",
              "X has the greater speed because its velocity has the greater magnitude.",
              "X and Y have equal speeds because both objects are moving.",
              "Their speeds cannot be compared without knowing their positions.",
            ],
            answer: "X has the greater speed because its velocity has the greater magnitude.",
            explanation: "Speed corresponds to the magnitude of velocity. Object X has speed 12 m/s, and Object Y has speed 8 m/s, so Object X has the greater speed.",
            hint: "Compare the sizes of the velocities without treating the sign as part of the speed.",
          }}
        />
        <ChoicePractice
          question={{
            id: "mcq-3",
            prompt: "Right is positive. A = +5 m, B = -8 m, and C = +1 m. What is A + B + C?",
            choices: ["-14 m", "-2 m", "+2 m", "+14 m"],
            answer: "-2 m",
            explanation: "5 + (-8) + 1 = 5 - 8 + 1 = -2 m. The resultant has magnitude 2 m and points in the negative direction.",
            hint: "Keep the signs with each vector component before adding.",
          }}
        />
        <ChoicePractice
          question={{
            id: "mcq-4",
            prompt: "Right is positive. An object undergoes 5 m right followed by 9 m left. What is the resultant displacement component?",
            choices: ["-14 m", "-4 m", "+4 m", "+14 m"],
            answer: "-4 m",
            explanation: "The first displacement is +5 m and the second is -9 m. The total is -4 m, so the resultant points left.",
            hint: "Translate each part first: right is positive and left is negative.",
          }}
        />
      </section>

      <section className="lesson-section">
        <h2>16. AP Reasoning Practice</h2>
        <p>Two students discuss Object A traveling 15 m/s left and Object B traveling 10 m/s right.</p>
        <blockquote>Student 1 says: Object B is moving faster because +10 is greater than -15.</blockquote>
        <blockquote>Student 2 says: Object A is moving faster.</blockquote>
        <WrittenPractice
          question={{
            id: "reasoning-practice",
            prompt: "Make a claim about which student is correct. Justify your answer using magnitude and direction.",
            modelAnswer:
              "Student 2 is correct. The speed of an object corresponds to the magnitude of its velocity. Object A has speed 15 m/s, and Object B has speed 10 m/s. Therefore Object A has the greater speed. The negative sign for Object A indicates direction, not a smaller speed.",
          }}
        />
      </section>

      <section className="lesson-section">
        <h2>17. Create a Representation</h2>
        <VectorBuilder />
      </section>

      <section className="lesson-section">
        <h2>18. Error Analysis</h2>
        <p>A student adds A = +7 m and B = -5 m. The student writes R = 7 + 5 = 12 m.</p>
        <WrittenPractice
          question={{
            id: "error-analysis",
            prompt: "Identify the student's mistake and determine the correct resultant.",
            modelAnswer:
              "The student ignored the direction represented by the negative sign on Vector B. The correct calculation is R = 7 + (-5), so R = +2 m. The resultant has magnitude 2 m and points in the positive direction.",
          }}
        />
      </section>

      <section className="lesson-section">
        <h2>19. Challenge Problem</h2>
        <ChoicePractice
          question={{
            id: "challenge",
            prompt: "Three vectors satisfy A + B + C = 0. Given A = +8 m and B = -3 m, determine C.",
            choices: ["+11 m", "+5 m", "-5 m", "-11 m"],
            answer: "-5 m",
            explanation:
              "8 + (-3) + C = 0, so 5 + C = 0 and C = -5 m. Vector C must have the same magnitude as +5 m in the opposite direction.",
          }}
        />
      </section>

      <MasteryCheck />

      <section className="lesson-section">
        <h2>Topic Summary</h2>
        <ul>
          <li>A scalar has magnitude only.</li>
          <li>A vector has both magnitude and direction.</li>
          <li>Vector arrows communicate magnitude through length and direction through orientation.</li>
          <li>A vector&apos;s magnitude is nonnegative.</li>
          <li>Positive and negative vector components can represent opposite directions.</li>
          <li>In this topic, right is positive and left is negative.</li>
          <li>A coordinate system must be used consistently once it has been defined.</li>
          <li>One-dimensional vectors can be added algebraically using signed components.</li>
          <li>Subtracting a vector is equivalent to adding its opposite.</li>
          <li>Two vectors can have equal magnitudes while pointing in different directions.</li>
          <li>A negative vector component does not automatically mean an object is moving slowly or slowing down.</li>
          <li>AP Physics requires translation between verbal, visual, and mathematical representations.</li>
        </ul>
      </section>

      <section className="lesson-section">
        <h2>Before You Continue</h2>
        <ol>
          <li>What distinguishes a scalar from a vector?</li>
          <li>What does the magnitude of a vector represent?</li>
          <li>What information does the sign of a one-dimensional vector component provide?</li>
          <li>How do you add one-dimensional vectors pointing in opposite directions?</li>
          <li>Can two vectors have equal magnitudes but be different vectors?</li>
          <li>Why does a negative velocity not necessarily mean an object is moving slower?</li>
          <li>How can the same vector be represented verbally, visually, and mathematically?</li>
        </ol>
        <p>If any of these are unclear, review the relevant section before moving on.</p>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Next Topic</p>
        <h2>Topic 1.2 — Displacement, Velocity, and Acceleration</h2>
        <p>
          In the next topic, you will use vectors to begin describing how
          objects actually move. You will learn how position changes with time,
          how velocity describes that change, and how acceleration describes
          changes in velocity.
        </p>
      </section>
    </div>
  );
}

export const topic11Metadata = metadata;
