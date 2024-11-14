/**
 * API History Transaction
 * Service ini digunakan mendapatkan data dari transaksi QRIS yang telah di buat
 * 
 * Referensi:
 * API Documentation: https://qris-mpm-docs.speedcash.co.id/docs/payments/qris-mpm/Histori%20Transaksi/transkasi%20history%20list
 */

const { signatureGeneration } = require('../../auth/signature')
const sender = require('../../service/sender')
const { generateToken, dateTime } = require('../../utils/utils')
const CONFIG = require('../../config/config')

const path = '/transaction-history-list'
const httpMethod = 'POST'

// body
const body = {
    fromDateTime: "2024-03-01T00:00:00+07:00",
    toDateTime: "2024-03-31T00:00:00+07:00",
    pageSize: "10",
    pageNumber: "0",
    additionalInfo: {
        merchantId: "1212667"
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