"use client";

import { useState, type ReactNode } from "react";

/** テキストをクリップボードへコピーするボタン（結果はスクリーンリーダーにも通知） */
export function CopyButton({
  text,
  label,
  doneLabel = "コピーしました",
}: {
  text: string;
  label: string;
  doneLabel?: string;
}) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      window.setTimeout(() => setDone(false), 2000);
    } catch {
      // クリップボード API が使えない環境では何もしない（アドレスは画面に表示済み）
    }
  };

  return (
    <>
      <button type="button" className="btn btn-ghost btn-sm" onClick={copy}>
        {done ? doneLabel : label}
      </button>
      <span className="visually-hidden" aria-live="polite">
        {done ? doneLabel : ""}
      </span>
    </>
  );
}

/** 印刷ダイアログを開く（印刷用 CSS で履歴書風の 1 枚ものに整形される） */
export function PrintButton({ children }: { children: ReactNode }) {
  return (
    <button type="button" className="btn btn-ghost btn-sm" onClick={() => window.print()}>
      {children}
    </button>
  );
}
