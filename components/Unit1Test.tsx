import { Unit1TestInterface } from "./Unit1TestInteractions";

export function Unit1Test() {
  return (
    <div className="topic-module">
      <section className="lesson-section">
        <div className="topic-meta">
          <span>Estimated time: 70-90 minutes</span>
          <span>Part A: 18 MCQs</span>
          <span>Part B: 4 FRQ-style questions</span>
        </div>
        <p className="eyebrow">Cumulative Assessment</p>
        <h2>AP Physics 1 Unit 1 — Kinematics Unit Test</h2>
        <p>This original AP-style practice assessment covers Topics 1.1-1.5. It is not an official College Board assessment.</p>
        <ul>
          <li>No immediate answer feedback appears during the test.</li>
          <li>You can move between questions, flag items, and submit when ready.</li>
          <li>After submission, you will see skill diagnostics and question review.</li>
        </ul>
      </section>
      <Unit1TestInterface />
    </div>
  );
}
