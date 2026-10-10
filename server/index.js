import express from 'express';
import cors from 'cors';
import { validateBudgetInput, evaluatePurchase } from './calculations.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Before Your Buy Backend API',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Check Budget Endpoint
app.post('/api/check-budget', (req, res) => {
  try {
    const { itemName, price, currentSavings, essentialExpenses } = req.body || {};

    const validation = validateBudgetInput({
      itemName,
      price,
      currentSavings,
      essentialExpenses
    });

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'ข้อมูลที่กรอกไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง',
        errors: validation.errors
      });
    }

    const result = evaluatePurchase(validation.sanitized);

    return res.status(200).json({
      success: true,
      message: 'ประเมินงบประมาณสำเร็จ',
      data: result
    });
  } catch (error) {
    console.error('Server error in /api/check-budget:', error);
    return res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดภายในระบบ กรุณาลองใหม่อีกครั้ง'
    });
  }
});

app.listen(PORT, () => {
  console.log(`[Before Your Buy Server] Backend running on http://localhost:${PORT}`);
});
