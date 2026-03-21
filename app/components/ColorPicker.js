'use client';
import { useState, useRef, useEffect } from 'react';
import { THEME_COLORS } from '../utils/constants';

export default function ColorPicker({ selectedColor, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function close(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div className="color-picker-wrapper" ref={ref}>
      <button
        className="color-swatch"
        style={{ backgroundColor: selectedColor }}
        onClick={() => setOpen(!open)}
        aria-label="Pick color"
      />
      {open && (
        <div className="color-popup">
          {THEME_COLORS.map((c) => (
            <button
              key={c}
              className={`color-dot ${c === selectedColor ? 'active' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => { onSelect(c); setOpen(false); }}
              aria-label={`Color ${c}`}
            >
              {c === selectedColor && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isLight(c) ? '#000' : '#fff'} strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function isLight(hex) {
  const r = parseInt(hex.slice(1,3), 16);
  const g = parseInt(hex.slice(3,5), 16);
  const b = parseInt(hex.slice(5,7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}
