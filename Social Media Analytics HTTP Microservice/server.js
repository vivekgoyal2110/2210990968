const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const analyticsRoutes = require('./routes/analytics');

app.use(express.json());
app.use('/', analyticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
