import { PhysicsChildren } from "./PhysicsText";
import Link from "next/link";

import { SvgVectorArrow } from "./SvgArrowMarker";
import {
  ChangePointOfViewInteractive,
  ChallengeProblem,
  JustificationPractice,
  OppositeMotionNumericalCheck,
  SwitchObserverInteractive,
  Topic14ChoiceCheck,
  Topic14MasteryCheck,
  Topic14PracticeSet,
  TranslationPractice,
  WalkingTrainInteractive,
} from "./Topic14Interactions";

const metadata = {
  course: "AP Physics 1",
  unit: "Kinematics",
  topic: "Reference Frames and Relative Motion",
};

function Equation({ children }: { children: React.ReactNode }) {
  return <div className="equation"><PhysicsChildren>{children}</PhysicsChildren></div>;
}

function TrainTwoObserversDiagram() {
  return (
    <div className="comparison-grid">
      <figure className="physics-diagram" aria-label="Observer inside train sees passenger stationary">
        <svg viewBox="0 0 620 230" role="img">
          <rect className="motion-car" x="185" y="86" width="250" height="66" rx="18" />
          <circle className="finish-dot" cx="240" cy="164" r="9" />
          <circle className="finish-dot" cx="380" cy="164" r="9" />
          <circle className="start-dot" cx="295" cy="118" r="10" />
          <circle className="start-dot" cx="350" cy="118" r="10" />
          <text x="196" y="66">Observer inside train</text>
          <text x="246" y="202">student stays at same seat</text>
          <text x="214" y="38">v_student,train = 0 m/s</text>
        </svg>
        <figcaption>Inside the train, the seated student is stationary relative to the train.</figcaption>
      </figure>
      <figure className="physics-diagram" aria-label="Platform observer sees train and passenger moving right">
        <svg viewBox="0 0 620 230" role="img">
          <line className="axis-line" x1="70" y1="164" x2="550" y2="164" />
          <circle className="start-dot" cx="105" cy="132" r="12" />
          <text x="72" y="108">platform observer</text>
          <rect className="motion-car" x="255" y="86" width="210" height="56" rx="16" />
          <circle className="finish-dot" cx="302" cy="152" r="8" />
          <circle className="finish-dot" cx="420" cy="152" r="8" />
          <circle className="start-dot" cx="356" cy="114" r="9" />
          <SvgVectorArrow className="vector-line" x1={380} y1={58} x2={510} y2={58} />
          <text x="304" y="38">v_student,ground = +20 m/s</text>
        </svg>
        <figcaption>From the platform, the same seated student moves with the train.</figcaption>
      </figure>
    </div>
  );
}

function DirectionDiagram() {
  return (
    <figure className="physics-diagram" aria-label="Positive and negative velocity directions">
      <svg viewBox="0 0 720 230" role="img">
        <line className="axis-line" x1="90" y1="130" x2="630" y2="130" />
        <line className="origin-tick" x1="360" y1="112" x2="360" y2="148" />
        <text x="348" y="170">0</text>
        <text x="600" y="170">+x</text>
        <text x="92" y="170">-x</text>
        <SvgVectorArrow className="vector-line" x1={360} y1={75} x2={548} y2={75} />
        <text x="410" y="52">+15 m/s means 15 m/s right</text>
        <SvgVectorArrow className="result-vector" x1={360} y1={190} x2={172} y2={190} />
        <text x="178" y="216">-15 m/s means 15 m/s left</text>
      </svg>
    </figure>
  );
}

function VelocityAdditionDiagram() {
  return (
    <figure className="physics-diagram" aria-label="Velocity addition for walking in the same direction as a train">
      <svg viewBox="0 0 720 285" role="img">
        <text x="82" y="44">Train relative to ground</text>
        <SvgVectorArrow className="vector-line" x1={310} y1={38} x2={482} y2={38} />
        <text x="500" y="44">+20 m/s</text>
        <text x="82" y="104">Student relative to train</text>
        <SvgVectorArrow className="result-vector" x1={310} y1={98} x2={372} y2={98} />
        <text x="392" y="104">+2 m/s</text>
        <text x="82" y="165">Combined ground measurement</text>
        <SvgVectorArrow className="vector-line" x1={310} y1={160} x2={498} y2={160} />
        <text x="520" y="166">+22 m/s</text>
        <rect className="motion-car" x="250" y="205" width="220" height="48" rx="15" />
        <circle className="finish-dot" cx="302" cy="262" r="8" />
        <circle className="finish-dot" cx="420" cy="262" r="8" />
        <circle className="start-dot" cx="364" cy="229" r="9" />
      </svg>
    </figure>
  );
}

function SameOppositeExamples() {
  return (
    <div className="comparison-grid">
      <article className="interactive-card" id="section-same-direction">
        <h3>Same Direction</h3>
        <p>Train: +18 m/s. Student relative to train: +2 m/s.</p>
        <Equation>v_student,ground = v_student,train + v_train,ground</Equation>
        <Equation>= +2 + (+18) = +20 m/s</Equation>
        <p>The student moves 20 m/s right relative to the ground.</p>
      </article>
      <article className="interactive-card" id="section-opposite-directions">
        <h3>Opposite Directions</h3>
        <p>Train: +18 m/s. Student relative to train: -2 m/s.</p>
        <Equation>v_student,ground = -2 + 18 = +16 m/s</Equation>
        <p>The student walks left relative to the train but still moves right relative to the ground because the train&apos;s rightward motion is larger.</p>
      </article>
    </div>
  );
}

function MovingWalkwayExample() {
  return (
    <figure className="physics-diagram" aria-label="Moving walkway zero ground velocity example">
      <svg viewBox="0 0 720 230" role="img">
        <rect className="axis-guide" x="120" y="148" width="480" height="18" rx="9" />
        <text x="258" y="190">walkway: +2 m/s relative to ground</text>
        <circle className="start-dot" cx="360" cy="118" r="12" />
        <text x="312" y="94">person walking left</text>
        <SvgVectorArrow className="vector-line" x1={360} y1={72} x2={448} y2={72} />
        <text x="464" y="78">walkway +2</text>
        <SvgVectorArrow className="result-vector" x1={360} y1={44} x2={272} y2={44} />
        <text x="154" y="50">person relative walkway -2</text>
        <circle className="finish-dot" cx="360" cy="204" r="8" />
        <text x="283" y="224">person relative ground = 0</text>
      </svg>
    </figure>
  );
}

function ReverseFrameDiagram() {
  return (
    <figure className="physics-diagram" aria-label="Reversing reference frames changes sign">
      <svg viewBox="0 0 720 220" role="img">
        <line className="axis-line" x1="95" y1="120" x2="625" y2="120" />
        <rect className="motion-car" x="285" y="82" width="150" height="44" rx="14" />
        <circle className="finish-dot" cx="320" cy="134" r="8" />
        <circle className="finish-dot" cx="400" cy="134" r="8" />
        <SvgVectorArrow className="vector-line" x1={438} y1={68} x2={570} y2={68} />
        <text x="410" y="48">v_train,ground = +20 m/s</text>
        <SvgVectorArrow className="result-vector" x1={282} y1={178} x2={150} y2={178} />
        <text x="145" y="202">v_ground,train = -20 m/s</text>
      </svg>
    </figure>
  );
}

function AccelerationTable() {
  return (
    <div className="comparison-grid" id="section-acceleration">
      <article className="interactive-card">
        <h3>Train Frame</h3>
        <ul>
          <li>0 s → 2 m/s</li>
          <li>1 s → 4 m/s</li>
          <li>2 s → 6 m/s</li>
        </ul>
        <p>Velocity increases by +2 m/s each second.</p>
      </article>
      <article className="interactive-card">
        <h3>Ground Frame</h3>
        <ul>
          <li>0 s → 12 m/s</li>
          <li>1 s → 14 m/s</li>
          <li>2 s → 16 m/s</li>
        </ul>
        <p>Velocity also increases by +2 m/s each second.</p>
      </article>
    </div>
  );
}

export function Topic14ReferenceFrames() {
  return (
    <div className="topic-module" data-topic={metadata.topic}>
      <section className="lesson-section">
        <div className="topic-meta">
          <span>Estimated time: 45-60 minutes</span>
          <span>Difficulty: Intermediate</span>
          <span>Skills: creating representations, mathematical reasoning, comparing quantities, vector reasoning, translation, justification</span>
        </div>
        <p className="eyebrow">What You&apos;ll Learn</p>
        <h2>What You&apos;ll Learn</h2>
        <ul>
          <li>Explain what a reference frame is and identify the reference frame of an observer.</li>
          <li>Describe the same motion from different reference frames.</li>
          <li>Explain why two observers can measure different velocities for the same object.</li>
          <li>Determine relative velocity in one dimension using positive and negative directions.</li>
          <li>Translate between physical situations, diagrams, words, and equations.</li>
          <li>Compare measurements made from different inertial reference frames.</li>
          <li>Justify why acceleration remains the same across inertial reference frames.</li>
        </ul>
      </section>

      <section className="lesson-section">
        <h2>1. Is the Person Moving?</h2>
        <p>A train moves right along a track. Inside the train, a student is sitting in a seat.</p>
        <Topic14ChoiceCheck
          question={{
            id: "topic14-is-moving",
            prompt: "Is the student moving?",
            choices: ["Yes", "No", "It depends on the observer"],
            answer: "It depends on the observer",
            hint: "Compare what another passenger sees with what a person standing on the platform sees.",
            explanation: "The student is stationary relative to the train but moving relative to the platform, so the answer depends on the observer.",
          }}
        />
        <TrainTwoObserversDiagram />
        <p>How can both observations be correct? They are measurements made from different perspectives.</p>
      </section>

      <section className="lesson-section" id="section-reference-frame">
        <h2>2. Reference Frame</h2>
        <p>A reference frame is the perspective from which position and motion are measured.</p>
        <div className="concept-callout key-idea">Motion is always described relative to a reference frame.</div>
        <p>The student does not have one universal measured velocity. The measured velocity depends on the reference frame.</p>
        <TrainTwoObserversDiagram />
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Interactive 1</p>
        <h2>3. Change Your Point of View</h2>
        <ChangePointOfViewInteractive />
      </section>

      <section className="lesson-section">
        <h2>4. Direction Still Matters</h2>
        <p>For this lesson, use the same sign convention as before: right is positive and left is negative.</p>
        <DirectionDiagram />
        <p>The sign describes direction. It does not mean &quot;less motion.&quot;</p>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Quick Check 1</p>
        <h2>5. Identify the Reference Frame</h2>
        <Topic14ChoiceCheck
          question={{
            id: "topic14-frame-check",
            prompt: "A student says: \"The passenger has a velocity of 0 m/s.\" What reference frame could make this statement correct?",
            choices: ["The ground, while the train is moving", "The moving train in which the passenger is sitting", "Every possible reference frame", "No reference frame"],
            answer: "The moving train in which the passenger is sitting",
            hint: "Ask: relative to what observer would the passenger's position remain unchanged?",
            explanation: "In the train frame, the seated passenger remains at the same position in the train, so their velocity relative to the train is 0 m/s.",
          }}
        />
      </section>

      <section className="lesson-section">
        <h2>6. Walking Inside a Moving Train</h2>
        <p>A train moves 20 m/s right. Inside the train, a student walks 2 m/s right relative to the train.</p>
        <p>To someone standing on the ground, would the student appear to move at 2 m/s, 20 m/s, or faster than 20 m/s?</p>
        <VelocityAdditionDiagram />
        <p>The student&apos;s motion relative to the train combines with the train&apos;s motion relative to the ground, so the ground observer measures +22 m/s.</p>
      </section>

      <section className="lesson-section">
        <h2>7. Build the Relative-Velocity Relationship</h2>
        <p>Now that the physical situation makes sense, we can write the relationship in words:</p>
        <Equation>velocity of student relative to ground = velocity of student relative to train + velocity of train relative to ground</Equation>
        <div className="interactive-card">
          <h3>Notation Helper</h3>
          <p>In v_AB, the first label tells you what object&apos;s velocity is being described. The second label tells you relative to what reference frame.</p>
          <ul>
            <li>v_student,ground means velocity of the student relative to the ground.</li>
            <li>v_student,train means velocity of the student relative to the train.</li>
            <li>v_train,ground means velocity of the train relative to the ground.</li>
          </ul>
        </div>
        <Equation>v_student,ground = v_student,train + v_train,ground</Equation>
      </section>

      <section className="lesson-section">
        <h2>8. Same and Opposite Directions</h2>
        <SameOppositeExamples />
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Interactive 2</p>
        <h2>9. Walking on the Train</h2>
        <WalkingTrainInteractive />
      </section>

      <section className="lesson-section">
        <h2>10. Can You Stand Still While Walking?</h2>
        <p>A moving walkway travels right at +2 m/s relative to the ground. A person walks left on the walkway at -2 m/s relative to the walkway.</p>
        <MovingWalkwayExample />
        <Equation>v_person,ground = v_person,walkway + v_walkway,ground = -2 + 2 = 0 m/s</Equation>
        <div className="concept-callout key-idea">Whether an object is &quot;moving&quot; depends on the reference frame.</div>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Quick Check 2</p>
        <h2>11. Opposite Motion</h2>
        <p>A bus moves right at +12 m/s. A passenger walks left inside the bus at -3 m/s relative to the bus.</p>
        <OppositeMotionNumericalCheck />
      </section>

      <section className="lesson-section">
        <h2>12. What Does &quot;Relative To&quot; Actually Mean?</h2>
        <div className="comparison-grid">
          <article className="interactive-card">
            <Equation>v_car,ground = +15 m/s</Equation>
            <p>This describes the velocity of the car relative to the ground.</p>
          </article>
          <article className="interactive-card">
            <Equation>v_person,train = -2 m/s</Equation>
            <p>This describes the velocity of the person relative to the train.</p>
          </article>
        </div>
        <p>Always ask two questions: What is moving? Relative to what?</p>
      </section>

      <section className="lesson-section" id="section-reverse-frame">
        <h2>13. Reverse the Reference Frame</h2>
        <p>If a train moves right at +20 m/s relative to the ground, then from the train&apos;s reference frame the ground moves left at -20 m/s.</p>
        <ReverseFrameDiagram />
        <Equation>v_train,ground = +20 m/s</Equation>
        <Equation>v_ground,train = -20 m/s</Equation>
        <div className="concept-callout">Reversing the reference frame reverses the sign: v_A,B = -v_B,A.</div>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">Interactive 3</p>
        <h2>14. Switch the Observer</h2>
        <SwitchObserverInteractive />
      </section>

      <section className="lesson-section">
        <h2>15. Two Cars, Same Direction</h2>
        <p>Car A moves at +25 m/s. Car B moves at +20 m/s. Both velocities are measured relative to the ground.</p>
        <p>Because A gains 5 meters on B every second, Car A moves +5 m/s relative to Car B.</p>
        <Equation>v_A,B = v_A,ground - v_B,ground = 25 - 20 = +5 m/s</Equation>
        <Equation>v_B,A = -5 m/s</Equation>
      </section>

      <section className="lesson-section">
        <h2>16. Two Cars, Opposite Directions</h2>
        <p>Car A moves at +15 m/s. Car B moves at -10 m/s. Their separation changes by 25 meters each second.</p>
        <Equation>v_A,B = v_A,ground - v_B,ground = 15 - (-10) = +25 m/s</Equation>
        <p>Subtracting a negative increases the relative speed because the cars move in opposite directions.</p>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">AP-Style Comparison</p>
        <h2>17. Fast Ground Speeds Can Still Give Small Relative Speed</h2>
        <Topic14ChoiceCheck
          question={{
            id: "topic14-ap-comparison",
            prompt: "Car A moves right at +30 m/s and Car B moves right at +28 m/s. A student says: \"Because both cars are moving very fast, Car A must appear to move very fast relative to Car B.\" Is the claim correct?",
            choices: ["Yes", "No"],
            answer: "No",
            hint: "Compare how much Car A gains on Car B each second.",
            explanation: "Relative to B, A moves only 30 - 28 = 2 m/s. Two objects can each have large ground velocities while having a small velocity relative to each other.",
          }}
        />
      </section>

      <section className="lesson-section">
        <h2>18. Acceleration and Reference Frames</h2>
        <p>Imagine a train moving right at a constant velocity. Inside it, a ball begins accelerating right.</p>
        <p>The train observer and ground observer may disagree about the ball&apos;s velocity. However, in inertial reference frames they agree about how quickly the velocity changes.</p>
        <div className="concept-callout key-idea">For inertial reference frames, acceleration is the same in every inertial reference frame.</div>
        <AccelerationTable />
        <Topic14ChoiceCheck
          question={{
            id: "topic14-acceleration-check",
            prompt: "A train travels at constant velocity. A cart inside the train accelerates at +3 m/s² relative to the train. What acceleration does an observer standing on the ground measure for the cart?",
            choices: ["0 m/s²", "Less than +3 m/s²", "+3 m/s²", "More information is required"],
            answer: "+3 m/s²",
            hint: "Think about what changes when switching between inertial reference frames: velocity or the rate at which velocity changes?",
            explanation: "The observers can measure different velocities, but because the frames are inertial they measure the same acceleration.",
          }}
        />
      </section>

      <section className="lesson-section">
        <h2>19. What Is an Inertial Reference Frame?</h2>
        <p>For AP Physics 1, an inertial reference frame can be thought of as a frame that is not accelerating.</p>
        <ul>
          <li>A train moving in a straight line at constant velocity can serve as an inertial reference frame.</li>
          <li>A stationary ground-based frame is generally treated as inertial for AP Physics problems.</li>
        </ul>
        <p>Unless a problem tells you otherwise, AP Physics 1 problems generally assume the reference frame is inertial.</p>
      </section>

      <section className="lesson-section" id="section-translation">
        <h2>20. Translate Between Representations</h2>
        <p>A train moves right at +15 m/s relative to ground. A passenger walks left at -4 m/s relative to train.</p>
        <TranslationPractice />
      </section>

      <section className="lesson-section" id="section-symbolic">
        <h2>21. Symbolic Reasoning</h2>
        <p>If a train moves with velocity v_TG relative to the ground and a passenger moves with velocity v_PT relative to the train, then:</p>
        <Equation>v_PG = v_PT + v_TG</Equation>
        <p>If the passenger is stationary relative to the ground, then v_PG = 0.</p>
        <Equation>0 = v_PT + v_TG, so v_PT = -v_TG</Equation>
        <p>Physically, the passenger must move relative to the train with equal magnitude and opposite direction to the train&apos;s ground velocity.</p>
      </section>

      <section className="lesson-section">
        <p className="eyebrow">AP-Style Practice</p>
        <h2>22. AP-Style MCQ Practice</h2>
        <Topic14PracticeSet />
      </section>

      <section className="lesson-section">
        <p className="eyebrow">AP-Style Justification</p>
        <h2>23. Justify a Claim</h2>
        <p>Two cars move right. Car A = +22 m/s and Car B = +20 m/s. Student 1 says Car A moves at 22 m/s relative to Car B. Student 2 says Car A moves at 2 m/s relative to Car B.</p>
        <JustificationPractice />
      </section>

      <section className="lesson-section">
        <h2>24. Common Mistakes</h2>
        <div className="comparison-grid">
          {[
            ["An object has one true velocity.", "Velocity is measured relative to a reference frame."],
            ["If I am sitting still, my velocity must be zero.", "You may be stationary in one reference frame while moving in another."],
            ["Relative velocities always add.", "Velocity is a vector. Direction and reference frame determine the sign."],
            ["Fast objects must appear fast relative to each other.", "If they move in the same direction, their relative velocity may be small."],
            ["Different inertial observers measure different accelerations.", "They can measure different positions and velocities, but acceleration is the same across inertial frames."],
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

      <section className="lesson-section">
        <p className="eyebrow">Challenge Problem</p>
        <h2>25. Multi-Stage Relative Motion</h2>
        <p>A train travels right at +20 m/s relative to ground. Student A walks right inside the train at +3 m/s relative to train. Student B walks left inside the train at -2 m/s relative to train.</p>
        <ChallengeProblem />
      </section>

      <Topic14MasteryCheck />

      <section className="lesson-section">
        <h2>Topic Summary</h2>
        <ul>
          <li>Motion is measured relative to a reference frame.</li>
          <li>Different observers can correctly measure different velocities for the same object.</li>
          <li>Relative velocity in this topic remains one-dimensional.</li>
          <li>Direction must be represented consistently with positive and negative signs.</li>
          <li>An object can be stationary in one reference frame and moving in another.</li>
          <li>Reversing the reference frame reverses the sign of relative velocity.</li>
          <li>Different inertial observers may measure different velocities, but they measure the same acceleration.</li>
        </ul>
      </section>

      <section className="lesson-section">
        <h2>Before You Continue</h2>
        <p>Can you answer these without looking back?</p>
        <ol>
          <li>What is a reference frame?</li>
          <li>Can the same object have zero velocity in one reference frame and nonzero velocity in another?</li>
          <li>Why does direction matter in relative-velocity calculations?</li>
          <li>A train travels right while a passenger walks left. How would you determine the passenger&apos;s velocity relative to the ground?</li>
          <li>If Car A moves at +20 m/s and Car B at +18 m/s, how does A move relative to B?</li>
          <li>What happens to relative velocity when the observer/reference frame is reversed?</li>
          <li>Why do observers in different inertial reference frames measure the same acceleration?</li>
        </ol>
        <div className="lesson-nav">
          <Link className="button secondary" href="/ap-physics/physics-1/kinematics/representing-motion">Previous Lesson: Topic 1.3</Link>
          <Link className="button secondary" href="/ap-physics/physics-1/kinematics/reference-frames-relative-motion">Review Topic</Link>
          <Link className="button primary" href="/ap-physics/physics-1/kinematics/vectors-motion-two-dimensions">Continue to Topic 1.5</Link>
        </div>
      </section>
    </div>
  );
}
