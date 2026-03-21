'use client';
import { BACKGROUND_IMAGES, PRIMARY_GOLD } from '../utils/constants';

export default function BackgroundPicker({ selectedIndex, onSelect, compact = false }) {
  const selectedSize = compact ? 48 : 70;
  const normalSize = compact ? 42 : 58;
  const gap = compact ? 6 : 10;

  return (
    <div className="bg-picker">
      <label className="picker-label">ব্যাকগ্রাউন্ড নির্বাচন করুন</label>
      <div className="bg-grid" style={{ gap }}>
        {BACKGROUND_IMAGES.map((img, i) => (
          <button
            key={i}
            className={`bg-thumb ${i === selectedIndex ? 'selected' : ''}`}
            onClick={() => onSelect(i)}
            style={{
              width: i === selectedIndex ? selectedSize : normalSize,
              height: i === selectedIndex ? selectedSize : normalSize,
              backgroundImage: `url(${img})`,
            }}
            aria-label={`Background ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
