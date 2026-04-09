const Record = require("../models/Record");

exports.getDashboard = async (req, res) => {
  const records = await Record.find();

  let income = 0;
  let expense = 0;
  let categoryWise = {};
  let monthly = {};

  records.forEach(r => {
    if (r.type === "income") income += r.amount;
    else expense += r.amount;

    categoryWise[r.category] =
      (categoryWise[r.category] || 0) + r.amount;

    const month = new Date(r.date).toISOString().slice(0, 7);
    monthly[month] = (monthly[month] || 0) + r.amount;
  });

  res.json({
    totalIncome: income,
    totalExpense: expense,
    balance: income - expense,
    categoryWise,
    monthlyTrends: monthly,
    recent: records.slice(-5)
  });
};