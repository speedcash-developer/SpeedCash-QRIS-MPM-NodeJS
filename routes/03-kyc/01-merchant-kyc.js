/**
 * API Merchant kyc (Known Your Customer)
 * Service ini digunakan untuk mengupload dokumen kyc merchant
 * 
 * Referensi:
 * API Documentation: https://qris-mpm-docs.speedcash.co.id/docs/payments/qris-mpm/KYC/Merchant%20kyc
 */

const path = require('path');
const { signatureGeneration } = require('../../auth/signature');
const { generateToken, dateTime } = require('../../utils/utils');
const CONFIG = require('../../config/config');
const sender = require('../../serivce/sender')

const Path = '/merchant/upload';
const httpMethod = 'POST';
const imagePath = path.join(__dirname, '../../assets/verifikasi.png');

// Body yang akan digunakan untuk signature
const bodyForSignature = {
    merchantId: "121xxxx",
    type: "ktp",
    no_ktp: "123456789032xxxx"
};

// Generate headers
const clientId = CONFIG.CLIENT_ID;
const accessToken = CONFIG.TOKEN_B2B;
const externalId = generateToken(15);
const timeStamp = dateTime();
const channelId = CONFIG.CHANNEL_ID;

// Generate signature menggunakan body yang akan digunakan untuk signature
const signature = signatureGeneration(
    httpMethod, 
    Path, 
    accessToken, 
    JSON.stringify(bodyForSignature), 
    timeStamp
);

const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'X-PARTNER-ID': clientId,
    'X-EXTERNAL-ID': externalId,
    'X-TIMESTAMP': timeStamp,
    'X-SIGNATURE': signature,
    'CHANNEL-ID': channelId
};

(async () => {
    try {
        const response = await sender.postFormData(
            Path,
            bodyForSignature,
            [{ fieldName: 'img', path: imagePath }],
            headers
        );
        
        console.log(JSON.stringify(response, null, 2));
    } catch (error) {
        console.error('Error in KYC request:', JSON.stringify(error, null, 2));
    }
})();
