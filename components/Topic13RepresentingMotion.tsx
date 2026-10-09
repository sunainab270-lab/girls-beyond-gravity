import { PhysicsChildren } from "./PhysicsText";
import Link from "next/link";

import { SvgVectorArrow } from "./SvgArrowMarker";
import {
  BuildMotionInteractive,
  DrawGraphActivity,
  GraphDisplacementCheck,
  GraphMotionInteractive,
  MatchMotionInteractive,
  PositionReadCheck,
  PredictionSimulation,
  RoadGraphMisconceptionCheck,
  TellStoryCheck,
  Topic13ChoiceCheck,
  Topic13MasteryCheck,
} from "./Topic13Interactions";
import { WrittenPractice } from "./Topic11Interactions";

const metadata = {
  course: "AP Physics 1",
  unit: "Kinematics",
  topic: "Representing Motion",
};

function Equation({ children }: { children: React.ReactNode }) {
  return <div className="equation"><PhysicsChildren>{children}</PhysicsChildren></div>;
}

function PositionTimeGraph({
  label,
  points,
}: {
  label: string;
  points: string;
}) {
  return (
    <figure className="physics-diagram topic13-graph" aria-label={label}>
      <svg viewBox="0 0 620 250" role="img">
        <line className="axis-line" x1="80" y1="200" x2="550" y2="200" />
        <line className="axis-line" x1="80" y1="40" x2="80" y2="200" />
        <text x="245" y="232">Time, t (s)</text>
        <text x="12" y="38">Position, x (m)</text>
        <line className="axis-guide" x1="80" y1="130" x2="550" y2="130" />
        <polyline className="result-vector graph-line" points={points} />
      </svg>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function MotionDiagram({
  label,
  positions,
}: {
  label: string;
  positions: number[];
}) {
  return (
    <figure className="physics-diagram topic13-motion-diagram" aria-label={label}>
      <svg viewBox="0 0 720 170" role="img">
        <line className="axis-line" x1="80" y1="112" x2="640" y2="112" />
        <text x="74" y="144">-x</text>
        <text x="616" y="144">+x</text>
        {positions.map((x, index) => (
          <g key={`${x}-${index}`}>
            <circle className={index === 0 ? "start-dot" : "finish-dot"} cx={x} cy="112" r="8" />
            <text x={x - 18} y="82">t={index}s</text>
          </g>
        ))}
        <SvgVectorArrow className="vector-line" x1={positions[0]} y1={52} x2={positions[positions.length - 1]} y2={52} />
      </svg>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function ThreeRepresentationDemo() {
  return (
    <div className="comparison-grid">
      <article className="interactive-card">
        <h3>Verbal</h3>
        <p>The car moves in the positive direction at a constant velocity.</p>
      </article>
      <MotionDiagram label="Motion diagram: equally spaced markers to the right" positions={[130, 230, 330, 430, 530]} />
      <PositionTimeGraph label="Position-time graph: straight line with positive slope" points="90,185 540,65" />
    </div>
  );
}

function MotionDiagramExamples() {
  return (
    <div className="comparison-grid">
      <MotionDiagram label="A. Constant speed: equal spacing" positions={[130, 230, 330, 430, 530]} />
      <MotionDiagram label="B. Speeding up: spacing gets larger" positions={[130, 180, 260, 380, 540]} />
      <MotionDiagram label="C. Slowing down: spacing gets smaller" positions={[130, 300, 430, 520, 570]} />
    </div>
  );
}

function GraphRoadComparison() {
  return (
    <div className="comparison-grid">
      <figure className="physics-diagram" aria-label="Physical road">
        <svg viewBox="0 0 620 220" role="img">
          <line className="axis-line" x1="70" y1="145" x2="550" y2="145" />
          <text x="245" y="180">physical road</text>
          <g className="car-marker">
            <rect x="210" y="92" width="64" height="24" rx="9" />
            <circle cx="225" cy="121" r="5" />
            <circle cx="259" cy="121" r="5" />
          </g>
          <SvgVectorArrow className="vector-line" x1={292} y1={104} x2={460} y2={104} />
        </svg>
      </figure>
      <PositionTimeGraph label="Position-time graph records position changing with time" points="90,178 540,70" />
    </div>
  );
}

function ReadingPositionGraph() {
  return (
    <figure className="physics-diagram" aria-label="Reading position at two seconds">
      <svg viewBox="0 0 620 295" role="img">
        <line className="axis-line" x1="80" y1="210" x2="550" y2="210" />
        <line className="axis-line" x1="80" y1="40" x2="80" y2="210" />
        <text x="250" y="278">Time, t (s)</text>
        <text x="12" y="38">Position, x (m)</text>
        {[0, 1, 2, 3].map((time) => (
          <g key={time}>
            <line className="origin-tick" x1={110 + time * 120} y1="198" x2={110 + time * 120} y2="222" />
            <text x={103 + time * 120} y="238">{time}</text>
          </g>
        ))}
        {[2, 4, 6, 8].map((position, index) => (
          <g key={position}>
            <line className="origin-tick" x1="68" y1={178 - index * 38} x2="92" y2={178 - index * 38} />
            <text x="36" y={184 - index * 38}>{position}</text>
          </g>
        ))}
        <polyline className="result-vector graph-line" points="110,178 230,140 350,102 470,64" />
        <line className="axis-guide" x1="350" y1="210" x2="350" y2="102" />
        <line className="axis-guide" x1="80" y1="102" x2="350" y2="102" />
        <circle className="finish-dot" cx="350" cy="102" r="8" />
      </svg>
    </figure>
  );
}

function SlopeDerivation() {
  return (
    <div className="comparison-grid">
      <PositionTimeGraph label="Car A: +4 m in 4 s (common graph scale)" points="90,170 540,126" />
      <PositionTimeGraph label="Car B: +12 m in 4 s (common graph scale)" points="90,190 540,58" />
    </div>
  );
}

function RiseRunGraph() {
  return (
    <figure className="physics-diagram" aria-label="Calculating velocity from graph slope">
      <svg viewBox="0 0 620 270" role="img">
        <line className="axis-line" x1="80" y1="220" x2="550" y2="220" />
        <line className="axis-line" x1="80" y1="40" x2="80" y2="220" />
        <text x="250" y="252">Time, t (s)</text>
        <text x="10" y="38">Position, x (m)</text>
        <polyline className="result-vector graph-line" points="160,180 430,72" />
        <line className="axis-guide" x1="160" y1="180" x2="430" y2="180" />
        <line className="axis-guide" x1="430" y1="180" x2="430" y2="72" />
        <circle className="finish-dot" cx="160" cy="180" r="8" />
        <circle className="finish-dot" cx="430" cy="72" r="8" />
        <text x="236" y="204">Δt = 3 s</text>
        <text x="442" y="132">Δx = +6 m</text>
      </svg>
    </figure>
  );
}

function SlopeCards() {
  return (
    <div className="comparison-grid">
      <PositionTimeGraph label="Positive slope: positive velocity" points="90,178 540,70" />
      <PositionTimeGraph label="Negative slope: negative velocity" points="90,70 540,178" />
      <PositionTimeGraph label="Horizontal line: velocity = 0" points="90,125 540,125" />
    </div>
  );
}

function SpeedComparisonGraphs() {
  return (
    <div className="comparison-grid">
      <PositionTimeGraph label="Object A: gentle positive slope" points="90,150 540,95" />
      <PositionTimeGraph label="Object B: steeper positive slope" points="90,188 540,55" />
      <PositionTimeGraph label="Object C: equally steep negative slope" points="90,55 540,188" />
    </div>
  );
}

function QuantitativePositionGraph({ story = false }: { story?: boolean }) {
  const values = story ? [[0, 0], [2, 4], [4, 4], [6, -2]] : [[1, -2], [5, 6]];
  return (
    <figure className="physics-diagram" aria-label={story ? "Position-time story: A (0 s, 0 m), B (2 s, 4 m), C (4 s, 4 m), D (6 s, -2 m)" : "Position-time graph from (1 s, -2 m) to (5 s, 6 m)"}>
      <svg viewBox="0 0 620 280" role="img">
        <line className="axis-line" x1="80" y1="205" x2="550" y2="205" />
        <line className="axis-line" x1="80" y1="35" x2="80" y2="205" />
        <text x="235" y="265">Time, t (s)</text>
        <text x="12" y="25">Position, x (m)</text>
        <line className="axis-guide" x1="80" y1="135" x2="550" y2="135" />
        {[0, 1, 2, 3, 4, 5, 6].map(t => <g key={t}><line className="origin-tick" x1={80 + t * 76} y1="200" x2={80 + t * 76} y2="211" /><text x={74 + t * 76} y="235">{t}</text></g>)}
        {[-4, -2, 0, 2, 4, 6].map(x => <g key={x}><line className="origin-tick" x1="74" y1={135 - x * 15} x2="86" y2={135 - x * 15} /><text x="40" y={141 - x * 15}>{x}</text></g>)}
        <polyline className="result-vector graph-line" points={values.map(([t, x]) => `${80 + t * 76},${135 - x * 15}`).join(" ")} />
        {values.map(([t, x], index) => <g key={t}><circle className="finish-dot" cx={80 + t * 76} cy={135 - x * 15} r="6" />{story ? <text x={90 + t * 76} y={123 - x * 15}>{"ABCD"[index]}</text> : <text x={t > 3 ? 410 : 90 + t * 76} y={123 - x * 15}>{`(${t} s, ${x} m)`}</text>}</g>)}
      </svg>
    </figure>
  );
}

function StoryGraph() { return <QuantitativePositionGraph story />; }

export function Topic13RepresentingMotion() {
  return (
    <div className="topic-module" data-topic={metadata.topic}>
      <section className="lesson-section">
        <div className="topic-meta">
          <span>Estimated time: 50-65 minutes</span>
          <span>Difficulty: Foundational - Intermediate</span>
          <span>Skills: Creating representations, graph interpretation, mathematical reasoning, translation, physical reasoning</span>
        </div>
        <p className="eyebrow">What You&apos;ll Learn</p>
        <h2>What You&apos;ll Learn</h2>
        <ul>
          <li>Represent motion using words, motion diagrams, and position-time graphs.</li>
          <li>Interpret motion diagrams at equal time intervals.</li>
          <li>Read position and displacement from position-time graphs.</li>
          <li>Interpret slope as velocity and compare speed using slope magnitude.</li>
          <li>Translate between verbal descriptions, motion diagrams, and graphs.</li>
          <li>Justify conclusions using graphical evidence.</li>
        </ul>
      </section>

      <section className="lesson-section">
        <h2>1. One Motion, Different Representations</h2>
        <p>Imagine watching a car move along a straight road.</p>
        <p>You could describe what happened with words. You could record where the car was at different moments. Or you could represent its position on a graph.</p>
        <p>Physicists use different representations because each one reveals something useful about the same motion.</p>
        <ThreeRepresentationDemo />
        <div className="concept-callout">Different representations. Same motion.</div>
        <p><strong>Think:</strong> What information stays the same across all three representations?</p>
      </section>

      <section className="lesson-section" id="section-motion-diagrams">
        <h2>2. Motion Diagrams</h2>
        <p>A motion diagram shows an object&apos;s position at several moments in time.</p>
        <div className="concept-callout key-idea">The positions must represent <strong>equal time intervals</strong>. Without equal time intervals, spacing does not tell us speed behavior.</div>
        <MotionDiagram label="Equal-time position markers" positions={[130, 230, 330, 430, 530]} />
        <p>The spacing tells us how much position changes during equal intervals of time. The order of the markers tells us the direction of motion.</p>
        <MotionDiagramExamples />
        <ul>
          <li>Equal spacing means constant speed.</li>
          <li>Spacing getting larger means speeding up.</li>
          <li>Spacing getting smaller means slowing down.</li>
        </ul>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Quick Check 1</p>
        <h2>Read the Motion Diagram</h2>
        <MotionDiagram label="New diagram: spacing grows during equal time intervals" positions={[140, 185, 260, 370, 530]} />
        <Topic13ChoiceCheck
          question={{
            id: "topic13-qc-motion-diagram",
            prompt: "What can you conclude about the object's speed?",
            choices: ["It is increasing.", "It is decreasing.", "It is constant.", "The object is stationary."],
            answer: "It is increasing.",
            hint: "Compare how much distance the object covers during each equal time interval.",
            explanation: "The markers get farther apart during equal time intervals, so the object covers more distance each second. Its speed is increasing.",
          }}
        />
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Interactive 1</p>
        <h2>Build the Motion</h2>
        <BuildMotionInteractive />
      </section>

      <section className="lesson-section">
        <h2>3. Position vs. Time</h2>
        <GraphRoadComparison />
        <p>A position-time graph records where an object is at different moments.</p>
        <div className="comparison-grid">
          <div className="concept-callout"><strong>Time tells us WHEN.</strong><br />Time, t (s), belongs on the horizontal axis.</div>
          <div className="concept-callout"><strong>Position tells us WHERE.</strong><br />Position, x (m), belongs on the vertical axis.</div>
        </div>
      </section>

      <section className="lesson-section">
        <h2>4. The Graph Is Not the Road</h2>
        <p>A position-time graph is <strong>not</strong> a picture of the physical path.</p>
        <GraphRoadComparison />
        <div className="concept-callout">The car moves along the road. The graph records how its position changes with time.</div>
      </section>

      <section className="lesson-section" id="section-reading-position">
        <h2>5. Reading Position</h2>
        <ReadingPositionGraph />
        <ol>
          <li>Find the desired time on the horizontal axis.</li>
          <li>Move vertically until you reach the graph.</li>
          <li>Move horizontally toward the position axis.</li>
          <li>Read the position.</li>
        </ol>
        <PositionReadCheck />
      </section>

      <section className="lesson-section" id="section-displacement-graph">
        <h2>6. Displacement from a Graph</h2>
        <p>From Topic 1.2, displacement is still:</p>
        <Equation>Δx = x<sub>f</sub> - x<sub>i</sub></Equation>
        <p>The graph can give us both positions.</p>
        <QuantitativePositionGraph />
        <GraphDisplacementCheck />
      </section>

      <section className="lesson-section" id="section-slope">
        <h2>7. What Does the Slope Mean?</h2>
        <p>Before memorizing a rule, compare two objects.</p>
        <SlopeDerivation />
        <p>Car A changes position by +4 m in 4 s. Car B changes position by +12 m in 4 s.</p>
        <p>Car B&apos;s position changes more quickly. Its graph is steeper.</p>
        <Equation>slope = change in vertical quantity / change in horizontal quantity</Equation>
        <Equation>slope = Δx / Δt</Equation>
        <p>Students already know that average velocity is Δx / Δt.</p>
        <div className="concept-callout key-idea">On a straight segment, slope gives the constant velocity. Between two points, the secant slope gives average velocity; on a curve, the tangent slope at a point gives instantaneous velocity.</div>
      </section>

      <section className="lesson-section">
        <h2>8. Calculating Velocity from Slope</h2>
        <RiseRunGraph />
        <Equation>Δx = 8 - 2 = +6 m</Equation>
        <Equation>Δt = 4 - 1 = 3 s</Equation>
        <Equation>v = Δx / Δt</Equation>
        <Equation>v = 6 / 3 = +2 m/s</Equation>
      </section>

      <section className="lesson-section" id="section-velocity-acceleration-graphs">
        <h2>Velocity and Acceleration Graphs</h2>
        <p>Instantaneous means at a particular moment. Average values describe an entire time interval. On a velocity-time graph, the tangent slope gives instantaneous acceleration; the slope between two points gives average acceleration.</p>
        <div className="comparison-grid">
          <article className="interactive-card"><h3>Velocity vs. time</h3><p>The signed area between the graph and the time axis gives displacement. Area above the axis is positive; area below it is negative. Add the absolute areas to find total distance.</p></article>
          <article className="interactive-card"><h3>Acceleration vs. time</h3><p>The signed area gives change in velocity, not displacement. A horizontal acceleration line means constant acceleration; it does not mean constant velocity unless a = 0.</p></article>
        </div>
        <p>A cart moving at +4 m/s for 2 s, then at -2 m/s for 3 s, travels 8 m forward and 6 m back. Its displacement is +2 m and its total distance is 14 m.</p>
        <Topic13ChoiceCheck question={{ id: "topic13-signed-area", prompt: "A velocity-time graph stays at -3 m/s for 4 s. What displacement does its signed area represent?", choices: ["-12 m", "+12 m", "-0.75 m", "0 m"], answer: "-12 m", hint: "Multiply velocity by time and retain the sign.", explanation: "The rectangle is below the time axis, so its signed area is (-3 m/s)(4 s) = -12 m. The distance traveled is 12 m." }} />
      </section>

      <section className="lesson-section" id="section-constant-acceleration">
        <h2>Constant Acceleration and Free Fall</h2>
        <p>Use these equations only when acceleration is constant over the interval. Here v₀ and x₀ are the initial velocity and position, t is elapsed time, and Δx = x - x₀. Choose a positive direction before assigning signs.</p>
        <Equation>v = v₀ + at</Equation>
        <Equation>Δx = v₀t + ½at²</Equation>
        <Equation>v² = v₀² + 2aΔx</Equation>
        <p>A cart starts at +2 m/s and accelerates at +3 m/s² for 2 s. Its final velocity is +8 m/s and displacement is +10 m. On the velocity-time graph, the same displacement is the trapezoid area ½(2 + 8)(2) = 10 m.</p>
        <p>In free fall near Earth, gravity is the only significant force and air resistance is neglected. With upward positive, a = -g ≈ -9.8 m/s² during both ascent and descent. At the highest point, vertical velocity is momentarily zero while acceleration is still downward.</p>
        <p>If acceleration varies, reason qualitatively from graph slopes and areas. These constant-acceleration equations cannot describe the whole interval using one arbitrary acceleration value.</p>
        <Topic13ChoiceCheck question={{ id: "topic13-free-fall", prompt: "A ball is thrown straight upward with negligible air resistance. At its highest point, what are its vertical velocity and acceleration?", choices: ["v = 0; a = -g", "v = 0; a = 0", "v = +g; a = 0", "v = -g; a = +g"], answer: "v = 0; a = -g", hint: "Gravity continues to act at the turning point.", explanation: "Vertical velocity is momentarily zero, but its rate of change is still -g when upward is positive." }} />
      </section>

      <section className="lesson-section" id="section-slope-sign">
        <h2>9. What Does the Sign of Slope Tell Us?</h2>
        <SlopeCards />
        <ul>
          <li>Positive slope means position increases as time increases, so velocity is positive.</li>
          <li>Negative slope means position decreases as time increases, so velocity is negative.</li>
          <li>A horizontal line means position does not change, so velocity is zero and the object is stationary.</li>
        </ul>
      </section>

      <section className="lesson-section" id="section-speed">
        <h2>10. Steepness and Speed</h2>
        <SpeedComparisonGraphs />
        <p>The magnitude of the slope tells us the magnitude of velocity: the speed.</p>
        <div className="concept-callout">The sign of slope tells direction. The magnitude of slope tells speed.</div>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Quick Check 2</p>
        <h2>Compare the Graphs</h2>
        <Topic13ChoiceCheck
          question={{
            id: "topic13-qc-speed-compare",
            prompt: "Four graphs show: gentle positive slope, steep positive slope, horizontal line, and an even steeper negative slope. Which object has the greatest speed?",
            choices: ["Gentle positive slope", "Steep positive slope", "Horizontal line", "Even steeper negative slope"],
            answer: "Even steeper negative slope",
            hint: "Speed depends on the magnitude of the slope. Ignore the sign for a moment and compare steepness.",
            explanation: "The steepest negative slope has the greatest slope magnitude, so it represents the greatest speed. The negative sign gives direction.",
          }}
        />
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Interactive 2</p>
        <h2>Graph ↔ Motion</h2>
        <GraphMotionInteractive />
      </section>

      <section className="lesson-section">
        <h2>11. Predict Before You Play</h2>
        <PredictionSimulation />
      </section>

      <section className="lesson-section">
        <h2>12. Is the Graph the Road?</h2>
        <StoryGraph />
        <RoadGraphMisconceptionCheck />
      </section>

      <section className="lesson-section">
        <h2>13. Match the Motion</h2>
        <MatchMotionInteractive />
      </section>

      <section className="lesson-section" id="section-translation">
        <h2>14. Same Motion. New Representation.</h2>
        <MotionDiagram label="Motion diagram: equally spaced markers moving right" positions={[130, 230, 330, 430, 530]} />
        <Topic13ChoiceCheck
          question={{
            id: "topic13-translate-diagram",
            prompt: "Which position-time graph represents this motion?",
            choices: ["Straight line with positive slope", "Straight line with negative slope", "Horizontal line", "Curved line that gets steeper"],
            answer: "Straight line with positive slope",
            hint: "Use direction for slope sign and equal spacing for constant velocity.",
            explanation: "Markers progress toward positive x, so position increases. Equal spacing during equal time intervals means constant velocity, so the graph is a straight line with positive slope.",
          }}
        />
        <PositionTimeGraph label="Reverse task: constant negative slope" points="90,70 540,178" />
        <Topic13ChoiceCheck
          question={{
            id: "topic13-translate-graph",
            prompt: "Which motion diagram could represent this graph?",
            choices: ["Equally spaced markers moving left", "Equally spaced markers moving right", "Markers getting farther apart to the right", "All markers at one position"],
            answer: "Equally spaced markers moving left",
            hint: "Negative slope means position decreases. A straight line means constant velocity.",
            explanation: "The graph has constant negative slope, so the object moves in the negative direction with constant velocity.",
          }}
        />
      </section>

      <section className="lesson-section">
        <h2>15. You Draw the Graph</h2>
        <p>A cart begins at x = -2 m. It moves in the positive direction at a constant velocity for 4 seconds.</p>
        <DrawGraphActivity />
      </section>

      <section className="lesson-section">
        <h2>16. Graph Construction Challenge</h2>
        <p>A student walks in the positive direction at a constant velocity, stops for a short time, then walks back in the negative direction at a greater speed.</p>
        <DrawGraphActivity challenge />
      </section>

      <section className="lesson-section">
        <p className="eyebrow">AP-Style Practice</p>
        <h2>17. AP-Style Graph Reasoning</h2>
        <StoryGraph />
        <Topic13ChoiceCheck
          question={{
            id: "topic13-ap-speed",
            prompt: "During which interval is the object moving with the greatest speed?",
            choices: ["A-B", "B-C", "C-D", "The speed is the same during all intervals."],
            answer: "C-D",
            hint: "Compare the magnitude of the slope in each interval.",
            explanation: "Speed corresponds to the magnitude of the slope of a position-time graph. C-D has the greatest slope magnitude.",
          }}
        />
      </section>

      <section className="lesson-section">
        <h2>18. AP-Style Justification</h2>
        <SpeedComparisonGraphs />
        <WrittenPractice
          question={{
            id: "topic13-written-justification",
            prompt: "Which objects have the greatest speed? All three graphs use the same axis scales. Justify your answer using features of the graphs.",
            modelAnswer:
              "Objects B and C have the same greatest speed because their position-time graphs have equal slope magnitudes, greater than A’s. C’s negative slope indicates direction, not a smaller speed.",
          }}
        />
        <div className="concept-callout">
          A strong response compares slope magnitude and distinguishes sign from magnitude.
        </div>
      </section>

      <section className="lesson-section">
        <h2>19. Concept Check: Tell the Story</h2>
        <StoryGraph />
        <TellStoryCheck />
      </section>

      <section className="lesson-section">
        <h2>Common Mistakes</h2>
        <div className="mistake-grid">
          <article><h3>The graph shows the physical path.</h3><p>A position-time graph shows how position changes with time. Its shape is not the shape of the road.</p></article>
          <article><h3>A higher point means faster.</h3><p>Height represents position. Slope represents velocity.</p></article>
          <article><h3>A negative slope means slowing down.</h3><p>A negative slope indicates negative velocity. It tells direction, not whether speed is changing.</p></article>
          <article><h3>A horizontal graph means constant velocity.</h3><p>Technically yes, but specifically v = 0. The object is stationary.</p></article>
          <article><h3>The steepest positive slope always has greatest speed.</h3><p>Speed depends on slope magnitude. A steep negative slope can represent greater speed.</p></article>
        </div>
      </section>

      <Topic13MasteryCheck />

      <section className="lesson-section">
        <h2>Topic Summary</h2>
        <ul>
          <li>Motion can be represented in multiple ways.</li>
          <li>Motion diagrams show position at equal time intervals.</li>
          <li>Equal marker spacing indicates constant speed.</li>
          <li>Increasing spacing indicates increasing speed; decreasing spacing indicates decreasing speed.</li>
          <li>A position-time graph shows position as a function of time.</li>
          <li>The graph is not a picture of the physical path.</li>
          <li>The slope of a position-time graph represents velocity.</li>
          <li>Positive slope means positive velocity; negative slope means negative velocity; horizontal slope means zero velocity.</li>
          <li>Slope magnitude corresponds to speed.</li>
        </ul>
      </section>

      <section className="lesson-section">
        <h2>Before You Continue</h2>
        <ol>
          <li>What does the spacing in a motion diagram tell you?</li>
          <li>What does the vertical axis of a position-time graph represent?</li>
          <li>What does the slope of a position-time graph represent?</li>
          <li>What does a horizontal position-time graph mean physically?</li>
          <li>Can an object with a negative slope be moving faster than an object with a positive slope?</li>
          <li>How would you represent an object that moves right, stops, and then moves left?</li>
          <li>Why isn&apos;t a position-time graph a picture of the object&apos;s path?</li>
        </ol>
        <div className="lesson-nav">
          <Link className="button secondary" href="/ap-physics/physics-1/kinematics/displacement-velocity-acceleration">Review Topic</Link>
          <Link className="button primary" href="/ap-physics/physics-1/kinematics/reference-frames-relative-motion">Continue to Topic 1.4</Link>
        </div>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Next Topic</p>
        <h2>Next: Topic 1.4 - Reference Frames and Relative Motion</h2>
      </section>
    </div>
  );
}

export const topic13Metadata = metadata;
