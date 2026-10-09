import { LockedUnitLabel } from "@/components/UnitLock";
import { PageShell } from "@/components/PageShell";
import { apCourses, isUnitAvailable } from "@/lib/data";

export default function ApPhysicsPage() {
  return (
    <PageShell>
      <section className="page-hero" id="content">
        <p className="eyebrow">AP Physics Academy</p>
        <h1>Choose your AP Physics pathway.</h1>
        <p>
          Girls Beyond Gravity organizes AP Physics into dedicated course maps, unit
          pages, lesson pages, reviews, tests, simulations, and study support.
        </p>
      </section>

      <section className="section">
        <div className="curriculum-grid">
          {apCourses.map((course) => (
            <article className="level-card course-section-card" key={course.slug}>
              <div className="unit-card-header">
                <span className="status-pill">{course.status}</span>
              </div>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <div className="mini-unit-list">
                {course.units.map((unit, index) => (
                  isUnitAvailable(unit) ? <a
                    className="mini-unit-item"
                    href={`/ap-physics/${course.slug}/${unit.slug}`}
                    key={unit.slug}
                  >
                    <span className="unit-number">Unit {index + 1}</span>
                    <span>
                      <strong>{unit.title}</strong>
                      <small>{unit.status}</small>
                    </span>
                  </a> : <LockedUnitLabel className="mini-unit-item" key={unit.slug}><span className="unit-number">Unit {index + 1}</span> <strong>{unit.title}</strong></LockedUnitLabel>
                ))}
              </div>
              <a className="button primary" href={`/ap-physics/${course.slug}`}>
                Open course
              </a>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
