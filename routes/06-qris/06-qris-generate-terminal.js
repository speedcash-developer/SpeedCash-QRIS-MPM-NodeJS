/**
 * API Qris query
 * Service ini digunakan untuk cek status pembayaran dari QRIS
 * 
 * Referensi:
 * API Documentation: https://qris-mpm-docs.speedcash.co.id/docs/payments/qris-mpm/QRIS/Qris%20Query
 */

const { signatureGeneration } = require('../../auth/signature')
const sender = require('../../serivce/sender')
const { generateToken, dateTime } = require('../../utils/utils')
const CONFIG = require('../../config/config')

const path = '/qr/qr-generate-terminal'
const httpMethod = 'POST'

// body
const body = {
    merchantId: "121xxxx",
    terminalId: "KASIR LANTAI 1",
    description: "Terminal untuk qris lantai 1"
}

// headers
const clientId = CONFIG.CLIENT_ID
const accessToken = CONFIG.TOKEN_B2B
const externalId = generateToken(15)
const timeStamp = dateTime()
const channelId = CONFIG.CHANNEL_ID
const signature = signatureGeneration(httpMethod, path, accessToken, JSON.stringify(body), timeStamp)

let headers = {}
headers['Authorization'] = 'Bearer ' + accessToken
headers['X-PARTNER-ID'] = clientId
headers['X-EXTERNAL-ID'] = externalId
headers['X-TIMESTAMP'] = timeStamp
headers['X-SIGNATURE'] = signature
headers['CHANNEL-ID'] = channelId

sender.post(path, body, headers).then(response => {
    console.log(response);
    //handle logic
});