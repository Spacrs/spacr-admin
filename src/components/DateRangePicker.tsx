import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Preset {
  label: string;
  getDates: () => DateRange;
}

const PRESETS: Preset[] = [
  {
    label: "Today",
    getDates: () => {
      const t = new Date();
      return { from: t, to: t };
    },
  },
  {
    label: "Last 7 days",
    getDates: () => {
      const to = new Date();
      const from = new Date();
      from.setDate(to.getDate() - 6);
      return { from, to };
    },
  },
  {
    label: "Last 4 weeks",
    getDates: () => {
      const to = new Date();
      const from = new Date();
      from.setDate(to.getDate() - 27);
      return { from, to };
    },
  },
  {
    label: "Last Month",
    getDates: () => {
      const now = new Date();
      const from = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const to = new Date(now.getFullYear(), now.getMonth(), 0);
      return { from, to };
    },
  },
  // { label: "Last 6 months",   getDates: () => { const to = new Date(); const from = new Date(); from.setMonth(to.getMonth() - 6); return { from, to }; } },
  {
    label: "Last 6 months",
    getDates: () => {
      const now = new Date();
      const to = new Date(now);
      // 5 months back + start of that month
      const from = new Date(now.getFullYear(), now.getMonth() - 5, 1);
      return { from, to };
    },
  },
  {
    label: "Month to date",
    getDates: () => {
      const to = new Date();
      const from = new Date(to.getFullYear(), to.getMonth(), 1);
      return { from, to };
    },
  },
  {
    label: "Quarter to date",
    getDates: () => {
      const to = new Date();
      const q = Math.floor(to.getMonth() / 3);
      const from = new Date(to.getFullYear(), q * 3, 1);
      return { from, to };
    },
  },
  {
    label: "Year to date",
    getDates: () => {
      const to = new Date();
      const from = new Date(to.getFullYear(), 0, 1);
      return { from, to };
    },
  },
  {
    label: "All time",
    getDates: () => ({ from: new Date(2025, 0, 1), to: new Date() }),
  },
];

const toStr = (d?: Date) =>
  d
    ? `${String(d.getDate()).padStart(2, "0")} / ${String(d.getMonth() + 1).padStart(2, "0")} / ${d.getFullYear()}`
    : "";

const parseInput = (s: string): Date | undefined => {
  const digits = s.replace(/\D/g, "");
  if (digits.length !== 8) return undefined;
  const dd = +digits.slice(0, 2),
    mm = +digits.slice(2, 4),
    yyyy = +digits.slice(4);
  const d = new Date(yyyy, mm - 1, dd);
  return isNaN(d.getTime()) ? undefined : d;
};

const maskDate = (raw: string): string => {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  let out = "";
  for (let i = 0; i < digits.length; i++) {
    if (i === 2 || i === 4) out += " / ";
    out += digits[i];
  }
  return out;
};

const isSameDate = (d1?: Date, d2?: Date) => {
  if (!d1 || !d2) return false;
  return d1.toDateString() === d2.toDateString();
};

const detectPreset = (range: DateRange): string => {
  for (const p of PRESETS) {
    const presetRange = p.getDates();

    if (
      isSameDate(range.from, presetRange.from) &&
      isSameDate(range.to, presetRange.to)
    ) {
      return p.label;
    }
  }
  return ""; // custom range
};

export default function DateRangePicker({
  onChange,
  value,
}: {
  onChange?: (range: DateRange) => void;
  value?: DateRange; // optional
}) {
  const def = PRESETS[1];
  const today = new Date();

  const [range, setRange] = useState<DateRange>(def.getDates());
  const [tempRange, setTempRange] = useState<DateRange>(def.getDates());
  const [open, setOpen] = useState(false);
  const [activePreset, setActivePreset] = useState("Last 7 days");
  const [isMobile, setIsMobile] = useState(false);

  const [fromStr, setFromStr] = useState(toStr(def.getDates().from));
  const [toStr_, setToStr_] = useState(toStr(def.getDates().to));
  const [fromErr, setFromErr] = useState(false);
  const [toErr, setToErr] = useState(false);

  const [month, setMonth] = useState(
    new Date(today.getFullYear(), today.getMonth() - 1, 1),
  );

  // ── position stored as CSS vars, not state, to avoid flicker ──
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({
    position: "fixed",
    visibility: "hidden",
    top: 0,
    left: 0,
    zIndex: 9999,
  });

  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // Sync with external value changes (e.g. from parent or global context)
  useEffect(() => {
    if (value?.from && value?.to) {
      setRange(value);
      setTempRange(value);
      setFromStr(toStr(value.from));
      setToStr_(toStr(value.to));

      setActivePreset(detectPreset(value)); // highlighted preset button
    }
  }, [value]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── Core position calculator ──
  const calcPosition = useCallback(() => {
    if (!triggerRef.current || !popupRef.current) return;

    const tr = triggerRef.current.getBoundingClientRect();
    const pr = popupRef.current.getBoundingClientRect(); // real popup width after render
    const GAP = 8;
    const VW = window.innerWidth;
    const VH = window.innerHeight;

    const popupW = pr.width || (isMobile ? 360 : 740);
    const popupH = pr.height || 480;

    // Vertical: below trigger, flip above if not enough room
    let top = tr.bottom + GAP;
    if (top + popupH > VH - 8) top = tr.top - popupH - GAP;
    if (top < 8) top = 8;

    // Horizontal: left-align to trigger, shift left if overflows
    let left = tr.left;
    if (left + popupW > VW - 8) left = VW - popupW - 8;
    if (left < 8) left = 8;

    setPopupStyle({
      position: "fixed",
      top,
      left,
      zIndex: 9999,
      visibility: "visible",
      maxWidth: `calc(100vw - 16px)`,
    });
  }, [isMobile]);

  // ── useLayoutEffect: runs AFTER DOM paint → real popup dimensions available ──
  useLayoutEffect(() => {
    if (!open) return;

    // Hide first, then measure & position
    setPopupStyle((s) => ({ ...s, visibility: "hidden" }));

    // rAF ensures popup is mounted and has dimensions
    const raf = requestAnimationFrame(() => {
      calcPosition();
    });

    return () => cancelAnimationFrame(raf);
  }, [open, calcPosition]);

  // ── Reposition on resize / scroll ──
  useEffect(() => {
    if (!open) return;
    const handler = () => calcPosition();
    window.addEventListener("resize", handler);
    window.addEventListener("scroll", handler, true);
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler, true);
    };
  }, [open, calcPosition]);

  // ── Close on outside click ──
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !popupRef.current?.contains(t)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Input handlers ──
  const handleFromChange = (val: string) => {
    const masked = maskDate(val);
    setFromStr(masked);
    const d = parseInput(masked);
    setFromErr(!d && masked.replace(/\D/g, "").length === 8);
    if (d) {
      setTempRange((p) => ({ ...p, from: d }));
      setActivePreset("");
    }
  };

  const handleToChange = (val: string) => {
    const masked = maskDate(val);
    setToStr_(masked);
    const d = parseInput(masked);
    setToErr(!d && masked.replace(/\D/g, "").length === 8);
    if (d) {
      setTempRange((p) => ({ ...p, to: d }));
      setActivePreset("");
    }
  };

  const handleSelect = (r: DateRange | undefined) => {
    const next = r ?? { from: undefined, to: undefined };
    setTempRange(next);
    setFromStr(toStr(next.from));
    setToStr_(toStr(next.to));
    setActivePreset("");
  };

  const handlePreset = (p: Preset) => {
    const dates = p.getDates();
    setTempRange(dates);
    setFromStr(toStr(dates.from));
    setToStr_(toStr(dates.to));
    setActivePreset(p.label);
  };

  //   const handleApply = () => { setRange(tempRange); setOpen(false); };
  const handleApply = () => {
    setRange(tempRange);
    setOpen(false);
    onChange?.(tempRange); // ← parent ko bhejo
  };

  // const handleClear = () => {
  //   setTempRange({ from: undefined, to: undefined });
  //   setFromStr(""); setToStr_(""); setFromErr(false); setToErr(false);
  //   setActivePreset("");
  // };

  const handleClear = () => {
    const def = PRESETS.find((p) => p.label === "Last 7 days")!;
    const dates = def.getDates();

    setTempRange(dates);
    // setRange(dates); // optional: if you want applied immediately

    setFromStr(toStr(dates.from));
    setToStr_(toStr(dates.to));

    setFromErr(false);
    setToErr(false);

    setActivePreset("Last 7 days");
  };

  const handleOpen = () => {
    // Reset visibility so useLayoutEffect re-measures cleanly
    setPopupStyle((s) => ({ ...s, visibility: "hidden" }));
    setTempRange(range);
    setFromStr(toStr(range.from));
    setToStr_(toStr(range.to));
    setOpen((v) => !v);
  };

  const numMonths = isMobile ? 1 : 2;
  const defaultMonth = isMobile
    ? new Date(today.getFullYear(), today.getMonth(), 1)
    : new Date(today.getFullYear(), today.getMonth() - 1, 1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .drp * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }

        .drp-trigger {
          display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap;
          background: #fff; border: 1px solid #e2e8f0; border-radius: 10px;
          padding: 8px 14px; cursor: pointer; user-select: none;
          box-shadow: 0 1px 3px rgba(0,0,0,.07);
          transition: border-color .2s, box-shadow .2s;
        }
        .drp-trigger:hover { border-color: #7c6df0; box-shadow: 0 0 0 3px rgba(124,109,240,.12); }
        .drp-lbl { font-size: 13px; color: #94a3b8; font-weight: 500; }
        .drp-val {
          font-size: 14px; font-weight: 600; color: #1e293b;
          background: #f1f5f9; border: 1.5px solid #e2e8f0;
          border-radius: 7px; padding: 5px 11px; white-space: nowrap;
        }
        .drp-val.hi { border-color: #7c6df0; background: #f0eeff; color: #5b4ed8; }
        .drp-sep { color: #cbd5e1; }

        .drp-popup {
          background: #fff; border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,.16), 0 4px 16px rgba(0,0,0,.09);
          border: 1px solid #e8edf5; overflow: hidden;
          display: flex; flex-direction: column;
          animation: drpIn .16s ease;
          width: max-content;
        }
        @keyframes drpIn { from{opacity:0;transform:translateY(-5px)} to{opacity:1;transform:translateY(0)} }

        .drp-inputs {
          display: flex; align-items: center; gap: 10px;
          padding: 14px 20px 0; flex-wrap: wrap;
        }
        .drp-input-group { display: flex; flex-direction: column; gap: 4px; }
        .drp-input-label { font-size: 11px; font-weight: 600; color: #94a3b8; letter-spacing: .5px; text-transform: uppercase; }
        .drp-input {
          font-size: 14px; font-weight: 600; font-family: 'DM Sans', sans-serif;
          color: #1e293b; background: #f8fafc;
          border: 1.5px solid #e2e8f0; border-radius: 8px;
          padding: 7px 12px; width: 148px; outline: none;
          transition: border-color .2s, box-shadow .2s; letter-spacing: .3px;
        }
        .drp-input:focus { border-color: #7c6df0; box-shadow: 0 0 0 3px rgba(124,109,240,.12); background: #fff; }
        .drp-input.err   { border-color: #f87171; background: #fff5f5; }
        .drp-input-sep   { color: #cbd5e1; font-size: 20px; margin-top: 18px; }

        .drp-body { display: flex; }

        .drp-presets {
          flex-shrink: 0; width: 148px; padding: 16px 12px;
          border-right: 1px solid #f1f5f9;
          display: flex; flex-direction: column; gap: 2px;
          background: #fafbff;
        }
        .drp-pbtn {
          padding: 8px 10px; border-radius: 8px; font-size: 13px; font-weight: 500;
          color: #475569; background: transparent; border: none; cursor: pointer;
          text-align: left; transition: background .15s, color .15s; white-space: nowrap;
        }
        .drp-pbtn:hover  { background: #f1f0fe; color: #5b4ed8; }
        .drp-pbtn.active { background: #ede9ff; color: #5b4ed8; font-weight: 600; }

        .drp-cals { flex-shrink: 0; padding: 16px 20px 12px; }

        .rdp-root {
          --rdp-accent-color: #5b4ed8;
          --rdp-accent-background-color: #ede9ff;
          --rdp-range_middle-background-color: #ede9ff;
          --rdp-range_middle-color: #5b4ed8;
          --rdp-day-width: 36px; --rdp-day-height: 36px;
          --rdp-weekday-padding: 0; margin: 0;
        }
        .rdp-months { gap: 20px; flex-wrap: nowrap; }
        .rdp-month_caption { justify-content: center; margin-bottom: 8px; padding: 0; }
        .rdp-caption_label, .rdp-month_caption span {
          font-size: 14px; font-weight: 700; color: #1e293b; font-family: 'DM Sans', sans-serif;
        }
        .rdp-button_previous, .rdp-button_next { color: #7c6df0 !important; border-radius: 8px !important; }
        .rdp-button_previous:hover, .rdp-button_next:hover { background: #ede9ff !important; }
        .rdp-weekday { font-size: 11.5px; color: #94a3b8; font-weight: 600; }
        .rdp-day_button { border-radius: 50%; font-size: 13px; font-weight: 500; }
        .rdp-selected .rdp-day_button,
        .rdp-range_start .rdp-day_button,
        .rdp-range_end .rdp-day_button   { background:#5b4ed8!important; color:#fff!important; border-radius:50%!important; }
        .rdp-range_middle .rdp-day_button { background:#ede9ff!important; color:#5b4ed8!important; border-radius:0!important; }
        .rdp-outside .rdp-day_button { color: #c8d2e0 !important; }
        .rdp-today:not(.rdp-selected) .rdp-day_button { font-weight: 700; color: #5b4ed8; }

        .drp-footer {
          display: flex; justify-content: flex-end; align-items: center;
          gap: 10px; padding: 12px 20px;
          border-top: 1px solid #f1f5f9; background: #fafbff; flex-shrink: 0;
        }
        .drp-btn {
          padding: 8px 22px; border-radius: 9px; font-size: 14px; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all .18s; outline: none; white-space: nowrap;
        }
        .drp-btn-clear { background:#fff; border:1.5px solid #e2e8f0; color:#475569; }
        .drp-btn-clear:hover { border-color:#5b4ed8; color:#5b4ed8; background:#f1f0fe; }
        .drp-btn-apply { background:#5b4ed8; border:1.5px solid #5b4ed8; color:#fff; }
        .drp-btn-apply:hover { background:#4a3ec0; border-color:#4a3ec0; box-shadow:0 4px 12px rgba(91,78,216,.3); }
      `}</style>

      <div className="drp" style={{ display: "inline-block" }}>
        {/* Trigger */}
        <div className="drp-trigger" onClick={handleOpen} ref={triggerRef}>
          <span className="drp-lbl">Start</span>
          <span className={`drp-val ${open ? "hi" : ""}`}>
            {toStr(range.from) || "Select"}
          </span>
          <span className="drp-sep">–</span>
          <span className="drp-lbl">End</span>
          <span className="drp-val">{toStr(range.to) || "Select"}</span>
        </div>

        {/* Popup — always mounted while open, positioned via useLayoutEffect */}
        {open && (
          <div className="drp-popup" ref={popupRef} style={popupStyle}>
            {/* Date inputs */}
            <div className="drp-inputs">
              <div className="drp-input-group">
                <span className="drp-input-label">Start Date</span>
                <input
                  className={`drp-input${fromErr ? " err" : ""}`}
                  placeholder="DD / MM / YYYY"
                  value={fromStr}
                  onChange={(e) => handleFromChange(e.target.value)}
                />
              </div>
              <span className="drp-input-sep">–</span>
              <div className="drp-input-group">
                <span className="drp-input-label">End Date</span>
                <input
                  className={`drp-input${toErr ? " err" : ""}`}
                  placeholder="DD / MM / YYYY"
                  value={toStr_}
                  onChange={(e) => handleToChange(e.target.value)}
                />
              </div>
            </div>

            <div className="drp-body">
              {/* Presets */}
              <div className="drp-presets">
                {PRESETS.map((p) => (
                  <button
                    key={p.label}
                    className={`drp-pbtn${activePreset === p.label ? " active" : ""}`}
                    onClick={() => handlePreset(p)}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Calendars */}
              <div className="drp-cals">
                <DayPicker
                  mode="range"
                  selected={tempRange}
                  onSelect={handleSelect}
                  numberOfMonths={numMonths}
                  defaultMonth={defaultMonth}
                  month={month}
                  onMonthChange={setMonth}
                  showOutsideDays={false}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="drp-footer">
              <button className="drp-btn drp-btn-clear" onClick={handleClear}>
                Clear
              </button>
              <button className="drp-btn drp-btn-apply" onClick={handleApply}>
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
