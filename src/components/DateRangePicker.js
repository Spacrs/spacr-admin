import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect, useLayoutEffect, useCallback, } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
const PRESETS = [
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
    {
        label: "Last 6 months",
        getDates: () => {
            const now = new Date();
            const to = new Date(now);
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
const toStr = (d) => d
    ? `${String(d.getDate()).padStart(2, "0")} / ${String(d.getMonth() + 1).padStart(2, "0")} / ${d.getFullYear()}`
    : "";
const parseInput = (s) => {
    const digits = s.replace(/\D/g, "");
    if (digits.length !== 8)
        return undefined;
    const dd = +digits.slice(0, 2), mm = +digits.slice(2, 4), yyyy = +digits.slice(4);
    const d = new Date(yyyy, mm - 1, dd);
    return isNaN(d.getTime()) ? undefined : d;
};
const maskDate = (raw) => {
    const digits = raw.replace(/\D/g, "").slice(0, 8);
    let out = "";
    for (let i = 0; i < digits.length; i++) {
        if (i === 2 || i === 4)
            out += " / ";
        out += digits[i];
    }
    return out;
};
const isSameDate = (d1, d2) => {
    if (!d1 || !d2)
        return false;
    return d1.toDateString() === d2.toDateString();
};
const detectPreset = (range) => {
    for (const p of PRESETS) {
        const presetRange = p.getDates();
        if (isSameDate(range.from, presetRange.from) &&
            isSameDate(range.to, presetRange.to)) {
            return p.label;
        }
    }
    return "";
};
export default function DateRangePicker({ onChange, value, }) {
    const def = PRESETS[1];
    const today = new Date();
    const [range, setRange] = useState(def.getDates());
    const [tempRange, setTempRange] = useState(def.getDates());
    const [open, setOpen] = useState(false);
    const [activePreset, setActivePreset] = useState("Last 7 days");
    const [isMobile, setIsMobile] = useState(false);
    const [fromStr, setFromStr] = useState(toStr(def.getDates().from));
    const [toStr_, setToStr_] = useState(toStr(def.getDates().to));
    const [fromErr, setFromErr] = useState(false);
    const [toErr, setToErr] = useState(false);
    const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth() - 1, 1));
    // ── position stored as CSS vars, not state, to avoid flicker ──
    const [popupStyle, setPopupStyle] = useState({
        position: "fixed",
        visibility: "hidden",
        top: 0,
        left: 0,
        zIndex: 9999,
    });
    const triggerRef = useRef(null);
    const popupRef = useRef(null);
    // Sync with external value changes (e.g. from parent or global context)
    useEffect(() => {
        if (value?.from && value?.to) {
            setRange(value);
            setTempRange(value);
            setFromStr(toStr(value.from));
            setToStr_(toStr(value.to));
            setActivePreset(detectPreset(value));
        }
    }, [value]);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 700);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);
    // ── Smart positioning: right-aligns when near right edge, flips up near bottom ──
    const calcPosition = useCallback(() => {
        if (!triggerRef.current || !popupRef.current)
            return;
        const tr = triggerRef.current.getBoundingClientRect();
        const pr = popupRef.current.getBoundingClientRect();
        const GAP = 4; // 8
        const VW = window.innerWidth;
        const VH = window.innerHeight;
        const popupW = pr.width || (isMobile ? VW - 16 : 780);
        const popupH = pr.height || 460;
        // Vertical: below trigger; flip above if not enough room
        let top = tr.bottom + GAP;
        if (top + popupH > VH - 8)
            top = tr.top - popupH - GAP;
        if (top < 8)
            top = 8;
        // Horizontal: start left-aligned to trigger
        let left = tr.left;
        // If overflows right edge → right-align to trigger's right edge
        if (left + popupW > VW - 8) {
            left = tr.right - popupW;
        }
        // Final clamp so it never goes off left edge
        if (left < 8)
            left = 8;
        setPopupStyle({
            position: "fixed",
            top,
            left,
            zIndex: 9999,
            visibility: "visible",
            width: isMobile ? `calc(100vw - 16px)` : undefined,
            maxWidth: `calc(100vw - 16px)`,
        });
    }, [isMobile]);
    useLayoutEffect(() => {
        if (!open)
            return;
        setPopupStyle((s) => ({ ...s, visibility: "hidden" }));
        const raf = requestAnimationFrame(() => { calcPosition(); });
        return () => cancelAnimationFrame(raf);
    }, [open, calcPosition]);
    // ── Reposition on resize / scroll ──
    useEffect(() => {
        if (!open)
            return;
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
        const handler = (e) => {
            const t = e.target;
            if (!triggerRef.current?.contains(t) && !popupRef.current?.contains(t)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);
    // ── Input handlers ──
    const handleFromChange = (val) => {
        const masked = maskDate(val);
        setFromStr(masked);
        const d = parseInput(masked);
        setFromErr(!d && masked.replace(/\D/g, "").length === 8);
        if (d) {
            setTempRange((p) => ({ ...p, from: d }));
            setActivePreset("");
        }
    };
    const handleToChange = (val) => {
        const masked = maskDate(val);
        setToStr_(masked);
        const d = parseInput(masked);
        setToErr(!d && masked.replace(/\D/g, "").length === 8);
        if (d) {
            setTempRange((p) => ({ ...p, to: d }));
            setActivePreset("");
        }
    };
    const handleSelect = (r) => {
        const next = r ?? { from: undefined, to: undefined };
        setTempRange(next);
        setFromStr(toStr(next.from));
        setToStr_(toStr(next.to));
        setActivePreset("");
    };
    const handlePreset = (p) => {
        const dates = p.getDates();
        setTempRange(dates);
        setFromStr(toStr(dates.from));
        setToStr_(toStr(dates.to));
        setActivePreset(p.label);
    };
    const handleApply = () => {
        setRange(tempRange);
        setOpen(false);
        onChange?.(tempRange);
    };
    const handleClear = () => {
        const def = PRESETS.find((p) => p.label === "Last 7 days");
        const dates = def.getDates();
        setTempRange(dates);
        setFromStr(toStr(dates.from));
        setToStr_(toStr(dates.to));
        setFromErr(false);
        setToErr(false);
        setActivePreset("Last 7 days");
    };
    const handleOpen = () => {
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
    return (_jsxs(_Fragment, { children: [_jsx("style", { children: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        .drp * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }

        /* ── Trigger ── */
        .drp-trigger {
          display: inline-flex; align-items: center; gap: 8px; flex-wrap: wrap;
          background: #fff; border: 1px solid #e2e8f0; border-radius: 10px;
          padding: 4px 10px; cursor: pointer; user-select: none;
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

        /* ── Popup ── */
        .drp-popup {
          background: #fff; border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,.16), 0 4px 16px rgba(0,0,0,.09);
          border: 1px solid #e8edf5; overflow: hidden;
          display: flex; flex-direction: column;
          animation: drpIn .16s ease;
          width: max-content;
        }
        @keyframes drpIn { from{opacity:0;transform:translateY(-5px)} to{opacity:1;transform:translateY(0)} }

        /* ── Header ── */
        .drp-inputs {
          display: flex; align-items: center; justify-content: center;
          gap: 12px; padding: 12px 20px 10px; flex-wrap: wrap;
          background: #fafbff; border-bottom: 1px solid #f1f5f9;
        }
        .drp-input-group { display: flex; align-items: center; gap: 8px; }
        .drp-input-label { font-size: 12px; font-weight: 600; color: #64748b; }
        .drp-input {
          font-size: 14px; font-weight: 600; font-family: 'DM Sans', sans-serif;
          color: #1e293b; background: #f8fafc;
          border: 1.5px solid #e2e8f0; border-radius: 8px;
          padding: 6px 12px; width: 148px; outline: none;
          transition: border-color .2s, box-shadow .2s; letter-spacing: .3px;
        }
        .drp-input:focus { border-color: #7c6df0; box-shadow: 0 0 0 3px rgba(124,109,240,.12); background: #fff; }
        .drp-input.err   { border-color: #f87171; background: #fff5f5; }
        .drp-input-sep { color: #cbd5e1; font-size: 20px; display: flex; align-items: center; }

        /* ── Body ── */
        .drp-body { display: flex; }

        /* ── Presets ── */
        .drp-presets {
          flex-shrink: 0; width: 148px; padding: 14px 10px;
          border-right: 1px solid #f1f5f9;
          display: flex; flex-direction: column; gap: 2px;
          background: #fafbff;
        }
        .drp-pbtn {
          padding: 8px 12px; border-radius: 8px; font-size: 13px; font-weight: 500;
          color: #475569; background: transparent; border: none; cursor: pointer;
          text-align: left; transition: background .15s, color .15s; white-space: nowrap;
          line-height: 1.4;
        }
        .drp-pbtn:hover  { background: #f1f0fe; color: #5b4ed8; }
        .drp-pbtn.active { background: #ede9ff; color: #5b4ed8; font-weight: 600; }

        /* ── Calendar container: no extra height ── */
        .drp-cals {
          padding: 16px 20px;
          display: flex;
          align-items: flex-start;
        }

        /* ── react-day-picker: force uniform cells both months ── */
        .rdp-root {
          --rdp-accent-color: #5b4ed8;
          --rdp-accent-background-color: #ede9ff;
          --rdp-range_middle-background-color: #ede9ff;
          --rdp-range_middle-color: #5b4ed8;
          --rdp-day-width: 38px;
          --rdp-day-height: 38px;
          --rdp-weekday-padding: 0;
          margin: 0;
        }

        /* These !important rules ensure BOTH months get the same size */
        .rdp-day_button {
          width: 36px !important;
          height: 36px !important;
          min-width: 36px !important;
          border-radius: 50% !important;
          font-size: 13px !important;
          font-weight: 500 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin: 0 auto !important;
        }
        .rdp-weekday {
          width: 36px !important;
          min-width: 36px !important;
          font-size: 11.5px !important;
          color: #94a3b8 !important;
          font-weight: 600 !important;
          text-align: center !important;
          padding: 0 2px !important;
        }
        .rdp-day {
          padding: 2px 1px !important;
          text-align: center !important;
        }
        /* Removes extra bottom whitespace inside rdp table */
        .rdp-month { width: auto !important; }
        .rdp-table { border-collapse: collapse !important; }

        .rdp-months { gap: 24px !important; flex-wrap: nowrap; }
        .rdp-month_caption { justify-content: center; margin-bottom: 10px; padding: 0; }
        .rdp-caption_label, .rdp-month_caption span {
          font-size: 14px; font-weight: 700; color: #1e293b; font-family: 'DM Sans', sans-serif;
        }
        .rdp-button_previous, .rdp-button_next {
          color: #7c6df0 !important; border-radius: 8px !important;
        }
        .rdp-button_previous:hover, .rdp-button_next:hover { background: #ede9ff !important; }

        .rdp-selected .rdp-day_button,
        .rdp-range_start .rdp-day_button,
        .rdp-range_end .rdp-day_button {
          background: #5b4ed8 !important; color: #fff !important; border-radius: 50% !important;
        }
        .rdp-range_middle .rdp-day_button {
          background: #ede9ff !important; color: #5b4ed8 !important; border-radius: 0 !important;
        }
        .rdp-outside .rdp-day_button { color: #c8d2e0 !important; }
        .rdp-today:not(.rdp-selected) .rdp-day_button {
          font-weight: 700 !important; color: #5b4ed8 !important;
        }

        /* ── Footer ── */
        .drp-footer {
          display: flex; justify-content: flex-end; align-items: center;
          gap: 8px; padding: 10px 16px;
          border-top: 1px solid #f1f5f9; background: #fafbff;
        }
        .drp-btn {
          padding: 7px 18px; border-radius: 8px; font-size: 13px; font-weight: 600;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all .18s; outline: none; white-space: nowrap;
        }
        .drp-btn-clear { background:#fff; border:1.5px solid #e2e8f0; color:#475569; }
        .drp-btn-clear:hover { border-color:#5b4ed8; color:#5b4ed8; background:#f1f0fe; }
        .drp-btn-apply { background:#5b4ed8; border:1.5px solid #5b4ed8; color:#fff; }
        .drp-btn-apply:hover { background:#4a3ec0; border-color:#4a3ec0; box-shadow:0 4px 12px rgba(91,78,216,.3); }

        /* ── Mobile ── */
        @media (max-width: 699px) {
          .drp-presets { width: 120px; padding: 10px 6px; }
          .drp-pbtn { font-size: 12px; padding: 7px 8px; }
          .drp-cals { padding: 12px 10px; }
          .drp-input { width: 120px; font-size: 13px; }
        }
      ` }), _jsxs("div", { className: "drp", style: { display: "inline-block" }, children: [_jsxs("div", { className: "drp-trigger", onClick: handleOpen, ref: triggerRef, children: [_jsx("span", { className: "drp-lbl", children: "Start" }), _jsx("span", { className: `drp-val ${open ? "hi" : ""}`, children: toStr(range.from) || "Select" }), _jsx("span", { className: "drp-sep", children: "\u2013" }), _jsx("span", { className: "drp-lbl", children: "End" }), _jsx("span", { className: "drp-val", children: toStr(range.to) || "Select" })] }), open && (_jsxs("div", { className: "drp-popup", ref: popupRef, style: popupStyle, children: [_jsxs("div", { className: "drp-inputs", children: [_jsxs("div", { className: "drp-input-group", children: [_jsx("span", { className: "drp-input-label", children: "Start Date" }), _jsx("input", { className: `drp-input${fromErr ? " err" : ""}`, placeholder: "DD / MM / YYYY", value: fromStr, onChange: (e) => handleFromChange(e.target.value) })] }), _jsx("span", { className: "drp-input-sep", children: "\u2013" }), _jsxs("div", { className: "drp-input-group", children: [_jsx("span", { className: "drp-input-label", children: "End Date" }), _jsx("input", { className: `drp-input${toErr ? " err" : ""}`, placeholder: "DD / MM / YYYY", value: toStr_, onChange: (e) => handleToChange(e.target.value) })] })] }), _jsxs("div", { className: "drp-body", children: [_jsx("div", { className: "drp-presets", children: PRESETS.map((p) => (_jsx("button", { className: `drp-pbtn${activePreset === p.label ? " active" : ""}`, onClick: () => handlePreset(p), children: p.label }, p.label))) }), _jsx("div", { className: "drp-cals", children: _jsx(DayPicker, { mode: "range", selected: tempRange, onSelect: handleSelect, numberOfMonths: numMonths, defaultMonth: defaultMonth, month: month, onMonthChange: setMonth, showOutsideDays: false, navLayout: "around" }) })] }), _jsxs("div", { className: "drp-footer", children: [_jsx("button", { className: "drp-btn drp-btn-clear", onClick: handleClear, children: "Clear" }), _jsx("button", { className: "drp-btn drp-btn-apply", onClick: handleApply, children: "Apply" })] })] }))] })] }));
}
