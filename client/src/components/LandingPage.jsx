import React from 'react';
import { ArrowRight, Wallet, Tag, CheckCircle, Sparkles, ShieldCheck } from './Icons';

export default function LandingPage({ onStartPlanning }) {
  return (
    <div className="landing-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <Sparkles size={14} />
          <span>Smart Decision Helper</span>
        </div>
        
        <h1 className="hero-title">
          <span className="title-highlight">Think Before You Buy</span>
        </h1>
        
        <p className="hero-subtitle">
          Plan your money before making a purchase
        </p>

        <div className="hero-cta-box">
          <button
            type="button"
            className="btn-hero-cta"
            onClick={onStartPlanning}
            id="btn-start-planning"
          >
            <span>Start Planning</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            3 ขั้นตอนง่ายๆ ในการประเมินความพร้อมก่อนตัดสินใจซื้อสินค้า
          </p>
        </div>

        <div className="steps-grid">
          {/* Step 1 */}
          <div className="step-card">
            <div className="step-num-bubble">1</div>
            <div className="step-icon-wrap">
              <Wallet size={22} />
            </div>
            <h3 className="step-title">1. Enter Your Finances</h3>
            <p className="step-desc">
              Add your income, expenses, and savings.
            </p>
            <span className="step-detail-th">
              ระบุเงินที่มีและค่าใช้จ่ายจำเป็น เพื่อคำนวณเงินพร้อมใช้จริง
            </span>
          </div>

          {/* Step 2 */}
          <div className="step-card">
            <div className="step-num-bubble">2</div>
            <div className="step-icon-wrap">
              <Tag size={22} />
            </div>
            <h3 className="step-title">2. Choose a Product</h3>
            <p className="step-desc">
              Enter the product name and price
            </p>
            <span className="step-detail-th">
              ใส่ชื่อสินค้าและราคาที่ต้องการซื้อ เพื่อเปรียบเทียบกับงบ
            </span>
          </div>

          {/* Step 3 */}
          <div className="step-card">
            <div className="step-num-bubble">3</div>
            <div className="step-icon-wrap">
              <CheckCircle size={22} />
            </div>
            <h3 className="step-title">3. Check Your Results</h3>
            <p className="step-desc">
              See if you can afford it or should save more.
            </p>
            <span className="step-detail-th">
              รู้ทันทีว่าควร "ซื้อได้เลย", "รอไปก่อน" หรือ "เกินงบประมาณ"
            </span>
          </div>
        </div>
      </section>

      {/* Quick Trust / Info Banner */}
      <section className="trust-banner">
        <div className="trust-item">
          <ShieldCheck size={18} />
          <span>ประเมินไวใน 1 นาที</span>
        </div>
        <div className="trust-divider">•</div>
        <div className="trust-item">
          <Sparkles size={18} />
          <span>มีคำแนะนำทางการเงินอัจฉริยะ</span>
        </div>
        <div className="trust-divider">•</div>
        <div className="trust-item">
          <span>ไม่ต้องสมัครสมาชิก ใช้งานได้ทันที</span>
        </div>
      </section>
    </div>
  );
}
