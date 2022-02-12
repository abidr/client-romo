const rp = require('request-promise');
const db = require('../../config/db.config');

const Setting = db.settings;

exports.omPayment = async (data, user, serviceCode) => {
  try {
    const apiUrl = await Setting.findOne({ where: { value: 'apiUrl' } });

    const apiData = await rp({
      method: 'PUT',
      uri: 'https://api.gutouch.com/dist/api/touchpayapi/v1/CIAWD7329/transaction?loginAgent=0545052501&passwordAgent=rltroCrazUCE6os',
      json: true,
      body: {
        idFromClient: `${data.id}`,
        additionnalInfos: {
          recipientEmail: user.email,
          recipientFirstName: user.name,
          recipientLastName: user.name,
          destinataire: '345345345',
        },
        amount: data.amount,
        callback: `${apiUrl.param1}/payments/touchpay`,
        recipientNumber: '345345345',
        serviceCode,
      },
      headers: { Accept: 'application/json' },
      auth: {
        user: '5982E66F7D0B8AA040B60A54CFB7DFD0F4F100A33495E9CCABCD69966D789147',
        pass: '00E55D608877226268B7EA50C8842CEA4FC1E027FCD954B9D8766BDBBFC41243',
        sendImmediately: false,
      },
    });
    return apiData.payment_url;
  } catch (err) {
    return err;
  }
};
