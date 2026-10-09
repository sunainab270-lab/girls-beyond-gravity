import { writeFile } from "node:fs/promises";

const seed = {
  users: [
    { email: "student.demo@beyondgravity.test", role: "student" },
    { email: "educator.demo@beyondgravity.test", role: "educator" },
    { email: "tutor.demo@beyondgravity.test", role: "tutor" },
    { email: "mentor.demo@beyondgravity.test", role: "mentor" },
    { email: "admin.demo@beyondgravity.test", role: "administrator" },
  ],
  note: "Demo seed fixture only. No real personal information.",
};

await writeFile("work/demo-seed.json", `${JSON.stringify(seed, null, 2)}\n`);
console.log("Wrote work/demo-seed.json");
