const express = require('express');
const app = express();
const port = 5000;

const data = {
  'Quarter 1 (Dec 22)': {
    revenue: 716.57,
    netIncome: 154.77,
    netProfit: 21.60,
    operatingIncome: 213.55,
  },
  'Quarter 2 (Mar 23)': {
    revenue: 607.66,
    netIncome: 180.94,
    netProfit: 29.78,
    operatingIncome: 49.95,
  },
  'Quarter 3 (Jun 23)': {
    revenue: 711.87,
    netIncome: 185.37,
    netProfit: 26.04,
    operatingIncome: 252.08,
  },
  'Quarter 4 (Sep 23)': {
    revenue: 805.33,
    netIncome: 161.00,
    netProfit: 19.99,
    operatingIncome: 219.36,
  },
};

app.get('/api/sbi/metrics', (req, res) => {
  const quarter = req.query.quarter;
  if (!quarter) {
    res.status(400).send({ error: 'Missing quarter parameter' });
    return;
  }

  const quarterData = data[quarter];
  if (!quarterData) {
    res.status(404).send({ error: 'Invalid quarter' });
    return;
  }

  res.send(quarterData);
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
