type SvgArrowMarkerProps = {
  id: string;
  direction?: "end" | "start";
  size?: "axis" | "vector";
};

type SvgVectorArrowProps = {
  className?: string;
  headLength?: number;
  headWidth?: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

export function SvgArrowMarker({
  id,
  direction = "end",
  size = "vector",
}: SvgArrowMarkerProps) {
  const isAxis = size === "axis";
  const width = isAxis ? 10 : 13;
  const height = isAxis ? 8 : 10;
  const midY = height / 2;
  const inset = isAxis ? 2 : 2.5;
  const tipX = direction === "start" ? inset : width - inset;
  const tailX = direction === "start" ? width - inset : inset;
  const topY = isAxis ? 2 : 2.25;
  const bottomY = height - topY;

  return (
    <marker
      id={id}
      markerHeight={height}
      markerUnits="userSpaceOnUse"
      markerWidth={width}
      orient="auto"
      refX={tipX}
      refY={midY}
    >
      <path d={`M ${tailX} ${topY} L ${tipX} ${midY} L ${tailX} ${bottomY} z`} fill="context-stroke" />
    </marker>
  );
}

export function SvgVectorArrow({
  className = "vector-line",
  headLength = 12,
  headWidth = 9,
  x1,
  x2,
  y1,
  y2,
}: SvgVectorArrowProps) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const length = Math.hypot(dx, dy);

  if (length === 0) {
    return null;
  }

  const unitX = dx / length;
  const unitY = dy / length;
  const safeHeadLength = Math.min(headLength, length * 0.28);
  const baseX = x2 - unitX * safeHeadLength;
  const baseY = y2 - unitY * safeHeadLength;
  const perpX = -unitY;
  const perpY = unitX;
  const halfHeadWidth = Math.min(headWidth / 2, length * 0.14);
  const points = [
    `${x2},${y2}`,
    `${baseX + perpX * halfHeadWidth},${baseY + perpY * halfHeadWidth}`,
    `${baseX - perpX * halfHeadWidth},${baseY - perpY * halfHeadWidth}`,
  ].join(" ");

  return (
    <>
      <line className={className} x1={x1} y1={y1} x2={baseX} y2={baseY} />
      <polygon className={`vector-arrowhead ${className}`} points={points} />
    </>
  );
}
