import { unitOnes } from "./unitOne";
import { siteConfig } from "./config";

export const brand = siteConfig;

export const demoStudent = {
  name: "Maya R.",
  age: 15,
  grade: "High school",
  country: "United Arab Emirates",
  region: "Dubai",
  citizenship: "United Arab Emirates",
  interests: ["Rocketry", "Satellites", "Software"],
  preferredType: "Summer program",
  physicsConfidence: "Building confidence",
};

export const curriculum = [
  {
    level: "Grade 9",
    difficulty: "Foundations",
    units: [
      "Introduction to Physics",
      "Motion",
      "Forces",
      "Energy",
      "Momentum",
      "Introduction to Flight and Space",
    ],
  },
  {
    level: "Grade 10",
    difficulty: "Core Physics",
    units: [
      "Advanced Motion",
      "Dynamics",
      "Waves and Sound",
      "Electricity and Circuits",
      "Thermal Physics",
      "Physics of Aircraft",
    ],
  },
  {
    level: "Grade 11",
    difficulty: "Advanced Physics",
    units: [
      "Advanced Mechanics",
      "Gravitation and Orbits",
      "Fluid Mechanics",
      "Electricity and Magnetism",
      "Thermodynamics",
      "Oscillations and Waves",
      "Introduction to Propulsion",
    ],
  },
  {
    level: "Grade 12",
    difficulty: "Aerospace and College Preparation",
    units: [
      "Orbital Mechanics",
      "Aerodynamics",
      "Rocket Propulsion",
      "Aircraft Performance",
      "Spacecraft Systems",
      "Modern and Space Physics",
      "Engineering Design Project",
    ],
  },
];

export const motionUnit = {
  title: "AP Physics Foundations - Motion",
  status: "Demonstration content reorganized for AP preparation",
  objectives: [
    "Describe position, distance, displacement, speed, velocity, and acceleration.",
    "Interpret simple motion graphs.",
    "Connect one-dimensional motion to aircraft runway and spacecraft docking scenarios.",
  ],
  vocabulary: ["position", "displacement", "velocity", "acceleration", "slope", "kinematics"],
  lessons: [
    {
      title: "Distance and displacement",
      summary:
        "Distance measures the total path traveled. Displacement measures the change in position from start to finish, including direction.",
      example:
        "A rover drives 30 m east and then 10 m west. It traveled 40 m of distance, but its displacement is 20 m east.",
    },
    {
      title: "Speed and velocity",
      summary:
        "Speed is how fast something moves. Velocity includes speed and direction, which matters in flight planning and orbital maneuvers.",
      example:
        "If a drone moves 120 m north in 20 s, its average velocity is 6 m/s north.",
    },
    {
      title: "Acceleration",
      summary:
        "Acceleration is the rate velocity changes. A spacecraft can accelerate by speeding up, slowing down, or changing direction.",
      example:
        "A launch cart changes from 2 m/s to 10 m/s in 4 s. Its acceleration is 2 m/s^2.",
    },
  ],
  practice: [
    {
      prompt: "A glider moves 18 m in 6 s. What is its average speed?",
      answer: "3 m/s",
      hint: "Use speed = distance / time.",
    },
    {
      prompt: "A rover returns to its starting point after traveling 50 m. What is its displacement?",
      answer: "0 m",
      hint: "Displacement compares final position to starting position.",
    },
  ],
};

export const motionQuestions = [
  {
    id: "q1",
    type: "multiple-choice",
    topic: "Speed",
    prompt: "A model aircraft travels 100 m in 20 s. What is its average speed?",
    choices: ["2 m/s", "5 m/s", "20 m/s", "120 m/s"],
    answer: "5 m/s",
    explanation: "Average speed equals distance divided by time: 100 / 20 = 5 m/s.",
  },
  {
    id: "q2",
    type: "multiple-choice",
    topic: "Displacement",
    prompt: "A rover moves 12 m east, then 5 m west. What is its displacement?",
    choices: ["17 m east", "7 m east", "7 m west", "60 m"],
    answer: "7 m east",
    explanation: "Displacement is final position minus starting position: 12 m east - 5 m west = 7 m east.",
  },
  {
    id: "q3",
    type: "multiple-choice",
    topic: "Acceleration",
    prompt: "A cart changes velocity from 4 m/s to 10 m/s in 3 s. What is its acceleration?",
    choices: ["2 m/s^2", "6 m/s^2", "14 m/s^2", "30 m/s^2"],
    answer: "2 m/s^2",
    explanation: "Acceleration = change in velocity / time = (10 - 4) / 3 = 2 m/s^2.",
  },
  {
    id: "q4",
    type: "multiple-choice",
    topic: "Graphs",
    prompt: "On a position-time graph, what does the slope represent?",
    choices: ["Mass", "Velocity", "Weight", "Temperature"],
    answer: "Velocity",
    explanation: "The slope of a position-time graph shows how position changes with time, which is velocity.",
  },
];

function slugifyTopic(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\(shm\)/g, "shm")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function createApPhysics1Topic(title: string) {
  return {
    slug: slugifyTopic(title),
    title,
    estimatedTime: "Content coming soon",
    status: "Placeholder",
    summary: "Topic content placeholder.",
    vocabulary: [],
    equations: [],
    concept: "Full educational content for this AP Physics 1 topic will be added later.",
    example: "Worked examples will be added later.",
    mistake: "Common mistakes will be added later.",
  };
}

function createCompleteUnit2Topic(title: string, summary: string, estimatedTime = "60-90 minutes") {
  return {
    slug: slugifyTopic(title),
    title,
    estimatedTime,
    status: "Complete lesson",
    summary,
    vocabulary: [],
    equations: [],
    concept: summary,
    example: "Open the lesson for guided examples, interactive diagrams, AP-style practice, and the mastery check.",
    mistake: "Use the lesson's common-mistake section to avoid the most frequent dynamics errors.",
  };
}

function roadmapUnit(slug: string, title: string, apNumber: number, topics: string[]) {
 return { slug, title, description: `College Board Unit ${apNumber}. Topic map available; full lessons are coming soon.`, status: "Coming soon", progress: `0 of ${topics.length} topics available`, objectives: ["Full lessons, worked examples, and assessments are coming soon."], lessons: topics.map(createApPhysics1Topic), practice: [] as {prompt: string; answer: string; hint: string}[], testStatus: "Coming soon" };
}
export function apUnitNumber(courseSlug: string, index: number) { return index + (courseSlug === "physics-2" ? 9 : courseSlug === "physics-c-em" ? 8 : 1); }

export const apCourses = [
  {
    slug: "physics-1",
    title: "AP Physics 1: Algebra-Based",
    shortTitle: "AP Physics 1",
    status: "Units 1–2 available",
    description:
      "Build the algebra-based mechanics foundations students need for aerospace pathways, AP practice, and future engineering study.",
    progress: "2 of 8 units available",
    units: [
      {
        slug: "kinematics",
        title: "Kinematics",
        description:
          "AP Physics 1 Unit 1 topic sequence from the current course structure.",
        status: "Available",
        progress: "5 of 5 topics available",
        objectives: [
          "Resolve vectors and relate displacement, velocity, and acceleration.",
          "Interpret motion graphs, relative motion, and projectile motion with justified assumptions.",
        ],
        lessons: [
          {
            slug: "scalars-vectors-one-dimension",
            title: "Scalars and Vectors in One Dimension",
            estimatedTime: "35-45 minutes",
            status: "Content available",
            difficulty: "Introductory",
            skills: [
              "Creating representations",
              "Comparing quantities",
              "Making claims",
              "Justifying claims",
            ],
            summary:
              "Distinguish scalar and vector quantities, represent one-dimensional vectors, interpret signs and magnitudes, and add signed vector components.",
            vocabulary: ["scalar", "vector", "magnitude", "direction", "component", "coordinate system", "resultant vector"],
            equations: ["Vector = magnitude + direction", "Magnitude is nonnegative", "Resultant vector = sum of signed components"],
            concept:
              "Scalars have magnitude only. Vectors have both magnitude and direction, and one-dimensional vector components use signs to represent direction relative to a chosen coordinate system.",
            example:
              "If right is positive, 4 m right, 7 m left, and 5 m right become +4 m, -7 m, and +5 m for a resultant of +2 m.",
            mistake:
              "Do not treat a negative vector component as a negative magnitude or as automatically smaller.",
          },
          {
            slug: "displacement-velocity-acceleration",
            title: "Displacement, Velocity, and Acceleration",
            estimatedTime: "55-70 minutes",
            status: "Content available",
            difficulty: "Foundational",
            skills: [
              "Calculations",
              "Comparing quantities",
              "Qualitative representations",
              "Physical reasoning",
              "Justifying claims",
            ],
            summary:
              "Describe position, calculate displacement, compare distance with displacement, and connect average velocity and acceleration to physical motion.",
            vocabulary: [
              "position",
              "origin",
              "initial position",
              "final position",
              "displacement",
              "distance",
              "elapsed time",
              "average velocity",
              "speed",
              "acceleration",
            ],
            equations: [
              "Δx = x_f - x_i",
              "Δt = t_f - t_i",
              "v_avg = Δx / Δt",
              "Δv = v_f - v_i",
              "a_avg = Δv / Δt",
            ],
            concept:
              "Motion can be described by position, displacement, velocity, and acceleration. Direction matters for vector quantities, so signs describe direction rather than automatically meaning faster, slower, bigger, or smaller.",
            example:
              "A cart moving from +2 m to +9 m has displacement +7 m. If this occurs in 5 s, its average velocity is +1.4 m/s.",
            mistake:
              "Do not confuse distance with displacement, and do not assume negative acceleration always means slowing down.",
          },
          {
            slug: "representing-motion",
            title: "Representing Motion",
            estimatedTime: "50-65 minutes",
            status: "Complete lesson",
            skills: [
              "Creating Representations",
              "Graph Interpretation",
              "Mathematical Reasoning",
              "Translation Between Representations",
              "Physical Reasoning",
              "Justifying Claims",
            ],
            summary:
              "Translate between physical motion, motion diagrams, position-time graphs, and mathematical interpretations of slope and displacement.",
            vocabulary: [
              "motion diagram",
              "equal time intervals",
              "position-time graph",
              "slope",
              "slope magnitude",
              "stationary",
              "qualitative graph",
              "representation",
            ],
            equations: ["slope = Δx / Δt", "v_avg = Δx / Δt", "Δx = x_f - x_i"],
            concept:
              "Motion can be represented with words, motion diagrams, graphs, and equations. On a position-time graph, slope represents velocity: its sign gives direction and its magnitude gives speed.",
            example:
              "A straight position-time graph from (1 s, 2 m) to (4 s, 8 m) has slope Δx / Δt = 6 m / 3 s = +2 m/s.",
            mistake:
              "Do not treat the shape of a position-time graph as the shape of the road. Height is position; slope is velocity.",
          },
          {
            slug: "reference-frames-relative-motion",
            title: "Reference Frames and Relative Motion",
            estimatedTime: "45-60 minutes",
            status: "Complete lesson",
            skills: [
              "Creating Representations",
              "Mathematical Reasoning",
              "Comparing Physical Quantities",
              "Vector Reasoning",
              "Translation Between Representations",
              "Justifying Claims",
            ],
            summary:
              "Describe motion from different one-dimensional inertial reference frames, combine signed velocities, reverse observer frames, and explain why acceleration is unchanged across inertial frames.",
            vocabulary: [
              "reference frame",
              "observer",
              "relative motion",
              "relative velocity",
              "inertial reference frame",
              "velocity relative to ground",
              "velocity relative to train",
              "sign convention",
            ],
            equations: [
              "v_student,ground = v_student,train + v_train,ground",
              "v_A,B = v_A,ground - v_B,ground",
              "v_A,B = -v_B,A",
            ],
            concept:
              "Motion is measured relative to a reference frame. Different inertial observers can measure different velocities for the same object, but they measure the same acceleration.",
            example:
              "A train moves +18 m/s relative to the ground while a passenger walks -2 m/s relative to the train. The passenger's velocity relative to the ground is -2 + 18 = +16 m/s.",
            mistake:
              "Do not assume an object has one universal velocity. Always identify what is moving and what reference frame the measurement is relative to.",
          },
          {
            slug: "vectors-motion-two-dimensions",
            title: "Vectors and Motion in Two Dimensions",
            estimatedTime: "70-90 minutes",
            status: "Complete lesson",
            skills: [
              "Creating Representations",
              "Vector Reasoning",
              "Mathematical Routines",
              "Graphical Reasoning",
              "Translation Between Representations",
              "Scientific Argumentation",
            ],
            summary:
              "Resolve and add two-dimensional vectors, rebuild resultants, analyze independent x/y motion, and apply component reasoning to projectile motion.",
            vocabulary: [
              "two-dimensional motion",
              "x-component",
              "y-component",
              "resultant vector",
              "projectile",
              "horizontal launch",
              "trajectory",
              "independent components",
              "shared time",
            ],
            equations: [
              "A_x = A cos θ",
              "A_y = A sin θ",
              "A = √(A_x² + A_y²)",
              "R_x = A_x + B_x",
              "R_y = A_y + B_y",
              "a_x = 0",
              "a_y = -g",
            ],
            concept:
              "Two-dimensional motion can be analyzed by resolving vectors into independent perpendicular components that share the same elapsed time.",
            example:
              "A 10 m vector at 30° above +x has Δx = 10 cos 30° = 8.7 m and Δy = 10 sin 30° = 5.0 m.",
            mistake:
              "Do not assume curved projectile motion means a curved force. With negligible air resistance, gravity acts downward and horizontal velocity remains constant.",
          },
        ],
        practice: [],
        testStatus: "Available",
      },
      {
        slug: "force-translational-dynamics",
        title: "Force and Translational Dynamics",
        description:
          "Build force models from systems, free-body diagrams, Newton's laws, gravity, friction, springs, and circular motion.",
        status: "Complete Unit 2 lessons",
        progress: "9 of 9 topics complete",
        objectives: [
          "Choose useful systems and identify internal versus external interactions.",
          "Draw free-body diagrams using only real forces acting on the selected object or system.",
          "Apply Newton's laws to equilibrium, acceleration, connected systems, and force graphs.",
          "Model gravity, apparent weight, friction, spring forces, and circular motion with AP-style reasoning.",
        ],
        lessons: [
          createCompleteUnit2Topic("Systems and Center of Mass", "Choose system boundaries, classify internal and external interactions, and calculate center of mass.", "50-65 minutes"),
          createCompleteUnit2Topic("Forces and Free-Body Diagrams", "Identify real forces as interactions and build accurate free-body diagrams.", "70-90 minutes"),
          createCompleteUnit2Topic("Newton's Third Law", "Recognize equal-magnitude opposite-direction interaction pairs acting on different objects.", "45-60 minutes"),
          createCompleteUnit2Topic("Newton's First Law", "Connect zero net force with zero acceleration, rest, constant velocity, and equilibrium.", "45-60 minutes"),
          createCompleteUnit2Topic("Newton's Second Law", "Translate free-body diagrams into net-force equations and acceleration models.", "75-95 minutes"),
          createCompleteUnit2Topic("Gravitational Force", "Model universal gravitation, near-Earth weight, gravitational fields, and apparent weight.", "70-90 minutes"),
          createCompleteUnit2Topic("Kinetic and Static Friction", "Distinguish static and kinetic friction and apply friction models in force equations.", "70-90 minutes"),
          createCompleteUnit2Topic("Spring Forces", "Use Hooke's law to connect displacement, restoring force, and spring-force graphs.", "55-70 minutes"),
          createCompleteUnit2Topic("Circular Motion", "Explain centripetal acceleration and identify the real inward forces in circular motion.", "80-100 minutes"),
        ],
        practice: [
          {
            prompt: "Draw an FBD for a box pulled across a rough floor by an angled rope.",
            hint: "Include only real forces acting on the box, then resolve the angled tension.",
          },
          {
            prompt: "Explain why doubling speed in uniform circular motion quadruples required inward net force.",
            hint: "Use a_c = v²/r and ΣF_inward = ma_c.",
          },
        ],
        testStatus: "Available",
      },
      {
        slug: "work-energy-power",
        title: "Work, Energy, and Power",
        description:
          "AP Physics 1 Unit 3 topic sequence from the current course structure.",
        status: "Coming soon",
        progress: "0 of 5 topics complete",
        objectives: [
          "Navigate the official AP Physics 1 work, energy, and power topic sequence.",
          "Full worked lessons, practice, and assessments for this unit are coming soon.",
        ],
        lessons: [
          "Translational Kinetic Energy",
          "Work",
          "Potential Energy",
          "Conservation of Energy",
          "Power",
        ].map((title) => createApPhysics1Topic(title)),
        practice: [],
        testStatus: "Coming soon",
      },
      {
        slug: "linear-momentum",
        title: "Linear Momentum",
        description:
          "AP Physics 1 Unit 4 topic sequence from the current course structure.",
        status: "Coming soon",
        progress: "0 of 4 topics complete",
        objectives: [
          "Navigate the official AP Physics 1 linear momentum topic sequence.",
          "Full worked lessons, practice, and assessments for this unit are coming soon.",
        ],
        lessons: [
          "Linear Momentum",
          "Change in Momentum and Impulse",
          "Conservation of Linear Momentum",
          "Elastic and Inelastic Collisions",
        ].map((title) => createApPhysics1Topic(title)),
        practice: [],
        testStatus: "Coming soon",
      },
      {
        slug: "torque-rotational-dynamics",
        title: "Torque and Rotational Dynamics",
        description:
          "AP Physics 1 Unit 5 topic sequence from the current course structure.",
        status: "Coming soon",
        progress: "0 of 6 topics complete",
        objectives: [
          "Navigate the official AP Physics 1 torque and rotational dynamics topic sequence.",
          "Full worked lessons, practice, and assessments for this unit are coming soon.",
        ],
        lessons: [
          "Rotational Kinematics",
          "Connecting Linear and Rotational Motion",
          "Torque",
          "Rotational Inertia",
          "Rotational Equilibrium and Newton's First Law in Rotational Form",
          "Newton's Second Law in Rotational Form",
        ].map((title) => createApPhysics1Topic(title)),
        practice: [],
        testStatus: "Coming soon",
      },
      {
        slug: "energy-momentum-rotating-systems",
        title: "Energy and Momentum of Rotating Systems",
        description:
          "AP Physics 1 Unit 6 topic sequence from the current course structure.",
        status: "Coming soon",
        progress: "0 of 6 topics complete",
        objectives: [
          "Navigate the official AP Physics 1 energy and momentum of rotating systems topic sequence.",
          "Full worked lessons, practice, and assessments for this unit are coming soon.",
        ],
        lessons: [
          "Rotational Kinetic Energy",
          "Torque and Work",
          "Angular Momentum and Angular Impulse",
          "Conservation of Angular Momentum",
          "Rolling",
          "Motion of Orbiting Satellites",
        ].map((title) => createApPhysics1Topic(title)),
        practice: [],
        testStatus: "Coming soon",
      },
      {
        slug: "oscillations",
        title: "Oscillations",
        description:
          "AP Physics 1 Unit 7 topic sequence from the current course structure.",
        status: "Coming soon",
        progress: "0 of 4 topics complete",
        objectives: [
          "Navigate the official AP Physics 1 oscillations topic sequence.",
          "Full worked lessons, practice, and assessments for this unit are coming soon.",
        ],
        lessons: [
          "Defining Simple Harmonic Motion (SHM)",
          "Frequency and Period of SHM",
          "Representing and Analyzing SHM",
          "Energy of Simple Harmonic Oscillators",
        ].map((title) => createApPhysics1Topic(title)),
        practice: [],
        testStatus: "Coming soon",
      },
      {
        slug: "fluids",
        title: "Fluids",
        description:
          "AP Physics 1 Unit 8 topic sequence from the current course structure.",
        status: "Coming soon",
        progress: "0 of 4 topics complete",
        objectives: [
          "Navigate the official AP Physics 1 fluids topic sequence.",
          "Full worked lessons, practice, and assessments for this unit are coming soon.",
        ],
        lessons: [
          "Internal Structure and Density",
          "Pressure",
          "Fluids and Newton's Laws",
          "Fluids and Conservation Laws",
        ].map((title) => createApPhysics1Topic(title)),
        practice: [],
        testStatus: "Coming soon",
      },
    ],
  },
  {
    slug: "physics-2", title: "AP Physics 2: Algebra-Based", shortTitle: "AP Physics 2",
    status: "Unit 1 available", description: "Explore thermodynamics, electric and magnetic fields, circuits, optics, waves, and modern physics. College Board numbers these units 9–15.",
    progress: "1 of 7 units available", units: [unitOnes["physics-2"],
      roadmapUnit("electric-force-field-potential", "Electric Force, Field, and Potential", 10, ["Electric Charge and Electric Force", "Conservation of Electric Charge and the Process of Charging", "Electric Fields", "Electric Potential Energy", "Electric Potential", "Capacitors", "Conservation of Electric Energy"]),
      roadmapUnit("electric-circuits", "Electric Circuits", 11, ["Electric Current", "Simple Circuits", "Resistance, Resistivity, and Ohm's Law", "Electric Power", "Compound Direct Current (DC) Circuits", "Kirchhoff's Loop Rule", "Kirchhoff's Junction Rule", "Resistor-Capacitor (RC) Circuits"]),
      roadmapUnit("magnetism-electromagnetism", "Magnetism and Electromagnetism", 12, ["Magnetic Fields", "Magnetism and Moving Charges", "Magnetism and Current-Carrying Wires", "Electromagnetic Induction and Faraday's Law"]),
      roadmapUnit("geometric-optics", "Geometric Optics", 13, ["Reflection", "Images Formed by Mirrors", "Refraction", "Images Formed by Lenses"]),
      roadmapUnit("waves-sound-physical-optics", "Waves, Sound, and Physical Optics", 14, ["Properties of Wave Pulses and Waves", "Periodic Waves", "Boundary Behavior of Waves and Polarization", "Electromagnetic Waves", "The Doppler Effect", "Wave Interference and Standing Waves", "Diffraction", "Double-Slit Interference and Diffraction Gratings", "Thin-Film Interference"]),
      roadmapUnit("modern-physics", "Modern Physics", 15, ["Quantum Theory and Wave-Particle Duality", "The Bohr Model of Atomic Structure", "Emission and Absorption Spectra", "Blackbody Radiation", "The Photoelectric Effect", "Compton Scattering", "Fission, Fusion, and Nuclear Decay", "Types of Radioactive Decay"])
    ]
  },
  {
    slug: "physics-c-mechanics", title: "AP Physics C: Mechanics", shortTitle: "AP Physics C: Mechanics",
    status: "Unit 1 available", description: "Use component vectors, derivatives, and integrals to study motion, forces, energy, momentum, rotation, and oscillations.",
    progress: "1 of 7 units available", units: [unitOnes["physics-c-mechanics"],
      roadmapUnit("force-translational-dynamics", "Force and Translational Dynamics", 2, ["Systems and Center of Mass", "Forces and Free-Body Diagrams", "Newton's Third Law", "Newton's First Law", "Newton's Second Law", "Gravitational Force", "Kinetic and Static Friction", "Spring Forces", "Resistive Forces", "Circular Motion"]),
      roadmapUnit("work-energy", "Work, Energy, and Power", 3, ["Translational Kinetic Energy", "Work", "Potential Energy", "Conservation of Energy", "Power"]),
      roadmapUnit("linear-momentum", "Linear Momentum", 4, ["Linear Momentum", "Change in Momentum and Impulse", "Conservation of Linear Momentum", "Elastic and Inelastic Collisions"]),
      roadmapUnit("torque-rotational-dynamics", "Torque and Rotational Dynamics", 5, ["Rotational Kinematics", "Connecting Linear and Rotational Motion", "Torque", "Rotational Inertia", "Rotational Equilibrium and Newton's First Law in Rotational Form", "Newton's Second Law in Rotational Form"]),
      roadmapUnit("energy-momentum-rotating-systems", "Energy and Momentum of Rotating Systems", 6, ["Rotational Kinetic Energy", "Torque and Work", "Angular Momentum and Angular Impulse", "Conservation of Angular Momentum", "Rolling", "Motion of Orbiting Satellites"]),
      roadmapUnit("oscillations", "Oscillations", 7, ["Defining Simple Harmonic Motion (SHM)", "Frequency and Period of SHM", "Representing and Analyzing SHM", "Energy of Simple Harmonic Oscillators", "Simple and Physical Pendulums"])
    ]
  },
  {
    slug: "physics-c-em", title: "AP Physics C: Electricity & Magnetism", shortTitle: "AP Physics C: E&M",
    status: "Unit 1 available", description: "Use calculus to study charges, fields, Gauss's law, potential, conductors, capacitors, circuits, and magnetism. College Board numbers these units 8–13.",
    progress: "1 of 6 units available", units: [unitOnes["physics-c-em"],
      roadmapUnit("electric-potential", "Electric Potential", 9, ["Electric Potential Energy", "Electric Potential", "Conservation of Electric Energy"]),
      roadmapUnit("conductors-capacitors", "Conductors and Capacitors", 10, ["Electrostatics with Conductors", "Redistribution of Charge between Conductors", "Capacitors", "Dielectrics"]),
      roadmapUnit("electric-circuits", "Electric Circuits", 11, ["Electric Current", "Simple Circuits", "Resistance, Resistivity, and Ohm's Law", "Electric Power", "Compound Direct Current (DC) Circuits", "Kirchhoff's Loop Rule", "Kirchhoff's Junction Rule", "Resistor-Capacitor (RC) Circuits"]),
      roadmapUnit("magnetic-fields", "Magnetic Fields and Electromagnetism", 12, ["Magnetic Fields", "Magnetism and Moving Charges", "Magnetic Fields of Current-Carrying Wires and Biot-Savart Law", "Ampère's Law"]),
      roadmapUnit("electromagnetic-induction", "Electromagnetic Induction", 13, ["Magnetic Flux", "Electromagnetic Induction", "Induced Currents and Magnetic Forces", "Inductance", "Circuits with Resistors and Inductors (LR Circuits)", "Circuits with Capacitors and Inductors (LC Circuits)"])
    ]
  },
];

export function getCourse(courseSlug: string) {
  return apCourses.find((course) => course.slug === courseSlug);
}

export function getUnit(courseSlug: string, unitSlug: string) {
  return getCourse(courseSlug)?.units.find((unit) => unit.slug === unitSlug);
}

export function getLesson(courseSlug: string, unitSlug: string, lessonSlug: string) {
  return getUnit(courseSlug, unitSlug)?.lessons.find(
    (lesson) => lesson.slug === lessonSlug,
  );
}

export const opportunities = [
  {
    id: "opp-1",
    title: "Demonstration CubeSat Design Sprint",
    organization: "Fictional Orbital Learning Lab",
    type: "Summer program",
    types: ["Summer program", "Competition"],
    fields: ["Satellites", "Software", "Robotics"],
    country: "United Arab Emirates",
    city: "Dubai",
    remote: true,
    minAge: 14,
    maxAge: 18,
    gradeLevels: ["High school", "Undergraduate"],
    citizenshipRequired: null,
    paid: false,
    deadline: "2026-09-15",
    verificationStatus: "Demonstration record - not independently verified",
    nextReviewDate: "2026-08-15",
    source: "Demo fixture only",
    url: "#",
  },
  {
    id: "opp-2",
    title: "Demonstration Wind Tunnel Scholarship",
    organization: "Sample Aero Foundation",
    type: "Scholarship",
    types: ["Scholarship"],
    fields: ["Aerodynamics", "Aircraft design", "Sustainability"],
    country: "United Kingdom",
    city: "Bristol",
    remote: false,
    minAge: 16,
    maxAge: 19,
    gradeLevels: ["High school", "Undergraduate"],
    citizenshipRequired: "United Kingdom",
    paid: true,
    deadline: "2026-11-01",
    verificationStatus: "Demonstration record - not independently verified",
    nextReviewDate: "2026-07-01",
    source: "Demo fixture only",
    url: "#",
  },
  {
    id: "opp-3",
    title: "Demonstration Remote Mission Coding Internship",
    organization: "Fictional Deep Space Coders",
    type: "Internship",
    types: ["Internship", "Research"],
    fields: ["Software", "Artificial intelligence", "Space science"],
    country: "Global",
    city: "Remote",
    remote: true,
    minAge: 13,
    maxAge: 20,
    gradeLevels: ["High school", "Undergraduate"],
    citizenshipRequired: null,
    paid: false,
    deadline: "2026-12-20",
    verificationStatus: "Demonstration record - not independently verified",
    nextReviewDate: "2026-10-01",
    source: "Demo fixture only",
    url: "#",
  },
];

export const apPathways = [
  {
    title: "AP Physics 1",
    status: "Core MVP pathway",
    topics: [
      "Kinematics",
      "Forces and dynamics",
      "Energy",
      "Momentum",
      "Rotational motion",
      "Oscillations",
      "Fluids",
    ],
  },
  {
    title: "AP Physics 2",
    status: "Preview pathway",
    topics: [
      "Thermodynamics",
      "Electric force, field, and potential",
      "Electric circuits",
      "Magnetism",
      "Optics",
      "Quantum and atomic physics",
    ],
  },
  {
    title: "AP Physics C: Mechanics",
    status: "Preview pathway",
    topics: [
      "Calculus readiness",
      "Kinematics",
      "Forces",
      "Work and energy",
      "Momentum",
      "Rotation",
      "Gravitation",
    ],
  },
  {
    title: "AP Physics C: Electricity & Magnetism",
    status: "Preview pathway",
    topics: [
      "Calculus readiness",
      "Electrostatics",
      "Conductors",
      "Capacitors",
      "Electric circuits",
      "Magnetic fields",
      "Electromagnetism",
    ],
  },
];

export const testingCenters = [
  {
    name: "Fictional International School - Dubai",
    country: "United Arab Emirates",
    city: "Dubai",
    exams: ["AP Physics 1", "AP Physics C: Mechanics"],
    status: "Potential center - contact required",
    verified: "2026-06-01",
    notes: "Fictional testing center for development only.",
  },
  {
    name: "Sample Global Academy - Singapore",
    country: "Singapore",
    city: "Singapore",
    exams: ["AP Physics 1", "AP Physics 2"],
    status: "Status not verified",
    verified: "2026-04-15",
    notes: "Fictional testing center for development only.",
  },
];

/** Completed units are released with their assessment; later course-map units stay locked. */
export function isUnitAvailable(unit: {testStatus:string}) { return unit.testStatus === 'Available'; }
