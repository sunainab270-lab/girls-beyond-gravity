"use client";

import { useSyncExternalStore } from "react";

const eventName = "gbg-lesson-progress";
function keyFor(id: string) {
  return id === "physics-1/kinematics/scalars-vectors-one-dimension"
    ? "bg-topic-1-1-complete"
    : `gbg-lesson-complete:${id}`;
}
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(eventName, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(eventName, callback);
  };
}
function useCompleted(id: string) {
  return useSyncExternalStore(subscribe, () => {
    try { return localStorage.getItem(keyFor(id)) === "true"; }
    catch { return false; }
  }, () => false);
}
export function LessonStatus({ id }: { id: string }) {
  const completed = useCompleted(id);
  return <span className="status-pill">{completed ? "Completed" : "Available"}</span>;
}
export function LessonMarker({ id, current }: { id: string; current: boolean }) {
  const completed = useCompleted(id);
  return <span aria-label={completed ? "Completed lesson" : current ? "Current lesson" : "Available lesson"}>{completed ? "✓" : current ? "→" : "○"}</span>;
}
export function LessonCompletion({ id }: { id: string }) {
  const completed = useCompleted(id);
  return <section className="interactive-card" aria-label="Lesson progress">
    <strong>{completed ? "Lesson completed" : "Ready to finish this lesson?"}</strong>
    <p>After working through the explanations and practice, mark this lesson as completed. Progress is saved in this browser.</p>
    <button className="button secondary" type="button" aria-pressed={completed} onClick={(event) => {
      try {
        localStorage.setItem(keyFor(id), String(!completed));
        window.dispatchEvent(new Event(eventName));
      } catch {
        event.currentTarget.textContent = "Browser storage unavailable — progress could not be saved";
      }
    }}>{completed ? "Mark as incomplete" : "Mark lesson as completed"}</button>
  </section>;
}
