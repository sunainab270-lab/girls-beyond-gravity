import { Unit2TestInterface } from "./Unit2TestInteractions";

export function Unit2Test() {
  return (
    <div className="topic-module">
      <section className="lesson-section">
        <div className="topic-meta">
          <span>Estimated time: 90-120 minutes</span>
          <span>Part A: 24 MCQs</span>
          <span>Part B: 4 FRQ-style questions</span>
        </div>
        <p className="eyebrow">Cumulative Assessment</p>
        <h2>AP Physics 1 Unit 2 — Force and Translational Dynamics Unit Test</h2>
        <p>This original AP-style practice assessment covers Topics 2.1-2.9. It is not an official College Board assessment.</p>
        <ul>
          <li>No immediate answer feedback appears during the test.</li>
          <li>You can move between questions, flag items, and submit when ready.</li>
          <li>After submission, you will see skill diagnostics, answer explanations, and FRQ rubrics.</li>
        </ul>
      </section>
      <Unit2TestInterface />
    </div>
  );
}
