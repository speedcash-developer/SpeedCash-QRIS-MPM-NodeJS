
/**
 * API Send QR Notify
 * Service ini digunakan untuk menerima callback dari SpeedCash
 * 
 * Referensi:
 * API Documentation: https://qris-mpm-docs.speedcash.co.id/docs/payments/qris-mpm/QRIS/Qris%20Notify
 */

const express = require('express');
const { signatureRsaGeneration, signatureRsaValidation } = require('../../auth/signature');
const { dateTime, generateToken } = require('../../utils/utils');
const { CLIENT_ID } = require('../../config/config');
const sender = require('../../service/sender');

const app = express();
app.use(express.json());

// Receiver endpoint
app.post('/v1.0/qr/qr-mpm-notify', (req, res) => {
    const method = req.method;
    const url = req.originalUrl;
    const body = req.body;
    const timestamp = req.headers['x-timestamp'];
    const signature = req.headers['x-signature'];

    const isValid = signatureRsaValidation(method, url, body, timestamp, signature);

    if (isValid) {
        console.log({
            responseCode: "2005200",
            responseMessage: "success"
        });
        res.json({
            responseCode: "2005200",
            responseMessage: "success",
        });
    } else {
        console.error('Invalid signature.');
        res.status(400).json({ status: 'invalid signature', signature });
    }
});

// Sender
const send = async () => {
    const body = {
        "originalReferenceNo": "4124213214",
        "originalPartnerReferenceNo": "21421412321",
        "latestTransactionStatus": "00",
        "amount": {
            "value": "15000.00",
            "currency": "IDR"
        },
        "additionalInfo": {
            "nmid": "3214123213",
            "terminalId": "A01",
            "qrisId": "10099768",
            "issuerReff": "214123123",
            "buyyerReff": "Ainul nosidi",
            "brandName": "GOPAY",
            "transactionDate": "2024-10-31T11:00:32+07:00",
            "rrn": "000005301527",
            "feeAmount": "2000.00",
            "mdr": "107.8000000000",
            "feeAdmin": "0",
            "typeQr": "dynamic",
            "description": "Pembayaran makan siang",
            "merchantId": "1241231232",
            "issuerId": "93600815",
            "acquirerId": "93600815"
        }
    };

    const HTTPMethod = 'POST';
    const EndpointUrl = '/v1.0/qr/qr-mpm-notify';
    const Timestamp = dateTime(); 
    const ExternalId = generateToken(16);
    const signature = signatureRsaGeneration(HTTPMethod, EndpointUrl, body, Timestamp);

    const headers = {
        'Content-Type': 'application/json',
        'X-TIMESTAMP': Timestamp,
        'X-PARTNER-ID': CLIENT_ID,
        'X-EXTERNAL-ID': ExternalId,
        'X-SIGNATURE': signature,
    };

    try {
        const response = await sender.postCallback(EndpointUrl, body, headers);
        console.log('sent successfully:', response,headers,body);
    } catch (error) {
        console.error('Error sending:', error);
    }
};


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    setTimeout(send, 1000);
});