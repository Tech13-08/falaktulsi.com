import React, { useEffect, useMemo, useRef, useState } from "react";
import favoritesData from "../content/favorites.json";
import Button from "./Button";

interface FavItem {
  label: string;
  reveal: string;
}

const favorites: FavItem[] = favoritesData as FavItem[];

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

let measureCanvas: HTMLCanvasElement | null = null;

const getTextWidth = (text: string, fontSize: number) => {
  if (typeof document === "undefined") {
    return text.length * fontSize * 0.55;
  }

  if (!measureCanvas) {
    measureCanvas = document.createElement("canvas");
  }

  const ctx = measureCanvas.getContext("2d");
  if (!ctx) {
    return text.length * fontSize * 0.55;
  }

  ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
  return ctx.measureText(text).width;
};

const estimateBadgeWidth = (text: string, fontSize: number) => {
  // Measured text width + horizontal padding + border.
  return Math.ceil(getTextWidth(text, fontSize) + 32);
};

const interleaveByWidth = <T extends { width: number }>(items: T[]) => {
  const sorted = [...items].sort((a, b) => b.width - a.width);
  const mixed: T[] = [];

  let left = 0;
  let right = sorted.length - 1;
  let takeLongest = true;

  while (left <= right) {
    if (takeLongest) {
      mixed.push(sorted[left]);
      left += 1;
    } else {
      mixed.push(sorted[right]);
      right -= 1;
    }
    takeLongest = !takeLongest;
  }

  return mixed;
};

const FavoriteBadges: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      setContainerWidth(containerRef.current?.clientWidth || 0);
      setContainerHeight(containerRef.current?.clientHeight || 0);
    };

    updateWidth();

    let timeoutId: ReturnType<typeof setTimeout>;
    const observer = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        updateWidth();
      }, 150);
    });

    observer.observe(containerRef.current);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const maxTextLength = useMemo(
    () =>
      favorites.reduce(
        (maxLen, item) => Math.max(maxLen, item.label.length, item.reveal.length),
        0,
      ),
    [],
  );

  const fontSizePx = useMemo(() => {
    const lengthPenalty = Math.max(0, maxTextLength - 12) * 0.28;
    const widthBonus = containerWidth > 0 ? Math.min(1.5, (containerWidth - 260) / 420) : 0;
    return clamp(15 - lengthPenalty + widthBonus, 11, 15);
  }, [containerWidth, maxTextLength]);

  const packedRows = useMemo(() => {
    const gap = containerWidth < 360 ? 10 : 12;
    const availableWidth = Math.max(containerWidth - 2, 240);
    const rows: Array<{ items: Array<FavItem & { width: number }>; width: number }> = [];

    const sizedItems = favorites.map((item) => {
      const largest = item.label.length > item.reveal.length ? item.label : item.reveal;
      return {
        ...item,
        width: estimateBadgeWidth(largest, fontSizePx),
      };
    });

    const orderedItems = interleaveByWidth(sizedItems);

    orderedItems.forEach((item) => {
      let bestRowIndex = -1;
      let bestRemaining = Number.POSITIVE_INFINITY;

      rows.forEach((row, index) => {
        const nextWidth = row.width === 0 ? item.width : row.width + gap + item.width;
        if (nextWidth > availableWidth) return;

        const remaining = availableWidth - nextWidth;
        if (remaining < bestRemaining) {
          bestRemaining = remaining;
          bestRowIndex = index;
        }
      });

      if (bestRowIndex === -1) {
        rows.push({ items: [item], width: item.width });
        return;
      }

      const targetRow = rows[bestRowIndex];
      targetRow.items.push(item);
      targetRow.width = targetRow.width + gap + item.width;
    });

    return rows;
  }, [containerWidth, fontSizePx]);

  const paging = useMemo(() => {
    const gap = 12;
    const rowHeight = Math.ceil(fontSizePx * 1.2 + 18);
    const controlsHeight = 44;

    if (packedRows.length === 0) {
      return { rowsPerPage: 1, totalPages: 1 };
    }

    const maxRowsWithoutControls = Math.max(
      1,
      Math.floor((Math.max(containerHeight, rowHeight) + gap) / (rowHeight + gap)),
    );

    const needsControls = packedRows.length > maxRowsWithoutControls;
    const usableHeight = needsControls
      ? Math.max(rowHeight, containerHeight - controlsHeight)
      : Math.max(rowHeight, containerHeight);

    const rowsPerPage = Math.max(
      1,
      Math.floor((usableHeight + gap) / (rowHeight + gap)),
    );

    const totalPages = Math.max(1, Math.ceil(packedRows.length / rowsPerPage));
    return { rowsPerPage, totalPages };
  }, [containerHeight, fontSizePx, packedRows.length]);

  useEffect(() => {
    setPageIndex((current) => Math.min(current, paging.totalPages - 1));
  }, [paging.totalPages]);

  const visibleRows = useMemo(() => {
    const start = pageIndex * paging.rowsPerPage;
    return packedRows.slice(start, start + paging.rowsPerPage);
  }, [packedRows, pageIndex, paging.rowsPerPage]);

  const showPager = paging.totalPages > 1;

  const goPrev = () => {
    setPageIndex((current) =>
      current === 0 ? paging.totalPages - 1 : current - 1,
    );
  };

  const goNext = () => {
    setPageIndex((current) =>
      current === paging.totalPages - 1 ? 0 : current + 1,
    );
  };

  return (
    <div ref={containerRef} className="w-full h-full min-h-0 flex flex-col gap-3">
      <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
      {visibleRows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex flex-wrap md:flex-nowrap gap-3">
          {row.items.map((fav, itemIndex) => {
            const largest =
              fav.label.length > fav.reveal.length ? fav.label : fav.reveal;

            return (
              <div
                key={`${fav.label}-${fav.reveal}-${rowIndex}-${itemIndex}`}
                className="
                  group relative inline-flex items-center justify-center
                  px-4 py-2 rounded-full border max-w-full
                  bg-cardSecondary text-textSecondary font-mono
                  hover:bg-secondary hover:text-background
                  transition-colors duration-200
                "
                style={{ fontSize: `${fontSizePx}px`, lineHeight: 1.2 }}
              >
                <span className="invisible whitespace-nowrap">{largest}</span>
                <span
                  className="
                    absolute inset-0 flex items-center justify-center whitespace-nowrap
                    opacity-100 group-hover:opacity-0
                    transition-opacity duration-200
                  "
                >
                  {fav.label}
                </span>

                <span
                  className="
                    absolute inset-0 flex text-text items-center justify-center whitespace-nowrap
                    opacity-0 group-hover:opacity-100
                    transition-opacity duration-200
                  "
                >
                  {fav.reveal}
                </span>
              </div>
            );
          })}
        </div>
      ))}
      </div>

      {showPager && (
        <div className="flex items-center justify-between gap-3 shrink-0 pt-1">
          <Button onClick={goPrev} size="sm">← Prev</Button>
          <p className="text-xs text-textSecondary">
            {pageIndex + 1} / {paging.totalPages}
          </p>
          <Button onClick={goNext} size="sm">Next →</Button>
        </div>
      )}
    </div>
  );
};

export default FavoriteBadges;
