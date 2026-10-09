import { GuidedTeaching, GuidedPractice } from "./GuidedLesson";
import { dynamicsGlossary } from "@/lib/dynamicsGlossary";
import { PhysicsText } from "./PhysicsText";
import type React from "react";

import {
  CenterOfMassExplorer,
  CircularMotionLab,
  FbdBuilder,
  ForceOffExplorer,
  ForcePairExplorer,
  FrictionBox,
  GravityExplorer,
  NewtonSecondLab,
  SpringExplorer,
  SystemBoundaryExplorer,
  Unit2ChoiceCheck,
  Unit2MasteryCheck,
  Unit2NavigationLinks,
} from "./Unit2Interactions";

type Unit2Topic = {
  beforeContinue?: string[];
  coreIdeas: string[];
  equations: string[];
  estimatedTime: string;
  example: string;
  interactive: React.ReactNode;
  mastery: Parameters<typeof Unit2MasteryCheck>[0]["questions"];
  mistake: string;
  nextHref: string;
  previousHref?: string;
  quickCheck: Parameters<typeof Unit2ChoiceCheck>[0]["question"];
  readyText?: string;
  continueLabel?: string;
  slug: string;
  summary: string;
  title: string;
  vocabulary: string[];
};

const base = "/ap-physics/physics-1/force-translational-dynamics";

const topics: Unit2Topic[] = [
  {
    slug: "systems-and-center-of-mass",
    title: "Systems and Center of Mass",
    estimatedTime: "50-65 minutes",
    summary: "Choose useful systems, distinguish internal and external interactions, and model a system's mass-weighted average position.",
    vocabulary: ["system", "surroundings", "system boundary", "internal interaction", "external interaction", "center of mass"],
    equations: ["x_cm = (m₁x₁ + m₂x₂) / (m₁ + m₂)", "v_cm,avg = Δx_cm / Δt"],
    coreIdeas: [
      "A system is the object or collection of objects chosen for analysis.",
      "Everything outside the system boundary is part of the surroundings.",
      "Internal interactions occur between parts of the selected system; external interactions cross the boundary.",
      "Center of mass is the mass-weighted average position of a system.",
      "The center of mass can move smoothly even while individual parts move in complicated ways.",
    ],
    example: "Two carts have masses 2 kg and 6 kg at x = 0 m and x = 4 m. Their center of mass is (2·0 + 6·4)/(8) = 3 m, closer to the larger cart.",
    mistake: "Do not assume the center of mass must be halfway between objects. It is closer to the object or region with more mass.",
    beforeContinue: [
      "I can define a system and choose an appropriate system boundary.",
      "I can distinguish between internal and external forces.",
      "I understand why internal forces cancel in the net-force equation for the system’s center of mass.",
      "I can predict the location of the center of mass qualitatively.",
      "I know that the center of mass is closer to regions with greater mass, not necessarily halfway between objects.",
    ],
    readyText: "In the next lesson you'll identify real forces and represent external interactions with free-body diagrams.",
    continueLabel: "Continue to Topic 2.2",
    interactive: <>
      <SystemBoundaryExplorer />
      <CenterOfMassExplorer />
    </>,
    quickCheck: {
      id: "u2-21-system",
      prompt: "Two carts are connected by a spring. If both carts are chosen as the system, the spring force between them is best classified as:",
      choices: ["external", "internal", "nonexistent", "gravitational"],
      answer: "internal",
      hint: "Ask whether the interaction occurs between objects inside the chosen boundary.",
      explanation: "The spring interaction is between the two carts inside the chosen system, so it is internal.",
      skill: "System boundaries",
    },
    mastery: [
      { id: "u2-21-m1", prompt: "What is the surroundings?", choices: ["Everything inside the boundary", "Everything outside the system boundary", "Only Earth", "Only contact objects"], answer: "Everything outside the system boundary", hint: "", explanation: "", skill: "System and surroundings" },
      { id: "u2-21-m2", prompt: "Equal masses at x = 0 m and x = 8 m have center of mass at:", choices: ["0 m", "2 m", "4 m", "8 m"], answer: "4 m", hint: "", explanation: "", skill: "Center of mass" },
      { id: "u2-21-m3", prompt: "A heavier mass is on the right. The center of mass is:", choices: ["left of midpoint", "at midpoint", "right of midpoint", "outside the system"], answer: "right of midpoint", hint: "", explanation: "", skill: "Mass distribution" },
      { id: "u2-21-m4", prompt: "A useful system choice can make some forces disappear from the external-force analysis because they become:", choices: ["balanced by mass", "internal interactions", "fictional forces", "frictionless forces"], answer: "internal interactions", hint: "", explanation: "", skill: "System choice" },
      { id: "u2-21-m5", prompt: "For two masses, x_cm is a:", choices: ["simple average only", "mass-weighted average", "force ratio", "velocity ratio"], answer: "mass-weighted average", hint: "", explanation: "", skill: "Mathematical model" },
      { id: "u2-21-m6", prompt: "A graph of x_cm versus time has slope representing:", choices: ["mass", "center-of-mass velocity", "net force", "spring constant"], answer: "center-of-mass velocity", hint: "", explanation: "", skill: "Graph interpretation" },
    ],
    nextHref: `${base}/forces-and-free-body-diagrams`,
  },
  {
    slug: "forces-and-free-body-diagrams",
    title: "Forces and Free-Body Diagrams",
    estimatedTime: "70-90 minutes",
    summary: "Identify forces as interactions and draw free-body diagrams containing only forces acting on the selected object.",
    vocabulary: ["force", "interaction", "free-body diagram", "normal force", "tension", "friction", "weight", "net force"],
    equations: ["ΣF_x = sum of x-components", "ΣF_y = sum of y-components", "F_g = mg near Earth"],
    coreIdeas: [
      "A force represents an interaction between objects.",
      "A free-body diagram isolates one object or system and replaces surroundings with force arrows.",
      "Only forces exerted on the selected object belong on that object's FBD.",
      "Motion direction is not automatically force direction.",
      "Normal force is a contact force perpendicular to a surface; it is not always equal to weight.",
      "Action-reaction partners act on different objects, so they do not appear together on one object's FBD.",
    ],
    example: "For a book resting on a horizontal table, the book's FBD includes Earth on book (weight downward) and table on book (normal force upward). It does not include a force of rest or a force of motion.",
    mistake: "Do not draw a force in the direction of motion unless a real interaction produces that force.",
    interactive: <FbdBuilder />,
    quickCheck: {
      id: "u2-22-fbd",
      prompt: "A box slides right while slowing down on a rough horizontal floor. Which horizontal force belongs on the box's FBD?",
      choices: ["force of motion right", "friction left", "normal force right", "weight right"],
      answer: "friction left",
      hint: "For sliding surfaces, friction opposes relative sliding.",
      explanation: "The real horizontal interaction is kinetic friction from the floor on the box, directed left.",
      skill: "FBD construction",
    },
    mastery: [
      { id: "u2-22-m1", prompt: "A free-body diagram shows forces acting:", choices: ["on the selected object", "by the selected object", "only to the right", "only if moving"], answer: "on the selected object", hint: "", explanation: "", skill: "FBD object" },
      { id: "u2-22-m2", prompt: "Which is not a legitimate force name?", choices: ["normal force", "tension", "force of motion", "weight"], answer: "force of motion", hint: "", explanation: "", skill: "Force identification" },
      { id: "u2-22-m3", prompt: "Normal force is always:", choices: ["upward", "equal to weight", "perpendicular to surface", "larger than friction"], answer: "perpendicular to surface", hint: "", explanation: "", skill: "Normal force" },
      { id: "u2-22-m4", prompt: "Action-reaction pair forces act on:", choices: ["same object", "different objects", "no objects", "only systems at rest"], answer: "different objects", hint: "", explanation: "", skill: "Third-law boundary" },
      { id: "u2-22-m5", prompt: "An angled tension can be represented by:", choices: ["only a vertical force", "horizontal and vertical components", "mass components", "a force of speed"], answer: "horizontal and vertical components", hint: "", explanation: "", skill: "Force components" },
      { id: "u2-22-m6", prompt: "Net force is found by:", choices: ["adding force vectors", "adding speeds", "multiplying all forces", "choosing the longest arrow only"], answer: "adding force vectors", hint: "", explanation: "", skill: "Net force" },
      { id: "u2-22-m7", prompt: "A hanging mass at rest has which forces?", choices: ["tension up and weight down", "normal up and weight down", "motion up and weight down", "tension down only"], answer: "tension up and weight down", hint: "", explanation: "", skill: "Common FBDs" },
    ],
    previousHref: `${base}/systems-and-center-of-mass`,
    nextHref: `${base}/newton-s-third-law`,
  },
  {
    slug: "newton-s-third-law",
    title: "Newton's Third Law",
    estimatedTime: "45-60 minutes",
    summary: "Identify interaction pairs and distinguish equal forces from unequal accelerations.",
    vocabulary: ["interaction pair", "Newton's third law", "force of A on B", "force of B on A", "equal magnitude", "opposite direction"],
    equations: ["F_A on B = -F_B on A"],
    coreIdeas: [
      "Forces arise from interactions between objects.",
      "When object A exerts a force on B, object B exerts an equal-magnitude opposite-direction force on A.",
      "Third-law pair forces act on different objects.",
      "A massive truck and a small car exert equal forces on each other during a collision.",
      "Equal forces do not imply equal accelerations because acceleration also depends on mass.",
    ],
    example: "If a skater pushes another skater, each skater experiences a force from the other. The forces have equal magnitude and opposite direction, but the lighter skater may accelerate more.",
    mistake: "Do not put both forces in a third-law pair on the same free-body diagram.",
    interactive: <ForcePairExplorer />,
    quickCheck: {
      id: "u2-23-pair",
      prompt: "A truck collides with a small car. Which object exerts the greater force during the interaction?",
      choices: ["truck", "car", "both forces are equal in magnitude", "the faster object"],
      answer: "both forces are equal in magnitude",
      hint: "Newton's third law is about the interaction force pair, not acceleration.",
      explanation: "The truck and car exert equal-magnitude forces on each other, but their accelerations can differ because their masses differ.",
      skill: "Third-law reasoning",
    },
    mastery: [
      { id: "u2-23-m1", prompt: "Third-law pair forces have:", choices: ["equal magnitude", "same direction", "same object", "same acceleration"], answer: "equal magnitude", hint: "", explanation: "", skill: "Pair properties" },
      { id: "u2-23-m2", prompt: "Third-law pair forces act on:", choices: ["one object", "different objects", "only the heavier object", "only objects at rest"], answer: "different objects", hint: "", explanation: "", skill: "Pair objects" },
      { id: "u2-23-m3", prompt: "Earth pulls a falling ball downward. The partner force is:", choices: ["ball pulls Earth upward", "air pulls ball up", "ball's weight", "normal force"], answer: "ball pulls Earth upward", hint: "", explanation: "", skill: "Partner identification" },
      { id: "u2-23-m4", prompt: "Equal third-law forces can produce different accelerations because:", choices: ["masses differ", "forces are not real", "directions are same", "time stops"], answer: "masses differ", hint: "", explanation: "", skill: "Mass misconception" },
      { id: "u2-23-m5", prompt: "A person pushes a wall. The wall:", choices: ["does not push back", "pushes back equally", "pushes harder", "pushes only if moving"], answer: "pushes back equally", hint: "", explanation: "", skill: "Interaction pairs" },
      { id: "u2-23-m6", prompt: "Both pair forces on one FBD is:", choices: ["correct", "incorrect", "required for rest", "only for gravity"], answer: "incorrect", hint: "", explanation: "", skill: "FBD distinction" },
    ],
    previousHref: `${base}/forces-and-free-body-diagrams`,
    nextHref: `${base}/newton-s-first-law`,
  },
  {
    slug: "newton-s-first-law",
    title: "Newton's First Law",
    estimatedTime: "45-60 minutes",
    summary: "Connect zero net force to zero acceleration, equilibrium, rest, and constant velocity.",
    vocabulary: ["inertia", "equilibrium", "net force", "constant velocity", "inertial reference frame"],
    equations: ["ΣF = 0 → a = 0", "constant velocity can be zero or nonzero"],
    coreIdeas: [
      "An inertial reference frame is one in which an object with zero net force moves at constant velocity. Newton’s laws here are applied in inertial frames.",
      "Motion does not require a net force.",
      "If net force is zero, acceleration is zero.",
      "An object at rest is one case of constant velocity.",
      "An object moving at constant velocity also has zero net force.",
      "Friction can slow an object because it provides a net force.",
    ],
    example: "A puck gliding on nearly frictionless ice continues at constant velocity after the push ends. If friction acts, the puck slows because friction creates a net force.",
    mistake: "Do not say no force means an object must stop. No net force means velocity stays constant.",
    interactive: <ForceOffExplorer />,
    quickCheck: {
      id: "u2-24-first-law",
      prompt: "If an object moves right at constant velocity, what is the net force on it?",
      choices: ["rightward", "leftward", "zero", "downward only"],
      answer: "zero",
      hint: "Constant velocity means acceleration is zero.",
      explanation: "By Newton's first law, constant velocity requires zero net force.",
      skill: "Equilibrium",
    },
    mastery: [
      { id: "u2-24-m1", prompt: "Zero net force means:", choices: ["zero velocity", "zero acceleration", "zero mass", "zero position"], answer: "zero acceleration", hint: "", explanation: "", skill: "First law" },
      { id: "u2-24-m2", prompt: "Rest is:", choices: ["not equilibrium", "constant velocity of zero", "always accelerating", "always frictionless"], answer: "constant velocity of zero", hint: "", explanation: "", skill: "Rest vs motion" },
      { id: "u2-24-m3", prompt: "An object moving at constant velocity has:", choices: ["ΣF = 0", "ΣF = mv", "ΣF upward only", "ΣF increasing"], answer: "ΣF = 0", hint: "", explanation: "", skill: "Force condition" },
      { id: "u2-24-m4", prompt: "Friction slows a sliding block because:", choices: ["motion fades naturally", "friction provides net force", "mass disappears", "normal force vanishes"], answer: "friction provides net force", hint: "", explanation: "", skill: "Friction distinction" },
      { id: "u2-24-m5", prompt: "Equilibrium includes:", choices: ["only rest", "only upward motion", "rest and constant velocity", "only circular motion"], answer: "rest and constant velocity", hint: "", explanation: "", skill: "Equilibrium" },
      { id: "u2-24-m6", prompt: "On a velocity-time graph, zero net force corresponds to:", choices: ["constant velocity", "curved velocity", "vertical velocity line", "random velocity"], answer: "constant velocity", hint: "", explanation: "", skill: "Graph translation" },
    ],
    previousHref: `${base}/newton-s-third-law`,
    nextHref: `${base}/newton-s-second-law`,
  },
  {
    slug: "newton-s-second-law",
    title: "Newton's Second Law",
    estimatedTime: "75-95 minutes",
    summary: "Use net force and mass to predict acceleration, build FBD-to-equation models, and interpret force-acceleration data.",
    vocabulary: ["net force", "mass", "inertia", "acceleration", "connected system", "force-acceleration graph"],
    equations: ["ΣF = ma", "a = ΣF / m", "slope of net force vs a graph = mass"],
    coreIdeas: [
      "Acceleration is caused by net force, not by an individual force alone.",
      "For the same mass, greater net force creates greater acceleration.",
      "For the same net force, greater mass creates smaller acceleration.",
      "Always draw an FBD before writing Newton's second-law equations.",
      "For combined systems, internal forces cancel from the external analysis.",
    ],
    example: "A 4 kg cart has 18 N applied right and 6 N friction left. ΣF = 12 N, so a = 12/4 = 3 m/s² right.",
    mistake: "Do not write F = ma for one random force. Newton's second law uses net force.",
    interactive: <NewtonSecondLab />,
    quickCheck: {
      id: "u2-25-second-law",
      prompt: "A 5 kg object has net force +20 N. What is its acceleration?",
      choices: ["+4 m/s²", "+10 m/s²", "+20 m/s²", "+100 m/s²"],
      answer: "+4 m/s²",
      hint: "Use a = ΣF/m.",
      explanation: "a = 20 N / 5 kg = +4 m/s².",
      skill: "Newton's second law",
    },
    mastery: [
      { id: "u2-25-m1", prompt: "Newton's second law uses:", choices: ["net force", "largest force", "velocity", "distance"], answer: "net force", hint: "", explanation: "", skill: "Net force" },
      { id: "u2-25-m2", prompt: "Double net force with same mass:", choices: ["doubles acceleration", "halves acceleration", "no change", "makes mass double"], answer: "doubles acceleration", hint: "", explanation: "", skill: "Proportions" },
      { id: "u2-25-m3", prompt: "Double mass with same net force:", choices: ["doubles acceleration", "halves acceleration", "no change", "zero acceleration"], answer: "halves acceleration", hint: "", explanation: "", skill: "Mass effect" },
      { id: "u2-25-m4", prompt: "In net force vs a data, slope represents:", choices: ["mass", "time", "velocity", "friction coefficient"], answer: "mass", hint: "", explanation: "", skill: "Graph interpretation" },
      { id: "u2-25-m5", prompt: "For connected carts as one system, tension between carts is:", choices: ["external", "internal", "weight", "normal"], answer: "internal", hint: "", explanation: "", skill: "Connected systems" },
      { id: "u2-25-m6", prompt: "T - mg = ma could describe:", choices: ["hanging mass accelerating up", "book on table", "flat car turn", "spring at rest only"], answer: "hanging mass accelerating up", hint: "", explanation: "", skill: "Equation translation" },
      { id: "u2-25-m7", prompt: "Acceleration direction is direction of:", choices: ["net force", "velocity always", "largest mass", "normal force always"], answer: "net force", hint: "", explanation: "", skill: "Direction" },
    ],
    previousHref: `${base}/newton-s-first-law`,
    nextHref: `${base}/gravitational-force`,
  },
  {
    slug: "gravitational-force",
    title: "Gravitational Force",
    estimatedTime: "70-90 minutes",
    summary: "Model universal gravitation, near-Earth weight, gravitational fields, and apparent weight.",
    vocabulary: ["universal gravitation", "gravitational field", "weight", "apparent weight", "free fall", "inverse square"],
    equations: ["F_g = Gm₁m₂/r²", "g = F_g/m", "F_g = mg near Earth", "apparent weight = F_N"],
    coreIdeas: [
      "Every pair of masses gravitationally attracts.",
      "Universal gravitation grows with each mass and decreases with the square of center-to-center separation.",
      "Near Earth's surface, weight can be modeled as F_g = mg.",
      "Mass is matter/inertia; weight is gravitational force.",
      "Apparent weight is the normal force magnitude, so it changes in accelerating elevators.",
      "Weightlessness in free fall does not mean gravity is absent.",
    ],
    example: "If separation doubles while masses remain constant, gravitational force becomes one-fourth as large because r² appears in the denominator.",
    mistake: "Do not use surface-to-surface distance for r in universal gravitation; use center-to-center separation.",
    interactive: <GravityExplorer />,
    quickCheck: {
      id: "u2-26-gravity",
      prompt: "If the distance between two masses doubles, the gravitational force becomes:",
      choices: ["twice as large", "half as large", "one-fourth as large", "four times as large"],
      answer: "one-fourth as large",
      hint: "The distance is squared in the denominator.",
      explanation: "F_g ∝ 1/r², so doubling r makes the force 1/4 as large.",
      skill: "Inverse-square reasoning",
    },
    mastery: [
      { id: "u2-26-m1", prompt: "Universal gravitation depends on:", choices: ["masses and center separation", "surface color", "speed only", "normal force only"], answer: "masses and center separation", hint: "", explanation: "", skill: "Variables" },
      { id: "u2-26-m2", prompt: "Near Earth, weight is:", choices: ["mg", "ma only", "μN", "kx"], answer: "mg", hint: "", explanation: "", skill: "Weight" },
      { id: "u2-26-m3", prompt: "Apparent weight corresponds to:", choices: ["normal force", "mass", "velocity", "gravitational field only"], answer: "normal force", hint: "", explanation: "", skill: "Apparent weight" },
      { id: "u2-26-m4", prompt: "In free fall, apparent weight is zero because:", choices: ["gravity absent", "normal force zero", "mass zero", "Earth stops pulling"], answer: "normal force zero", hint: "", explanation: "", skill: "Weightlessness" },
      { id: "u2-26-m5", prompt: "Gravitational field strength is:", choices: ["F_g/m", "m/F_g", "kx", "μN"], answer: "F_g/m", hint: "", explanation: "", skill: "Field model" },
      { id: "u2-26-m6", prompt: "Doubling one mass makes F_g:", choices: ["double", "half", "quarter", "unchanged"], answer: "double", hint: "", explanation: "", skill: "Factor reasoning" },
      { id: "u2-26-m7", prompt: "The object pulls Earth with force:", choices: ["equal in magnitude to Earth's pull on object", "zero", "greater always", "only in orbit"], answer: "equal in magnitude to Earth's pull on object", hint: "", explanation: "", skill: "Third-law connection" },
    ],
    previousHref: `${base}/newton-s-second-law`,
    nextHref: `${base}/kinetic-and-static-friction`,
  },
  {
    slug: "kinetic-and-static-friction",
    title: "Kinetic and Static Friction",
    estimatedTime: "65-80 minutes",
    summary: "Distinguish static and kinetic friction, model maximum static friction, and interpret friction graphs.",
    vocabulary: ["static friction", "kinetic friction", "coefficient of friction", "normal force", "maximum static friction", "relative motion"],
    equations: ["f_k = μ_kN", "f_s ≤ μ_sN", "f_s,max = μ_sN"],
    coreIdeas: [
      "Kinetic friction acts when surfaces slide relative to each other.",
      "Static friction adjusts to prevent slipping up to a maximum value.",
      "Static friction is not automatically equal to μ_sN.",
      "Friction direction opposes relative sliding or impending sliding.",
      "The normal force affects friction magnitude.",
      "Friction graphs reveal the transition from static to kinetic friction.",
    ],
    example: "If a 12 N push does not move a box and the maximum static friction is 20 N, the actual static friction is 12 N, not 20 N.",
    mistake: "Do not write f_s = μ_sN unless the object is just about to slip. In general f_s ≤ μ_sN.",
    interactive: <FrictionBox />,
    quickCheck: {
      id: "u2-27-friction",
      prompt: "A box remains at rest while a 6 N horizontal push is applied. If f_s,max = 18 N, the static friction force is:",
      choices: ["0 N", "6 N", "18 N", "24 N"],
      answer: "6 N",
      hint: "Static friction adjusts to what is needed to prevent slipping.",
      explanation: "The box is at rest, so static friction balances the 6 N push.",
      skill: "Static friction",
    },
    mastery: [
      { id: "u2-27-m1", prompt: "Kinetic friction applies when:", choices: ["surfaces slide", "object is always still", "only in air", "normal force zero"], answer: "surfaces slide", hint: "", explanation: "", skill: "Kinetic friction" },
      { id: "u2-27-m2", prompt: "Actual static friction is:", choices: ["always μ_sN", "adjustable up to maximum", "always zero", "always kinetic"], answer: "adjustable up to maximum", hint: "", explanation: "", skill: "Static friction" },
      { id: "u2-27-m3", prompt: "Maximum static friction equals:", choices: ["μ_sN", "μ_kN", "ma", "kx"], answer: "μ_sN", hint: "", explanation: "", skill: "Maximum static" },
      { id: "u2-27-m4", prompt: "Kinetic friction magnitude is:", choices: ["μ_kN", "μ_sN always", "mg only", "v²/r"], answer: "μ_kN", hint: "", explanation: "", skill: "Kinetic model" },
      { id: "u2-27-m5", prompt: "Friction direction is based on:", choices: ["relative sliding/impending sliding", "north always", "velocity magnitude only", "mass color"], answer: "relative sliding/impending sliding", hint: "", explanation: "", skill: "Direction" },
      { id: "u2-27-m6", prompt: "A friction graph before slipping typically:", choices: ["rises with applied force", "is always flat zero", "is circular", "has no relationship"], answer: "rises with applied force", hint: "", explanation: "", skill: "Graph skill" },
      { id: "u2-27-m7", prompt: "An experiment for μ_k can use slope of:", choices: ["friction vs normal force", "mass vs color", "time vs name", "velocity vs position only"], answer: "friction vs normal force", hint: "", explanation: "", skill: "Experimental design" },
    ],
    previousHref: `${base}/gravitational-force`,
    nextHref: `${base}/spring-forces`,
  },
  {
    slug: "spring-forces",
    title: "Spring Forces",
    estimatedTime: "55-70 minutes",
    summary: "Use Hooke's law to describe restoring force, extension or compression from relaxed length, and spring-force graphs.",
    vocabulary: ["spring force", "restoring force", "relaxed length", "spring constant", "stretch", "compression", "Hooke's law"],
    equations: ["F_s = -kx", "|F_s| = k|x|", "slope of F_s vs x graph = -k"],
    coreIdeas: [
      "A spring force is a restoring force.",
      "In F_s = -kx, x is the signed extension or compression from the spring’s relaxed (unstretched) length. An ideal spring has negligible mass and obeys Hooke’s law.",
      "The negative sign in F_s = -kx means the spring force points opposite displacement.",
      "Larger spring constant means a stiffer spring.",
      "A force-displacement graph can be used to determine spring constant. A vertical hanging mass can be in equilibrium with a stretched spring: the nonzero spring force balances weight.",
    ],
    example: "A spring with k = 30 N/m stretched +0.20 m exerts F_s = -6 N, meaning 6 N opposite the stretch direction.",
    mistake: "Do not interpret the negative sign as meaning the force is 'less.' It tells direction relative to the chosen positive axis.",
    interactive: <SpringExplorer />,
    quickCheck: {
      id: "u2-28-spring",
      prompt: "A spring is stretched to +x. The spring force points:",
      choices: ["positive direction", "negative direction", "zero always", "downward always"],
      answer: "negative direction",
      hint: "The spring force opposes extension or compression from the relaxed length.",
      explanation: "For x > 0, F_s = -kx is negative, so the force opposes the stretch.",
      skill: "Hooke's law direction",
    },
    mastery: [
      { id: "u2-28-m1", prompt: "For a horizontal spring with no other horizontal force, its restoring force points:", choices: ["toward equilibrium", "away from equilibrium", "always upward", "with velocity always"], answer: "toward equilibrium", hint: "", explanation: "", skill: "Restoring force" },
      { id: "u2-28-m2", prompt: "In F_s = -kx, k represents:", choices: ["spring constant", "mass", "friction", "radius"], answer: "spring constant", hint: "", explanation: "", skill: "Variables" },
      { id: "u2-28-m3", prompt: "If k doubles for same x, force magnitude:", choices: ["doubles", "halves", "zeroes", "unchanged"], answer: "doubles", hint: "", explanation: "", skill: "Factor reasoning" },
      { id: "u2-28-m4", prompt: "At the relaxed length x = 0, spring force is:", choices: ["0", "k", "mg", "maximum"], answer: "0", hint: "", explanation: "", skill: "Equilibrium" },
      { id: "u2-28-m5", prompt: "The negative sign means:", choices: ["opposite displacement", "force is fake", "spring is weak", "mass is negative"], answer: "opposite displacement", hint: "", explanation: "", skill: "Direction" },
      { id: "u2-28-m6", prompt: "Spring constant can be found from:", choices: ["magnitude of force-displacement graph slope", "color", "time only", "normal force graph"], answer: "magnitude of force-displacement graph slope", hint: "", explanation: "", skill: "Graph/experiment" },
    ],
    previousHref: `${base}/kinetic-and-static-friction`,
    nextHref: `${base}/circular-motion`,
  },
  {
    slug: "circular-motion",
    title: "Circular Motion",
    estimatedTime: "85-105 minutes",
    summary: "Analyze circular motion using tangent velocity, inward acceleration, and real forces that provide inward net force.",
    vocabulary: ["circular motion", "tangential velocity", "centripetal acceleration", "inward net force", "period", "frequency", "orbit", "banked curve"],
    equations: ["a_c = v²/r", "ΣF_inward = ma_c", "T = 1/f", "v = 2πr/T", "for circular orbits: gravity supplies inward net force"],
    coreIdeas: [
      "An object moving at constant speed in a circle is accelerating because velocity direction changes.",
      "Velocity is tangent to the circular path.",
      "Centripetal acceleration points toward the center.",
      "Centripetal is a direction of net force, not a separate physical force.",
      "Real forces such as tension, gravity, friction, or normal force can supply inward net force.",
      "Tangential acceleration changes speed; centripetal acceleration changes direction.",
      "For circular orbits, gravity supplies the inward net force.",
    ],
    example: "A 2 kg object moving at 6 m/s in a radius 4 m circle has a_c = 9 m/s² and requires inward net force 18 N.",
    mistake: "Do not invent an outward force in an inertial-frame FBD. The required net force points inward.",
    interactive: <CircularMotionLab />,
    quickCheck: {
      id: "u2-29-circular",
      prompt: "A car rounds a flat curve at constant speed. Which force can provide the inward net force?",
      choices: ["static friction", "force of motion", "centripetal force as a new force", "weight only"],
      answer: "static friction",
      hint: "Name the real interaction that points inward on a flat road.",
      explanation: "Static friction from the road can point inward and supply the centripetal net force.",
      skill: "Circular FBD",
    },
    mastery: [
      { id: "u2-29-m1", prompt: "For uniform circular motion, acceleration points:", choices: ["inward", "tangent", "outward as a real force", "nowhere"], answer: "inward", hint: "", explanation: "", skill: "Centripetal acceleration" },
      { id: "u2-29-m2", prompt: "Velocity points:", choices: ["tangent to path", "inward", "outward always", "zero"], answer: "tangent to path", hint: "", explanation: "", skill: "Velocity direction" },
      { id: "u2-29-m3", prompt: "Centripetal force is best described as:", choices: ["direction of net force", "new physical force", "friction always", "gravity absent"], answer: "direction of net force", hint: "", explanation: "", skill: "Language rule" },
      { id: "u2-29-m4", prompt: "a_c equals:", choices: ["v²/r", "vr", "r²/v", "mg"], answer: "v²/r", hint: "", explanation: "", skill: "Equation" },
      { id: "u2-29-m5", prompt: "Doubling speed changes a_c by factor:", choices: ["4", "2", "1/2", "1/4"], answer: "4", hint: "", explanation: "", skill: "Factor reasoning" },
      { id: "u2-29-m6", prompt: "In a circular orbit, inward force is supplied by:", choices: ["gravity", "force of motion", "normal force only", "spring only"], answer: "gravity", hint: "", explanation: "", skill: "Orbit" },
      { id: "u2-29-m7", prompt: "Tangential acceleration changes:", choices: ["speed", "mass", "radius only", "gravity constant"], answer: "speed", hint: "", explanation: "", skill: "Nonuniform circular motion" },
      { id: "u2-29-m8", prompt: "Period and frequency satisfy:", choices: ["T = 1/f", "T = f", "T = r/f", "T = mg"], answer: "T = 1/f", hint: "", explanation: "", skill: "Period/frequency" },
    ],
    previousHref: `${base}/spring-forces`,
    nextHref: `${base}/review`,
  },
];

export const unit2Topics = topics;

export function Unit2DynamicsTopic({ lessonSlug }: { lessonSlug: string }) {
  const topic = topics.find((item) => item.slug === lessonSlug) ?? topics[0];
  const topicIndex = topics.findIndex((item) => item.slug === topic.slug);
  const nextTopic = topics[topicIndex + 1];
  const apTopic = `2.${topicIndex + 1}`;
  const checklist = topic.beforeContinue ?? topic.coreIdeas.slice(0, 5).map((idea) => `I can explain that ${idea.charAt(0).toLowerCase()}${idea.slice(1)}`);
  const readyText = topic.readyText ?? (nextTopic
    ? `In the next lesson you'll build on this model with ${nextTopic.title.toLowerCase()}.`
    : "Next, you'll bring the full unit together in the Unit 2 Review.");
  const continueLabel = topic.continueLabel ?? (nextTopic ? `Continue to Topic 2.${topicIndex + 2}` : "Go to Unit 2 Review");

  return (
    <div className="topic-module" data-unit2-topic={topic.slug}>
      <section className="lesson-section">
        <div className="topic-meta">
          <span>Estimated time: 70–100 minutes, with practice</span>
          <span>Unit 2: Force and Translational Dynamics</span>
          <span>AP skills: representations, mathematical routines, scientific argumentation</span>
        </div>
        <p className="eyebrow">What You&apos;ll Learn</p>
        <h2>{topic.title}</h2>
        <p>{topic.summary}</p>
        <div className="filter-row">{topic.vocabulary.map((word) => <span className="chip" key={word}>{word}</span>)}</div>
      </section>

      <section className="lesson-section"><h2>Key vocabulary</h2><dl className="lesson-terms">{topic.vocabulary.map(term=><div key={term}><dt>{term}</dt><dd><PhysicsText text={dynamicsGlossary[term]}/></dd></div>)}</dl></section>
      <p className="notice">AP Topic {apTopic} • <a href="https://apcentral.collegeboard.org/media/pdf/ap-physics-1-course-and-exam-description.pdf" target="_blank" rel="noreferrer">College Board framework</a>. Learn the physical model before attempting exam practice.</p>
      <GuidedTeaching topic={apTopic} visual={<><h3>Interactive Exploration</h3>{topic.interactive}</>} />
      <section className="lesson-section"><h2>Common mistake</h2><p>{topic.mistake}</p></section>
      <GuidedPractice topic={apTopic}/>
      <section className="lesson-section"><h2>Quick Check</h2><Unit2ChoiceCheck question={topic.quickCheck}/></section>

      <Unit2MasteryCheck topicTitle={topic.title} questions={topic.mastery} />

      <section className="lesson-section">
        <h2>Before You Continue</h2>
        <ul className="checklist">
          {checklist.map((item) => (
            <li key={item}>
              <span aria-hidden="true">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <article className="interactive-card">
          <h3>Ready for the Next Lesson?</h3>
          <p>{readyText}</p>
          <Unit2NavigationLinks previousHref={topic.previousHref} nextHref={topic.nextHref} continueLabel={continueLabel} />
        </article>
      </section>
    </div>
  );
}
