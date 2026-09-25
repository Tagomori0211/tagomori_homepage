import type { ReactNode } from "react";
import { SHEETS, type Sheet } from "@/data/site";

type Props = {
  sheet: Sheet;
  headingId: string;
  /** 省略時はシート名（ナビと同じ表記） */
  title?: ReactNode;
  lead?: ReactNode;
};

const TOTAL = String(SHEETS.length).padStart(2, "0");

/** 各セクション冒頭の「図面の見出し」: 太罫 + シート番号 + 英字の図名 */
export default function SheetHead({ sheet, headingId, title, lead }: Props) {
  return (
    <header className="sheet-head">
      <div className="sheet-meta mono" aria-hidden="true">
        <span className="sheet-no">
          SHEET {sheet.no}
          <span className="sheet-total"> / {TOTAL}</span>
        </span>
        <span className="sheet-en">{sheet.en}</span>
      </div>
      <h2 id={headingId}>{title ?? sheet.label}</h2>
      {lead ? <p className="sheet-lead">{lead}</p> : null}
    </header>
  );
}
