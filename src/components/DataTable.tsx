type Props = {
  head: string[];
  rows: string[][];
  /** Background tone for the header row */
  headerTone?: "dark" | "primary";
};

export default function DataTable({ head, rows, headerTone = "dark" }: Props) {
  const headBg =
    headerTone === "primary"
      ? "bg-primary text-white"
      : "bg-primary-dark text-white";
  return (
    <div className="overflow-x-auto rounded border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className={headBg}>
            {head.map((h) => (
              <th
                key={h}
                className="border-r border-white/20 px-3 py-3 text-left font-medium last:border-r-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-bg-card" : "bg-bg-warm"}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border-r border-border px-3 py-3 text-text last:border-r-0"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
