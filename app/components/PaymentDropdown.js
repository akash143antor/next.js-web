'use client';
import { PAYMENT_METHODS } from '../utils/constants';

export default function PaymentDropdown({ selectedMethod, onChange }) {
  return (
    <div className="payment-dropdown">
      <label className="field-label">পেমেন্ট মেথড (সেলামী)</label>
      <select
        className="form-select"
        value={selectedMethod || ''}
        onChange={(e) => onChange(e.target.value || null)}
      >
        <option value="">পেমেন্ট মাধ্যম বেছে নিন</option>
        {PAYMENT_METHODS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    </div>
  );
}
