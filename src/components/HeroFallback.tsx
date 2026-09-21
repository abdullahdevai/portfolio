/**
 * Static/CSS-only stand-in for the WebGL scene. Used when WebGL is missing or
 * the canvas throws, so the hero still has a strong visual.
 */
export default function HeroFallback() {
  return (
    <div aria-hidden="true" className="relative flex h-full w-full items-center justify-center [perspective:1200px]">
      <div className="relative aspect-square w-[min(70%,26rem)] [transform-style:preserve-3d]">
        {/* Halo */}
        <div className="absolute inset-[-25%] rounded-full bg-[radial-gradient(closest-side,rgba(123,97,255,0.28),transparent)] blur-2xl" />

        {/* Rings: outer wrapper tilts, inner wrapper spins inside that plane */}
        <div className="absolute inset-[-8%] [transform:rotateX(72deg)_rotateZ(-10deg)]">
          <div className="animate-spin-slow relative h-full w-full rounded-full border border-accent/70">
            <span className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(123,97,255,0.9)]" />
          </div>
        </div>
        <div className="absolute inset-[-20%] [transform:rotateX(62deg)_rotateZ(35deg)]">
          <div className="animate-spin-slow relative h-full w-full rounded-full border border-white/20 [animation-direction:reverse]">
            <span className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />
          </div>
        </div>

        {/* Orb */}
        <div className="animate-float-y absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_32%_28%,#3a3a48_0%,#15151c_38%,#07070a_75%)] shadow-[inset_-20px_-30px_60px_rgba(0,0,0,0.9),inset_18px_16px_40px_rgba(123,97,255,0.25),0_0_80px_rgba(123,97,255,0.25)]">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_75%,rgba(123,97,255,0.35),transparent_45%)]" />
        </div>
      </div>
    </div>
  )
}
