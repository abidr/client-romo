const sequelizeQuery = require('sequelize-query');
const { customAlphabet, nanoid } = require('nanoid');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const rp = require('request-promise');
const db = require('../config/db.config');
const mailer = require('../utils/mailer');
const { addMinutes } = require('../utils/dates');
const { addBalance, removeBalance } = require('../utils/wallet');

const queryParser = sequelizeQuery(db);
const Merchant = db.merchants;
const User = db.users;
const Agent = db.agents;
const Setting = db.settings;
const Api = db.apis;
const ApiPayment = db.apiPayments;
const Request = db.requests;
const ApiOtp = db.apiOtps;
const Wallet = db.wallets;

exports.getAllMerchants = async (req, res) => {
  const query = await queryParser.parse(req);
  try {
    const data = await Merchant.findAll({
      ...query,
      include: ['user'],
      where: {
        ...query.where,
      },
    });
    const count = await Merchant.count({
      ...query,
      where: {
        ...query.where,
      },
    });
    return res.json({ count, data });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getMerchantById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Merchant.findByPk(id, {
      include: ['user'],
    });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.createMerchant = async (req, res) => {
  const nanoId = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
  const merId = nanoId();
  const { userId } = req.body;
  try {
    const data = await Merchant.create({ merId, ...req.body });
    await User.update({ role: 2 }, { where: { id: userId } });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateMerchant = async (req, res) => {
  const { id } = req.user;

  try {
    const updateObj = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
    };
    const num = await Merchant.update(updateObj, { where: { userId: id } });
    const ifUpdated = parseInt(num, 10);
    if (ifUpdated === 1) {
      return res.json({ message: 'Merchant Store Updated' });
    }
    return res.status(500).json({ message: 'Cannot update merchant store' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.updateMerchantAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const updateObj = {
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      status: req.body.status,
      suspend: req.body.suspend,
    };
    const num = await Merchant.update(updateObj, { where: { id } });
    const ifUpdated = parseInt(num, 10);
    if (ifUpdated === 1) {
      return res.json({ message: 'Merchant Store Updated' });
    }
    return res.status(500).json({ message: 'Cannot update merchant store' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteMerchant = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Merchant.findByPk(id);
    const num = await Merchant.destroy({ where: { id } });
    User.update({ role: 1 }, { where: { id: data.userId } });
    const ifDeleted = parseInt(num, 10);
    if (ifDeleted === 1) {
      return res.json({ message: `User Deleted with id=${id}` });
    }
    return res.status(500).json({ message: `Cannot delete User with id=${id}` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteAgent = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Agent.findByPk(id);
    const num = await Agent.destroy({ where: { id } });
    User.update({ role: 1 }, { where: { id: data.userId } });
    const ifDeleted = parseInt(num, 10);
    if (ifDeleted === 1) {
      return res.json({ message: `User Deleted with id=${id}` });
    }
    return res.status(500).json({ message: `Cannot delete User with id=${id}` });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.createAgent = async (req, res) => {
  const nanoId = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);
  const agentId = nanoId();
  const { userId } = req.body;
  try {
    const data = await Agent.create({ agentId, ...req.body });
    await User.update({ role: 3 }, { where: { id: userId } });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.confirmAgent = async (req, res) => {
  const { amount, agentId } = req.body;
  try {
    const agent = await Agent.findOne({ where: { agentId } });
    if (!agent) {
      return res.status(400).json({ message: 'Invalid Agent ID' });
    }
    const data = await Setting.findOne({ where: { value: 'adjustments' } });
    const fee = (parseFloat(data.param2, 10) / 100) * parseFloat(amount, 10);
    const total = fee + parseFloat(amount, 10);
    return res.json({ agent, fee, total: parseFloat(total, 10) });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getApi = async (req, res) => {
  const { id } = req.user;
  try {
    const data = await Api.findOne({ where: { userId: id } }, {
      include: ['user'],
    });
    if (!data) {
      return res.json({ error: true, message: 'API Not Found' });
    }
    return res.json(data);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.generateApi = async (req, res) => {
  const secretKey = nanoid();
  const publicKey = nanoid();
  const { id } = req.user;
  try {
    const existing = await Api.findOne({ where: { userId: id } });
    if (existing) {
      await Api.update({ secret: secretKey, public: publicKey }, { where: { id: existing.id } });
      return res.json({ message: 'Regeneration Successful' });
    }
    await Api.create({ secret: secretKey, public: publicKey, userId: id });
    return res.json({ message: 'Generation Successful' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.initPayment = async (req, res) => {
  const secretKey = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
  const {
    amount, currency, customIdentifier, callbackUrl, successUrl, failedUrl, logo, test,
  } = req.body;
  try {
    if (!secretKey) {
      return res.status(400).json({ success: false, message: 'No API Key headers were provided' });
    }
    const data = await Api.findOne({ where: { secret: secretKey } });
    const user = await User.findOne({ where: { id: data.userId }, include: ['merchant'] });
    const settings = await Setting.findOne({ where: { value: 'appUrl' } });
    if (!data) {
      return res.status(400).json({ success: false, message: 'Invalid API Keys Provided' });
    }
    if (!amount || !currency || !customIdentifier || !callbackUrl || !successUrl || !failedUrl) {
      return res.status(400).json({ success: false, message: 'Please provide all of the required fields' });
    }
    const nanoId = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 12);
    const trxId = nanoId();

    await ApiPayment.create({
      trxId,
      amount,
      currency,
      customIdentifier,
      callbackUrl,
      successUrl,
      failedUrl,
      logo,
      userId: data.userId,
      test,
    });

    await Request.create({
      status: 'pending', trxId, customer: `${test ? 'TEST' : 'API'} Payment #${customIdentifier}`, amount, currency, merchantId: user.merchant.id,
    });

    return res.json({ success: true, message: 'Generated Checkout Link', redirectUrl: `${settings.param1}/checkoutv2?trxId=${trxId}` });
  } catch (err) {
    return res.status(500).json({ succcess: false, message: err.message });
  }
};
exports.sendOtp = async (req, res) => {
  try {
    const testData = await ApiPayment.findOne({ where: { trxId: req.body.trxId } });
    if (testData.test) {
      return res.json({ success: true, message: 'OTP Sent' });
    }
    const user = await User.findOne({
      where: {
        email: req.body.email || null,
        active: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: 'Wrong Credentials',
      });
    }

    if (user.role === 2) {
      return res.status(403).json({
        message: 'Merchants are not allowed to pay.',
      });
    }

    const matchPassword = await bcrypt.compare(req.body.password, user.password);

    if (!matchPassword) {
      return res.status(401).json({
        message: 'Wrong Credentials',
      });
    }

    const nanoId = customAlphabet('1234567890', 6);
    const otp = nanoId();
    const date = addMinutes(new Date(), 2);

    const data = await ApiOtp.findOne({ where: { trxId: req.body.trxId } });

    if (data) {
      await ApiOtp.destroy({ where: { trxId: req.body.trxId } });
    }

    await ApiOtp.create({
      trxId: req.body.trxId, otp, expires: Math.floor(date / 1000), userId: user.id,
    });

    const mailOptions = {
      user: user.id,
      subject: 'Payment Verification OTP',
      message: `<h3>Payment Verification OTP</h3><br/>
      <p>Please use this OTP for your payment Trx ${req.body.trxId}: <strong>${otp}</strong><br/>
      <i>Note: The OTP will expire in 2 minutes.</i>
      </p>`,
    };

    mailer(mailOptions);

    return res.json({ success: true, message: 'OTP Sent' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.sendPayment = async (req, res) => {
  const { otpCode, trxId } = req.body;
  try {
    const paymentData = await ApiPayment.findOne({
      where: {
        trxId,
      },
    });
    if (paymentData.test) {
      await ApiPayment.update({
        status: 'success',
        paidBy: 'test@awdpay.com',
      }, {
        where: {
          trxId,
        },
      });
      await Request.update({
        status: 'success',
      }, {
        where: {
          trxId,
        },
      });

      const data = await ApiPayment.findByPk(paymentData.id);
      rp({
        method: 'POST',
        uri: data.callbackUrl,
        json: true,
        body: {
          status: data.status,
          trxId: data.trxId,
          amount: data.amount,
          currency: data.currency,
          customIdentifier: data.customIdentifier,
          paidBy: data.paidBy,
          timestamp: data.updatedAt,
        },
      });
      if (data.status === 'success') {
        return res.json({ success: true, redirect: data.successUrl });
      }
      return res.json({ success: false, redirect: data.failedUrl });
    }
    const currentDate = Math.floor(Date.now() / 1000);
    const otpData = await ApiOtp.findOne({
      where: {
        trxId,
        otp: otpCode,
        expires: {
          [Op.gt]: currentDate,
        },
      },
    });
    if (!otpData) {
      return res.status(401).json({
        message: 'Invalid OTP',
      });
    }
    await ApiOtp.destroy({
      where: {
        otp: otpCode,
        trxId,
      },
    });
    const user = await User.findOne({
      where: {
        id: otpData.userId,
      },
    });
    const wallet = await Wallet.findOne({
      where: {
        userId: user.id,
        currency: paymentData.currency,
      },
    });

    if (!wallet) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    if (!(wallet.balance >= paymentData.amount)) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }
    await removeBalance(paymentData.amount, paymentData.currency, user.id);
    await addBalance(paymentData.amount, paymentData.currency, paymentData.userId);
    await ApiPayment.update({
      status: 'success',
      paidBy: user.email,
    }, {
      where: {
        trxId,
      },
    });
    await Request.update({
      status: 'success',
    }, {
      where: {
        trxId,
      },
    });
    const data = await ApiPayment.findByPk(paymentData.id);
    rp({
      method: 'POST',
      uri: data.callbackUrl,
      json: true,
      body: {
        status: data.status,
        trxId: data.trxId,
        amount: data.amount,
        currency: data.currency,
        customIdentifier: data.customIdentifier,
        paidBy: data.paidBy,
        timestamp: data.updatedAt,
      },
    });
    if (data.status === 'success') {
      return res.json({ success: true, redirect: data.successUrl });
    }
    return res.json({ success: false, redirect: data.failedUrl });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const secretKey = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
  const {
    customIdentifier, trxId,
  } = req.query;
  try {
    if (!secretKey) {
      return res.status(400).json({ success: false, message: 'No API Key headers were provided' });
    }
    const data = await Api.findOne({ where: { secret: secretKey } });
    if (!data) {
      return res.status(400).json({ success: false, message: 'Invalid API Keys Provided' });
    }
    if (customIdentifier) {
      const paymentData = await ApiPayment.findOne({
        where: {
          customIdentifier,
          userId: data.userId,
        },
        attributes: { exclude: ['id', 'createdAt', 'userId', 'callbackUrl', 'successUrl', 'failedUrl', 'logo'] },
      });
      if (paymentData) {
        return res.json(paymentData);
      }
    }
    if (trxId) {
      const paymentData = await ApiPayment.findOne({
        where: {
          trxId,
          userId: data.userId,
        },
        attributes: { exclude: ['id', 'createdAt', 'userId', 'callbackUrl', 'successUrl', 'failedUrl', 'logo'] },
      });
      if (paymentData) {
        return res.json(paymentData);
      }
    }
    return res.status(404).json({ success: false, message: 'Nothing Found' });
  } catch (err) {
    return res.status(500).json({ succcess: false, message: err.message });
  }
};
exports.findPayment = async (req, res) => {
  const {
    trxId,
  } = req.query;
  try {
    if (trxId) {
      const paymentData = await ApiPayment.findOne({
        where: {
          trxId,
          status: 'pending',
        },
        attributes: { exclude: ['callbackUrl', 'successUrl', 'failedUrl'] },
      });
      if (!paymentData) {
        return res.json({ success: false, message: 'Nothing Found' });
      }
      const merchant = await Merchant.findOne({
        where: {
          userId: paymentData.userId,
        },
        attributes: { exclude: ['proof', 'suspend', 'status'] },
      });
      if (paymentData) {
        return res.json({
          success: true,
          data: { ...paymentData.dataValues, ...merchant.dataValues },
        });
      }
    }
    return res.json({ success: false, message: 'Nothing Found' });
  } catch (err) {
    return res.status(500).json({ succcess: false, message: err.message });
  }
};

exports.initDisbursement = async (req, res) => {
  const secretKey = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
  const {
    amount, currency, customerEmail, test,
  } = req.body;
  try {
    if (!secretKey) {
      return res.status(400).json({ success: false, message: 'No API Key headers were provided' });
    }
    const data = await Api.findOne({ where: { secret: secretKey } });
    const user = await User.findOne({ where: { email: customerEmail } });
    const merchant = await User.findOne({ where: { id: data.userId }, include: ['merchant'] });
    const wallet = await Wallet.findOne({ where: { currency, userId: data.userId } });
    if (!data) {
      return res.status(400).json({ success: false, message: 'Invalid API Keys Provided' });
    }
    if (!amount || !currency || !customerEmail) {
      return res.status(400).json({ success: false, message: 'Please provide all of the required fields' });
    }

    const nanoId = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 12);
    const trxId = nanoId();

    if (test) {
      await Request.create({
        status: 'success', type: 'debit', trxId, customer: customerEmail, amount, currency, merchantId: merchant.merchant.id,
      });
      return res.json({
        success: true,
        message: 'User credited with the balance',
        data: {
          trxId, amount, currency, customer: customerEmail,
        },
      });
    }

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid user email provided' });
    }
    if (!wallet || (wallet.balance < amount)) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance',
      });
    }
    removeBalance(amount, currency, data.userId);
    addBalance(amount, currency, user.id);

    await Request.create({
      status: 'success', type: 'debit', trxId, customer: customerEmail, amount, currency, merchantId: merchant.merchant.id,
    });

    return res.json({
      success: true,
      message: 'User credited with the balance',
      data: {
        trxId, amount, currency, customer: customerEmail,
      },
    });
  } catch (err) {
    return res.status(500).json({ succcess: false, message: err.message });
  }
};

exports.checkDisbursement = async (req, res) => {
  const secretKey = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
  const {
    trxId,
  } = req.query;
  try {
    if (!secretKey) {
      return res.status(400).json({ success: false, message: 'No API Key headers were provided' });
    }
    const data = await Api.findOne({ where: { secret: secretKey } });
    const merchant = await User.findOne({ where: { id: data.userId }, include: ['merchant'] });
    if (!data) {
      return res.status(400).json({ success: false, message: 'Invalid API Keys Provided' });
    }
    if (trxId) {
      const paymentData = await Request.findOne({
        where: {
          trxId,
          merchantId: merchant.merchant.id,
          type: 'debit',
        },
        attributes: { exclude: ['id', 'createdAt', 'merchantId'] },
      });
      if (paymentData) {
        return res.json(paymentData);
      }
    }
    return res.status(404).json({ success: false, message: 'Nothing Found' });
  } catch (err) {
    return res.status(500).json({ succcess: false, message: err.message });
  }
};
