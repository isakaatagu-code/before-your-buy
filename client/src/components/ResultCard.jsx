import React from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  PiggyBank,
  CheckCircle,
  Info,
  DollarSign
} from './Icons';

function formatTHB(num) {
  if (num === undefined || num === null || isNaN(num)) return '0';
  return new Intl.NumberFormat('th-TH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(num);
}

export default function ResultCard({ result }) {
  if (!result) {
    return (
      <div className="card empty-placeholder">
        <div className="empty-icon">
          <PiggyBank size={28} />
        </div>
        <h3 className="empty-heading">ผลการประเมินจะแสดงที่นี่</h3>
        <p className="empty-text">
          กรอกราคาสินค้าและงบประมาณของคุณ หรือกดปุ่มทดลองกรอกข้อมูลเพื่อดูคำแนะนำ ซื้อได้เลย / รอไปก่อน
        </p>
      </div>
    );
  }

  const {
    itemName,
    price,
    currentSavings,
    essentialExpenses,
    netSavings,
    remainingAfterPurchase,
    pricePercentOfSavings,
    pricePercentOfNet,
    remainingPercentOfNet,
    recommendation,
    recommendationBadge,
    level,
    headline,
    explanation,
    tips
  } = result;

  const renderIcon = () => {
    switch (level) {
      case 'safe':
        return <ShieldCheck size={26} />;
      case 'warning':
        return <AlertTriangle size={26} />;
      case 'danger':
      default:
        return <AlertOctagon size={26} />;
    }
  };

  const clampedProgress = Math.min(Math.max(pricePercentOfNet, 0), 100);

  return (
    <div className="card" id="result-box">
      <h2 className="card-title">
        <PiggyBank size={20} />
        <span>ผลการวิเคราะห์ความพร้อม</span>
      </h2>

      {/* Clear Buy-or-Wait Recommendation Banner */}
      <div className={`recommendation-banner ${level}`} id="recommendation-banner">
        <div className="recommendation-icon">
          {renderIcon()}
        </div>
        <div>
          <span className="recommendation-badge">{recommendationBadge}</span>
          <h3 className="recommendation-headline">{headline}</h3>
          <p className="recommendation-explanation">{explanation}</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        {/* Remaining Balance */}
        <div className="metric-card primary-highlight">
          <div className="metric-label">
            <PiggyBank size={14} />
            <span>เงินคงเหลือหลังซื้อ</span>
          </div>
          <div className={`metric-value ${level}`} id="stat-remaining-balance">
            {formatTHB(remainingAfterPurchase)} ฿
          </div>
          <div className="metric-caption">
            {remainingAfterPurchase >= 0
              ? `เหลือ ${remainingPercentOfNet}% ของเงินพร้อมใช้`
              : `เงินไม่พอ ขาดอีก ${formatTHB(Math.abs(remainingAfterPurchase))} ฿`}
          </div>
        </div>

        {/* Price vs Total Budget Ratio */}
        <div className="metric-card">
          <div className="metric-label">
            <DollarSign size={14} />
            <span>สัดส่วนราคาสินค้าเทียบเงินที่มี</span>
          </div>
          <div className="metric-value" id="stat-price-percentage">
            {pricePercentOfSavings}%
          </div>
          <div className="metric-caption">
            จากเงินที่มี {formatTHB(currentSavings)} ฿
          </div>
        </div>

        {/* Net Budget Available */}
        <div className="metric-card">
          <div className="metric-label">
            <CheckCircle size={14} />
            <span>เงินพร้อมใช้ก่อนซื้อ</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.25rem' }}>
            {formatTHB(netSavings)} ฿
          </div>
          <div className="metric-caption">
            หักค่าใช้จ่ายจำเป็น {formatTHB(essentialExpenses)} ฿
          </div>
        </div>

        {/* Item Price */}
        <div className="metric-card">
          <div className="metric-label">
            <Info size={14} />
            <span>ราคาสินค้า ({itemName})</span>
          </div>
          <div className="metric-value" style={{ fontSize: '1.25rem' }}>
            {formatTHB(price)} ฿
          </div>
          <div className="metric-caption">
            คิดเป็น {pricePercentOfNet}% ของเงินพร้อมใช้
          </div>
        </div>
      </div>

      {/* Visual Budget Bar */}
      <div className="budget-bar-section">
        <div className="budget-bar-header">
          <span>สัดส่วนเงินที่ถูกใช้ไปสำหรับการซื้อชิ้นนี้</span>
          <span style={{ fontWeight: 600 }}>{pricePercentOfNet}%</span>
        </div>
        <div className="budget-bar-track">
          <div
            className={`budget-bar-fill ${level}`}
            style={{ width: `${clampedProgress}%` }}
          />
        </div>
      </div>

      {/* Recommendations & Tips */}
      {tips && tips.length > 0 && (
        <div className="tips-container">
          <div className="tips-title">
            <Info size={15} />
            <span>คำแนะนำทางการเงินสำหรับคุณ</span>
          </div>
          {tips.map((tip, idx) => (
            <div key={idx} className={`tip-item ${tip.type}`}>
              <div className="tip-icon">
                {tip.type === 'safe' && <CheckCircle size={16} />}
                {tip.type === 'warning' && <AlertTriangle size={16} />}
                {tip.type === 'danger' && <AlertOctagon size={16} />}
                {tip.type === 'info' && <Info size={16} />}
              </div>
              <div>
                <h4 className="tip-heading">{tip.title}</h4>
                <p className="tip-text">{tip.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
