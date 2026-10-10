/**
 * calculations.js
 * Business logic and financial evaluation rules for Before Your Buy
 */

export function validateBudgetInput({ itemName, price, currentSavings, essentialExpenses }) {
  const errors = {};

  if (!itemName || typeof itemName !== 'string' || itemName.trim() === '') {
    errors.itemName = 'กรุณาระบุชื่อสินค้าที่ต้องการซื้อ';
  }

  const numPrice = Number(price);
  if (price === undefined || price === null || price === '' || isNaN(numPrice)) {
    errors.price = 'กรุณาระบุราคาสินค้าเป็นตัวเลข';
  } else if (numPrice <= 0) {
    errors.price = 'ราคาสินค้าต้องมากกว่า 0 บาท';
  }

  const numSavings = Number(currentSavings);
  if (currentSavings === undefined || currentSavings === null || currentSavings === '' || isNaN(numSavings)) {
    errors.currentSavings = 'กรุณาระบุจำนวนเงิน/งบที่มีเป็นตัวเลข';
  } else if (numSavings < 0) {
    errors.currentSavings = 'จำนวนเงินที่มีต้องไม่ติดลบ';
  }

  const numExpenses = Number(essentialExpenses);
  if (essentialExpenses === undefined || essentialExpenses === null || essentialExpenses === '' || isNaN(numExpenses)) {
    errors.essentialExpenses = 'กรุณาระบุค่าใช้จ่ายจำเป็นเป็นตัวเลข (หากไม่มีให้ใส่ 0)';
  } else if (numExpenses < 0) {
    errors.essentialExpenses = 'ค่าใช้จ่ายจำเป็นต้องไม่ติดลบ';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized: {
      itemName: itemName ? itemName.trim() : '',
      price: numPrice,
      currentSavings: numSavings,
      essentialExpenses: numExpenses
    }
  };
}

export function evaluatePurchase({ itemName, price, currentSavings, essentialExpenses }) {
  // เงินพร้อมใช้ก่อนซื้อ (เงินที่มี - ค่าใช้จ่ายจำเป็น)
  const netSavings = currentSavings - essentialExpenses;

  // เงินคงเหลือสุทธิหลังซื้อสินค้า
  const remainingAfterPurchase = netSavings - price;

  // สัดส่วนราคาสินค้าเทียบกับเงินเก็บทั้งหมด (%)
  const pricePercentOfSavings = currentSavings > 0
    ? Math.round((price / currentSavings) * 1000) / 10
    : 0;

  // สัดส่วนราคาสินค้าเทียบกับเงินพร้อมใช้ (%)
  const pricePercentOfNet = netSavings > 0
    ? Math.round((price / netSavings) * 1000) / 10
    : 100;

  // สัดส่วนเงินคงเหลือหลังซื้อเทียบกับเงินพร้อมใช้ (%)
  const remainingPercentOfNet = netSavings > 0
    ? Math.round((remainingAfterPurchase / netSavings) * 1000) / 10
    : 0;

  let recommendation = 'BUY_NOW'; // 'BUY_NOW' | 'WAIT_AND_SAVE' | 'DO_NOT_BUY'
  let recommendationBadge = 'ซื้อได้เลย';
  let level = 'safe'; // 'safe' | 'warning' | 'danger'
  let headline = 'งบประมาณพร้อม สามารถซื้อได้ทันที';
  let explanation = '';
  const tips = [];

  if (netSavings < 0) {
    // กรณีเงินไม่พอแม้กระทั่งค่าใช้จ่ายจำเป็น
    recommendation = 'DO_NOT_BUY';
    recommendationBadge = 'ไม่ควรซื้อ';
    level = 'danger';
    headline = 'ขาดสภาพคล่อง ค่าใช้จ่ายจำเป็นเกินเงินที่มี';
    const deficit = Math.abs(netSavings);
    explanation = `เงินที่คุณมี (${formatNumber(currentSavings)} บาท) ไม่พอกับค่าใช้จ่ายจำเป็น (${formatNumber(essentialExpenses)} บาท) ขาดอีก ${formatNumber(deficit)} บาท`;
    tips.push({
      type: 'danger',
      title: 'เคลียร์ค่าใช้จ่ายจำเป็นก่อน',
      text: 'ชำระค่าที่พัก น้ำไฟ หนี้สิน หรือค่าครองชีพจำเป็นก่อนใช้เงินกับสินค้าฟุ่มเฟือย'
    });
    tips.push({
      type: 'warning',
      title: 'ชะลอการซื้อทันที',
      text: `การซื้อ "${itemName}" ราคา ${formatNumber(price)} บาท จะทำให้คุณขาดเงินรวมถึง ${formatNumber(Math.abs(remainingAfterPurchase))} บาท`
    });
  } else if (remainingAfterPurchase < 0) {
    // กรณีเงินไม่พอซื้อสินค้า
    recommendation = 'DO_NOT_BUY';
    recommendationBadge = 'เกินงบประมาณ';
    level = 'danger';
    headline = 'งบประมาณไม่พอซื้อสินค้าชิ้นนี้';
    const shortfall = Math.abs(remainingAfterPurchase);
    explanation = `หลังหักค่าใช้จ่ายจำเป็น คุณเหลือเงิน ${formatNumber(netSavings)} บาท ซึ่งยังขาดอีก ${formatNumber(shortfall)} บาท ถึงจะพอซื้อ "${itemName}"`;
    tips.push({
      type: 'danger',
      title: `ขาดเงินอีก ${formatNumber(shortfall)} บาท`,
      text: `แนะนำให้เก็บเงินเพิ่มอย่างน้อย ${formatNumber(shortfall)} บาทก่อนซื้อ เพื่อไม่ให้กระทบค่าใช้จ่ายจำเป็น`
    });
    tips.push({
      type: 'info',
      title: 'เป้าหมายการออม',
      text: `หากเก็บเงินเพิ่มเดือนละ ${formatNumber(Math.ceil(shortfall / 2))} บาท จะสามารถซื้อได้ในอีก 2 เดือน`
    });
  } else if (pricePercentOfNet > 65 || remainingAfterPurchase < (netSavings * 0.3)) {
    // กรณีซื้อได้แต่ตึงมือมาก
    recommendation = 'WAIT_AND_SAVE';
    recommendationBadge = 'รอไปก่อน';
    level = 'warning';
    headline = 'พอซื้อได้ แต่เงินสำรองจะเหลือน้อยมาก';
    explanation = `การซื้อ "${itemName}" จะกินเงินพร้อมใช้ไปถึง ${pricePercentOfNet}% ทำให้เหลือเงินสำรองเพียง ${formatNumber(remainingAfterPurchase)} บาท (${remainingPercentOfNet}%)`;
    tips.push({
      type: 'warning',
      title: 'เงินสำรองฉุกเฉินมีความเสี่ยง',
      text: 'หากเกิดเหตุการณ์ไม่คาดคิดหลังซื้อ คุณอาจไม่มีเงินสดสำรองเพียงพอรับมือ'
    });
    tips.push({
      type: 'info',
      title: 'ใช้กฎรอ 48 ชั่วโมง (48-Hour Rule)',
      text: 'ลองรออีก 2-3 วันก่อนตัดสินใจซื้อ เพื่อดูว่ายังมีความต้องการสินค้านี้อยู่อย่างแท้จริงหรือไม่'
    });
  } else {
    // ปลอดภัย ซื้อได้เลย
    recommendation = 'BUY_NOW';
    recommendationBadge = 'ซื้อได้เลย';
    level = 'safe';
    headline = 'การเงินมั่นคง อยู่ในงบประมาณที่ปลอดภัย';
    explanation = `หลังซื้อ "${itemName}" คุณจะยังคงมีเงินคงเหลือ ${formatNumber(remainingAfterPurchase)} บาท (คิดเป็น ${remainingPercentOfNet}% ของเงินพร้อมใช้)`;
    tips.push({
      type: 'safe',
      title: 'มีเงินสำรองเพียงพอ',
      text: `ราคาสินค้านี้คิดเป็น ${pricePercentOfSavings}% ของเงินทั้งหมด ถือว่าอยู่ในเกณฑ์ที่ปลอดภัยต่อสุขภาพทางการเงิน`
    });
    tips.push({
      type: 'info',
      title: 'เช็คส่วนลดเพิ่มเติม',
      text: 'อย่าลืมเปรียบเทียบราคา ใช้โค้ดส่วนลด หรือสิทธิประโยชน์จากบัตรเงินฝากเพื่อความคุ้มค่ายิ่งขึ้น'
    });
  }

  return {
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
    tips,
    calculatedAt: new Date().toISOString()
  };
}

function formatNumber(val) {
  return new Intl.NumberFormat('th-TH').format(val);
}
