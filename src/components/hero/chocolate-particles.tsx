const shades = ["#8a5a3b", "#6b4226", "#a06a45", "#ecc27e", "#7a4526"];

/* Chocolate shards + gold flakes drifting across the whole hero. */
export function ChocolateParticles() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {Array.from({ length: 28 }).map((_, i) => {
        const size = 3 + (i % 5);
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${4 + ((i * 53) % 92)}%`,
              top: `${4 + ((i * 23) % 92)}%`,
              width: size,
              height: size,
              background: shades[i % shades.length],
              opacity: 0.18 + (i % 4) * 0.12,
              boxShadow:
                i % 4 === 0
                  ? "0 0 8px rgba(232,183,101,0.5)"
                  : "0 0 6px rgba(0,0,0,0.3)",
              animation: `dust-float ${5 + (i % 6)}s ease-in-out ${
                i * 0.5
              }s infinite alternate`,
            }}
          />
        );
      })}
    </div>
  );
}