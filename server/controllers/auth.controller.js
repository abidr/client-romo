const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const db = require('../config/db.config');
const mailer = require('../utils/mailer');

const User = db.users;
const Setting = db.settings;
const Log = db.logs;

exports.signUp = async (req, res) => {
  // Validating the form
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      params: errors.array()[0].param,
    });
  }

  // Checking if the user trying to register already exists
  if (
    await User.findOne({
      where: {
        email: req.body.email,
      },
    })
  ) {
    return res.status(400).json({
      message: 'Email Exists',
    });
  }

  // Generating a hashed password and saving user in DB
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const random = uuid.v4();

  const user = {
    name: req.body.name,
    email: req.body.email,
    reffered_by: req.body.reffered_by,
    password: hashedPassword,
    active: false,
    reset: random,
  };

  try {
    const data = await User.create(user);
    const site = await Setting.findOne({ where: { value: 'site' } });
    const appUrl = await Setting.findOne({ where: { value: 'app_url' } });

    const mailOptions = {
      user: data.id,
      subject: `Welcome to ${site.param1}`,
      message: `<h3>Welcome to ${site.param1}</h3><br/><p>Activate your account: <a href="${appUrl.param1}/activate/${random}">${appUrl.param1}/activate/${random}</a></p>`,
    };

    mailer(mailOptions);
    await Log.create({ message: `New User ${data.id} with ${data.email} signed up` });
    return res.json(data);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.activateAccount = async (req, res) => {
  if (!(req.body.code)) {
    return res.status(400).json({
      message: 'Fill Out Required Fields',
    });
  }

  const data = await User.findOne({ where: { reset: req.body.code } });

  if (!data) {
    return res.status(404).json({
      message: 'Invalid Code',
    });
  }

  try {
    await User.update(
      { active: true, reset: null },
      { where: { id: data.id } },
    );
    const refferal = await Setting.findOne({ where: { value: 'refferal' } });
    if (data.reffered_by && refferal.param2 === 'onsignup') {
      const referData = await User.findOne({ where: { id: data.reffered_by } });
      const newBalance = referData.balance_usd + parseFloat(refferal.param1, 10);
      await User.update({ balance_usd: newBalance }, { where: { id: referData.id } });
      await Log.create({ message: `User #${referData.id} rewarded ${refferal.param1} for reffering User #${data.id}` });
    }
    return res.json({ message: 'Account Activated' });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};

exports.signUpAdmin = async (req, res) => {
  // Validating the form
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      params: errors.array()[0].param,
    });
  }

  // Checking if the user trying to register already exists
  if (
    await User.findOne({
      where: {
        email: req.body.email,
      },
    })
  ) {
    return res.status(400).json({
      message: 'Email Exists',
    });
  }

  // Generating a hashed password and saving user in DB
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: 0,
    active: true,
  };

  try {
    const data = await User.create(user);
    return res.json(data);
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

exports.signIn = async (req, res) => {
  const { admin } = req.query;
  const user = await User.findOne({
    where: {
      email: req.body.email,
      role: admin ? 0 : 1,
      active: true,
    },
  });

  if (!user) {
    return res.status(404).json({
      message: 'Wrong Credentials',
    });
  }

  const matchPassword = await bcrypt.compare(req.body.password, user.password);

  if (!matchPassword) {
    return res.status(404).json({
      message: 'Wrong Credentials',
    });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET, {
    expiresIn: '30d',
  });

  res.cookie('token', token, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.SAMESITE,
    secure: parseInt(process.env.COOKIESECURE, 10) === 1,
  });

  const {
    id, name, email, phone, address, role,
  } = user;

  return res.json({
    user: {
      id,
      name,
      email,
      phone,
      address,
      role,
    },
  });
};

exports.forgotPassword = async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  const appUrl = await Setting.findOne({ where: { value: 'app_url' } });

  if (!user) {
    return res.status(404).json({
      message: 'Enter a registered email',
    });
  }

  const randomId = uuid.v4();

  if (user.reset) {
    await User.update({ reset: null }, { where: { email: req.body.email } });
  }
  await User.update({ reset: randomId }, { where: { email: req.body.email } });

  const mailOptions = {
    user: user.id,
    subject: 'Password Reset',
    html: `<p>Link to reset your password: <a href="${appUrl.param1}/reset/${randomId}">${appUrl.param1}/reset/${randomId}</a></p>`,
  };

  mailer(mailOptions);

  return res.json({
    message: 'A link to reset your password has been sent to your email',
  });
};

exports.resetInit = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      params: errors.array()[0].param,
    });
  }
  if (!(req.body.code && req.body.password)) {
    return res.status(400).json({
      message: 'Fill Out Required Fields',
    });
  }

  const data = await User.findOne({ where: { reset: req.body.code } });

  if (!data) {
    return res.status(404).json({
      message: 'Invalid Code',
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    await User.update(
      { password: hashedPassword, reset: null },
      { where: { id: data.id } },
    );
    return res.json({ message: 'Password Updated' });
  } catch (err) {
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};

exports.signOut = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: process.env.SAMESITE,
    secure: parseInt(process.env.COOKIESECURE, 10) === 1,
  });
  res.json({
    message: 'User signed out',
  });
};
