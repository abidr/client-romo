const db = require('../config/db.config');
const transporter = require('../config/mail.config');

const Setting = db.settings;
const User = db.users;

const sendMail = async (mail) => {
  const site = await Setting.findOne({ where: { value: 'site' } });
  const user = await User.findByPk(mail.user);

  const mailOptions = {
    from: {
      name: site.param1,
      address: site.param2,
    },
    to: user.email,
    subject: mail.subject,
    html: mail.message,
  };

  transporter.sendMail(mailOptions);
};

module.exports = sendMail;
