const shades = ["#8a5a3b", "#a06a45", "#ecc27e", "#7a4526"];

/* Subtle chocolate dust floating site-wide. */
export function ChocolateDust() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {Array.from({ length: 16 }).map((_, i) => {
        const size = 3 + (i % 3);
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${3 + ((i * 61) % 94)}%`,
              top: `${4 + ((i * 37) % 92)}%`,
              width: size,
              height: size,
              background: shades[i % shades.length],
              opacity: 0.1 + (i % 3) * 0.06,
              animation: `dust-float ${7 + (i % 8)}s ease-in-out ${
                i * 0.8
              }s infinite alternate`,
            }}
          />
        );
      })}
    </div>
  );
}