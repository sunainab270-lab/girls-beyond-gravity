"use client";

import { useState } from "react";

export function MotionSimulator() {
  const [velocity, setVelocity] = useState(7);
  const [time, setTime] = useState(6);
  const position = velocity * time;

  return (
    <div className="simulator">
      <label>
        Velocity: {velocity} m/s
        <input
          type="range"
          min="0"
          max="20"
          value={velocity}
          onChange={(event) => setVelocity(Number(event.target.value))}
        />
      </label>
      <label>
        Time: {time} s
        <input
          type="range"
          min="1"
          max="12"
          value={time}
          onChange={(event) => setTime(Number(event.target.value))}
        />
      </label>
      <div className="track" aria-label={`Object position is ${position} meters`}>
        <span style={{ left: `${Math.min(position / 240, 1) * 92}%` }} />
      </div>
      <p>
        Displacement = velocity x time = <strong>{position} m</strong>.
      </p>
    </div>
  );
}
