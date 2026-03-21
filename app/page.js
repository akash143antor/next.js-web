'use client';
import { useState, useRef } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import TabSwitcher from './components/TabSwitcher';
import CardPreview from './components/CardPreview';
import BackgroundPicker from './components/BackgroundPicker';
import ColorPicker from './components/ColorPicker';
import PaymentDropdown from './components/PaymentDropdown';
import { BORDER_STYLES, BACKGROUND_IMAGES } from './utils/constants';
import { captureCard, downloadImage, shareCard } from './utils/cardGenerator';

export default function Home() {
  // Card state
  const [activeTab, setActiveTab] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const [headerText, setHeaderText] = useState('ঈদ মোবারক');
  const [messageText, setMessageText] = useState('আপনাকে এবং আপনার পরিবারের সবাইকে জানাই পবিত্র ঈদুল ফিতরের শুভেচ্ছা ও ঈদ মোবারক।');
  const [toName, setToName] = useState('');
  const [fromName, setFromName] = useState('');
  const [headerColor, setHeaderColor] = useState('#FFD700');
  const [messageColor, setMessageColor] = useState('#FFFFFF');
  const [borderStyleIndex, setBorderStyleIndex] = useState(1);
  const [borderColor, setBorderColor] = useState('#E5C06A');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentNumber, setPaymentNumber] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const cardRef = useRef(null);
  const isSalamiMode = activeTab === 1;

  async function handleDownload() {
    if (!cardRef.current) return;
    setIsGenerating(true);
    const blob = await captureCard(cardRef.current);
    setIsGenerating(false);
    if (blob) downloadImage(blob);
  }

  async function handleShare() {
    if (!cardRef.current) return;
    setIsGenerating(true);
    const blob = await captureCard(cardRef.current);
    setIsGenerating(false);
    if (blob) await shareCard(blob);
  }

  return (
    <AnimatedBackground>
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <h1 className="app-title">Premium Eid Card Maker</h1>
          <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
        </header>

        <main className="main-content">
          {/* Card Preview */}
          <section className="preview-section">
            <div className="preview-wrapper" onClick={() => setFullscreen(true)}>
              <CardPreview
                ref={cardRef}
                bgIndex={bgIndex}
                isSalamiMode={isSalamiMode}
                headerText={headerText}
                messageText={messageText}
                fromName={fromName}
                toName={toName}
                paymentMethod={paymentMethod}
                paymentNumber={paymentNumber}
                headerColor={headerColor}
                messageColor={messageColor}
                borderStyleIndex={borderStyleIndex}
                borderColor={borderColor}
              />
              <button className="fullscreen-btn" onClick={(e) => { e.stopPropagation(); setFullscreen(true); }} aria-label="Fullscreen">
                ⛶
              </button>
            </div>
          </section>

          {/* Form Section */}
          <section className="form-section">
            {/* Header Text */}
            <div className="field-row">
              <div className="field-group flex-1">
                <label className="field-label">HEADER TEXT</label>
                <input
                  className="form-input"
                  value={headerText}
                  onChange={(e) => setHeaderText(e.target.value)}
                  placeholder="ঈদ মোবারক"
                />
              </div>
              <ColorPicker selectedColor={headerColor} onSelect={setHeaderColor} />
            </div>

            {/* Greeting Message */}
            <div className="field-row">
              <div className="field-group flex-1">
                <label className="field-label">GREETING MESSAGE</label>
                <textarea
                  className="form-input form-textarea"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={2}
                  placeholder="আপনার শুভেচ্ছা বার্তা লিখুন..."
                />
              </div>
              <ColorPicker selectedColor={messageColor} onSelect={setMessageColor} />
            </div>

            {/* To / From */}
            <div className="field-row two-col">
              <div className="field-group">
                <label className="field-label">TO (RECIPIENT)</label>
                <input className="form-input" value={toName} onChange={(e) => setToName(e.target.value)} placeholder="প্রাপকের নাম" />
              </div>
              <div className="field-group">
                <label className="field-label">FROM (SENDER)</label>
                <input className="form-input" value={fromName} onChange={(e) => setFromName(e.target.value)} placeholder="আপনার নাম" />
              </div>
            </div>

            {/* Border Style + Color */}
            <div className="field-row">
              <div className="field-group flex-1">
                <label className="field-label">BORDER STYLE</label>
                <select
                  className="form-select"
                  value={borderStyleIndex}
                  onChange={(e) => setBorderStyleIndex(Number(e.target.value))}
                >
                  {BORDER_STYLES.map((name, i) => (
                    <option key={i} value={i}>{name}</option>
                  ))}
                </select>
              </div>
              <div className="color-field">
                <label className="field-label">COLOR</label>
                <ColorPicker selectedColor={borderColor} onSelect={setBorderColor} />
              </div>
            </div>

            {/* Payment section (Salami mode) */}
            {isSalamiMode && (
              <>
                <PaymentDropdown selectedMethod={paymentMethod} onChange={setPaymentMethod} />
                {paymentMethod && (
                  <div className="field-group">
                    <label className="field-label">পেমেন্ট নম্বর</label>
                    <input
                      className="form-input"
                      value={paymentNumber}
                      onChange={(e) => setPaymentNumber(e.target.value)}
                      placeholder="আপনার বিকাশ/নগদ নম্বর"
                    />
                  </div>
                )}
              </>
            )}

            {/* Background Picker */}
            <BackgroundPicker selectedIndex={bgIndex} onSelect={setBgIndex} compact />

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="btn btn-primary" onClick={handleDownload} disabled={isGenerating}>
                {isGenerating ? '⏳ Processing...' : '⬇ DOWNLOAD CARD'}
              </button>
              <button className="btn btn-secondary" onClick={handleShare} disabled={isGenerating}>
                📤 Share Card
              </button>
            </div>

            <p className="credit">✨ Made by AN Studios ✨</p>
          </section>
        </main>
      </div>

      {/* Fullscreen modal */}
      {fullscreen && (
        <div className="fullscreen-overlay" onClick={() => setFullscreen(false)}>
          <div className="fullscreen-card" onClick={(e) => e.stopPropagation()}>
            <CardPreview
              bgIndex={bgIndex}
              isSalamiMode={isSalamiMode}
              headerText={headerText}
              messageText={messageText}
              fromName={fromName}
              toName={toName}
              paymentMethod={paymentMethod}
              paymentNumber={paymentNumber}
              headerColor={headerColor}
              messageColor={messageColor}
              borderStyleIndex={borderStyleIndex}
              borderColor={borderColor}
            />
            <button className="close-fullscreen" onClick={() => setFullscreen(false)}>✕</button>
          </div>
        </div>
      )}
    </AnimatedBackground>
  );
}
