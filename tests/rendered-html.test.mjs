import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
 return fetch(`${process.env.TEST_BASE_URL||'http://localhost:3100'}${path}`,{headers:{accept:'text/html'},redirect:'manual'});
}

test("server-renders the Girls Beyond Gravity MVP shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Girls Beyond Gravity \| AP Physics and Aerospace Opportunities<\/title>/i);
  assert.match(html, /Master AP Physics\. Discover global aerospace opportunities\./);
  assert.match(html, /href="\/ap-physics"/);
  assert.match(html, /href="\/opportunities"/);
  assert.match(html, /href="\/about"/);
  assert.match(html, /href="\/sign-in"/);
  assert.match(html, /What is Girls Beyond Gravity\?/);
  assert.match(
    html,
    /Girls Beyond Gravity is a free platform that helps aspiring aerospace students master AP Physics and discover scholarships, undergraduate programs, internships, research opportunities, and competitions\./,
  );
  assert.doesNotMatch(html, />Mentorship</);
  assert.doesNotMatch(html, />Community</);
  assert.doesNotMatch(html, />News</);
  assert.doesNotMatch(html, />Clubs</);
  assert.doesNotMatch(html, />Careers</);
  assert.doesNotMatch(html, />Projects</);
  assert.doesNotMatch(html, />Dashboard</);
  assert.doesNotMatch(html, /href="#ap-physics|href="#opportunity-hub|href="#dashboard/);
  assert.doesNotMatch(html, /portfolio|mentorship|community|clubs|news/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/);
});

test("renders the AP Physics route hierarchy", async () => {
  const academy = await render("/ap-physics");
  assert.equal(academy.status, 200);
  const academyHtml = await academy.text();
  assert.match(academyHtml, /AP Physics 1: Algebra-Based/);
  assert.match(academyHtml, /href="\/ap-physics\/physics-1"/);

  const course = await render("/ap-physics/physics-1");
  assert.equal(course.status, 200);
  const courseHtml = await course.text();
  assert.match(courseHtml, /Content available/);
  assert.match(courseHtml, /href="\/ap-physics\/physics-1\/kinematics"/);
  assert.match(courseHtml, /Force and Translational Dynamics/);
  assert.match(courseHtml, /Work, Energy, and Power/);
  assert.match(courseHtml, /Fluids/);

  const unit = await render("/ap-physics/physics-1/kinematics");
  assert.equal(unit.status, 200);
  const unitHtml = await unit.text();
  assert.match(unitHtml, /Learning objectives/);
  assert.match(unitHtml, /Scalars and Vectors in One Dimension/);
  assert.match(unitHtml, /Displacement, Velocity, and Acceleration/);
  assert.match(unitHtml, /href="\/ap-physics\/physics-1\/kinematics\/scalars-vectors-one-dimension"/);
  assert.match(unitHtml, /href="\/ap-physics\/physics-1\/kinematics\/displacement-velocity-acceleration"/);
  assert.match(unitHtml, /href="\/ap-physics\/physics-1\/kinematics\/review"/);
  assert.match(unitHtml, /href="\/ap-physics\/physics-1\/kinematics\/test"/);
  assert.doesNotMatch(unitHtml, /Distance and Displacement/);
  assert.doesNotMatch(unitHtml, /href="\/ap-physics\/physics-1\/kinematics\/velocity"/);

  const lesson = await render("/ap-physics/physics-1/kinematics/scalars-vectors-one-dimension");
  assert.equal(lesson.status, 200);
  const lessonHtml = await lesson.text();
  assert.match(lessonHtml, /What You&#x27;ll Learn|What You'll Learn/);
  assert.match(lessonHtml, /Vector Explorer/);
  assert.match(lessonHtml, /Does a Negative Sign Mean/);
  assert.match(lessonHtml, /KEY IDEA/);
  assert.match(lessonHtml, /A New Symbol: Δ/);
  assert.match(lessonHtml, /Δx<sub>1<\/sub> = \+6 m/);
  assert.match(lessonHtml, /class="physics-diagram coordinate-axis-diagram"/);
  assert.match(lessonHtml, /class="physics-diagram car-vector-diagram"/);
  assert.match(lessonHtml, /class="interactive-card choice-card"/);
  assert.doesNotMatch(lessonHtml, /Can Left Be Positive/);
  assert.doesNotMatch(lessonHtml, /left as the positive direction/i);
  assert.doesNotMatch(lessonHtml, /Δx1|Δx2|Δxtotal/);
  assert.match(lessonHtml, /AP-Style Practice/);
  assert.match(lessonHtml, /Topic Mastery Check/);
  assert.match(lessonHtml, /AI Study Assistant/);
  assert.match(lessonHtml, /Unit Overview/);
  assert.match(lessonHtml, /Next Lesson/);

  const topic12 = await render("/ap-physics/physics-1/kinematics/displacement-velocity-acceleration");
  assert.equal(topic12.status, 200);
  const topic12Html = await topic12.text();
  assert.match(topic12Html, /Displacement, Velocity, and Acceleration/);
  assert.match(topic12Html, /Position Explorer/);
  assert.match(topic12Html, /Distance vs\. Displacement Explorer/);
  assert.match(topic12Html, /Speeding Up or Slowing Down/);
  assert.match(topic12Html, /Topic Mastery Check/);
  assert.match(topic12Html, /Δx = x<sub>f<\/sub> - x<sub>i<\/sub>/);
  assert.match(topic12Html, /a<sub>avg<\/sub> = Δv \/ Δt/);
  assert.match(topic12Html, /Review Topic/);
  assert.match(topic12Html, /Continue to Topic 1\.3/);
  assert.doesNotMatch(topic12Html, /Topic content placeholder/);

  const topic13 = await render("/ap-physics/physics-1/kinematics/representing-motion");
  assert.equal(topic13.status, 200);
  const topic13Html = await topic13.text();
  assert.match(topic13Html, /Representing Motion/);
  assert.match(topic13Html, /Build the Motion/);
  assert.match(topic13Html, /Graph ↔ Motion/);
  assert.match(topic13Html, /The graph is not a picture of the physical path/i);
  assert.match(topic13Html, /Topic Mastery Check/);
  assert.match(topic13Html, /Continue to Topic 1\.4/);
  assert.match(topic13Html, /placeholder="Enter position with units"/);
  assert.match(topic13Html, /placeholder="Enter displacement with units"/);
  assert.match(topic13Html, /Example format: -3 m/);
  assert.doesNotMatch(topic13Html, /Topic content placeholder/);
  assert.doesNotMatch(topic13Html, /Example: 6 m|Example: 8 m/);

  const topic14 = await render("/ap-physics/physics-1/kinematics/reference-frames-relative-motion");
  assert.equal(topic14.status, 200);
  const topic14Html = await topic14.text();
  assert.match(topic14Html, /Reference Frames and Relative Motion/);
  assert.match(topic14Html, /Change Your Point of View/);
  assert.match(topic14Html, /Walking on the Train/);
  assert.match(topic14Html, /Switch the Observer/);
  assert.match(topic14Html, /acceleration is the same in every inertial reference frame/i);
  assert.match(topic14Html, /AP-Style MCQ Practice/);
  assert.match(topic14Html, /Topic Mastery Check/);
  assert.match(topic14Html, /Continue to Topic 1\.5/);
  assert.match(topic14Html, /placeholder="Enter velocity with units"/);
  assert.match(topic14Html, /Example format: -7 m\/s/);
  assert.doesNotMatch(topic14Html, /Topic content placeholder/);
  assert.doesNotMatch(topic14Html, /boat|crosswind|special relativity/i);

  const topic15 = await render("/ap-physics/physics-1/kinematics/vectors-motion-two-dimensions");
  assert.equal(topic15.status, 200);
  const topic15Html = await topic15.text();
  assert.match(topic15Html, /Vectors and Motion in Two Dimensions/);
  assert.match(topic15Html, /Vector Component Explorer|Interactive vector component explorer/);
  assert.match(topic15Html, /Component sign explorer/i);
  assert.match(topic15Html, /Vector addition lab/i);
  assert.match(topic15Html, /Projectile Motion Explorer/);
  assert.match(topic15Html, /The Drop Comparison/);
  assert.match(topic15Html, /Topic 1\.5 Mastery Check/);
  assert.match(topic15Html, /Next: Unit 1 Review/);
  assert.doesNotMatch(topic15Html, /Topic content placeholder/);
  assert.doesNotMatch(topic15Html, /Topic 1\.6/i);
});

test("renders the completed Unit 1 review and test", async () => {
  const review = await render("/ap-physics/physics-1/kinematics/review");
  assert.equal(review.status, 200);
  const reviewHtml = await review.text();
  assert.match(reviewHtml, /Unit 1 Skill Dashboard/);
  assert.match(reviewHtml, /Core Equation Map/);
  assert.match(reviewHtml, /16 Original AP-Style Review Questions/);
  assert.match(reviewHtml, /FRQ Skill Workshop/);
  assert.match(reviewHtml, /Start Unit Test/);
  assert.doesNotMatch(reviewHtml, /Practice questions will be added for this preview unit/);

  const unitTest = await render("/ap-physics/physics-1/kinematics/test");
  assert.equal(unitTest.status, 200);
  const testHtml = await unitTest.text();
  assert.match(testHtml, /AP Physics 1 Unit 1 — Kinematics Unit Test/);
  assert.match(testHtml, /Part A: 18 MCQs/);
  assert.match(testHtml, /Part B: 4 FRQ-style questions/);
  assert.match(testHtml, /Question Navigator/);
  assert.match(testHtml, /Submit Unit Test/);
  assert.match(testHtml, /Assessment mode: no hints, correctness, or explanations appear until final submission/);
  assert.doesNotMatch(testHtml, /Unit Test Placeholder/);
});

test("renders the completed Unit 2 lessons, review, and test", async () => {
  const unit = await render("/ap-physics/physics-1/force-translational-dynamics");
  assert.equal(unit.status, 200);
  const unitHtml = await unit.text();
  assert.match(unitHtml, /Force and Translational Dynamics/);
  assert.match(unitHtml, /Systems and Center of Mass/);
  assert.match(unitHtml, /Circular Motion/);
  assert.match(unitHtml, /href="\/ap-physics\/physics-1\/force-translational-dynamics\/systems-and-center-of-mass"/);
  assert.match(unitHtml, /href="\/ap-physics\/physics-1\/force-translational-dynamics\/test"/);

  const lessonChecks = [
    ["/systems-and-center-of-mass", /Systems and Center of Mass/, /Center of Mass Explorer|center of mass/i],
    ["/forces-and-free-body-diagrams", /Forces and Free-Body Diagrams/, /Select only real forces/],
    ["/newton-s-third-law", /Newton&#x27;s Third Law|Newton's Third Law/, /Third-law partners|equal magnitude/i],
    ["/newton-s-first-law", /Newton&#x27;s First Law|Newton's First Law/, /Apply a force, then remove it/],
    ["/newton-s-second-law", /Newton&#x27;s Second Law|Newton's Second Law/, /Acceleration follows net force divided by mass/],
    ["/gravitational-force", /Gravitational Force/, /inverse.square/i],
    ["/kinetic-and-static-friction", /Kinetic and Static Friction/, /Static friction adjusts/],
    ["/spring-forces", /Spring Forces/, /spring force points opposite displacement/],
    ["/circular-motion", /Circular Motion/, /Centripetal means inward direction/],
  ];

  for (const [path, heading, uniqueText] of lessonChecks) {
    const response = await render(`/ap-physics/physics-1/force-translational-dynamics${path}`);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, heading);
    assert.match(html, uniqueText);
    assert.match(html, /Quick Check/);
    assert.match(html, /Mastery Check/);
    assert.match(html, /Before You Continue/);
    assert.doesNotMatch(html, /Topic content placeholder/);
    assert.doesNotMatch(html, /AP-Style Reasoning|Mathematical Routine|Scientific Argument/);
  }

  const topic21 = await render("/ap-physics/physics-1/force-translational-dynamics/systems-and-center-of-mass");
  const topic21Html = await topic21.text();
  assert.match(topic21Html, /I can define a system and choose an appropriate system boundary/);
  assert.match(topic21Html, /Ready for the Next Lesson\?/);
  assert.match(topic21Html, /Continue to Topic 2\.2/);

  const review = await render("/ap-physics/physics-1/force-translational-dynamics/review");
  assert.equal(review.status, 200);
  const reviewHtml = await review.text();
  assert.match(reviewHtml, /Unit 2 Skill Dashboard/);
  assert.match(reviewHtml, /FBD Bootcamp/);
  assert.match(reviewHtml, /25(?:<!-- -->)? Original AP-Style Review Questions/);
  assert.match(reviewHtml, /FRQ Skill Workshop/);
  assert.doesNotMatch(reviewHtml, /Practice questions will be added for this preview unit/);

  const unitTest = await render("/ap-physics/physics-1/force-translational-dynamics/test");
  assert.equal(unitTest.status, 200);
  const testHtml = await unitTest.text();
  assert.match(testHtml, /AP Physics 1 Unit 2 — Force and Translational Dynamics Unit Test/);
  assert.match(testHtml, /Part A: 24 MCQs/);
  assert.match(testHtml, /Part B: 4 FRQ-style questions/);
  assert.match(testHtml, /Question Navigator/);
  assert.match(testHtml, /Assessment mode: no hints, correctness, or explanations appear until final submission/);
  assert.doesNotMatch(testHtml, /Unit Test Placeholder/);
});

test("renders the dedicated opportunities and about pages", async () => {
  const opportunities = await render("/opportunities");
  assert.equal(opportunities.status, 200);
  const opportunitiesHtml = await opportunities.text();
  assert.match(opportunitiesHtml, /Opportunity Hub/);
  assert.match(opportunitiesHtml, /Scholarships/);

  const about = await render("/about");
  assert.equal(about.status, 200);
  const aboutHtml = await about.text();
  assert.match(aboutHtml, /About Girls Beyond Gravity/);
  assert.match(aboutHtml, /A clearer path into aerospace starts with access/);
  assert.match(aboutHtml, /Founder photo/);
  assert.match(aboutHtml, /Hi, I’m Sunaina, the founder of Girls Beyond Gravity/);
  assert.match(aboutHtml, /Our Mission/);
  assert.match(aboutHtml, /Explore AP Physics/);
  assert.match(aboutHtml, /Explore Opportunities/);
  assert.match(aboutHtml, /href="\/ap-physics"/);
  assert.match(aboutHtml, /href="\/opportunities"/);
  assert.doesNotMatch(aboutHtml, /mentorship|community forums|career explorer|portfolio builder|AI chatbot|broad opportunity matching/i);
});

test('serves every AP-aligned first-unit lesson, review, and test for the three new courses', async () => {
  const courses = [
    ['physics-2','thermodynamics',9,['kinetic-theory-of-temperature-and-pressure','the-ideal-gas-law','thermal-energy-transfer-and-equilibrium','the-first-law-of-thermodynamics','specific-heat-and-thermal-conductivity','entropy-and-the-second-law-of-thermodynamics']],
    ['physics-c-mechanics','calculus-kinematics',1,['scalars-and-vectors','displacement-velocity-and-acceleration','representing-motion','reference-frames-and-relative-motion','motion-in-two-or-three-dimensions']],
    ['physics-c-em','electrostatics',8,['electric-charge-and-electric-force','conservation-of-electric-charge-and-the-process-of-charging','electric-fields','electric-fields-of-charge-distributions','electric-flux','gauss-s-law']],
  ];
  for (const [course,unit,apNumber,lessons] of courses) {
    const root = `/ap-physics/${course}/${unit}`;
    for (const lesson of lessons) {
      const response = await render(`${root}/${lesson}`);
      assert.equal(response.status,200,`${course}/${lesson}`);
      const html = await response.text();
      assert.match(html,/Learning objectives/);
      assert.match(html,/Worked examples/);
      assert.match(html,/Check your understanding/);
      assert.match(html,/Interactive concept explorer/);
      assert.match(html,/Check the solution/);
      assert.doesNotMatch(html,/Topic content placeholder|Lesson coming soon/);
    }
    const review = await render(`${root}/review`);
    assert.equal(review.status,200);
    const reviewHtml = await review.text();
    assert.match(reviewHtml,/Mixed practice/);
    assert.match(reviewHtml,/Solution and reasoning/);
    const assessment = await render(`${root}/test`);
    assert.equal(assessment.status,200);
    const html = await assessment.text();
    assert.equal((html.match(/name="question-\d+"/g)??[]).length,course==='physics-2'?96:48);
    assert.equal((html.match(/<textarea/g)??[]).length,course==='physics-2'?4:2);
    assert.match(html,/Written responses have a self-review rubric/);
    assert.doesNotMatch(html,/Unit Test Placeholder|Test content has not been added/);
  }
});

test('keeps later units clearly unreleased and distinguishes AP numbering',async()=>{
  const p2 = await render('/ap-physics/physics-2');
  const html = await p2.text();
  assert.match(html,/Electric Force, Field, and Potential/);
  assert.match(html,/Modern Physics/);
  assert.match(html,/AP 9/);
  const pending = await render('/ap-physics/physics-c-mechanics/force-translational-dynamics/test');
  assert.match(await pending.text(),/Unit test coming soon/);
});


test('teaches equation meaning and graph reasoning before exam practice',async()=>{
 for(const route of ['/ap-physics/physics-1/force-translational-dynamics/newton-s-second-law','/ap-physics/physics-2/thermodynamics/the-ideal-gas-law']) {
  const html=await (await render(route)).text();
  for(const label of ['Start with what you know','Symbols and units','Physical meaning','Why it works','When it applies','Translate between representations','Reasoning, error analysis, and challenge','Real College Board questions']) assert.ok(html.includes(label),label);
  assert.ok(html.indexOf('Why it works')<html.indexOf('Check your understanding'));
  assert.match(html,/apcentral.collegeboard.org\/media\/pdf/);
 }
 const speed=await (await render('/ap-physics/physics-2/thermodynamics/kinetic-theory-of-temperature-and-pressure')).text();
 assert.match(speed,/Maxwell–Boltzmann/);assert.match(speed,/root-mean-square/);assert.match(speed,/Probability density/);
 const heating=await (await render('/ap-physics/physics-2/thermodynamics/specific-heat-and-thermal-conductivity')).text();
 assert.match(heating,/Energy added \(kJ\)/);assert.match(heating,/melted fraction/);
});


test('shows official question pages inline with source and reading controls',async()=>{
 const html=await (await render('/ap-physics/physics-2/thermodynamics/the-ideal-gas-law')).text();
 assert.match(html,/class="official-question-viewer"/);
 assert.match(html,/Previous question page/);
 assert.match(html,/Next question page/);
 assert.match(html,/Zoom in/);
 assert.match(html,/Open full-size source/);
 assert.match(html,/<canvas[^>]+role="img"/);
});

test('rejects unknown official-paper identifiers',async()=>{
 const response=await render('/api/official-paper?paper=untrusted');
 assert.equal(response.status,404);
});

test('renders email account forms and protects anonymous account access',async()=>{
 const signin=await (await render('/sign-in')).text();assert.match(signin,/Welcome back/);assert.match(signin,/autocomplete="current-password"/i);assert.match(signin,/Continue with Google/);assert.match(signin,/href="\/sign-up"/);
 const signup=await (await render('/sign-up')).text();assert.match(signup,/autocomplete="new-password"/i);assert.match(signup,/minLength="12"|minlength="12"/);
 const account=await render('/account');assert.ok([302,303,307,308].includes(account.status));assert.match(account.headers.get('location')??'',/\/sign-in$/);
 const google=await render('/api/auth/google');assert.ok([302,303,307].includes(google.status));assert.match(google.headers.get('location')??'',/google-unavailable/);
 const callback=await render('/api/auth/google-callback?state=forged&code=forged');assert.equal(callback.status,303);assert.match(callback.headers.get('location')??'',/google-cancelled/);
});
