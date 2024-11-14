/**
 * API List MCC
 * Service ini digunakan untuk melihat list kode dari Merchant Category Code
 * 
 * Referensi:
 * API Documentation: https://qris-mpm-docs.speedcash.co.id/docs/payments/qris-mpm/List/List%20MCC
 */

const { signatureGeneration } = require('../../auth/signature')
const sender = require('../../serivce/sender')
const { generateToken, dateTime } = require('../../utils/utils')
const CONFIG = require('../../config/config')

const path = '/list/mcc'
const httpMethod = 'GET'


// headers
const clientId = CONFIG.CLIENT_ID
const accessToken = CONFIG.TOKEN_B2B
const externalId = generateToken(15)
const timeStamp = dateTime()
const channelId = CONFIG.CHANNEL_ID
const signature = signatureGeneration(httpMethod, path, accessToken, JSON.stringify(''), timeStamp)


let headers = {}

headers['Authorization'] = 'Bearer ' + accessToken;
headers['X-PARTNER-ID'] = clientId
headers['X-EXTERNAL-ID'] = externalId
headers['X-TIMESTAMP'] = timeStamp
headers['X-SIGNATURE'] = signature
headers['CHANNEL-ID'] = channelId

sender.get(path, headers).then(response => {
    console.log(response);
    //handle logic
});