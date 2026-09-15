"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { cn } from "@/lib/cn";
import type { MenuCategory } from "@/lib/menu";

/** How long a chip-driven scroll may take before the observer takes over again. */
const SCROLL_TIMEOUT_MS = 1500;
/** Quiet period after the last scroll event before the page counts as settled. */
const SCROLL_SETTLE_MS = 150;

/**
 * Sticky list of anchor links, one per category. The links work without
 * JavaScript. With it, a click scrolls the section into view, updates the
 * URL hash and highlights the clicked chip straight away; the observer only
 * takes over once that scroll has settled, so the highlight never flickers
 * through the categories the page passes on the way.
 */
export function MenuCategoryNav({ categories }: { categories: MenuCategory[] }) {
  const [active, setActive] = useState<string>(categories[0]?.slug ?? "");
  const listRef = useRef<HTMLUListElement>(null);
  // Set while a click-triggered scroll is in flight; null otherwise.
  const pinned = useRef<string | null>(null);
  // The category the observer currently thinks is in view.
  const inView = useRef<string>("");
  const timers = useRef<{ settle?: ReturnType<typeof setTimeout>; timeout?: ReturnType<typeof setTimeout> }>({});

  // Hand control back to the observer.
  const release = useCallback(() => {
    clearTimeout(timers.current.settle);
    clearTimeout(timers.current.timeout);
    if (pinned.current === null) return;
    pinned.current = null;
    if (inView.current) setActive(inView.current);
  }, []);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.slug))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (!best) return;
        inView.current = best;
        if (pinned.current === null) setActive(best);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [categories]);

  // Release the pin once the page has stopped moving.
  useEffect(() => {
    const onScroll = () => {
      if (pinned.current === null) return;
      clearTimeout(timers.current.settle);
      timers.current.settle = setTimeout(release, SCROLL_SETTLE_MS);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const current = timers.current;
    return () => {
      clearTimeout(current.settle);
      clearTimeout(current.timeout);
      window.removeEventListener("scroll", onScroll);
    };
  }, [release]);

  // Keep the active chip in sight by scrolling the list only. Scrolling the
  // window here would cancel a page scroll that is still in progress.
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`);
    if (!list || !link) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  function onChipClick(event: MouseEvent<HTMLAnchorElement>, slug: string) {
    // Leave modified clicks (new tab, etc.) to the browser.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const section = document.getElementById(slug);
    if (!section) return;

    event.preventDefault();
    pinned.current = slug;
    setActive(slug);
    // Safety net for when the section is already in place and no scroll fires.
    clearTimeout(timers.current.timeout);
    timers.current.timeout = setTimeout(release, SCROLL_TIMEOUT_MS);
    if (window.location.hash !== `#${slug}`) {
      window.history.pushState(null, "", `#${slug}`);
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-0 z-20 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80"
    >
      <ul
        ref={listRef}
        className="mx-auto flex max-w-page gap-2 overflow-x-auto px-4 py-3 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((c) => {
          const isActive = c.slug === active;
          return (
            <li key={c.slug} className="shrink-0 py-1">
              <a
                href={`#${c.slug}`}
                aria-current={isActive ? "location" : undefined}
                onClick={(event) => onChipClick(event, c.slug)}
                className={cn(
                  "inline-flex h-10 items-center rounded-pill border px-4 font-sans text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-paper text-ink hover:border-line-ink",
                )}
              >
                {c.name}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
