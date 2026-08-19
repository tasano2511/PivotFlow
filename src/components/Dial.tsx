"use client";

import { useCallback, useRef, useState } from "react";

/**
 * The instrument dial: PivotFlow Labs' signature mark. A needle pivots across a
 * semicircular scale between two poles — "Our Apps" and "Your Idea" — and
 * rests toward Our Apps, since the portfolio leads.
 *
 * Angle convention (`theta`, degrees): 180 = left pole (Our Apps),
 * 90 = top center, 0 = right pole (Your Idea). Measured like standard math
 * angles but with SVG's flipped y-axis already accounted for in `polar`.
 */

const REST_ANGLE = 152;
// Base needle geometry points "up" (theta = 90). SVG `rotate()` is clockwise
// on screen, so reaching REST_ANGLE from 90 means rotating by (90 - REST_ANGLE).
const NEEDLE_ROTATE_DEG = 90 - REST_ANGLE;

// How far the needle may additionally nudge toward the cursor, in degrees,
// on top of its resting angle. Kept well inside the poles (±90) so it never
// looks pinned at a stop.
const MAX_HOVER_NUDGE_DEG = 22;

const TICKS = [0, 30, 60, 90, 120, 150, 180];

function polar(cx: number, cy: number, radius: number, theta: number) {
  const rad = (theta * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy - radius * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, radius: number, fromDeg: number, toDeg: number) {
  const start = polar(cx, cy, radius, fromDeg);
  const end = polar(cx, cy, radius, toDeg);
  const largeArc = Math.abs(fromDeg - toDeg) > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

interface DialProps {
  variant?: "hero" | "mark";
  className?: string;
  /** Nudges the needle toward the cursor on hover. Only meaningful for the hero variant. */
  interactive?: boolean;
}

export default function Dial({ variant = "hero", className, interactive = false }: DialProps) {
  const isMark = variant === "mark";
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverOffset, setHoverOffset] = useState(0);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<SVGSVGElement>) => {
      if (!interactive || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      if (rect.width === 0) return;
      const relX = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      setHoverOffset((relX - 0.5) * 2 * MAX_HOVER_NUDGE_DEG);
    },
    [interactive]
  );

  const handlePointerLeave = useCallback(() => {
    if (!interactive) return;
    setHoverOffset(0);
  }, [interactive]);

  const cx = isMark ? 24 : 125;
  const cy = isMark ? 27 : 155;
  const r = isMark ? 18 : 80;
  const needleLen = isMark ? 15 : 68;

  const needleStyle = {
    "--needle-rest": `${NEEDLE_ROTATE_DEG}deg`,
  } as React.CSSProperties;

  const hoverStyle = {
    "--hover-offset": `${hoverOffset}deg`,
  } as React.CSSProperties;

  return (
    <svg
      ref={svgRef}
      viewBox={isMark ? "0 0 48 42" : "0 0 250 200"}
      className={className}
      onPointerMove={interactive ? handlePointerMove : undefined}
      onPointerLeave={interactive ? handlePointerLeave : undefined}
      {...(isMark
        ? { "aria-hidden": true }
        : {
            role: "img",
            "aria-label":
              "Instrument dial with a needle pivoting between Our Apps and Your Idea, resting toward Our Apps",
          })}
    >
      <path
        d={arcPath(cx, cy, r, 180, 0)}
        fill="none"
        stroke="currentColor"
        className="text-ivory/15"
        strokeWidth={isMark ? 2 : 2.5}
        strokeLinecap="round"
      />
      <path
        d={arcPath(cx, cy, r, 180, REST_ANGLE)}
        fill="none"
        stroke="var(--color-brass)"
        strokeWidth={isMark ? 2 : 2.5}
        strokeLinecap="round"
        opacity={0.85}
      />

      {!isMark &&
        TICKS.map((t) => {
          const inner = polar(cx, cy, r - 10, t);
          const outer = polar(cx, cy, r, t);
          const major = t === 0 || t === 180;
          return (
            <line
              key={t}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke={major ? "var(--color-brass)" : "currentColor"}
              className={major ? undefined : "text-ivory/30"}
              strokeWidth={major ? 2 : 1}
              strokeLinecap="round"
            />
          );
        })}

      <g transform={`translate(${cx} ${cy})`}>
        <g className="dial-needle" style={needleStyle}>
          <g className="dial-needle-hover" style={hoverStyle}>
            <path
              d={`M ${-needleLen * 0.07} ${needleLen * 0.14} L 0 ${-needleLen} L ${needleLen * 0.07} ${needleLen * 0.14} Z`}
              fill="var(--color-brass)"
            />
            <circle cx={0} cy={needleLen * 0.16} r={isMark ? 1.5 : 3} fill="var(--color-brass)" opacity={0.6} />
          </g>
        </g>
        <circle
          r={isMark ? 3 : 6}
          fill="var(--color-panel)"
          stroke="var(--color-brass)"
          strokeWidth={isMark ? 1.5 : 2}
        />
      </g>

      {!isMark && (
        <>
          <text
            x={polar(cx, cy, r, 180).x}
            y={cy + 26}
            textAnchor="middle"
            className="fill-ivory font-mono text-[10px] uppercase tracking-[0.12em]"
          >
            Our Apps
          </text>
          <text
            x={polar(cx, cy, r, 0).x}
            y={cy + 26}
            textAnchor="middle"
            className="fill-ivory font-mono text-[10px] uppercase tracking-[0.12em]"
          >
            Your Idea
          </text>
        </>
      )}
    </svg>
  );
}
