import { getUnitOne } from "@/lib/unitOne";
import { UnitOneTest } from "@/components/UnitOneTest";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CourseSidebar } from "@/components/CourseSidebar";
import { PageShell } from "@/components/PageShell";
import { Unit1Test } from "@/components/Unit1Test";
import { Unit2Test } from "@/components/Unit2Test";
import { apCourses, getCourse, getUnit } from "@/lib/data";

export function generateStaticParams() {
  return apCourses.flatMap((course) =>
    course.units.map((unit) => ({ courseSlug: course.slug, unitSlug: unit.slug })),
  );
}

export default async function UnitTestPage({
  params: paramsPromise,
}: {
  params: Promise<{ courseSlug: string; unitSlug: string }>;
}) {
  const params = await paramsPromise;
  const course = getCourse(params.courseSlug) ?? apCourses[0];
  const unit = getUnit(course.slug, params.unitSlug) ?? course.units[0];
  const newUnit = getUnitOne(course.slug, unit.slug);
  const isUnit1Test = course.slug === "physics-1" && unit.slug === "kinematics";
  const isUnit2Test =
    course.slug === "physics-1" && unit.slug === "force-translational-dynamics";

  return (
    <PageShell>
      <section className="page-hero" id="content">
        <Breadcrumbs
          items={[
            { label: "AP Physics", href: "/ap-physics" },
            { label: course.shortTitle, href: `/ap-physics/${course.slug}` },
            { label: unit.title, href: `/ap-physics/${course.slug}/${unit.slug}` },
            { label: "Unit Test", href: `/ap-physics/${course.slug}/${unit.slug}/test` },
          ]}
        />
        <p className="eyebrow">Unit Test</p>
        <h1>{unit.title} unit test</h1>
        <p>{isUnit1Test ? "A cumulative AP-style practice assessment for AP Physics 1 Unit 1." : isUnit2Test ? "A cumulative AP-style practice assessment for AP Physics 1 Unit 2." : "Complete the lessons and review before this original practice assessment."}</p>
      </section>

      <section className="section learning-layout">
        <CourseSidebar course={course} currentUnitSlug={unit.slug} />
        <div className="learning-main">
          {newUnit ? (
            <UnitOneTest unit={newUnit} />
          ) : isUnit1Test ? (
            <Unit1Test />
          ) : isUnit2Test ? (
            <Unit2Test />
          ) : (
            <article className="test-panel">
              <h2>Unit test coming soon</h2>
              <p>
                This dedicated test route is ready for future assessment questions
                for {unit.title}.
              </p>
              <p className="notice">
                Test content has not been added yet. Direct answer help will stay
                disabled during graded tests.
              </p>
            </article>
          )}
        </div>
      </section>
    </PageShell>
  );
}
