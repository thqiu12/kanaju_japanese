type Props = {
  head: string[];
  rows: string[][];
  /** Background tone for the header row */
  headerTone?: "dark" | "primary";
  /**
   * Number of leading columns to render `whitespace-nowrap` (so short
   * cells like 「初中級1」 don't wrap onto two lines just because the
   * column is narrow). Default: 0.
   */
  nowrapColumns?: number;
  /**
   * Explicit column widths (in CSS units, e.g. "64px"). One entry per
   * column. Entries can be `null`/empty string for "auto" (the remaining
   * space). Default: all auto.
   */
  colWidths?: (string | null | undefined)[];
};

export default function DataTable({
  head,
  rows,
  headerTone = "dark",
  nowrapColumns = 0,
  colWidths,
}: Props) {
  const headBg =
    headerTone === "primary"
      ? "bg-primary text-white"
      : "bg-primary-dark text-white";
  return (
    <div className="overflow-x-auto rounded border border-border">
      <table className="w-full text-sm">
        {colWidths && (
          <colgroup>
            {head.map((_, j) => (
              <col
                key={j}
                style={colWidths[j] ? { width: colWidths[j]! } : undefined}
              />
            ))}
          </colgroup>
        )}
        <thead>
          <tr className={headBg}>
            {head.map((h, j) => (
              <th
                key={h}
                className={`border-r border-white/20 px-3 py-3 text-left font-medium last:border-r-0 ${
                  j < nowrapColumns ? "whitespace-nowrap" : ""
                }`}
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
                  className={`border-r border-border px-3 py-3 text-text last:border-r-0 ${
                    j < nowrapColumns ? "whitespace-nowrap" : ""
                  }`}
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
