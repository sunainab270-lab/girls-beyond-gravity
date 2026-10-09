import { LockIcon } from "@/components/UnitLock";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageShell } from "@/components/PageShell";
import { apCourses, apUnitNumber, getCourse, isUnitAvailable } from "@/lib/data";

export function generateStaticParams() {
  return apCourses.map((course) => ({ courseSlug: course.slug }));
}

export default async function CoursePage({
  params: paramsPromise,
}: {
  params: Promise<{ courseSlug: string }>;
}) {
  const params = await paramsPromise;
  const course = getCourse(params.courseSlug) ?? apCourses[0];

  return (
    <PageShell>
      <section className="page-hero" id="content">
        <Breadcrumbs
          items={[
            { label: "AP Physics", href: "/ap-physics" },
            { label: course.shortTitle, href: `/ap-physics/${course.slug}` },
          ]}
        />
        <p className="eyebrow">{course.status}</p>
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </section>

      <section className="section">
        <div className="dashboard-grid course-metrics">
          <article className="metric-card">
            <small>Content available</small>
            <strong>{course.progress}</strong>
            <span>Published lesson coverage</span>
          </article>
          <article className="metric-card">
            <small>Units</small>
            <strong>{course.units.length}</strong>
            <span>Course map</span>
          </article>
          <article className="metric-card">
            <small>{course.slug === "physics-1" ? "Topics" : "Lessons"}</small>
            <strong>
              {course.units.reduce((total, unit) => total + unit.lessons.length, 0)}
            </strong>
            <span>
              {course.slug === "physics-1" ? "Separate topic pages" : "Separate lesson pages"}
            </span>
          </article>
          <article className="metric-card">
            <small>Unit tests</small>
            <strong>{course.units.filter(u=>u.testStatus === "Available").length}</strong>
            <span>Available practice tests</span>
          </article>
        </div>

        <div className="curriculum-grid">
          {course.units.map((unit, index) => (
            <article className={`level-card unit-card${isUnitAvailable(unit) ? "" : " locked-unit-card"}`} key={unit.slug}>
              <div className="unit-card-header">
                <span className="unit-number">Unit {index + 1}{apUnitNumber(course.slug,index)!==index+1 ? ` · AP ${apUnitNumber(course.slug,index)}` : ""}</span>
                <span className="status-pill">{isUnitAvailable(unit) ? "Available" : <><LockIcon/> Coming soon</>}</span>
              </div>
              <h2>{unit.title}</h2>
              <p>{unit.description}</p>
              <div className="unit-card-facts"><span>{unit.lessons.length} {course.slug === "physics-1" ? "topics" : "lessons"}</span><span>{isUnitAvailable(unit) ? "Review & practice included" : "Not yet released"}</span></div>
              {isUnitAvailable(unit) ? <a className="button secondary" href={`/ap-physics/${course.slug}/${unit.slug}`}>
                <span>Explore unit</span><span aria-hidden="true">→</span>
              </a> : <span className="locked-unit-button" aria-disabled="true"><LockIcon/> Available soon</span>}
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
