/**
 * API Qris Generate List
 * Service ini digunakan untuk mendaptkan data dari list QRIS yang pernah di buat oleh merchant
 * 
 * Referensi:
 * API Documentation: https://qris-mpm-docs.speedcash.co.id/docs/payments/qris-mpm/QRIS/Qris%20List
 */

const { signatureGeneration } = require('../../auth/signature')
const sender = require('../../serivce/sender')
const { generateToken, dateTime } = require('../../utils/utils')
const CONFIG = require('../../config/config')

const path = '/qr/qr-mpm-generate-list'
const httpMethod = 'POST'

// body
const body = {
    dateGenerate: "2024-10-18T14:49:25+07:00",
    additionalInfo: {
        merchantId: "121xxxx"
    }
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