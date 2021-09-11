/* eslint-disable camelcase */
const sequelizeQuery = require('sequelize-query');
const rp = require('request-promise');
const cron = require('node-cron');
const db = require('../config/db.config');

const queryParser = sequelizeQuery(db);
const Currency = db.currencies;
const Log = db.logs;

exports.getAllCurrencies = async (req, res) => {
  const query = await queryParser.parse(req);
  try {
    const data = await Currency.findAll({
      ...query,
    });
    const count = await Currency.count({
      ...query,
    });
    return res.json({ count, data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getCurrencyById = async (req, res) => {
  const { id } = req.params;
  const query = await queryParser.parse(req);
  try {
    const data = await Currency.findByPk(id, {
      ...query,
    });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const currencyRatesFetcher = async () => {
  const data = await Currency.findAll();
  const filteredData = data.filter((coin) => coin.rate_from_api);
  const apiData = await rp({
    uri: 'https://api.coingecko.com/api/v3/coins',
    json: true,
    gzip: true,
  });
  filteredData.forEach(async (coin) => {
    const updatedRate = apiData.find((rate) => rate.symbol === coin.symbol.toLowerCase());
    if (updatedRate) {
      await Currency.update({
        // eslint-disable-next-line max-len
        rate_usd_prev: (coin.rate_usd === updatedRate.market_data.current_price.usd) ? coin.rate_usd_prev : coin.rate_usd,
        rate_usd: updatedRate.market_data.current_price.usd,
        metadata: JSON.stringify(updatedRate),
      }, { where: { id: coin.id } });
    }
  });
};

cron.schedule('0 */1 * * *', async () => {
  await currencyRatesFetcher();
});

exports.fetchCurrencyRates = async (req, res) => {
  try {
    await currencyRatesFetcher();
    await Log.create({ message: `Admin #${req.user.id} fetched currency rates` });
    return res.json({ message: 'Rates Updated' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createCurrency = async (req, res) => {
  try {
    const {
      name, symbol, icon, rate_usd, active, wallet_id, rate_from_api, custom,
    } = req.body;
    const data = await Currency.create({
      name, symbol, icon, rate_usd, active, wallet_id, rate_from_api, custom,
    });
    await Log.create({ message: `Admin #${req.user.id} created currency #${data.id}` });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateCurrency = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Currency.findByPk(id);
    const prevRate = data.rate_usd;

    const {
      name, symbol, icon, rate_usd, active, wallet_id, rate_from_api, custom,
    } = req.body;

    const num = await Currency.update({
      // eslint-disable-next-line max-len
      name, symbol, icon, rate_usd, active, wallet_id, rate_usd_prev: prevRate, rate_from_api, custom,
    }, { where: { id } });
    const ifUpdated = parseInt(num, 10);
    if (ifUpdated === 1) {
      await Log.create({ message: `Admin ${req.user.id} updated currency #${id}` });
      return res.json({ message: 'Currency Updated' });
    }
    return res.status(500).json({ message: 'Cannot update currency' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteCurrency = async (req, res) => {
  const { id } = req.params;

  try {
    const num = await Currency.destroy({ where: { id } });
    const ifDeleted = parseInt(num, 10);
    if (ifDeleted === 1) {
      await Log.create({ message: `Admin ${req.user.id} deleted currency #${id}` });
      return res.json({ message: 'Currency Deleted' });
    }
    return res.status(500).json({ message: 'Cannot delete Currency' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
