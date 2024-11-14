/**
 * API Qris Generate
 * Service ini digunakan untuk membuat QRIS dengan metode Merchant Presented Mode (MPM). Response berupa URL Image QRIS dan QR Content
 * 
 * Referensi:
 * API Documentation: https://qris-mpm-docs.speedcash.co.id/docs/payments/qris-mpm/QRIS/Qris%20Generate
 */

const { signatureGeneration } = require('../../auth/signature')
const sender = require('../../serivce/sender')
const { generateToken, dateTime } = require('../../utils/utils')
const CONFIG = require('../../config/config')

const path = '/qr/qr-mpm-generate'
const httpMethod = 'POST'

// body
const body = {
    terminalId: "A01",
    amount: {
        value: "9000.00",
        currency: "IDR"
    },
    feeAmount: {
        value: "1000.00",
        currency: "IDR"
    },
    merchantId: "xxxx",
    validityPeriod: "2024-10-21T09:49:25+07:00",
    additionalInfo: {
        feeType: "1",
    }
};

// headers
const clientId = CONFIG.CLIENT_ID
const accessToken = CONFIG.TOKEN_B2B
const externalId = generateToken(15)
const timeStamp = dateTime()
const channelId = CONFIG.CHANNEL_ID
const signature = signatureGeneration(httpMethod, path, accessToken, JSON.stringify(body), timeStamp)


let headers = {}

headers['Authorization'] = 'Bearer ' + accessToken;
headers['X-PARTNER-ID'] = clientId
headers['X-EXTERNAL-ID'] = externalId
headers['X-TIMESTAMP'] = timeStamp
headers['X-SIGNATURE'] = signature
headers['CHANNEL-ID'] = channelId

sender.post(path, body, headers).then(response => {
    console.log(response);
    //handle logic
});