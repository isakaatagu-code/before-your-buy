import React from 'react';
import { Sparkles } from './Icons';

export default function Header() {
  return (
    <header className="header-wrapper">
      <div className="brand-badge">
        <Sparkles size={14} />
        <span>Finly • Before Your Buy</span>
      </div>
      <h1 className="brand-title">Before Your Buy</h1>
      <p className="brand-subtitle">
        วางแผนและประเมินงบประมาณก่อนตัดสินใจซื้อสินค้า คำนวณเงินคงเหลือสุทธิ 
        พร้อมคำแนะนำที่ชัดเจนว่าควรซื้อเลยหรือรอเก็บเงินเพิ่ม
      </p>
    </header>
  );
}
