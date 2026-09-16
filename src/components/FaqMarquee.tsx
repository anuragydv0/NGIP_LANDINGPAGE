export interface FaqCardData {
  id: string;
  question: string;
  answer: string;
}

export interface FaqMarqueeRow {
  id: string;
  items: FaqCardData[];
  direction: 'left' | 'right';
  durationSeconds: number;
}

export interface FaqMarqueeProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  rows: FaqMarqueeRow[];
}

export default function FaqMarquee({ eyebrow, title, subtitle, rows }: FaqMarqueeProps) {
  return (
    <section className="py-32 bg-ngip-bg border-t border-black/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl mb-16">
        <div className="text-center">
          {eyebrow && (
            <div className="text-sm font-mono text-ink-3 mb-2 uppercase tracking-wider">
              {eyebrow}
            </div>
          )}
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-ink mb-4">{title}</h2>
          {subtitle && (
            <p className="text-lg text-ink-2 max-w-2xl mx-auto">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {rows.map((row) => {
          const animationClass =
            row.direction === 'right' ? 'animate-scroll-horizontal-reverse' : 'animate-scroll-horizontal';

          return (
            <div
              key={row.id}
              className="relative w-full overflow-hidden group motion-reduce:overflow-visible"
            >
              {/* Animated Track */}
              <div
                className={`flex gap-6 w-max motion-safe:${animationClass} hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:px-6`}
                style={{ animationDuration: `${row.durationSeconds}s` }}
              >
                {/* Original Items */}
                <div className="flex gap-6 flex-shrink-0">
                  {row.items.map((item) => (
                    <div
                      key={item.id}
                      className="w-96 flex-shrink-0 bg-surface p-8 rounded-2xl border border-line shadow-card relative"
                    >
                      <h3 className="text-lg font-semibold text-ink mb-3">
                        {item.question}
                      </h3>
                      <p className="text-ink-2 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
                {/* Duplicated Items for seamless loop (hidden on reduced-motion) */}
                <div
                  className="flex gap-6 flex-shrink-0 motion-reduce:hidden"
                  aria-hidden="true"
                >
                  {row.items.map((item) => (
                    <div
                      key={`${item.id}-dup`}
                      className="w-96 flex-shrink-0 bg-surface p-8 rounded-2xl border border-line shadow-card relative"
                    >
                      <h3 className="text-lg font-semibold text-ink mb-3">
                        {item.question}
                      </h3>
                      <p className="text-ink-2 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
