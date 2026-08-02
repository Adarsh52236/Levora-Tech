'use client'

import React from 'react'

/**
 * Animated multi-shape loader from UIverse.io by mobinkakei.
 * Cycles through circle → rect → triangle morphing with a trailing dot.
 */
export function UiverseLoader({ className = '' }: { className?: string }) {
  return (
    <>
      <style>{`
        .uiverse-loader {
          --path: #2f3545;
          --dot: #5628ee;
          --duration: 3s;
          width: 44px;
          height: 44px;
          position: relative;
          display: inline-block;
          margin: 0 16px;
        }
        .uiverse-loader:before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          position: absolute;
          display: block;
          background: var(--dot);
          top: 37px;
          left: 19px;
          transform: translate(-18px, -18px);
          animation: ul-dotRect var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
        .uiverse-loader svg {
          display: block;
          width: 100%;
          height: 100%;
        }
        .uiverse-loader svg rect,
        .uiverse-loader svg polygon,
        .uiverse-loader svg circle {
          fill: none;
          stroke: var(--path);
          stroke-width: 10px;
          stroke-linejoin: round;
          stroke-linecap: round;
        }
        .uiverse-loader svg polygon {
          stroke-dasharray: 145 76 145 76;
          stroke-dashoffset: 0;
          animation: ul-pathTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
        .uiverse-loader svg rect {
          stroke-dasharray: 192 64 192 64;
          stroke-dashoffset: 0;
          animation: ul-pathRect 3s cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
        .uiverse-loader svg circle {
          stroke-dasharray: 150 50 150 50;
          stroke-dashoffset: 75;
          animation: ul-pathCircle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }
        .uiverse-loader.triangle { width: 48px; }
        .uiverse-loader.triangle:before {
          left: 21px;
          transform: translate(-10px, -18px);
          animation: ul-dotTriangle var(--duration) cubic-bezier(0.785, 0.135, 0.15, 0.86) infinite;
        }

        @keyframes ul-pathTriangle {
          33%  { stroke-dashoffset: 74; }
          66%  { stroke-dashoffset: 147; }
          100% { stroke-dashoffset: 221; }
        }
        @keyframes ul-dotTriangle {
          33%  { transform: translate(0, 0); }
          66%  { transform: translate(10px, -18px); }
          100% { transform: translate(-10px, -18px); }
        }
        @keyframes ul-pathRect {
          25%  { stroke-dashoffset: 64; }
          50%  { stroke-dashoffset: 128; }
          75%  { stroke-dashoffset: 192; }
          100% { stroke-dashoffset: 256; }
        }
        @keyframes ul-dotRect {
          25%  { transform: translate(0, 0); }
          50%  { transform: translate(18px, -18px); }
          75%  { transform: translate(0, -36px); }
          100% { transform: translate(-18px, -18px); }
        }
        @keyframes ul-pathCircle {
          25%  { stroke-dashoffset: 125; }
          50%  { stroke-dashoffset: 175; }
          75%  { stroke-dashoffset: 225; }
          100% { stroke-dashoffset: 275; }
        }
      `}</style>

      <div className={`uiverse-loader ${className}`}>
        <svg viewBox="0 0 86 80">
          <polygon points="43 8 79 72 7 72" />
          <rect x="15" y="15" width="56" height="50" rx="4" />
          <circle cx="43" cy="42" r="20" />
        </svg>
      </div>
    </>
  )
}

/**
 * Full-section loading state — centred loader with optional label.
 */
export function SectionLoader({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-24">
      <UiverseLoader />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  )
}
