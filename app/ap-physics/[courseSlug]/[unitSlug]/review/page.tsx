import { getUnitOne } from "@/lib/unitOne";
import { UnitOneReview } from "@/components/UnitOneReview";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CourseSidebar } from "@/components/CourseSidebar";
import { PageShell } from "@/components/PageShell";
import { Unit1Review } from "@/components/Unit1Review";
import { Unit2Review } from "@/components/Unit2Review";
import { apCourses, getCourse, getUnit } from "@/lib/data";

export function generateStaticParams() {
  return apCourses.flatMap((course) =>
    course.units.map((unit) => ({ courseSlug: course.slug, unitSlug: unit.slug })),
  );
}

export default async function UnitReviewPage({
  params: paramsPromise,
}: {
  params: Promise<{ courseSlug: string; unitSlug: string }>;
}) {
  const params = await paramsPromise;
  const course = getCourse(params.courseSlug) ?? apCourses[0];
  const unit = getUnit(course.slug, params.unitSlug) ?? course.units[0];
  const newUnit = getUnitOne(course.slug, unit.slug);
  const isUnit1Review = course.slug === "physics-1" && unit.slug === "kinematics";
  const isUnit2Review =
    course.slug === "physics-1" && unit.slug === "force-translational-dynamics";

  return (
    <PageShell>
      <section className="page-hero" id="content">
        <Breadcrumbs
          items={[
            { label: "AP Physics", href: "/ap-physics" },
            { label: course.shortTitle, href: `/ap-physics/${course.slug}` },
            { label: unit.title, href: `/ap-physics/${course.slug}/${unit.slug}` },
            { label: "Review", href: `/ap-physics/${course.slug}/${unit.slug}/review` },
          ]}
        />
        <p className="eyebrow">Unit Review</p>
        <h1>{unit.title} review</h1>
        <p>{isUnit1Review ? "Integrate Topics 1.1-1.5 with guided practice before the cumulative Unit 1 test." : isUnit2Review ? "Integrate Topics 2.1-2.9 with guided practice before the cumulative Unit 2 test." : "Review the unit objectives before taking the dedicated unit test."}</p>
      </section>

      <section className="section learning-layout">
        <CourseSidebar course={course} currentUnitSlug={unit.slug} />
        <article className="learning-main lesson-panel">
          {newUnit ? (
            <UnitOneReview unit={newUnit} courseSlug={course.slug} />
          ) : isUnit1Review ? (
            <Unit1Review />
          ) : isUnit2Review ? (
            <Unit2Review />
          ) : (
            <>
              <h2>Review checklist</h2>
              <ul>
                {unit.objectives.map((objective) => (
                  <li key={objective}>{objective}</li>
                ))}
              </ul>
              <h2>Practice section</h2>
              {unit.practice.length ? (
                unit.practice.map((problem) => (
                  <div className="practice" key={problem.prompt}>
                    <strong>{problem.prompt}</strong>
                    <p>Hint: {problem.hint}</p>
                  </div>
                ))
              ) : (
                <p className="practice">Practice questions will be added for this preview unit.</p>
              )}
              <a className="button primary" href={`/ap-physics/${course.slug}/${unit.slug}/test`}>
                Start Unit Test
              </a>
            </>
          )}
        </article>
      </section>
    </PageShell>
  );
}
