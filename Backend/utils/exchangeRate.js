const axios = require("axios");

const API_KEY = "YOUR_EXCHANGE_RATE_API_KEY"; // Replace with your API key
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const getExchangeRate = async (fromCurrency, toCurrency) => {
  try {
    const response = await axios.get(BASE_URL);
    const rates = response.data.conversion_rates;
    const exchangeRate = rates[toCurrency] / rates[fromCurrency];
    return exchangeRate;
  } catch (error) {
    console.error("Error fetching exchange rates:", error.message);
    throw new Error("Failed to fetch exchange rates");
  }
};

module.exports = { getExchangeRate };