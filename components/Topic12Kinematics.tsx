import { PhysicsChildren } from "./PhysicsText";
import Link from "next/link";

import { SvgArrowMarker, SvgVectorArrow } from "./SvgArrowMarker";
import { ChoicePractice, WrittenPractice } from "./Topic11Interactions";
import {
  DistanceDisplacementExplorer,
  MotionGraphSketch,
  PositionExplorer,
  ReturningStartCheck,
  SpeedingExplorer,
  Topic12MasteryCheck,
} from "./Topic12Interactions";

const metadata = {
  course: "AP Physics 1",
  unit: "Kinematics",
  topic: "Displacement, Velocity, and Acceleration",
};

function Equation({ children }: { children: React.ReactNode }) {
  return <div className="equation"><PhysicsChildren>{children}</PhysicsChildren></div>;
}

function AxisExample({
  start,
  finish,
  current,
  label,
}: {
  start?: number;
  finish?: number;
  current?: number;
  label: string;
}) {
  const toX = (value: number) => 360 + value * 27;
  const ticks = Array.from({ length: 11 }, (_, index) => -10 + index * 2);
  const markerId = label.replace(/[^a-zA-Z0-9_-]/g, "-");
  return (
    <figure className="physics-diagram motion-axis" aria-label={label}>
      <svg viewBox="0 0 720 150" role="img">
        <defs>
          <SvgArrowMarker id={`topic12-axis-${markerId}`} size="axis" />
          <SvgArrowMarker id={`topic12-axis-start-${markerId}`} direction="start" size="axis" />
        </defs>
        <line className="axis-line" x1="70" y1="96" x2="650" y2="96" markerStart={`url(#topic12-axis-start-${markerId})`} markerEnd={`url(#topic12-axis-${markerId})`} />
        {ticks.map((tick) => (
          <g key={tick}>
            <line className="origin-tick" x1={toX(tick)} y1="84" x2={toX(tick)} y2="108" />
            <text x={toX(tick) - 12} y="132">{tick}</text>
          </g>
        ))}
        {start !== undefined && finish !== undefined ? (
          <SvgVectorArrow className="result-vector" x1={toX(start)} y1={64} x2={toX(finish)} y2={64} />
        ) : null}
        {start !== undefined ? <circle className="start-dot" cx={toX(start)} cy="96" r="8" /> : null}
        {finish !== undefined ? <circle className="finish-dot" cx={toX(finish)} cy="96" r="8" /> : null}
        {current !== undefined ? (
          <g className="car-marker">
            <rect x={toX(current) - 20} y="39" width="40" height="18" rx="7" />
            <circle cx={toX(current) - 11} cy="60" r="4" />
            <circle cx={toX(current) + 11} cy="60" r="4" />
          </g>
        ) : null}
      </svg>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function TripDiagram() {
  return (
    <figure className="physics-diagram trip-diagram" aria-label="A student walks six meters right and two meters left">
      <svg viewBox="0 0 720 170" role="img">
        <line className="axis-line" x1="80" y1="118" x2="650" y2="118" />
        <line className="origin-tick" x1="160" y1="95" x2="160" y2="138" />
        <text x="150" y="158">0</text>
        <SvgVectorArrow className="vector-line" x1={160} y1={58} x2={520} y2={58} />
        <text x="310" y="38">6 m right</text>
        <SvgVectorArrow className="secondary-vector vector-line" x1={520} y1={86} x2={400} y2={86} />
        <text x="425" y="110">2 m left</text>
        <circle className="start-dot" cx="160" cy="118" r="8" />
        <circle className="finish-dot" cx="400" cy="118" r="8" />
      </svg>
      <figcaption>Distance = 8 m. Displacement = +4 m.</figcaption>
    </figure>
  );
}

function Timeline() {
  return (
    <figure className="physics-diagram timeline-diagram" aria-label="Timeline from two seconds to seven seconds">
      <svg viewBox="0 0 620 130" role="img">
        <line className="axis-line" x1="80" y1="70" x2="540" y2="70" />
        {[2, 3, 4, 5, 6, 7].map((time) => (
          <g key={time}>
            <line className="origin-tick" x1={80 + (time - 2) * 92} y1="54" x2={80 + (time - 2) * 92} y2="86" />
            <text x={70 + (time - 2) * 92} y="112">{time}s</text>
          </g>
        ))}
        <line className="result-vector" x1="80" y1="38" x2="540" y2="38" />
        <text x="268" y="28">Δt = 5 s</text>
      </svg>
    </figure>
  );
}

function VelocityTimeline() {
  return (
    <figure className="physics-diagram velocity-timeline" aria-label="Velocity increases by two meters per second every second">
      <div className="timeline-cards">
        {[
          ["0 s", "4 m/s"],
          ["1 s", "6 m/s"],
          ["2 s", "8 m/s"],
          ["3 s", "10 m/s"],
        ].map(([time, velocity]) => (
          <article key={time}>
            <strong>{time}</strong>
            <span>{velocity}</span>
          </article>
        ))}
      </div>
    </figure>
  );
}

function MotionComparison() {
  const rows = [
    ["v positive, a positive", "speeding up"],
    ["v negative, a negative", "speeding up"],
    ["v positive, a negative", "slowing down"],
    ["v negative, a positive", "slowing down"],
  ];
  return (
    <div className="lesson-table" role="table" aria-label="Velocity and acceleration sign relationships">
      <div role="row"><strong role="columnheader">Signs</strong><strong role="columnheader">Result</strong></div>
      {rows.map(([signs, result]) => (
        <div role="row" key={signs}><span role="cell">{signs}</span><span role="cell">{result}</span></div>
      ))}
    </div>
  );
}

function EquipmentIcons() {
  return (
    <div className="equipment-grid" aria-label="Available lab equipment">
      {["meterstick", "stopwatch", "tape", "toy car"].map((item) => (
        <article key={item}><span aria-hidden="true" /> <strong>{item}</strong></article>
      ))}
    </div>
  );
}

export function Topic12Kinematics() {
  return (
    <div className="topic-module" data-topic={metadata.topic}>
      <section className="lesson-section">
        <div className="topic-meta">
          <span>Estimated time: 55-70 minutes</span>
          <span>Difficulty: Foundational</span>
          <span>Skills: Calculations, comparing quantities, representations, reasoning, justifying claims</span>
        </div>
        <p className="eyebrow">What You&apos;ll Learn</p>
        <h2>What You&apos;ll Learn</h2>
        <ul>
          <li>Describe an object&apos;s position relative to an origin.</li>
          <li>Calculate displacement from initial and final position.</li>
          <li>Distinguish between distance and displacement.</li>
          <li>Calculate average velocity and average acceleration.</li>
          <li>Determine whether an object is speeding up or slowing down using velocity and acceleration.</li>
          <li>Translate between physical descriptions, visual representations, and mathematical representations.</li>
          <li>Justify claims about an object&apos;s motion.</li>
        </ul>
      </section>

      <section className="lesson-section" id="section-position">
        <h2>1. Where Is the Object?</h2>
        <AxisExample current={4} label="The car is located 4 meters to the right of the origin." />
        <p><strong>Position:</strong> 4 m to the right of the origin.</p>
        <h3>Position</h3>
        <p>Position tells us where an object is relative to a chosen origin.</p>
        <p>We use <strong>x</strong> to represent position along the x-axis.</p>
        <Equation>x = +4 m</Equation>
        <p>The positive sign tells us the car is on the positive side of the origin.</p>
        <AxisExample current={-3} label="The car is located 3 meters left of the origin." />
        <Equation>x = -3 m</Equation>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Interactive 1</p>
        <h2>Position Explorer</h2>
        <PositionExplorer />
      </section>

      <section className="lesson-section">
        <h2>2. Starting and Ending Position</h2>
        <AxisExample start={2} finish={9} label="A car starts at +2 meters and finishes at +9 meters." />
        <p>The car started at 2 m. Physicists call this the <strong>initial position</strong>.</p>
        <Equation>x<sub>i</sub> = initial position</Equation>
        <p>The small <strong>i</strong> means initial.</p>
        <p>The car ended at 9 m. This is the <strong>final position</strong>.</p>
        <Equation>x<sub>f</sub> = final position</Equation>
        <div className="concept-callout"><strong>x<sub>i</sub></strong> → initial position<br /><strong>x<sub>f</sub></strong> → final position</div>
      </section>

      <section className="lesson-section">
        <h2>3. Remember Δ?</h2>
        <div className="concept-callout"><strong>Δ</strong> is the Greek letter delta. It means <strong>&quot;change in&quot;</strong>.</div>
        <Equation>Δx = change in position</Equation>
        <h3>Displacement</h3>
        <p>The change in an object&apos;s position has a special name: <strong>displacement</strong>.</p>
        <Equation>Displacement = change in position</Equation>
      </section>

      <section className="lesson-section" id="section-displacement">
        <h2>4. How Do We Calculate a Change?</h2>
        <AxisExample start={2} finish={9} label="The car's position changes from +2 meters to +9 meters." />
        <p>How much did the car&apos;s position change?</p>
        <h3>Change = final - initial</h3>
        <Equation>Δx = x<sub>f</sub> - x<sub>i</sub></Equation>
        <Equation>Δx = 9 m - 2 m</Equation>
        <Equation>Δx = +7 m</Equation>
        <p><strong>The car&apos;s displacement is 7 m to the right.</strong></p>
        <div className="concept-callout key-idea">Displacement does not tell us the entire path an object traveled. It tells us how its final position differs from its initial position.</div>
      </section>

      <section className="lesson-section">
        <h2>5. Crossing the Origin</h2>
        <AxisExample start={-4} finish={3} label="A ball begins at -4 meters and ends at +3 meters." />
        <Equation>Δx = x<sub>f</sub> - x<sub>i</sub></Equation>
        <Equation>Δx = 3 m - (-4 m)</Equation>
        <Equation>Δx = +7 m</Equation>
        <p>The positive displacement means the ball&apos;s final position is 7 meters in the positive direction from where it started.</p>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Quick Check 1</p>
        <h2>Displacement</h2>
        <ChoicePractice question={{ id: "topic12-qc-displacement", prompt: "A cart starts at xi = +6 m and finishes at xf = -2 m. What is its displacement?", choices: ["+8 m", "+4 m", "-4 m", "-8 m"], answer: "-8 m", hint: "Remember: displacement is final position minus initial position.", explanation: "Δx = -2 m - (+6 m) = -8 m. The cart's displacement is 8 meters in the negative direction." }} />
      </section>

      <section className="lesson-section" id="section-distance">
        <h2>6. Distance vs. Displacement</h2>
        <TripDiagram />
        <p>How much ground did the student actually cover?</p>
        <Equation>6 m + 2 m = 8 m</Equation>
        <h3>Distance</h3>
        <p>Distance measures the total length of the path traveled. Distance is a scalar.</p>
        <h3>Displacement</h3>
        <p>Displacement measures the change between initial and final position. The student finishes 4 m to the right.</p>
        <div className="comparison-grid">
          <article><h3>Distance</h3><ul><li>total path traveled</li><li>scalar</li><li>no direction</li></ul></article>
          <article><h3>Displacement</h3><ul><li>change in position</li><li>vector</li><li>includes direction</li></ul></article>
        </div>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Interactive 2</p>
        <h2>Distance vs. Displacement Explorer</h2>
        <DistanceDisplacementExplorer />
      </section>

      <section className="lesson-section">
        <h2>Concept Check — Returning to the Start</h2>
        <p>A runner completes one full 400 m lap and finishes exactly where they started.</p>
        <ReturningStartCheck />
      </section>

      <section className="lesson-section">
        <h2>7. Time Intervals</h2>
        <Timeline />
        <p>A cart begins moving at 2 s and the observation ends at 7 s. How much time passed?</p>
        <Equation>Δt = t<sub>f</sub> - t<sub>i</sub></Equation>
        <Equation>Δt = 7 s - 2 s = 5 s</Equation>
        <p>Δt means <strong>elapsed time</strong>, or the time interval.</p>
        <div className="concept-callout"><strong>t<sub>i</sub></strong> → initial time<br /><strong>t<sub>f</sub></strong> → final time<br /><strong>Δt</strong> → elapsed time</div>
      </section>

      <section className="lesson-section">
        <h2>8. Why Displacement Is Not Enough</h2>
        <p>Two cars both travel +100 m. Car A takes 5 s. Car B takes 20 s.</p>
        <p>Did the cars move in the same way? No. Car A changed its position much faster.</p>
      </section>

      <section className="lesson-section" id="section-velocity">
        <h2>9. Average Velocity</h2>
        <p>Average velocity tells us how quickly an object&apos;s position changes over an interval of time, including the direction of that change.</p>
        <Equation>average velocity = displacement ÷ elapsed time</Equation>
        <Equation>v<sub>avg</sub> = Δx / Δt</Equation>
        <p><strong>avg</strong> is an abbreviation for <strong>average</strong>.</p>
        <div className="concept-callout"><strong>v<sub>avg</sub></strong> → average velocity<br /><strong>Δx</strong> → displacement<br /><strong>Δt</strong> → elapsed time</div>
        <h3>Worked Example — Average Velocity</h3>
        <AxisExample start={1} finish={7} label="A cyclist moves from 10 meters to 70 meters during 12 seconds." />
        <Equation>Δx = 70 m - 10 m = 60 m</Equation>
        <Equation>v<sub>avg</sub> = 60 m / 12 s</Equation>
        <Equation>v<sub>avg</sub> = +5 m/s</Equation>
        <p><strong>The cyclist&apos;s average velocity is 5 m/s in the positive direction.</strong></p>
      </section>

      <section className="lesson-section">
        <h2>10. What Does Average Actually Mean?</h2>
        <p>An average velocity of 5 m/s does not necessarily mean the cyclist traveled exactly 5 m/s during every moment.</p>
        <VelocityTimeline />
        <p>Average velocity describes the motion over an entire time interval. It does not tell us the velocity at every individual instant.</p>
        <div className="concept-callout">Later in kinematics, you will learn how physicists describe motion at a specific instant.</div>
      </section>

      <section className="lesson-section">
        <h2>11. Speed vs. Velocity</h2>
        <p>Car A moves 15 m/s right. Car B moves 15 m/s left. They are moving equally fast, but their velocities are different because they move in opposite directions.</p>
        <div className="comparison-grid">
          <article><h3>Speed</h3><ul><li>how fast</li><li>scalar</li></ul></article>
          <article><h3>Velocity</h3><ul><li>how fast and in what direction</li><li>vector</li></ul></article>
        </div>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Quick Check 2</p>
        <h2>Average Velocity</h2>
        <ChoicePractice question={{ id: "topic12-qc-velocity", prompt: "A student walks 20 m right, then 20 m left, and finishes at the starting point. Total trip time is 10 s. What is the student's average velocity?", choices: ["0 m/s", "2 m/s", "4 m/s", "40 m/s"], answer: "0 m/s", hint: "Average velocity depends on displacement, not total distance.", explanation: "The student's displacement is zero because the initial and final positions are the same. v_avg = 0 m / 10 s = 0 m/s. This does not mean the student never moved." }} />
      </section>

      <section className="lesson-section">
        <h2>12. When Velocity Changes</h2>
        <VelocityTimeline />
        <p>The velocity increases by 2 m/s every second. The car&apos;s velocity is changing.</p>
        <h3>Acceleration</h3>
        <p>Acceleration describes how quickly velocity changes.</p>
      </section>

      <section className="lesson-section">
        <h2>13. Change in Velocity</h2>
        <p>Since Δ means change in, <strong>Δv</strong> means change in velocity.</p>
        <Equation>v<sub>i</sub> = initial velocity</Equation>
        <Equation>v<sub>f</sub> = final velocity</Equation>
        <Equation>Δv = v<sub>f</sub> - v<sub>i</sub></Equation>
        <Equation>Δv = 8 m/s - 2 m/s = +6 m/s</Equation>
      </section>

      <section className="lesson-section" id="section-acceleration">
        <h2>14. Average Acceleration</h2>
        <Equation>average acceleration = change in velocity ÷ elapsed time</Equation>
        <Equation>a<sub>avg</sub> = Δv / Δt</Equation>
        <div className="concept-callout"><strong>a<sub>avg</sub></strong> → average acceleration<br /><strong>Δv</strong> → change in velocity<br /><strong>Δt</strong> → elapsed time</div>
        <h3>Worked Example — Average Acceleration</h3>
        <Equation>Δv = 16 m/s - 4 m/s = 12 m/s</Equation>
        <Equation>a<sub>avg</sub> = 12 m/s / 6 s</Equation>
        <Equation>a<sub>avg</sub> = +2 m/s²</Equation>
        <p>The car&apos;s velocity changes by +2 m/s every second.</p>
      </section>

      <section className="lesson-section">
        <h2>15. What Does m/s² Actually Mean?</h2>
        <VelocityTimeline />
        <p>Every second, velocity changes by +2 m/s. Therefore the acceleration is +2 meters per second, per second, written as +2 m/s².</p>
        <div className="concept-callout key-idea">An acceleration of +2 m/s² means the velocity changes by +2 m/s every second when the acceleration is constant.</div>
      </section>

      <section className="lesson-section">
        <h2>16. Acceleration Is About Velocity</h2>
        <p>Acceleration occurs whenever velocity changes. Because velocity includes both magnitude and direction, acceleration can occur when speed changes, direction changes, or both change.</p>
        <div className="concept-callout">Later in AP Physics, you&apos;ll see objects accelerating even when their speed stays constant because their direction is changing.</div>
      </section>

      <section className="lesson-section">
        <h2>17. Does Negative Acceleration Mean Slowing Down?</h2>
        <p>Right is positive and left is negative. A car moving left first travels 5 m/s left, then 8 m/s left one second later. It is moving faster.</p>
        <Equation>Initial velocity = -5 m/s</Equation>
        <Equation>Final velocity = -8 m/s</Equation>
        <Equation>Δv = -8 - (-5) = -3 m/s</Equation>
        <p>The change in velocity is negative, but the car sped up.</p>
        <div className="concept-callout key-idea">The sign of acceleration tells you its direction. It does not automatically tell you whether an object is speeding up or slowing down.</div>
      </section>

      <section className="lesson-section" id="section-speeding">
        <h2>18. Speeding Up or Slowing Down?</h2>
        <p>Compare the direction of velocity with the direction of acceleration.</p>
        <div className="comparison-grid">
          <article><h3>Velocity → Acceleration →</h3><strong>Speeding up</strong></article>
          <article><h3>Velocity ← Acceleration ←</h3><strong>Speeding up</strong></article>
          <article><h3>Velocity → Acceleration ←</h3><strong>Slowing down</strong></article>
          <article><h3>Velocity ← Acceleration →</h3><strong>Slowing down</strong></article>
        </div>
        <h3>Same direction → speeding up</h3>
        <h3>Opposite directions → slowing down</h3>
        <MotionComparison />
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Interactive 3</p>
        <h2>Speeding Up or Slowing Down?</h2>
        <SpeedingExplorer />
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Quick Check 3</p>
        <h2>Velocity and Acceleration Directions</h2>
        <ChoicePractice question={{ id: "topic12-qc-speeding", prompt: "A car has velocity = -12 m/s and acceleration = +3 m/s². Is the car speeding up or slowing down?", choices: ["Speeding up", "Slowing down", "Not moving", "Impossible to determine"], answer: "Slowing down", hint: "Compare the directions of velocity and acceleration.", explanation: "Velocity points left. Acceleration points right. They point in opposite directions, so the car is slowing down." }} />
      </section>

      <section className="lesson-section">
        <h2>19. Comparing Motion</h2>
        <ChoicePractice question={{ id: "topic12-compare-motion", prompt: "Car A has velocity +8 m/s and acceleration +2 m/s². Car B has velocity -8 m/s and acceleration -2 m/s². Which statement is correct?", choices: ["Only Car A is speeding up.", "Only Car B is speeding up.", "Both cars are speeding up.", "Both cars are slowing down."], answer: "Both cars are speeding up.", hint: "For each car, compare the direction of velocity and acceleration.", explanation: "For both cars, velocity and acceleration point in the same direction. Therefore both cars are speeding up." }} />
      </section>

      <section className="lesson-section" id="section-graph">
        <h2>20. Your First Motion Graph</h2>
        <p>A car begins at the origin and continuously moves in the positive direction. Sketch one possible graph showing the car&apos;s position increasing as time passes.</p>
        <MotionGraphSketch />
        <div className="concept-callout">In Topic 1.3, you&apos;ll learn how the shape and slope of motion graphs reveal much more about an object&apos;s motion.</div>
      </section>

      <section className="lesson-section">
        <h2>21. Common Mistakes</h2>
        <div className="mistake-grid">
          <article><h3>Distance and displacement are the same.</h3><p>Incorrect. Distance measures the path traveled. Displacement measures the change in position.</p></article>
          <article><h3>If average velocity is zero, the object never moved.</h3><p>Incorrect. An object can move and return to its starting position.</p></article>
          <article><h3>Negative velocity means slowing down.</h3><p>Incorrect. The sign of velocity tells us direction.</p></article>
          <article><h3>Negative acceleration means slowing down.</h3><p>Incorrect. Compare velocity and acceleration directions.</p></article>
          <article><h3>Acceleration only happens when speed changes.</h3><p>Incorrect. Changing direction also changes velocity.</p></article>
        </div>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">AP-Style Practice</p>
        <h2>22. AP-Style MCQ Practice</h2>
        {[
          ["mcq-displacement", "A cart moves from x = +3 m to x = -9 m. What is its displacement?", ["-12 m", "-6 m", "+6 m", "+12 m"], "-12 m", "Δx = -9 - (+3) = -12 m."],
          ["mcq-velocity", "An object undergoes a displacement of +24 m during 6 s. What is its average velocity?", ["-4 m/s", "+4 m/s", "+18 m/s", "+144 m/s"], "+4 m/s", "v_avg = Δx / Δt = 24 m / 6 s = +4 m/s."],
          ["mcq-acceleration", "A car's velocity changes from -2 m/s to -10 m/s during 4 seconds. What is its average acceleration?", ["-3 m/s²", "-2 m/s²", "+2 m/s²", "+3 m/s²"], "-2 m/s²", "Δv = -10 - (-2) = -8 m/s, so a_avg = -8 / 4 = -2 m/s²."],
          ["mcq-reasoning", "An object has negative velocity and positive acceleration. Which statement is correct at that instant?", ["It moves in the positive direction.", "It moves in the negative direction and is slowing down.", "It moves in the negative direction and is speeding up.", "It must be stationary."], "It moves in the negative direction and is slowing down.", "Negative velocity means motion in the negative direction. Positive acceleration points opposite the velocity, so the object is slowing down."],
          ["mcq-distance", "A runner moves 30 m right, 10 m left, and then 5 m right. What are the runner's distance and displacement?", ["Distance = 25 m; displacement = 45 m right", "Distance = 45 m; displacement = 25 m right", "Distance = 45 m; displacement = 15 m right", "Distance = 25 m; displacement = 25 m right"], "Distance = 45 m; displacement = 25 m right", "Distance = 30 + 10 + 5 = 45 m. Displacement = +30 - 10 + 5 = +25 m."],
        ].map(([id, prompt, choices, answer, explanation]) => (
          <ChoicePractice key={id as string} question={{ id: id as string, prompt: prompt as string, choices: choices as string[], answer: answer as string, explanation: explanation as string, hint: "Translate the physical situation into final-minus-initial or compare directions." }} />
        ))}
      </section>

      <section className="lesson-section">
        <h2>23. AP-Style Written Reasoning</h2>
        <p>A cart has velocity = -6 m/s and acceleration = -2 m/s². Student A says the cart must be slowing down because its acceleration is negative. Student B says the cart is speeding up.</p>
        <WrittenPractice question={{ id: "topic12-written-reasoning", prompt: "Which student is correct? Justify your answer using the directions of velocity and acceleration.", modelAnswer: "Student B is correct. The cart's velocity and acceleration are both in the negative direction. When velocity and acceleration point in the same direction, the magnitude of velocity increases. Therefore, the cart is speeding up." }} />
      </section>

      <section className="lesson-section">
        <h2>24. Experimental Thinking</h2>
        <p>A student wants to determine the average velocity of a battery-powered toy car.</p>
        <EquipmentIcons />
        <WrittenPractice question={{ id: "topic12-experiment", prompt: "What should the student measure, and how would those measurements allow the student to calculate average velocity?", modelAnswer: "The student should measure initial position, final position, and elapsed time. First calculate displacement with Δx = xf - xi. Then calculate average velocity using v_avg = Δx / Δt. Measuring only total distance can be insufficient if the car changes direction because average velocity depends on displacement, not total path length." }} />
      </section>

      <section className="lesson-section">
        <h2>25. Challenge Problem</h2>
        <AxisExample start={-5} finish={15} label="A cart travels from -5 meters to +15 meters, then back to +7 meters." />
        <p>A cart begins at x = -5 m and travels to x = +15 m during the first 4 seconds. It then travels back to x = +7 m during the next 2 seconds.</p>
        <WrittenPractice question={{ id: "topic12-challenge", prompt: "Find A. total distance, B. total displacement, and C. average velocity for the whole trip.", modelAnswer: "A. Distance = 20 m + 8 m = 28 m. B. Displacement = +7 m - (-5 m) = +12 m. C. Total time = 6 s, so average velocity = +12 m / 6 s = +2 m/s." }} />
      </section>

      <Topic12MasteryCheck />

      <section className="lesson-section">
        <h2>Topic Summary</h2>
        <ul>
          <li>Position describes where an object is relative to an origin.</li>
          <li>Displacement is the change in position.</li>
          <li>Change is calculated using final minus initial.</li>
          <li>Distance measures total path length.</li>
          <li>Average velocity is displacement divided by elapsed time.</li>
          <li>Speed is scalar while velocity is vector.</li>
          <li>Acceleration describes how velocity changes.</li>
          <li>Negative acceleration does not automatically mean slowing down.</li>
          <li>Velocity and acceleration in the same direction mean speed increases.</li>
          <li>Velocity and acceleration in opposite directions mean speed decreases.</li>
        </ul>
      </section>

      <section className="lesson-section">
        <h2>Before You Continue</h2>
        <ol>
          <li>What is the difference between distance and displacement?</li>
          <li>Why can an object travel a large distance but have zero displacement?</li>
          <li>What does average velocity measure?</li>
          <li>What does acceleration describe?</li>
          <li>Can an object have negative acceleration and still speed up? Explain.</li>
          <li>If velocity is negative and acceleration is positive, is the object speeding up or slowing down?</li>
          <li>What measurements would you need to experimentally determine average velocity?</li>
        </ol>
        <div className="lesson-nav">
          <Link className="button secondary" href="/ap-physics/physics-1/kinematics/scalars-vectors-one-dimension">Review Topic</Link>
          <Link className="button primary" href="/ap-physics/physics-1/kinematics/representing-motion">Continue to Topic 1.3</Link>
        </div>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Next Topic</p>
        <h2>Next: Topic 1.3 — Representing Motion</h2>
        <p>In the next topic, students will learn how physicists represent motion using position-time, velocity-time, and acceleration-time graphs and how information about motion can be translated between graphs, equations, diagrams, and verbal descriptions.</p>
      </section>
    </div>
  );
}

export const topic12Metadata = metadata;
