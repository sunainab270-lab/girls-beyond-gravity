import { getUnitOne } from "@/lib/unitOne";
import { UnitOneLesson } from "@/components/UnitOneLesson";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CourseSidebar } from "@/components/CourseSidebar";
import { PageShell } from "@/components/PageShell";
import { Topic11ScalarsVectors } from "@/components/Topic11ScalarsVectors";
import { Topic12Kinematics } from "@/components/Topic12Kinematics";
import { Topic13RepresentingMotion } from "@/components/Topic13RepresentingMotion";
import { Topic14ReferenceFrames } from "@/components/Topic14ReferenceFrames";
import { Topic15Vectors2D } from "@/components/Topic15Vectors2D";
import { Unit2DynamicsTopic } from "@/components/Unit2DynamicsTopic";
import { apCourses, getCourse, getLesson, getUnit } from "@/lib/data";

export function generateStaticParams() {
  return apCourses.flatMap((course) =>
    course.units.flatMap((unit) =>
      unit.lessons.map((lesson) => ({
        courseSlug: course.slug,
        unitSlug: unit.slug,
        lessonSlug: lesson.slug,
      })),
    ),
  );
}

export default async function LessonPage({
  params: paramsPromise,
}: {
  params: Promise<{ courseSlug: string; unitSlug: string; lessonSlug: string }>;
}) {
  const params = await paramsPromise;
  const course = getCourse(params.courseSlug) ?? apCourses[0];
  const unit = getUnit(course.slug, params.unitSlug) ?? course.units[0];
  const lesson = getLesson(course.slug, unit.slug, params.lessonSlug) ?? unit.lessons[0];
  const newUnit = getUnitOne(course.slug, unit.slug);
  const newLesson = newUnit?.lessons.find(l => l.slug === lesson.slug);
  const lessonIndex = unit.lessons.findIndex((item) => item.slug === lesson.slug);
  const previousLesson = unit.lessons[lessonIndex - 1];
  const nextLesson = unit.lessons[lessonIndex + 1];
  const isTopic11 =
    course.slug === "physics-1" &&
    unit.slug === "kinematics" &&
    lesson.slug === "scalars-vectors-one-dimension";
  const isTopic12 =
    course.slug === "physics-1" &&
    unit.slug === "kinematics" &&
    lesson.slug === "displacement-velocity-acceleration";
  const isTopic13 =
    course.slug === "physics-1" &&
    unit.slug === "kinematics" &&
    lesson.slug === "representing-motion";
  const isTopic14 =
    course.slug === "physics-1" &&
    unit.slug === "kinematics" &&
    lesson.slug === "reference-frames-relative-motion";
  const isTopic15 =
    course.slug === "physics-1" &&
    unit.slug === "kinematics" &&
    lesson.slug === "vectors-motion-two-dimensions";
  const isUnit2Topic =
    course.slug === "physics-1" && unit.slug === "force-translational-dynamics";

  return (
    <PageShell>
      <section className="page-hero" id="content">
        <Breadcrumbs
          items={[
            { label: "AP Physics", href: "/ap-physics" },
            { label: course.shortTitle, href: `/ap-physics/${course.slug}` },
            { label: unit.title, href: `/ap-physics/${course.slug}/${unit.slug}` },
            {
              label: lesson.title,
              href: `/ap-physics/${course.slug}/${unit.slug}/${lesson.slug}`,
            },
          ]}
        />
        <p className="eyebrow">{lesson.estimatedTime}</p>
        <h1>{lesson.title}</h1>
        <p>
          {isTopic11 || isTopic12 || isTopic13 || isTopic14 || isTopic15 || isUnit2Topic
            ? lesson.summary
            : course.slug === "physics-1"
            ? "This AP Physics 1 topic page is a placeholder for the curriculum content you will provide next."
            : lesson.summary}
        </p>
      </section>

      <section className="section learning-layout">
        <CourseSidebar
          course={course}
          currentUnitSlug={unit.slug}
          currentLessonSlug={lesson.slug}
        />
        <article className="learning-main lesson-panel lesson-content">
          {newUnit && newLesson ? (
            <UnitOneLesson lesson={newLesson} source={newUnit.source} />
          ) : isTopic11 ? (
            <Topic11ScalarsVectors />
          ) : isTopic12 ? (
            <Topic12Kinematics />
          ) : isTopic13 ? (
            <Topic13RepresentingMotion />
          ) : isTopic14 ? (
            <Topic14ReferenceFrames />
          ) : isTopic15 ? (
            <Topic15Vectors2D />
          ) : isUnit2Topic ? (
            <Unit2DynamicsTopic lessonSlug={lesson.slug} />
          ) : (
            <><h2>Lesson coming soon</h2><p>This topic is included in the AP course map. Its full lesson, worked examples, and practice have not been released yet.</p></>

          )}

          <aside className="tutor-panel">
            <small>AI Study Assistant</small>
            <h3>Ask for a hint</h3>
            <p>
              The assistant will live inside lessons, giving hints,
              explanations, and similar practice without replacing your work.
            </p>
            <div className="chat-bubble">
              Try: “Explain this concept step by step without giving away the
              final answer.”
            </div>
          </aside>

          <nav className="lesson-nav" aria-label="Lesson navigation">
            {previousLesson ? (
              <a
                className="button secondary"
                href={`/ap-physics/${course.slug}/${unit.slug}/${previousLesson.slug}`}
              >
                Previous Lesson
              </a>
            ) : (
              <a className="button secondary" href={`/ap-physics/${course.slug}/${unit.slug}`}>
                Unit Overview
              </a>
            )}
            {nextLesson ? (
              <a
                className="button primary"
                href={`/ap-physics/${course.slug}/${unit.slug}/${nextLesson.slug}`}
              >
                Next Lesson
              </a>
            ) : (
              <a className="button primary" href={`/ap-physics/${course.slug}/${unit.slug}/review`}>
                Unit Review
              </a>
            )}
          </nav>
        </article>
      </section>
    </PageShell>
  );
}
