"use client";

import { useEffect, useId, useState } from "react";
import type { Sheet } from "@/data/site";

type Props = { sheets: Sheet[] };

/**
 * ヘッダーのナビゲーション。
 * - デスクトップ: 主要シートへのリンク + いま読んでいるシートの強調（スクロール連動）
 * - モバイル: 「目次」ボタンで全シートの一覧（図面のシート目録）を開閉
 * JS が無くてもリンク自体はすべて機能する。
 */
export default function SiteNav({ sheets }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const targets = sheets
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            setActive(id);
          } else if (entry.boundingClientRect.top > 0) {
            // 上方向へ戻ってシートが判定帯より下に抜けたら、強調を外す
            setActive((cur) => (cur === id ? null : cur));
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [sheets]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav className="nav" aria-label="主要セクション">
        <ul className="nav-list">
          {sheets
            .filter((s) => s.nav)
            .map((s) => (
              <li key={s.id}>
                <a
                  className="nav-link"
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "true" : undefined}
                >
                  {s.label}
                </a>
              </li>
            ))}
        </ul>
      </nav>

      <button
        type="button"
        className="menu-btn mono"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`menu-btn-icon${open ? " is-open" : ""}`} aria-hidden="true" />
        {open ? "閉じる" : "目次"}
      </button>

      <div id={panelId} className="menu-panel" hidden={!open}>
        <nav aria-label="シート目次">
          <ol className="menu-list">
            {sheets.map((s) => (
              <li key={s.id}>
                <a
                  className="menu-link"
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "true" : undefined}
                  onClick={() => setOpen(false)}
                >
                  <span className="menu-no mono">{s.no}</span>
                  <span className="menu-label">{s.label}</span>
                  <span className="menu-en mono">{s.en}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </>
  );
}
