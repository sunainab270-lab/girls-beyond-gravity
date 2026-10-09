"use client";

import { useMemo, useState } from "react";

type Difficulty = "Low" | "Medium" | "High" | "Very High";
type Delivery = "Remote" | "Hybrid" | "In-person" | "Remote / In-person";

type Opportunity = {
  added: string;
  citizenship: string;
  competitiveness: Difficulty;
  country: string;
  deadline: string;
  deadlineMonth: string;
  deadlineSort: string;
  delivery: Delivery;
  description: string;
  duration: string;
  educationLevel: string[];
  eligibility: string;
  fields: string[];
  free: boolean;
  funding: string;
  fundingValue: number;
  id: string;
  internationalEligible: boolean;
  loans: string;
  name: string;
  opening: string;
  organization: string;
  paid: boolean;
  recommendedFor: string[];
  tags: string[];
  tuition: string;
  type: string;
  url: string;
  womenOnly: boolean;
};

const commonLoans = "No student loan or payment plan information listed; verify on the official page.";
const noTuition = "No tuition listed; application is free unless membership or team costs apply.";
const verify = "Deadlines change by cycle. Verify through the official website before applying.";

const opportunities: Opportunity[] = [
  {
    id: "nasa-ostem",
    name: "NASA OSTEM Internships",
    organization: "NASA Office of STEM Engagement",
    type: "Internship",
    fields: ["Aerospace Engineering", "Mechanical Engineering", "Robotics", "Physics", "Computer Science", "Space Science"],
    description: "Paid project-based internships at NASA centers for students contributing to NASA-aligned STEM work.",
    eligibility: "Minimum age 16, U.S. citizen, 3.0 GPA, and enrolled in an accredited U.S. school or degree program.",
    educationLevel: ["High School", "Undergraduate", "Graduate"],
    citizenship: "U.S. citizens only",
    internationalEligible: false,
    country: "United States",
    delivery: "In-person",
    funding: "Paid internship; stipend details vary by session and project.",
    fundingValue: 6000,
    tuition: noTuition,
    loans: commonLoans,
    opening: "Multiple cycles each year.",
    deadline: "Spring 2027: Sept. 14, 2026; Summer 2027: Feb. 26, 2027; Fall 2027: May 21, 2027.",
    deadlineSort: "2027-02-26",
    deadlineMonth: "February",
    duration: "Usually 10 weeks for summer; other sessions vary.",
    url: "https://www.nasa.gov/learning-resources/internship-programs/",
    competitiveness: "Very High",
    recommendedFor: ["High School", "Undergraduate", "Graduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["NASA", "STEM", "space", "engineering", "paid", "government"],
    added: "2026-09-27",
  },
  {
    id: "nasa-pathways",
    name: "NASA Pathways Internships",
    organization: "NASA",
    type: "Internship",
    fields: ["Aerospace Engineering", "Mechanical Engineering", "Computer Science", "Physics"],
    description: "Federal internship pathway designed to prepare students for long-term NASA civil service careers.",
    eligibility: "U.S. citizenship and current enrollment; GPA, degree, location, and series requirements vary by USAJOBS posting.",
    educationLevel: ["Undergraduate", "Graduate"],
    citizenship: "U.S. citizens only",
    internationalEligible: false,
    country: "United States",
    delivery: "In-person",
    funding: "Paid federal internship.",
    fundingValue: 12000,
    tuition: noTuition,
    loans: commonLoans,
    opening: "Openings appear during brief USAJOBS windows.",
    deadline: `Varies by posting. ${verify}`,
    deadlineSort: "2027-03-01",
    deadlineMonth: "March",
    duration: "Multi-semester rotational internship; varies by appointment.",
    url: "https://www.nasa.gov/learning-resources/internship-programs/",
    competitiveness: "Very High",
    recommendedFor: ["Undergraduate", "Graduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["NASA", "Pathways", "career", "civil service", "paid"],
    added: "2026-09-27",
  },
  {
    id: "jpl-summer",
    name: "JPL Summer Internship Program",
    organization: "NASA Jet Propulsion Laboratory",
    type: "Internship",
    fields: ["Aerospace Engineering", "Robotics", "Physics", "Computer Science", "Space Science"],
    description: "Ten-week full-time summer internship at JPL with a scientist or engineer mentor.",
    eligibility: "Undergraduate or graduate STEM students at accredited U.S. universities with 3.0 GPA; U.S. citizens and lawful permanent residents.",
    educationLevel: ["Undergraduate", "Graduate"],
    citizenship: "U.S. citizens and lawful permanent residents",
    internationalEligible: false,
    country: "United States",
    delivery: "In-person",
    funding: "Monetary award; housing/travel allowance may be available for eligible students.",
    fundingValue: 7000,
    tuition: noTuition,
    loans: commonLoans,
    opening: "Typically fall through winter for summer placement.",
    deadline: "March 13, 2026 at 5 p.m. PDT listed for the current cycle; verify annually.",
    deadlineSort: "2026-03-13",
    deadlineMonth: "March",
    duration: "10 weeks.",
    url: "https://www.jpl.nasa.gov/edu/internships/apply/jpl-summer-internship-program/",
    competitiveness: "Very High",
    recommendedFor: ["Undergraduate", "Graduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["JPL", "NASA", "Caltech", "summer", "space missions"],
    added: "2026-09-27",
  },
  {
    id: "esa-student",
    name: "ESA Student Internships",
    organization: "European Space Agency",
    type: "Internship",
    fields: ["Aerospace Engineering", "Mechanical Engineering", "Physics", "Computer Science", "Space Science"],
    description: "ESA internships for university students in technical, scientific, and mission-support areas.",
    eligibility: "Students preferably in the final or second-to-last year of a master's-level university course; citizenship rules apply.",
    educationLevel: ["Undergraduate", "Graduate"],
    citizenship: "ESA Member States, Associate Members, Canada as Cooperating State, and eligible European Cooperating States",
    internationalEligible: true,
    country: "Europe",
    delivery: "In-person",
    funding: "Typically paid with a monthly allowance; verify by posting.",
    fundingValue: 8000,
    tuition: noTuition,
    loans: commonLoans,
    opening: "Usually posted annually by ESA.",
    deadline: `Varies by posting. ${verify}`,
    deadlineSort: "2026-11-30",
    deadlineMonth: "November",
    duration: "Typically 3-6 months.",
    url: "https://www.esa.int/About_Us/Careers_at_ESA/Student_internships_frequently_asked_questions",
    competitiveness: "High",
    recommendedFor: ["Undergraduate", "Graduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["ESA", "Europe", "space agency", "internship", "international"],
    added: "2026-09-27",
  },
  {
    id: "esa-ygt",
    name: "ESA Young Graduate Trainee Programme",
    organization: "European Space Agency",
    type: "Fellowship",
    fields: ["Aerospace Engineering", "Mechanical Engineering", "Physics", "Computer Science", "Space Science"],
    description: "Entry-level paid traineeship for recent graduates beginning a career in the space sector.",
    eligibility: "Recent master's graduates or final-year master's students; ESA nationality requirements apply.",
    educationLevel: ["Graduate"],
    citizenship: "ESA Member States and eligible cooperating states",
    internationalEligible: true,
    country: "Europe",
    delivery: "In-person",
    funding: "Paid traineeship; salary/allowance depends on ESA rules and location.",
    fundingValue: 25000,
    tuition: noTuition,
    loans: commonLoans,
    opening: "Typically annual ESA YGT campaign.",
    deadline: `Varies annually. ${verify}`,
    deadlineSort: "2026-12-15",
    deadlineMonth: "December",
    duration: "Usually one year, with possible extension depending on programme rules.",
    url: "https://www.esa.int/About_Us/Careers_at_ESA",
    competitiveness: "Very High",
    recommendedFor: ["Graduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["ESA", "graduate", "trainee", "space agency", "Europe"],
    added: "2026-09-27",
  },
  {
    id: "aiaa-hs",
    name: "AIAA / Club for the Future Resilient Student Scholarship",
    organization: "AIAA",
    type: "Scholarship",
    fields: ["Aerospace Engineering", "Mechanical Engineering", "Physics"],
    description: "Scholarship for high school seniors planning to enroll in an engineering major.",
    eligibility: "High school seniors enrolling in engineering; see AIAA requirements for current cycle.",
    educationLevel: ["High School"],
    citizenship: "Verify through AIAA scholarship rules",
    internationalEligible: false,
    country: "United States",
    delivery: "Remote",
    funding: "Up to $10,000 scholarship.",
    fundingValue: 10000,
    tuition: noTuition,
    loans: commonLoans,
    opening: "December 2 for the listed cycle.",
    deadline: "February 16 at 11:59 p.m.; verify each cycle.",
    deadlineSort: "2027-02-16",
    deadlineMonth: "February",
    duration: "Scholarship award for college expenses.",
    url: "https://aiaa.org/get-involved/k-12-students/scholarships/",
    competitiveness: "High",
    recommendedFor: ["High School"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["AIAA", "scholarship", "high school", "engineering"],
    added: "2026-09-27",
  },
  {
    id: "aiaa-university",
    name: "AIAA Undergraduate Scholarships & Graduate Awards",
    organization: "AIAA Foundation",
    type: "Scholarship",
    fields: ["Aerospace Engineering", "Mechanical Engineering", "Space Science"],
    description: "AIAA Foundation awards for university students pursuing aerospace-related fields.",
    eligibility: "AIAA student membership and award-specific academic requirements generally apply.",
    educationLevel: ["Undergraduate", "Graduate"],
    citizenship: "Verify by award",
    internationalEligible: true,
    country: "Global",
    delivery: "Remote",
    funding: "Varies by AIAA scholarship/award.",
    fundingValue: 5000,
    tuition: "No tuition; AIAA membership may apply.",
    loans: commonLoans,
    opening: "Typically annual scholarship cycle.",
    deadline: `Varies by award. ${verify}`,
    deadlineSort: "2027-01-31",
    deadlineMonth: "January",
    duration: "Scholarship award cycle.",
    url: "https://aiaa.org/get-involved/university-students/undergraduate-scholarships-graduate-awards/",
    competitiveness: "High",
    recommendedFor: ["Undergraduate", "Graduate"],
    womenOnly: false,
    paid: true,
    free: false,
    tags: ["AIAA", "aerospace", "scholarship", "university"],
    added: "2026-09-27",
  },
  {
    id: "brooke-owens",
    name: "Brooke Owens Fellowship",
    organization: "Brooke Owens Fellowship",
    type: "Fellowship",
    fields: ["Aerospace Engineering", "Mechanical Engineering", "Robotics", "Computer Science", "Space Science"],
    description: "Paid aerospace internship, executive mentorship, and community program for undergraduate women and gender minorities.",
    eligibility: "Undergraduate student, completed at least one year, 18+, interested in aerospace, and identifies as a woman or gender minority.",
    educationLevel: ["Undergraduate"],
    citizenship: "Host-company work authorization varies",
    internationalEligible: true,
    country: "United States",
    delivery: "Hybrid",
    funding: "Paid internship plus professional network and mentorship.",
    fundingValue: 9000,
    tuition: noTuition,
    loans: commonLoans,
    opening: "Applications open September 1 for the listed cycle.",
    deadline: "October 4, 2026; verify on official site.",
    deadlineSort: "2026-10-04",
    deadlineMonth: "October",
    duration: "Summer internship plus fellowship programming.",
    url: "https://www.brookeowensfellowship.org/apply",
    competitiveness: "Very High",
    recommendedFor: ["Undergraduate"],
    womenOnly: true,
    paid: true,
    free: true,
    tags: ["women", "gender minority", "aerospace", "fellowship", "paid internship"],
    added: "2026-09-27",
  },
  {
    id: "patti-grace-smith",
    name: "Patti Grace Smith Fellowship",
    organization: "Patti Grace Smith Fellowship",
    type: "Fellowship",
    fields: ["Aerospace Engineering", "Mechanical Engineering", "Computer Science", "Space Science", "Policy"],
    description: "Jobs, mentorship, cash grant, and community for Black undergraduate students seeking aerospace careers.",
    eligibility: "Current bachelor's or associate degree student, legally permitted to work in the U.S., and typically seeking first paid aerospace internship.",
    educationLevel: ["Undergraduate"],
    citizenship: "U.S. citizen, permanent resident, U.S. national, refugee, or asylee legally able to work in the U.S.",
    internationalEligible: false,
    country: "United States",
    delivery: "Hybrid",
    funding: "Paid internship or job placement, living wage, and cash grant.",
    fundingValue: 10000,
    tuition: noTuition,
    loans: commonLoans,
    opening: "August 18 for the listed cycle.",
    deadline: "October 4 at 11:59:59 p.m. ET; verify annually.",
    deadlineSort: "2026-10-04",
    deadlineMonth: "October",
    duration: "Summer placement plus fellowship support.",
    url: "https://www.pgsfellowship.org/apply",
    competitiveness: "Very High",
    recommendedFor: ["Undergraduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["Black students", "aerospace", "fellowship", "mentorship", "paid"],
    added: "2026-09-27",
  },
  {
    id: "matthew-isakowitz",
    name: "Matthew Isakowitz Commercial Space Scholarship",
    organization: "Matthew Isakowitz Foundation Programs / Commercial Space Federation",
    type: "Scholarship",
    fields: ["Aerospace Engineering", "Space Science", "Policy", "Computer Science"],
    description: "Scholarship for students interested in shaping the future of the commercial space industry.",
    eligibility: "College students with interest in commercial space; review current criteria on the official application page.",
    educationLevel: ["Undergraduate", "Graduate"],
    citizenship: "Verify on official site",
    internationalEligible: true,
    country: "United States",
    delivery: "Remote",
    funding: "Scholarship; amount varies by program year.",
    fundingValue: 5000,
    tuition: noTuition,
    loans: commonLoans,
    opening: "Annual cycle.",
    deadline: `Varies annually. ${verify}`,
    deadlineSort: "2027-02-01",
    deadlineMonth: "February",
    duration: "Scholarship award cycle.",
    url: "https://matthewisakowitzfellowship.squarespace.com/scholarship",
    competitiveness: "High",
    recommendedFor: ["Undergraduate", "Graduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["commercial space", "scholarship", "policy", "space industry"],
    added: "2026-09-27",
  },
  {
    id: "wai",
    name: "Women in Aviation International Scholarships",
    organization: "Women in Aviation International",
    type: "Scholarship",
    fields: ["Aerospace Engineering", "Aviation", "Mechanical Engineering", "Flight"],
    description: "Large scholarship program supporting aviation and aerospace career pathways.",
    eligibility: "WAI membership is required; award-specific requirements vary.",
    educationLevel: ["High School", "Undergraduate", "Graduate"],
    citizenship: "Varies by award",
    internationalEligible: true,
    country: "Global",
    delivery: "Remote",
    funding: "Scholarship amounts vary by award.",
    fundingValue: 5000,
    tuition: "No tuition; WAI membership required.",
    loans: commonLoans,
    opening: "Annual scholarship cycle.",
    deadline: `Varies by scholarship. ${verify}`,
    deadlineSort: "2027-10-12",
    deadlineMonth: "October",
    duration: "Scholarship award cycle.",
    url: "https://www.wai.org/scholarships",
    competitiveness: "High",
    recommendedFor: ["High School", "Undergraduate", "Graduate"],
    womenOnly: false,
    paid: true,
    free: false,
    tags: ["women in aviation", "aviation", "scholarship", "flight"],
    added: "2026-09-27",
  },
  {
    id: "swe",
    name: "SWE Scholarships",
    organization: "Society of Women Engineers",
    type: "Scholarship",
    fields: ["Aerospace Engineering", "Mechanical Engineering", "Computer Science", "Robotics"],
    description: "Scholarships supporting women pursuing engineering, engineering technology, and related fields.",
    eligibility: "Eligibility varies by scholarship; many require engineering enrollment, GPA thresholds, and SWE criteria.",
    educationLevel: ["Undergraduate", "Graduate"],
    citizenship: "Varies by scholarship",
    internationalEligible: true,
    country: "Global",
    delivery: "Remote",
    funding: "Scholarship amounts vary; SWE awarded more than $1.6M in 2025.",
    fundingValue: 4000,
    tuition: noTuition,
    loans: commonLoans,
    opening: "Late fall / early winter for many cycles.",
    deadline: `Varies by scholarship. ${verify}`,
    deadlineSort: "2027-02-01",
    deadlineMonth: "February",
    duration: "Scholarship award cycle.",
    url: "https://swe.org/apply-for-a-swe-scholarship/",
    competitiveness: "High",
    recommendedFor: ["Undergraduate", "Graduate"],
    womenOnly: true,
    paid: true,
    free: true,
    tags: ["SWE", "women", "engineering", "scholarship"],
    added: "2026-09-27",
  },
  {
    id: "smart",
    name: "SMART Scholarship-for-Service",
    organization: "U.S. Department of Defense SMART Program",
    type: "Scholarship",
    fields: ["Aerospace Engineering", "Mechanical Engineering", "Computer Science", "Physics", "Robotics"],
    description: "Full-tuition STEM scholarship with stipend, internships, mentoring, and post-graduation service commitment.",
    eligibility: "STEM undergraduate or graduate students meeting citizenship, GPA, degree, and service requirements.",
    educationLevel: ["Undergraduate", "Graduate"],
    citizenship: "Citizenship requirements apply; verify current official rules.",
    internationalEligible: true,
    country: "United States",
    delivery: "Hybrid",
    funding: "Full tuition plus annual stipend commonly listed around $30,000-$46,000, plus allowances.",
    fundingValue: 46000,
    tuition: "Full tuition and approved education fees covered for eligible scholars.",
    loans: "Designed to reduce need for student loans; includes service commitment.",
    opening: "Applications typically open August 1.",
    deadline: "December 4, 2026 listed by Scholarship America; verify official program.",
    deadlineSort: "2026-12-04",
    deadlineMonth: "December",
    duration: "1-5 years of funding depending on degree plan and service agreement.",
    url: "https://www.smartscholarship.org/",
    competitiveness: "Very High",
    recommendedFor: ["Undergraduate", "Graduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["full tuition", "stipend", "DoD", "scholarship", "service"],
    added: "2026-09-27",
  },
  {
    id: "astronaut-scholarship",
    name: "Astronaut Scholarship",
    organization: "Astronaut Scholarship Foundation",
    type: "Scholarship",
    fields: ["Aerospace Engineering", "Physics", "Mechanical Engineering", "Computer Science", "Space Science"],
    description: "Merit scholarship for exceptional STEM undergraduates nominated through participating universities.",
    eligibility: "U.S. citizen, nominated by participating university, rising junior or senior, STEM degree and research/innovation intent.",
    educationLevel: ["Undergraduate"],
    citizenship: "U.S. citizens only",
    internationalEligible: false,
    country: "United States",
    delivery: "Remote",
    funding: "Up to $15,000 scholarship plus programming and networking.",
    fundingValue: 15000,
    tuition: noTuition,
    loans: commonLoans,
    opening: "University nomination cycle varies.",
    deadline: "March 30, 2026 liaison nomination deadline listed; campus deadlines may be earlier.",
    deadlineSort: "2026-03-30",
    deadlineMonth: "March",
    duration: "One academic year award; possible renomination.",
    url: "https://www.astronautscholarship.org/programs/astronaut-scholarship/",
    competitiveness: "Very High",
    recommendedFor: ["Undergraduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["astronaut", "research", "STEM", "scholarship", "nomination"],
    added: "2026-09-27",
  },
  {
    id: "national-space-club",
    name: "National Space Club Keynote Scholarship",
    organization: "National Space Club and Foundation",
    type: "Scholarship",
    fields: ["Aerospace Engineering", "Space Science", "Physics", "Computer Science"],
    description: "Scholarship for students pursuing STEM careers with preference for space-related interests.",
    eligibility: "Students intending to pursue STEM study and a STEM career; verify current age, enrollment, and speech requirements.",
    educationLevel: ["High School", "Undergraduate"],
    citizenship: "Verify on official rules",
    internationalEligible: false,
    country: "United States",
    delivery: "Remote",
    funding: "Scholarship amount varies by cycle.",
    fundingValue: 20000,
    tuition: noTuition,
    loans: commonLoans,
    opening: "Annual cycle.",
    deadline: `Typically fall. ${verify}`,
    deadlineSort: "2026-11-17",
    deadlineMonth: "November",
    duration: "Scholarship award cycle.",
    url: "https://www.spaceclub.org/scholarship/",
    competitiveness: "High",
    recommendedFor: ["High School", "Undergraduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["space club", "scholarship", "STEM", "space"],
    added: "2026-09-27",
  },
  {
    id: "goddard-space-club",
    name: "Goddard Space Club Scholars Program",
    organization: "NASA Goddard / National Space Club & Foundation",
    type: "Summer Program",
    fields: ["Aerospace Engineering", "Physics", "Space Science", "Computer Science"],
    description: "Six-week STEM program for high school students near Goddard or Wallops.",
    eligibility: "High school students within 50 miles of NASA Goddard or Wallops; verify grade and location requirements.",
    educationLevel: ["High School"],
    citizenship: "Verify on program page",
    internationalEligible: false,
    country: "United States",
    delivery: "In-person",
    funding: "Program details vary; verify whether stipend or costs apply.",
    fundingValue: 0,
    tuition: "Verify on official page.",
    loans: commonLoans,
    opening: "Spring application period.",
    deadline: "April 17 at 11:59 p.m. listed; verify annually.",
    deadlineSort: "2027-04-17",
    deadlineMonth: "April",
    duration: "6 weeks.",
    url: "https://www.nasa.gov/goddard/stem/space-club-scholars-program/",
    competitiveness: "Medium",
    recommendedFor: ["High School"],
    womenOnly: false,
    paid: false,
    free: true,
    tags: ["Goddard", "high school", "summer", "space club"],
    added: "2026-09-27",
  },
  {
    id: "vff",
    name: "Vertical Flight Foundation Scholarships",
    organization: "Vertical Flight Society",
    type: "Scholarship",
    fields: ["Aerospace Engineering", "Mechanical Engineering", "Rotorcraft", "Vertical Flight"],
    description: "Scholarships for students studying engineering related to vertical lift and vertical flight technology.",
    eligibility: "College students in programs related to vertical lift engineering and careers in vertical flight technology.",
    educationLevel: ["Undergraduate", "Graduate"],
    citizenship: "Verify on VFF rules",
    internationalEligible: true,
    country: "Global",
    delivery: "Remote",
    funding: "Scholarship award; amount varies.",
    fundingValue: 6000,
    tuition: noTuition,
    loans: commonLoans,
    opening: "Annual application cycle.",
    deadline: "February 1, 2026 listed; verify annually.",
    deadlineSort: "2027-02-01",
    deadlineMonth: "February",
    duration: "Scholarship award cycle.",
    url: "https://legacy.vtol.org/education/vertical-flight-foundation-scholarships/vff-scholarship-application-process",
    competitiveness: "High",
    recommendedFor: ["Undergraduate", "Graduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["vertical flight", "rotorcraft", "helicopter", "scholarship"],
    added: "2026-09-27",
  },
  {
    id: "sae",
    name: "SAE International Scholarships",
    organization: "SAE International",
    type: "Scholarship",
    fields: ["Mechanical Engineering", "Aerospace Engineering", "Automotive Engineering", "Robotics"],
    description: "Scholarship programs for students pursuing engineering and mobility-related fields.",
    eligibility: "Requirements vary by SAE scholarship, including academic program, GPA, and location criteria.",
    educationLevel: ["High School", "Undergraduate"],
    citizenship: "Varies by award",
    internationalEligible: true,
    country: "Global",
    delivery: "Remote",
    funding: "Scholarship amounts vary by award.",
    fundingValue: 5000,
    tuition: noTuition,
    loans: commonLoans,
    opening: "Annual scholarship cycle.",
    deadline: `Varies by award. ${verify}`,
    deadlineSort: "2027-03-15",
    deadlineMonth: "March",
    duration: "Scholarship award cycle.",
    url: "https://www.sae.org/participate/scholarships",
    competitiveness: "Medium",
    recommendedFor: ["High School", "Undergraduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["SAE", "mobility", "mechanical engineering", "scholarship"],
    added: "2026-09-27",
  },
  {
    id: "daad-rise",
    name: "DAAD RISE Germany",
    organization: "DAAD",
    type: "Research",
    fields: ["Mechanical Engineering", "Physics", "Computer Science", "Robotics", "Aerospace Engineering"],
    description: "Summer research internships in Germany for undergraduate science and engineering students from North American, British, and Irish universities.",
    eligibility: "Undergraduates who have completed at least two years and remain enrolled; institutional region rules apply.",
    educationLevel: ["Undergraduate"],
    citizenship: "Citizenship flexible if studying at eligible U.S., Canadian, British, or Irish university for required period.",
    internationalEligible: true,
    country: "Germany",
    delivery: "In-person",
    funding: "DAAD scholarship support for living expenses; details vary.",
    fundingValue: 4000,
    tuition: noTuition,
    loans: commonLoans,
    opening: "October 15.",
    deadline: "November 30, 2026 at 11:59 p.m. CET listed for next cycle.",
    deadlineSort: "2026-11-30",
    deadlineMonth: "November",
    duration: "About 10 weeks to 3 months during summer.",
    url: "https://www.daad.de/rise/en/rise-germany/",
    competitiveness: "High",
    recommendedFor: ["Undergraduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["DAAD", "Germany", "research", "international", "engineering"],
    added: "2026-09-27",
  },
  {
    id: "gsoc",
    name: "Google Summer of Code",
    organization: "Google Open Source",
    type: "Summer Program",
    fields: ["Computer Science", "Robotics", "Space Science"],
    description: "Global online open-source coding program with mentoring and contributor stipends.",
    eligibility: "Must be at least 18 at registration and meet GSoC contributor rules.",
    educationLevel: ["High School", "Undergraduate", "Graduate"],
    citizenship: "Global, subject to program restrictions",
    internationalEligible: true,
    country: "Global",
    delivery: "Remote",
    funding: "Stipend varies by project size and location.",
    fundingValue: 3300,
    tuition: noTuition,
    loans: commonLoans,
    opening: "Annual timeline; contributor applications usually open in spring.",
    deadline: `Varies annually. ${verify}`,
    deadlineSort: "2027-04-01",
    deadlineMonth: "April",
    duration: "Flexible project lengths during summer.",
    url: "https://summerofcode.withgoogle.com/get-started",
    competitiveness: "High",
    recommendedFor: ["High School", "Undergraduate", "Graduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["Google", "open source", "software", "remote", "stipend"],
    added: "2026-09-27",
  },
  {
    id: "ieee-aess",
    name: "IEEE AESS Engineering Scholarship",
    organization: "IEEE Aerospace and Electronic Systems Society",
    type: "Scholarship",
    fields: ["Aerospace Engineering", "Electrical Engineering", "Systems Engineering", "Computer Science"],
    description: "Scholarship recognizing students in electrical and systems engineering connected to aerospace/electronic systems.",
    eligibility: "IEEE AESS student members studying eligible programs with GPA requirement.",
    educationLevel: ["Undergraduate", "Graduate"],
    citizenship: "Global IEEE student membership; verify specific rules",
    internationalEligible: true,
    country: "Global",
    delivery: "Remote",
    funding: "Scholarship amount varies by award year.",
    fundingValue: 2000,
    tuition: "No tuition; IEEE membership may require fees.",
    loans: commonLoans,
    opening: "Annual IEEE AESS award cycle.",
    deadline: `Varies annually. ${verify}`,
    deadlineSort: "2027-05-01",
    deadlineMonth: "May",
    duration: "Scholarship award cycle.",
    url: "https://ieee-aess.org/awards/education-awards/engineering-scholarship",
    competitiveness: "Medium",
    recommendedFor: ["Undergraduate", "Graduate"],
    womenOnly: false,
    paid: true,
    free: false,
    tags: ["IEEE", "AESS", "systems", "electrical", "aerospace"],
    added: "2026-09-27",
  },
  {
    id: "space-apps",
    name: "NASA Space Apps Challenge",
    organization: "NASA Space Apps",
    type: "Competition",
    fields: ["Computer Science", "Robotics", "Space Science", "Physics"],
    description: "Global hackathon using NASA and partner space agency data to solve real-world challenges.",
    eligibility: "All ages, skill levels, and professional backgrounds are welcome.",
    educationLevel: ["High School", "Undergraduate", "Graduate"],
    citizenship: "Global",
    internationalEligible: true,
    country: "Global",
    delivery: "Remote / In-person",
    funding: "Free hackathon; prizes and recognition vary.",
    fundingValue: 0,
    tuition: "Free registration.",
    loans: commonLoans,
    opening: "Registration open for 2026 challenge.",
    deadline: "Event dates November 14-15, 2026; verify local registration deadlines.",
    deadlineSort: "2026-11-14",
    deadlineMonth: "November",
    duration: "2-day hackathon.",
    url: "https://www.spaceappschallenge.org/",
    competitiveness: "Medium",
    recommendedFor: ["High School", "Undergraduate", "Graduate"],
    womenOnly: false,
    paid: false,
    free: true,
    tags: ["NASA", "hackathon", "competition", "global", "data"],
    added: "2026-09-27",
  },
  {
    id: "mit-bwsi",
    name: "MIT Beaver Works Summer Institute",
    organization: "MIT Lincoln Laboratory / MIT Beaver Works",
    type: "Summer Program",
    fields: ["Robotics", "Computer Science", "Aerospace Engineering", "AI"],
    description: "Rigorous high school STEM courses including autonomous systems, remote sensing, embedded systems, and AI tracks.",
    eligibility: "U.S.-based high school students meeting BWSI eligibility and course/application requirements.",
    educationLevel: ["High School"],
    citizenship: "Students residing in and attending high school physically in the United States; verify details.",
    internationalEligible: false,
    country: "United States",
    delivery: "Hybrid",
    funding: "Program cost varies by format; many online materials are free.",
    fundingValue: 0,
    tuition: "Verify current cost by course; some online coursework is free.",
    loans: commonLoans,
    opening: "Online course/application sequence begins before summer.",
    deadline: "Application deadline appears in student portal; verify on BWSI.",
    deadlineSort: "2027-03-31",
    deadlineMonth: "March",
    duration: "Summer course/program.",
    url: "https://bwsi.mit.edu/faq/",
    competitiveness: "High",
    recommendedFor: ["High School"],
    womenOnly: false,
    paid: false,
    free: false,
    tags: ["MIT", "robotics", "autonomy", "summer", "high school"],
    added: "2026-09-27",
  },
  {
    id: "regeneron-isef",
    name: "Regeneron International Science and Engineering Fair",
    organization: "Society for Science / Regeneron",
    type: "Competition",
    fields: ["Physics", "Robotics", "Computer Science", "Mechanical Engineering", "Space Science"],
    description: "The world's largest international pre-college STEM competition for high school research finalists.",
    eligibility: "Students qualify through affiliated science fairs; project and fair rules apply.",
    educationLevel: ["High School"],
    citizenship: "Global through affiliated fairs",
    internationalEligible: true,
    country: "Global",
    delivery: "In-person",
    funding: "Awards, prizes, and scholarships vary by competition year.",
    fundingValue: 5000,
    tuition: "No standard tuition; fair participation costs vary by local fair.",
    loans: commonLoans,
    opening: "Affiliated fairs set local timelines.",
    deadline: "Local fair deadlines vary; ISEF event dates vary annually.",
    deadlineSort: "2027-02-15",
    deadlineMonth: "February",
    duration: "Research season plus international fair.",
    url: "https://www.societyforscience.org/isef/",
    competitiveness: "Very High",
    recommendedFor: ["High School"],
    womenOnly: false,
    paid: true,
    free: false,
    tags: ["science fair", "research", "high school", "competition"],
    added: "2026-09-27",
  },
  {
    id: "nasa-herc",
    name: "NASA Human Exploration Rover Challenge",
    organization: "NASA",
    type: "Competition",
    fields: ["Aerospace Engineering", "Mechanical Engineering", "Robotics"],
    description: "Student teams design and build rovers for simulated lunar terrain mission tasks.",
    eligibility: "High school and college teams; proposal, registration, and team requirements vary by year.",
    educationLevel: ["High School", "Undergraduate"],
    citizenship: "U.S. and international teams may have different requirements",
    internationalEligible: true,
    country: "United States",
    delivery: "In-person",
    funding: "Team costs vary; NASA provides challenge experience, not a standard stipend.",
    fundingValue: 0,
    tuition: "No tuition; team build/travel costs may apply.",
    loans: commonLoans,
    opening: "Annual proposal cycle.",
    deadline: `Proposal deadlines vary. ${verify}`,
    deadlineSort: "2026-09-30",
    deadlineMonth: "September",
    duration: "Nine-month challenge cycle.",
    url: "https://www.nasa.gov/learning-resources/nasa-human-exploration-rover-challenge/",
    competitiveness: "High",
    recommendedFor: ["High School", "Undergraduate"],
    womenOnly: false,
    paid: false,
    free: false,
    tags: ["NASA", "rover", "robotics", "mechanical design", "team"],
    added: "2026-09-27",
  },
  {
    id: "blue-skies",
    name: "NASA Gateways to Blue Skies Competition",
    organization: "NASA Aeronautics / National Institute of Aerospace",
    type: "Competition",
    fields: ["Aerospace Engineering", "Mechanical Engineering", "Aviation", "Sustainability"],
    description: "University aviation design competition focused on future aeronautics themes.",
    eligibility: "Teams from eligible U.S.-based colleges/universities; foreign national participation has restrictions.",
    educationLevel: ["Undergraduate", "Graduate"],
    citizenship: "U.S.-based university teams; prize/travel eligibility restrictions apply",
    internationalEligible: false,
    country: "United States",
    delivery: "Hybrid",
    funding: "Finalist teams may receive stipends to support forum participation.",
    fundingValue: 8000,
    tuition: "No tuition; team costs may apply.",
    loans: commonLoans,
    opening: "Annual challenge theme release.",
    deadline: `Proposal/NOI dates vary. ${verify}`,
    deadlineSort: "2027-02-01",
    deadlineMonth: "February",
    duration: "Academic-year design competition.",
    url: "https://blueskies.nianet.org/",
    competitiveness: "High",
    recommendedFor: ["Undergraduate", "Graduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["NASA", "aeronautics", "aviation", "design competition"],
    added: "2026-09-27",
  },
  {
    id: "big-idea",
    name: "NASA BIG Idea Challenge",
    organization: "NASA",
    type: "Competition",
    fields: ["Aerospace Engineering", "Mechanical Engineering", "Robotics", "Space Science"],
    description: "Student engineering design competition focused on technologies supporting NASA exploration goals.",
    eligibility: "Undergraduate and graduate teams; current theme and team requirements vary.",
    educationLevel: ["Undergraduate", "Graduate"],
    citizenship: "Verify current challenge rules",
    internationalEligible: false,
    country: "United States",
    delivery: "Hybrid",
    funding: "Selected finalist teams may receive project funding depending on challenge year.",
    fundingValue: 10000,
    tuition: "No tuition; team project costs vary.",
    loans: commonLoans,
    opening: "Annual or periodic challenge cycle.",
    deadline: `Varies by challenge theme. ${verify}`,
    deadlineSort: "2027-02-01",
    deadlineMonth: "February",
    duration: "Design cycle varies by year.",
    url: "https://www.nasa.gov/nasas-big-idea-challenge/",
    competitiveness: "High",
    recommendedFor: ["Undergraduate", "Graduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["NASA", "BIG Idea", "design", "exploration", "technology"],
    added: "2026-09-27",
  },
  {
    id: "lspace",
    name: "NASA L'SPACE Academy",
    organization: "NASA L'SPACE",
    type: "Mentorship",
    fields: ["Aerospace Engineering", "Space Science", "Systems Engineering", "Computer Science"],
    description: "Online academy experience where students learn NASA mission concept development and proposal skills.",
    eligibility: "U.S. college students; exact eligibility varies by academy and cycle.",
    educationLevel: ["Undergraduate", "Graduate"],
    citizenship: "U.S. citizens and permanent residents commonly referenced; verify current cycle.",
    internationalEligible: false,
    country: "United States",
    delivery: "Remote",
    funding: "Free online program; no standard stipend.",
    fundingValue: 0,
    tuition: "Free program.",
    loans: commonLoans,
    opening: "Multiple academy cycles may run annually.",
    deadline: `Varies by cohort. ${verify}`,
    deadlineSort: "2027-01-15",
    deadlineMonth: "January",
    duration: "Semester-style online academy.",
    url: "https://www.lspace.asu.edu/",
    competitiveness: "Medium",
    recommendedFor: ["Undergraduate", "Graduate"],
    womenOnly: false,
    paid: false,
    free: true,
    tags: ["NASA", "LSPACE", "online", "mission concept", "proposal"],
    added: "2026-09-27",
  },
  {
    id: "techrise",
    name: "NASA TechRise Student Challenge",
    organization: "NASA / Future Engineers",
    type: "Competition",
    fields: ["Aerospace Engineering", "Robotics", "Physics", "Computer Science"],
    description: "Student teams design science and technology experiments for high-altitude flight test opportunities.",
    eligibility: "U.S. school teams; grade levels and team rules vary by cycle.",
    educationLevel: ["High School"],
    citizenship: "U.S. school teams; verify official rules",
    internationalEligible: false,
    country: "United States",
    delivery: "Hybrid",
    funding: "Winning teams may receive funding and flight-test support.",
    fundingValue: 1500,
    tuition: "No tuition; team project costs may vary.",
    loans: commonLoans,
    opening: "Annual challenge cycle.",
    deadline: `Varies annually. ${verify}`,
    deadlineSort: "2026-11-01",
    deadlineMonth: "November",
    duration: "School-year challenge.",
    url: "https://www.futureengineers.org/nasatechrise",
    competitiveness: "Medium",
    recommendedFor: ["High School"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["NASA", "high school", "flight test", "payload", "STEM"],
    added: "2026-09-27",
  },
  {
    id: "esa-cansat",
    name: "ESA CanSat",
    organization: "ESA Education",
    type: "Competition",
    fields: ["Aerospace Engineering", "Robotics", "Physics", "Computer Science"],
    description: "Student competition where teams design a small satellite-like payload in a can-sized format.",
    eligibility: "Secondary school teams in participating ESA Member States and national competitions.",
    educationLevel: ["High School"],
    citizenship: "Participating ESA countries; verify national organizer rules",
    internationalEligible: true,
    country: "Europe",
    delivery: "In-person",
    funding: "Costs and support vary by national organizer.",
    fundingValue: 0,
    tuition: "No tuition; team materials/travel may vary.",
    loans: commonLoans,
    opening: "Annual national cycles.",
    deadline: `Varies by country. ${verify}`,
    deadlineSort: "2027-01-15",
    deadlineMonth: "January",
    duration: "School-year project and competition.",
    url: "https://www.esa.int/Education/CanSat",
    competitiveness: "Medium",
    recommendedFor: ["High School"],
    womenOnly: false,
    paid: false,
    free: true,
    tags: ["ESA", "CanSat", "satellite", "high school", "team"],
    added: "2026-09-27",
  },
  {
    id: "moon-camp",
    name: "ESA Moon Camp Challenge",
    organization: "ESA Education / Airbus Foundation / Autodesk Foundation",
    type: "Competition",
    fields: ["Aerospace Engineering", "Space Science", "Robotics", "Design"],
    description: "International educational challenge where students design a lunar habitat or exploration concept.",
    eligibility: "Students and teams in eligible age categories; teacher/mentor rules vary by category.",
    educationLevel: ["High School"],
    citizenship: "Global participation rules vary by category",
    internationalEligible: true,
    country: "Global",
    delivery: "Remote",
    funding: "Free educational challenge; prizes/recognition vary.",
    fundingValue: 0,
    tuition: "Free.",
    loans: commonLoans,
    opening: "Annual challenge cycle.",
    deadline: `Varies annually. ${verify}`,
    deadlineSort: "2027-04-30",
    deadlineMonth: "April",
    duration: "Flexible school-year challenge.",
    url: "https://mooncampchallenge.org/",
    competitiveness: "Medium",
    recommendedFor: ["High School"],
    womenOnly: false,
    paid: false,
    free: true,
    tags: ["ESA", "Moon", "design", "lunar habitat", "competition"],
    added: "2026-09-27",
  },
  {
    id: "club-for-future",
    name: "Club for the Future Postcards to Space",
    organization: "Blue Origin Club for the Future",
    type: "Competition",
    fields: ["Space Science", "Aerospace Engineering", "Design"],
    description: "Accessible space-themed student activity where postcards may fly to space and return stamped.",
    eligibility: "Students and educators; activity rules vary.",
    educationLevel: ["High School"],
    citizenship: "Global participation may vary; verify official rules",
    internationalEligible: true,
    country: "Global",
    delivery: "Remote",
    funding: "Free educational activity.",
    fundingValue: 0,
    tuition: "Free.",
    loans: commonLoans,
    opening: "Rolling activity.",
    deadline: `Rolling / varies. ${verify}`,
    deadlineSort: "2027-06-01",
    deadlineMonth: "June",
    duration: "Short activity.",
    url: "https://www.clubforfuture.org/missions/",
    competitiveness: "Low",
    recommendedFor: ["High School"],
    womenOnly: false,
    paid: false,
    free: true,
    tags: ["space", "student activity", "Blue Origin", "free"],
    added: "2026-09-27",
  },
  {
    id: "first-robotics",
    name: "FIRST Robotics Competition",
    organization: "FIRST",
    type: "Competition",
    fields: ["Robotics", "Mechanical Engineering", "Computer Science", "Electrical Engineering"],
    description: "Team robotics competition that builds engineering, programming, controls, and project-management experience.",
    eligibility: "High school teams; registration, mentor, and event requirements vary by region.",
    educationLevel: ["High School"],
    citizenship: "Global through regional programs",
    internationalEligible: true,
    country: "Global",
    delivery: "In-person",
    funding: "Team registration and build costs vary; grants may be available.",
    fundingValue: 0,
    tuition: "No tuition, but team registration/material costs may apply.",
    loans: commonLoans,
    opening: "Annual season launch.",
    deadline: "Team registration and event deadlines vary by region.",
    deadlineSort: "2027-01-10",
    deadlineMonth: "January",
    duration: "School-year competition season.",
    url: "https://www.firstinspires.org/robotics/frc",
    competitiveness: "Medium",
    recommendedFor: ["High School"],
    womenOnly: false,
    paid: false,
    free: false,
    tags: ["robotics", "controls", "team", "engineering", "competition"],
    added: "2026-09-27",
  },
  {
    id: "engineergirl",
    name: "EngineerGirl Writing Contest",
    organization: "National Academy of Engineering",
    type: "Competition",
    fields: ["Aerospace Engineering", "Mechanical Engineering", "Computer Science", "Engineering Communication"],
    description: "Engineering-themed writing contest that helps students connect technical ideas with communication.",
    eligibility: "Students in eligible grade bands; prompt and rules change annually.",
    educationLevel: ["High School"],
    citizenship: "Global eligibility may vary; verify official rules",
    internationalEligible: true,
    country: "Global",
    delivery: "Remote",
    funding: "Cash prizes vary by grade category.",
    fundingValue: 1000,
    tuition: "Free.",
    loans: commonLoans,
    opening: "Annual prompt release.",
    deadline: `Varies annually. ${verify}`,
    deadlineSort: "2027-02-01",
    deadlineMonth: "February",
    duration: "Essay contest cycle.",
    url: "https://www.engineergirl.org/128750/EngineerGirl-Writing-Contest",
    competitiveness: "Medium",
    recommendedFor: ["High School"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["engineering", "writing", "communication", "contest"],
    added: "2026-09-27",
  },
  {
    id: "aerospace-corp-intern",
    name: "The Aerospace Corporation Internships",
    organization: "The Aerospace Corporation",
    type: "Internship",
    fields: ["Aerospace Engineering", "Mechanical Engineering", "Computer Science", "Physics", "Space Science"],
    description: "Internships in space systems engineering, national security space, software, analysis, and mission support.",
    eligibility: "Role-specific requirements; many positions require U.S. work authorization or citizenship due to government work.",
    educationLevel: ["Undergraduate", "Graduate"],
    citizenship: "Varies by role; many require U.S. citizenship",
    internationalEligible: false,
    country: "United States",
    delivery: "Hybrid",
    funding: "Paid internship roles.",
    fundingValue: 8000,
    tuition: noTuition,
    loans: commonLoans,
    opening: "Roles posted throughout recruiting season.",
    deadline: `Varies by posting. ${verify}`,
    deadlineSort: "2027-02-15",
    deadlineMonth: "February",
    duration: "Summer or semester internship depending on role.",
    url: "https://aerospace.org/careers/students",
    competitiveness: "High",
    recommendedFor: ["Undergraduate", "Graduate"],
    womenOnly: false,
    paid: true,
    free: true,
    tags: ["space systems", "internship", "engineering", "paid"],
    added: "2026-09-27",
  },
];

const typeOptions = [...new Set(opportunities.map((item) => item.type))].sort();
const fieldOptions = [...new Set(opportunities.flatMap((item) => item.fields))].sort();
const levelOptions = ["High School", "Undergraduate", "Graduate"];
const countryOptions = [...new Set(opportunities.map((item) => item.country))].sort();
const deadlineMonths = [...new Set(opportunities.map((item) => item.deadlineMonth))].sort();
const deliveryOptions: Delivery[] = ["Remote", "Hybrid", "In-person", "Remote / In-person"];
const rank: Record<Difficulty, number> = { Low: 1, Medium: 2, High: 3, "Very High": 4 };

const toggle = (current: string[], value: string) =>
  current.includes(value) ? current.filter((item) => item !== value) : [...current, value];

function FilterGroup({
  label,
  onToggle,
  options,
  selected,
}: {
  label: string;
  onToggle: (value: string) => void;
  options: string[];
  selected: string[];
}) {
  return (
    <details className="opportunity-filter" open>
      <summary>{label}</summary>
      <div>
        {options.map((option) => (
          <button className={selected.includes(option) ? "chip active" : "chip"} key={option} onClick={() => onToggle(option)} type="button">
            {option}
          </button>
        ))}
      </div>
    </details>
  );
}

export function OpportunityExplorer({ preview = false }: { preview?: boolean }) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Closest Deadline");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<string[]>([]);
  const [flags, setFlags] = useState({ free: false, international: false, paid: false, womenOnly: false });

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return opportunities
      .filter((item) => {
        const haystack = [item.name, item.organization, item.type, item.country, item.citizenship, ...item.fields, ...item.tags, ...item.recommendedFor].join(" ").toLowerCase();
        return (
          (!search || haystack.includes(search)) &&
          (!selectedTypes.length || selectedTypes.includes(item.type)) &&
          (!selectedFields.length || item.fields.some((field) => selectedFields.includes(field))) &&
          (!selectedLevels.length || item.educationLevel.some((level) => selectedLevels.includes(level))) &&
          (!selectedCountries.length || selectedCountries.includes(item.country)) &&
          (!selectedMonths.length || selectedMonths.includes(item.deadlineMonth)) &&
          (!selectedDelivery.length || selectedDelivery.includes(item.delivery)) &&
          (!flags.free || item.free) &&
          (!flags.paid || item.paid) &&
          (!flags.international || item.internationalEligible) &&
          (!flags.womenOnly || item.womenOnly)
        );
      })
      .sort((a, b) => {
        if (sort === "Most Competitive") return rank[b.competitiveness] - rank[a.competitiveness];
        if (sort === "Least Competitive") return rank[a.competitiveness] - rank[b.competitiveness];
        if (sort === "Highest Funding") return b.fundingValue - a.fundingValue;
        if (sort === "Recently Added") return b.added.localeCompare(a.added);
        if (sort === "Alphabetical") return a.name.localeCompare(b.name);
        return a.deadlineSort.localeCompare(b.deadlineSort);
      });
  }, [flags, query, selectedCountries, selectedDelivery, selectedFields, selectedLevels, selectedMonths, selectedTypes, sort]);

  const records = preview ? filtered.slice(0, 6) : filtered;

  return (
    <div className="opportunity-hub">
      <div className="opportunity-toolbar">
        <label>
          Search opportunities
          <input onChange={(event) => setQuery(event.target.value)} placeholder="Search NASA, robotics, scholarships, women, remote..." value={query} />
        </label>
        <label>
          Sort by
          <select onChange={(event) => setSort(event.target.value)} value={sort}>
            {["Closest Deadline", "Most Competitive", "Least Competitive", "Highest Funding", "Recently Added", "Alphabetical"].map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
      </div>

      <div className="opportunity-layout">
        {!preview ? (
          <aside className="opportunity-filters" aria-label="Opportunity filters">
            <div className="filter-heading">
              <strong>Filters</strong>
              <button className="button secondary" onClick={() => {
                setSelectedTypes([]);
                setSelectedFields([]);
                setSelectedLevels([]);
                setSelectedCountries([]);
                setSelectedMonths([]);
                setSelectedDelivery([]);
                setFlags({ free: false, international: false, paid: false, womenOnly: false });
              }} type="button">
                Clear
              </button>
            </div>
            <div className="quick-filter-grid">
              {[
                ["Free", "free"],
                ["Paid / Funded", "paid"],
                ["International Eligible", "international"],
                ["Women Only", "womenOnly"],
              ].map(([label, key]) => (
                <button className={flags[key as keyof typeof flags] ? "chip active" : "chip"} key={key} onClick={() => setFlags((current) => ({ ...current, [key]: !current[key as keyof typeof flags] }))} type="button">
                  {label}
                </button>
              ))}
            </div>
            <FilterGroup label="Opportunity Type" onToggle={(value) => setSelectedTypes((current) => toggle(current, value))} options={typeOptions} selected={selectedTypes} />
            <FilterGroup label="Engineering Discipline" onToggle={(value) => setSelectedFields((current) => toggle(current, value))} options={fieldOptions} selected={selectedFields} />
            <FilterGroup label="Education Level" onToggle={(value) => setSelectedLevels((current) => toggle(current, value))} options={levelOptions} selected={selectedLevels} />
            <FilterGroup label="Country / Region" onToggle={(value) => setSelectedCountries((current) => toggle(current, value))} options={countryOptions} selected={selectedCountries} />
            <FilterGroup label="Remote / In Person" onToggle={(value) => setSelectedDelivery((current) => toggle(current, value))} options={deliveryOptions} selected={selectedDelivery} />
            <FilterGroup label="Deadline Month" onToggle={(value) => setSelectedMonths((current) => toggle(current, value))} options={deadlineMonths} selected={selectedMonths} />
          </aside>
        ) : null}

        <section className="opportunity-results" aria-live="polite">
          {!preview ? (
            <div className="results-summary">
              <strong>{records.length}</strong>
              <span>matching opportunities</span>
              <p>Deadlines and eligibility can change. Always verify details through the official application page before applying.</p>
            </div>
          ) : null}
          <OpportunityCards expanded={expanded} records={records} setExpanded={setExpanded} />
        </section>
      </div>
    </div>
  );
}

function OpportunityCards({ expanded, records, setExpanded }: { expanded: string | null; records: Opportunity[]; setExpanded: (id: string | null) => void }) {
  if (!records.length) {
    return (
      <article className="opportunity-card empty-state">
        <h3>No matches yet</h3>
        <p>Try removing one filter or searching a broader term like NASA, scholarship, software, or undergraduate.</p>
      </article>
    );
  }

  return (
    <div className="opportunity-grid flagship-opportunities" id="saved-opportunities">
      {records.map((item) => {
        const isExpanded = expanded === item.id;
        return (
          <article className="opportunity-card opportunity-card-rich" key={item.id}>
            <div className="opportunity-card-top">
              <div>
                <small>{item.organization}</small>
                <h3>{item.name}</h3>
              </div>
              <span className={`difficulty difficulty-${item.competitiveness.toLowerCase().replace(/\s+/g, "-")}`}>{item.competitiveness}</span>
            </div>
            <p>{item.description}</p>
            <div className="opportunity-tags">
              <span>{item.type}</span>
              <span>{item.delivery}</span>
              <span>{item.deadlineMonth}</span>
              {item.free ? <span>Free</span> : null}
              {item.paid ? <span>Funded</span> : null}
            </div>
            <div className="opportunity-snapshot">
              <div><small>Recommended for</small><strong>{item.recommendedFor.join(", ")}</strong></div>
              <div><small>Country / region</small><strong>{item.country}</strong></div>
              <div><small>Funding</small><strong>{item.fundingValue ? `$${item.fundingValue.toLocaleString()}+` : "See details"}</strong></div>
            </div>
            {isExpanded ? (
              <div className="opportunity-expanded">
                <div><strong>Fields</strong><p>{item.fields.join(", ")}</p></div>
                <div><strong>Eligibility</strong><p>{item.eligibility}</p></div>
                <div><strong>Education level</strong><p>{item.educationLevel.join(", ")}</p></div>
                <div><strong>Citizenship requirements</strong><p>{item.citizenship}</p></div>
                <div><strong>Funding information</strong><p>{item.funding}</p></div>
                <div><strong>Tuition cost</strong><p>{item.tuition}</p></div>
                <div><strong>Student loan / payment plan information</strong><p>{item.loans}</p></div>
                <div><strong>Typical opening period</strong><p>{item.opening}</p></div>
                <div><strong>Typical deadline</strong><p>{item.deadline}</p></div>
                <div><strong>Duration</strong><p>{item.duration}</p></div>
                <div><strong>Tags</strong><p>{item.tags.join(", ")}</p></div>
              </div>
            ) : null}
            <div className="opportunity-actions">
              <button className="button secondary" onClick={() => setExpanded(isExpanded ? null : item.id)} type="button">
                {isExpanded ? "Hide details" : "View details"}
              </button>
              <a className="button primary" href={item.url} rel="noreferrer" target="_blank">Apply</a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
