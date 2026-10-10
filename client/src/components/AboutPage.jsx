import React from 'react';
import { Sparkles, ShieldCheck, ArrowRight, RotateCcw } from './Icons';

export default function AboutPage({ onBackToHome, onStartPlanning }) {
  return (
    <div className="about-wrapper">
      <div className="card about-card">
        <div className="about-header">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>About Finly</span>
          </div>
          <h2 className="about-title">ทำไมต้อง "Think Before You Buy"?</h2>
          <p className="about-subtitle">
            Finly เกิดขึ้นจากแนวคิดที่ต้องการช่วยลดปัญหาการซื้อของตามอารมณ์ชั่ววูบ (Impulse Buying)
            และปกป้องเงินสำรองฉุกเฉินของคุณ
          </p>
        </div>

        <div className="about-pillars">
          <div className="pillar-item">
            <div className="pillar-icon">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3>ปกป้องค่าใช้จ่ายจำเป็น</h3>
              <p>
                เราแยก "เงินที่มี" กับ "ค่าใช้จ่ายจำเป็น" ออกจากกันก่อนเสมอ เพื่อให้มั่นใจว่าการซื้อสินค้าจะไม่ทำให้คุณขาดเงินค่าห้อง ค่าน้ำไฟ หรือค่าอาหาร
              </p>
            </div>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon">
              <Sparkles size={22} />
            </div>
            <div>
              <h3>กฎ 48 ชั่วโมง (48-Hour Rule)</h3>
              <p>
                หากสินค้าตกอยู่ในเกณฑ์ "รอไปก่อน" เราแนะนำให้คุณรอ 2-3 วัน เพื่อทบทวนว่าสิ่งนั้นคือความจำเป็น (Need) หรือความอยาก (Want)
              </p>
            </div>
          </div>

          <div className="pillar-item">
            <div className="pillar-icon">
              <RotateCcw size={22} />
            </div>
            <div>
              <h3>รักษาเงินสำรองฉุกเฉิน</h3>
              <p>
                หลังซื้อสินค้า คุณควรมีเงินสดสำรองเหลืออย่างน้อย 30% ของเงินพร้อมใช้ เพื่อรับมือกับเหตุการณ์ที่ไม่คาดฝันในอนาคต
              </p>
            </div>
          </div>
        </div>

        <div className="about-actions">
          <button
            type="button"
            className="btn-submit"
            onClick={onStartPlanning}
          >
            <span>เริ่มวางแผนการเงิน</span>
            <ArrowRight size={18} />
          </button>
          <button
            type="button"
            className="btn-reset"
            onClick={onBackToHome}
          >
            <span>กลับหน้าแรก</span>
          </button>
        </div>
      </div>
    </div>
  );
}
