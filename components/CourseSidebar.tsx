import { LockedUnitLabel } from "./UnitLock";
import Link from "next/link";
import { apUnitNumber, isUnitAvailable, type apCourses } from "@/lib/data";

type Course = (typeof apCourses)[number];

export function CourseSidebar({
  course,
  currentUnitSlug,
  currentLessonSlug,
}: {
  course: Course;
  currentUnitSlug?: string;
  currentLessonSlug?: string;
}) {
  const content = (
    <div className="course-map">
      <h3>{course.shortTitle}</h3>
      {course.units.map((unit, unitIndex) => (
        <div className="course-map-unit" key={unit.slug}>
          {isUnitAvailable(unit) ? <Link
            className={unit.slug === currentUnitSlug ? "active" : ""}
            href={`/ap-physics/${course.slug}/${unit.slug}`}
          >
            Unit {unitIndex + 1}{apUnitNumber(course.slug,unitIndex) !== unitIndex+1 ? ` · AP ${apUnitNumber(course.slug,unitIndex)}` : ""}: {unit.title}
          </Link> : <LockedUnitLabel>Unit {unitIndex + 1}{apUnitNumber(course.slug,unitIndex) !== unitIndex+1 ? ` · AP ${apUnitNumber(course.slug,unitIndex)}` : ""}: {unit.title}</LockedUnitLabel>}
          {isUnitAvailable(unit) && <ul>
            {unit.lessons.map((lesson) => {
              const marker =
                lesson.slug === currentLessonSlug
                  ? "→"
                  : "○";

              return (
              <li key={lesson.slug}>
                <Link
                  className={lesson.slug === currentLessonSlug ? "active" : ""}
                  href={`/ap-physics/${course.slug}/${unit.slug}/${lesson.slug}`}
                >
                  <span aria-hidden="true">{marker}</span>
                  {lesson.title}
                </Link>
              </li>
            );
            })}
            <li>
              <Link href={`/ap-physics/${course.slug}/${unit.slug}/review`}>
                ○ Unit Review
              </Link>
            </li>
            <li>
              <Link href={`/ap-physics/${course.slug}/${unit.slug}/test`}>
                ○ Unit Test
              </Link>
            </li>
          </ul>}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <aside className="desktop-sidebar" aria-label={`${course.shortTitle} course menu`}>
        {content}
      </aside>
      <details className="mobile-course-menu">
        <summary>Course menu</summary>
        {content}
      </details>
    </>
  );
}
