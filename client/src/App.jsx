import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import BudgetForm from './components/BudgetForm';
import ResultCard from './components/ResultCard';
import { ArrowRight, RotateCcw } from './components/Icons';

const INITIAL_FORM = {
  itemName: '',
  price: '',
  currentSavings: '',
  essentialExpenses: ''
};

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'planner' | 'about'
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Client-side quick validation
  const validateForm = () => {
    const errs = {};
    if (!formData.itemName || !formData.itemName.trim()) {
      errs.itemName = 'กรุณาระบุชื่อสินค้า';
    }

    if (formData.price === '' || isNaN(Number(formData.price))) {
      errs.price = 'กรุณาระบุราคาสินค้าเป็นตัวเลข';
    } else if (Number(formData.price) <= 0) {
      errs.price = 'ราคาสินค้าต้องมากกว่า 0 บาท';
    }

    if (formData.currentSavings === '' || isNaN(Number(formData.currentSavings))) {
      errs.currentSavings = 'กรุณาระบุงบ/เงินที่มีเป็นตัวเลข';
    } else if (Number(formData.currentSavings) < 0) {
      errs.currentSavings = 'จำนวนเงินที่มีต้องไม่ติดลบ';
    }

    if (formData.essentialExpenses === '' || isNaN(Number(formData.essentialExpenses))) {
      errs.essentialExpenses = 'กรุณาระบุค่าใช้จ่ายจำเป็น (หากไม่มีใส่ 0)';
    } else if (Number(formData.essentialExpenses) < 0) {
      errs.essentialExpenses = 'ค่าใช้จ่ายจำเป็นต้องไม่ติดลบ';
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const response = await fetch('/api/check-budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          itemName: formData.itemName.trim(),
          price: Number(formData.price),
          currentSavings: Number(formData.currentSavings),
          essentialExpenses: Number(formData.essentialExpenses)
        })
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        if (resData.errors) {
          setErrors(resData.errors);
        } else {
          setErrors({ general: resData.message || 'เกิดข้อผิดพลาดในการคำนวณ' });
        }
        return;
      }

      setResult(resData.data);
    } catch (err) {
      console.error('API request error:', err);
      // Fallback calculation in case backend server is unreachable
      const price = Number(formData.price);
      const currentSavings = Number(formData.currentSavings);
      const essentialExpenses = Number(formData.essentialExpenses);
      const netSavings = currentSavings - essentialExpenses;
      const remainingAfterPurchase = netSavings - price;
      const pricePercentOfSavings = currentSavings > 0 ? Math.round((price / currentSavings) * 1000) / 10 : 0;
      const pricePercentOfNet = netSavings > 0 ? Math.round((price / netSavings) * 1000) / 10 : 100;
      const remainingPercentOfNet = netSavings > 0 ? Math.round((remainingAfterPurchase / netSavings) * 1000) / 10 : 0;

      let recommendation = 'BUY_NOW';
      let recommendationBadge = 'ซื้อได้เลย';
      let level = 'safe';
      let headline = 'งบประมาณพร้อม สามารถซื้อได้ทันที';
      let explanation = `หลังซื้อคุณจะยังคงมีเงินเหลือ ${new Intl.NumberFormat('th-TH').format(remainingAfterPurchase)} บาท`;
      const tips = [];

      if (netSavings < 0 || remainingAfterPurchase < 0) {
        recommendation = 'DO_NOT_BUY';
        recommendationBadge = 'เกินงบประมาณ';
        level = 'danger';
        headline = 'งบประมาณไม่เพียงพอ';
        explanation = `เงินไม่พอ ขาดอีก ${new Intl.NumberFormat('th-TH').format(Math.abs(remainingAfterPurchase))} บาท`;
        tips.push({
          type: 'danger',
          title: 'ชะลอการซื้อสินค้า',
          text: 'งบประมาณไม่พอซื้อสินค้าชิ้นนี้โดยไม่กระทบค่าใช้จ่ายจำเป็น'
        });
      } else if (pricePercentOfNet > 65) {
        recommendation = 'WAIT_AND_SAVE';
        recommendationBadge = 'รอไปก่อน';
        level = 'warning';
        headline = 'พอซื้อได้ แต่เงินสำรองจะเหลือน้อย';
        explanation = `สินค้านี้กินเงินพร้อมใช้ไปถึง ${pricePercentOfNet}%`;
        tips.push({
          type: 'warning',
          title: 'ควรคิดทบทวนก่อนซื้อ',
          text: 'เงินสำรองฉุกเฉินจะเหลือน้อย อาจเกิดความเสี่ยงทางการเงิน'
        });
      } else {
        tips.push({
          type: 'safe',
          title: 'มีเงินสำรองเพียงพอ',
          text: `ราคาสินค้าคิดเป็น ${pricePercentOfSavings}% ของเงินทั้งหมด อยู่ในเกณฑ์ปลอดภัย`
        });
      }

      setResult({
        itemName: formData.itemName.trim(),
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
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setResult(null);
  };

  return (
    <>
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      <div className="app-container">
        {currentView === 'home' && (
          <LandingPage onStartPlanning={() => setCurrentView('planner')} />
        )}

        {currentView === 'about' && (
          <AboutPage
            onBackToHome={() => setCurrentView('home')}
            onStartPlanning={() => setCurrentView('planner')}
          />
        )}

        {currentView === 'planner' && (
          <div className="planner-wrapper" style={{ animation: 'fadeIn 0.3s ease' }}>
            <div className="planner-nav-header">
              <button
                type="button"
                className="btn-back"
                onClick={() => setCurrentView('home')}
              >
                ← Back to Home
              </button>
            </div>

            <div className="header-wrapper">
              <h1 className="brand-title">Purchase Readiness Planner</h1>
              <p className="brand-subtitle">
                คำนวณเงินคงเหลือ เปรียบเทียบกับงบประมาณ และวิเคราะห์ว่าควรซื้อหรือรอไปก่อน
              </p>
            </div>

            <main className="main-grid">
              <BudgetForm
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
                loading={loading}
                onSubmit={handleSubmit}
                onReset={handleReset}
              />
              <ResultCard result={result} />
            </main>
          </div>
        )}

        <footer className="app-footer">
          Finly — Think Before You Buy • ระบบช่วยวางแผนงบประมาณก่อนซื้อสินค้า
        </footer>
      </div>
    </>
  );
}
