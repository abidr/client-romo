const rp = require('request-promise');
const uuid = require('uuid');
const db = require('../../config/db.config');

const Gateway = db.gateways;
const Setting = db.settings;

exports.mtnPayment = async (data, user, number) => {
  try {
    const gateway = await Gateway.findOne({ where: { value: 'mtn' } });
    const appUrl = await Setting.findOne({ where: { value: 'appUrl' } });
    const reference = uuid.v4();

    const accessData = await rp({
      method: 'POST',
      uri: 'https://proxy.momoapi.mtn.com/collection/token/',
      json: true,
      auth: {
        user: gateway.apiKey,
        pass: gateway.secretKey,
      },
      headers: {
        Accept: 'application/json',
        'Ocp-Apim-Subscription-Key': gateway.ex1,
      },
    });
    await rp({
      method: 'POST',
      uri: 'https://proxy.momoapi.mtn.com/collection/v1_0/requesttopay',
      json: true,
      body: {
        amount: `${data.amount}`,
        currency: `${data.currency}`,
        externalId: `${data.id}`,
        payer: {
          partyIdType: 'MSISDN',
          partyId: number,
        },
        payerMessage: 'AWDPAY Deposit Request',
        payeeNote: 'AWDPAY Deposit Request',
      },
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessData.access_token}`,
        'Ocp-Apim-Subscription-Key': gateway.ex1,
        'X-Target-Environment': 'mtnivorycoast',
        'X-Reference-Id': reference,
        'X-Callback-Url': `${appUrl.param1}/api/payments/verifymtn`,
      },
    });
    return '/add-money?status=success';
  } catch (err) {
    return err;
  }
};
