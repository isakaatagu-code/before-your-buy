import React from 'react';
import { Tag, DollarSign, Wallet, Receipt, RotateCcw, ArrowRight, Sparkles } from './Icons';

const DEMO_PRESETS = [
  {
    label: '🟢 หูฟัง (ซื้อได้เลย)',
    data: {
      itemName: 'หูฟังบลูทูธไร้สาย',
      price: '2500',
      currentSavings: '20000',
      essentialExpenses: '8000'
    }
  },
  {
    label: '🟡 สมาร์ตโฟน (รอไปก่อน)',
    data: {
      itemName: 'สมาร์ตโฟนรุ่นใหม่',
      price: '24900',
      currentSavings: '40000',
      essentialExpenses: '12000'
    }
  },
  {
    label: '🔴 แท็บเล็ต (เกินงบ)',
    data: {
      itemName: 'แท็บเล็ตเพื่อการทำงาน',
      price: '22000',
      currentSavings: '25000',
      essentialExpenses: '10000'
    }
  }
];

export default function BudgetForm({
  formData,
  setFormData,
  errors,
  setErrors,
  loading,
  onSubmit,
  onReset
}) {
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const applyPreset = (presetData) => {
    setFormData(presetData);
    setErrors({});
  };

  return (
    <div className="card">
      <h2 className="card-title">
        <Tag size={20} />
        <span>ข้อมูลสินค้าและงบประมาณ</span>
      </h2>

      {/* Demo Preset Buttons */}
      <div className="presets-box">
        <div className="presets-label">
          <Sparkles size={14} />
          <span>ทดลองกรอกข้อมูลตัวอย่าง:</span>
        </div>
        <div className="presets-list">
          {DEMO_PRESETS.map((p, idx) => (
            <button
              key={idx}
              type="button"
              id={`preset-btn-${idx}`}
              className="preset-chip"
              onClick={() => applyPreset(p.data)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate>
        {/* Item Name */}
        <div className="form-group">
          <label htmlFor="itemName" className="form-label">
            ชื่อสินค้า <span className="req">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <Tag size={18} />
            </span>
            <input
              type="text"
              id="itemName"
              name="itemName"
              className={`form-input no-unit ${errors.itemName ? 'has-error' : ''}`}
              placeholder="เช่น รองเท้าวิ่ง, แล็ปท็อป"
              value={formData.itemName}
              onChange={(e) => handleChange('itemName', e.target.value)}
              disabled={loading}
            />
          </div>
          {errors.itemName && <div className="field-error">{errors.itemName}</div>}
        </div>

        {/* Product Price */}
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            ราคาสินค้า <span className="req">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <DollarSign size={18} />
            </span>
            <input
              type="number"
              id="price"
              name="price"
              min="0"
              step="any"
              className={`form-input ${errors.price ? 'has-error' : ''}`}
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              disabled={loading}
            />
            <span className="input-unit">บาท</span>
          </div>
          {errors.price && <div className="field-error">{errors.price}</div>}
        </div>

        {/* Available Budget / Current Savings */}
        <div className="form-group">
          <label htmlFor="currentSavings" className="form-label">
            งบประมาณ / เงินที่มีอยู่ปัจจุบัน <span className="req">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <Wallet size={18} />
            </span>
            <input
              type="number"
              id="currentSavings"
              name="currentSavings"
              min="0"
              step="any"
              className={`form-input ${errors.currentSavings ? 'has-error' : ''}`}
              placeholder="0.00"
              value={formData.currentSavings}
              onChange={(e) => handleChange('currentSavings', e.target.value)}
              disabled={loading}
            />
            <span className="input-unit">บาท</span>
          </div>
          {errors.currentSavings && <div className="field-error">{errors.currentSavings}</div>}
        </div>

        {/* Essential Expenses */}
        <div className="form-group">
          <label htmlFor="essentialExpenses" className="form-label">
            ค่าใช้จ่ายจำเป็นรอบนี้ <span className="req">*</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <Receipt size={18} />
            </span>
            <input
              type="number"
              id="essentialExpenses"
              name="essentialExpenses"
              min="0"
              step="any"
              className={`form-input ${errors.essentialExpenses ? 'has-error' : ''}`}
              placeholder="0.00"
              value={formData.essentialExpenses}
              onChange={(e) => handleChange('essentialExpenses', e.target.value)}
              disabled={loading}
            />
            <span className="input-unit">บาท</span>
          </div>
          <span className="field-hint">เช่น ค่าห้อง ค่าไฟ ค่าอาหารจำเป็น (หากไม่มีใส่ 0)</span>
          {errors.essentialExpenses && <div className="field-error">{errors.essentialExpenses}</div>}
        </div>

        {errors.general && (
          <div className="field-error" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
            {errors.general}
          </div>
        )}

        {/* Buttons */}
        <div className="button-row">
          <button
            type="submit"
            id="btn-calculate"
            className="btn-submit"
            disabled={loading}
          >
            <span>{loading ? 'กำลังประเมิน...' : 'ประเมินความพร้อม'}</span>
            {!loading && <ArrowRight size={18} />}
          </button>

          <button
            type="button"
            id="btn-reset"
            className="btn-reset"
            onClick={onReset}
            disabled={loading}
          >
            <RotateCcw size={15} />
            <span>รีเซ็ต</span>
          </button>
        </div>
      </form>
    </div>
  );
}
