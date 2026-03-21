'use client';
import { forwardRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { BACKGROUND_IMAGES } from '../utils/constants';
import PremiumFrame from './PremiumFrames';

const CardPreview = forwardRef(function CardPreview({
  bgIndex, isSalamiMode, headerText, messageText,
  fromName, toName, paymentMethod, paymentNumber,
  headerColor, messageColor, borderStyleIndex, borderColor
}, ref) {
  const bg = BACKGROUND_IMAGES[bgIndex];

  return (
    <div className="card-canvas" ref={ref}>
      {/* Background image */}
      <div className="card-bg" style={{ backgroundImage: `url(${bg})` }} />

      {/* Premium frame overlay */}
      <PremiumFrame styleIndex={borderStyleIndex} color={borderColor} />

      {/* Center content */}
      <div className="card-content">
        {/* Header */}
        <h1
          className="card-header"
          style={{ color: headerColor, textShadow: `2px 4px 15px rgba(0,0,0,0.6)` }}
        >
          {headerText || 'ঈদ মোবারক'}
        </h1>

        {/* Divider */}
        <div className="card-divider" style={{
          background: `linear-gradient(90deg, transparent, ${headerColor}cc, transparent)`
        }} />

        {/* To name */}
        {toName && (
          <p className="card-to" style={{ color: messageColor, textShadow: '2px 3px 10px rgba(0,0,0,0.6)' }}>
            প্রিয় {toName},
          </p>
        )}

        {/* Message */}
        {messageText && (
          <p className="card-message" style={{ color: messageColor, textShadow: '2px 3px 10px rgba(0,0,0,0.6)' }}>
            {messageText}
          </p>
        )}

        {/* From name */}
        {fromName && (
          <p className="card-from" style={{ color: headerColor, textShadow: '2px 3px 10px rgba(0,0,0,0.6)' }}>
            শুভেচ্ছান্তে,<br/>{fromName}
          </p>
        )}

        {/* Salami QR Code */}
        {isSalamiMode && paymentMethod && paymentNumber && (
          <div className="salami-section">
            <div className="salami-glass">
              <p className="salami-title">ঈদ সেলামী ({paymentMethod})</p>
              <div className="qr-wrapper">
                <QRCodeSVG value={paymentNumber} size={180} fgColor="#151515" bgColor="#fff" />
              </div>
              <p className="salami-number">{paymentNumber}</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="card-footer">MADE WITH EID CARD APP</p>
    </div>
  );
});

export default CardPreview;
