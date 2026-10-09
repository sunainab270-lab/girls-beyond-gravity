import { LockIcon } from "@/components/UnitLock";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CourseSidebar } from "@/components/CourseSidebar";
import { PageShell } from "@/components/PageShell";
import { apCourses, apUnitNumber, getCourse, getUnit, isUnitAvailable } from "@/lib/data";

export function generateStaticParams() {
  return apCourses.flatMap((course) =>
    course.units.map((unit) => ({ courseSlug: course.slug, unitSlug: unit.slug })),
  );
}

export default async function UnitPage({
  params: paramsPromise,
}: {
  params: Promise<{ courseSlug: string; unitSlug: string }>;
}) {
  const params = await paramsPromise;
  const course = getCourse(params.courseSlug) ?? apCourses[0];
  const unit = getUnit(course.slug, params.unitSlug) ?? course.units[0];

  const apNumber = apUnitNumber(course.slug, course.units.findIndex(u=>u.slug===unit.slug));

  return (
    <PageShell>
      <section className="page-hero" id="content">
        <Breadcrumbs
          items={[
            { label: "AP Physics", href: "/ap-physics" },
            { label: course.shortTitle, href: `/ap-physics/${course.slug}` },
            { label: unit.title, href: `/ap-physics/${course.slug}/${unit.slug}` },
          ]}
        />
        <p className="eyebrow">{course.shortTitle}</p>
        <h1>{unit.title}</h1>
        <p>{unit.description}</p>
      </section>

      <section className="section learning-layout">
        <CourseSidebar course={course} currentUnitSlug={unit.slug} />
        <div className="learning-main">
          {!isUnitAvailable(unit) ? <article className="lesson-panel locked-unit-notice"><LockIcon/><h2>This unit is locked</h2><p>The full lessons and practice are coming soon.</p><a className="button secondary" href={`/ap-physics/${course.slug}`}>Back to available units</a></article> : <>
          <div className="dashboard-grid course-metrics">
            <article className="metric-card">
              <small>Content available</small>
              <strong>{unit.progress}</strong>
              <span>Published lesson coverage</span>
            </article>
            <article className="metric-card">
              <small>{course.slug === "physics-1" ? "Topics" : "Lessons"}</small>
              <strong>{unit.lessons.length}</strong>
              <span>
                {course.slug === "physics-1"
                  ? "Open each topic separately"
                  : "Open each lesson separately"}
              </span>
            </article>
            <article className="metric-card">
              <small>Practice</small>
              <strong>{unit.practice.length || "Preview"}</strong>
              <span>Short checks</span>
            </article>
            <article className="metric-card">
              <small>Unit test</small>
              <strong>{unit.testStatus}</strong>
              <span>Dedicated page</span>
            </article>
          </div>

          <article className="lesson-panel">
            <h2>Learning objectives</h2>
            <ul>
              {unit.objectives.map((objective) => (
                <li key={objective}>{objective}</li>
              ))}
            </ul>
          </article>

          <div className="curriculum-grid">
            {unit.lessons.length ? (
              unit.lessons.map((lesson, index) => (
                <article className="level-card topic-card" key={lesson.slug}>
                  <div className="unit-card-header">
                    <span className="unit-number">
                      {`AP Topic ${apNumber}.${index + 1}`}
                    </span>
                    <span className="status-pill">{lesson.status}</span>
                  </div>
                  <h3>{lesson.title}</h3>
                  <p>{lesson.summary}</p>
                  <div className="topic-card-meta">
                    <span>{lesson.estimatedTime}</span>
                    <span>{lesson.equations.length} equations</span>
                    <span>{lesson.vocabulary.length} terms</span>
                  </div>
                  <a
                    className="button secondary"
                    href={`/ap-physics/${course.slug}/${unit.slug}/${lesson.slug}`}
                  >
                    Open {course.slug === "physics-1" ? "topic" : "lesson"}
                  </a>
                </article>
              ))
            ) : (
              <article className="level-card">
                <small>Preview</small>
                <h3>Lessons coming later</h3>
                <p>
                  This unit page is ready for future lessons without changing
                  the routing structure.
                </p>
              </article>
            )}
          </div>

          <div className="unit-actions">
            <a className="button secondary" href={`/ap-physics/${course.slug}/${unit.slug}/review`}>
              Unit Review
            </a>
            <a className="button primary" href={`/ap-physics/${course.slug}/${unit.slug}/test`}>
              Unit Test
              </a>
            </div>
        </>}
        </div>
      </section>
    </PageShell>
  );
}
