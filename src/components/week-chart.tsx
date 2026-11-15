/** Server-rendered bar chart of minutes per day. Today's bar is highlighted. */
export function WeekChart({ days }: { days: { day: string; minutes: number }[] }) {
  const W = 560, H = 200, padL = 32, padB = 26, padT = 18, ih = H - padB - padT;
  const raw = Math.max(30, ...days.map((d) => d.minutes));
  const step = raw > 120 ? 60 : raw > 60 ? 30 : 15;
  const max = Math.ceil(raw / step) * step;
  const bw = (W - padL) / days.length;
  const ticks = Array.from({ length: max / step + 1 }, (_, i) => i * step);
  const label = (day: string) => new Date(`${day}T00:00:00Z`).toLocaleDateString("en-IN", { weekday: "short", timeZone: "UTC" });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Minutes studied in the last 7 days">
      {ticks.map((v) => {
        const y = padT + ih - (v / max) * ih;
        return <g key={v}><line x1={padL} x2={W} y1={y} y2={y} stroke="var(--border)" strokeDasharray="3 4" />
          <text x={padL - 8} y={y + 4} textAnchor="end" fontSize="11" fill="var(--muted)">{v}</text></g>;
      })}
      {days.map((d, i) => {
        const h = (d.minutes / max) * ih, x = padL + i * bw + bw * 0.22, w = bw * 0.56, y = padT + ih - h;
        const today = i === days.length - 1;
        return (
          <g key={d.day}>
            <rect x={x} y={y} width={w} height={Math.max(h, 1)} rx={4} fill={today ? "var(--amber)" : "var(--accent)"}><title>{`${label(d.day)}: ${d.minutes} min`}</title></rect>
            {d.minutes > 0 && <text x={x + w / 2} y={y - 6} textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--fg)">{d.minutes}</text>}
            <text x={x + w / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="var(--muted)">{today ? "Today" : label(d.day)}</text>
          </g>
        );
      })}
    </svg>
  );
}
