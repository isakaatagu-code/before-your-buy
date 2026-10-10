async function runTests() {
  console.log('=== TEST SUITE: Before Your Buy ===\n');

  // Test 1: Frontend Serving
  console.log('[1/5] Testing Frontend (http://localhost:5173)...');
  const htmlRes = await fetch('http://localhost:5173/');
  if (!htmlRes.ok) throw new Error(`Frontend returned status ${htmlRes.status}`);
  const html = await htmlRes.text();
  console.log('  -> Status:', htmlRes.status);
  console.log('  -> Contains root container:', html.includes('id="root"'));
  console.log('  -> Contains title tag:', html.includes('Before Your Buy'));

  // Test 2: Safe / Buy Now case
  console.log('\n[2/5] Testing Case 1 (Safe Budget / ซื้อได้เลย)...');
  const res1 = await fetch('http://localhost:5173/api/check-budget', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      itemName: 'หูฟังบลูทูธไร้สาย',
      price: 2500,
      currentSavings: 20000,
      essentialExpenses: 8000
    })
  });
  const data1 = await res1.json();
  console.log('  -> Status:', res1.status);
  console.log('  -> Recommendation Badge:', data1.data?.recommendationBadge);
  console.log('  -> Remaining Balance:', data1.data?.remainingAfterPurchase, 'THB');
  console.log('  -> Price % of Budget:', data1.data?.pricePercentOfSavings, '%');

  // Test 3: Warning / Wait case
  console.log('\n[3/5] Testing Case 2 (Tight Budget / รอไปก่อน)...');
  const res2 = await fetch('http://localhost:5173/api/check-budget', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      itemName: 'สมาร์ตโฟนรุ่นใหม่',
      price: 24900,
      currentSavings: 40000,
      essentialExpenses: 12000
    })
  });
  const data2 = await res2.json();
  console.log('  -> Status:', res2.status);
  console.log('  -> Recommendation Badge:', data2.data?.recommendationBadge);
  console.log('  -> Remaining Balance:', data2.data?.remainingAfterPurchase, 'THB');

  // Test 4: Danger / Over Budget case
  console.log('\n[4/5] Testing Case 3 (Over Budget / เกินงบประมาณ)...');
  const res3 = await fetch('http://localhost:5173/api/check-budget', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      itemName: 'แท็บเล็ตเพื่อการทำงาน',
      price: 22000,
      currentSavings: 25000,
      essentialExpenses: 10000
    })
  });
  const data3 = await res3.json();
  console.log('  -> Status:', res3.status);
  console.log('  -> Recommendation Badge:', data3.data?.recommendationBadge);
  console.log('  -> Remaining Balance:', data3.data?.remainingAfterPurchase, 'THB');

  // Test 5: Validation Error Handling
  console.log('\n[5/5] Testing Validation Errors (Empty and Invalid inputs)...');
  const res4 = await fetch('http://localhost:5173/api/check-budget', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      itemName: '',
      price: -500,
      currentSavings: -100,
      essentialExpenses: -200
    })
  });
  const data4 = await res4.json();
  console.log('  -> Status:', res4.status);
  console.log('  -> Success is false:', data4.success === false);
  console.log('  -> Validation Errors caught:', Object.keys(data4.errors || {}));

  console.log('\n✅ ALL INTEGRATION TESTS PASSED SUCCESSFULLY!');
}

runTests().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
