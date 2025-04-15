const axios = require('axios');
require('dotenv').config();

const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${process.env.API_BASE}/${endpoint}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching:", endpoint, err.message);
    return [];
  }
};

module.exports = fetchData;
