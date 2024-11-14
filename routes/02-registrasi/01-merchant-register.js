/**
 * API Merchant Register
 * Berfungsi Service ini digunakan untuk melakukan proses registrasi merchant 
 * 
 * Referensi:
 * API Documentation: https://qris-mpm-docs.speedcash.co.id/docs/payments/qris-mpm/Registrasi/Merchant%20Register
 */

const { signatureGeneration } = require('../../auth/signature')
const sender = require('../../serivce/sender')
const { generateToken, dateTime } = require('../../utils/utils')
const CONFIG = require('../../config/config')

const path = '/merchant/registration'
const httpMethod = 'POST'

// body
const body = {
    nama_pemilik: "ada freya",
    nama_outlet: "freya store",
    notelp_pemilik: "62812002xxxx",
    notelp_outlet: "62812002xxxx",
    email_pemilik: "freya@gmail.com",
    email_outlet: "freya@gmail.com",
    nik: "125429191165xxxx",
    kewarganegaraan: "ID",
    id_provinsi_pemilik: "28",
    id_kota_pemilik: "253",
    id_kecamatan_pemilik: "2487",
    id_kelurahan_pemilik: "31014",
    kode_pos_pemilik: "09645",
    alamat_pemilik: "Jl. Mayjend Prof. Dr. Moestopo No. 6, Surabaya, Jawa Timur",
    id_provinsi_outlet: "28",
    id_kota_outlet: "253",
    id_kecamatan_outlet: "2487",
    id_kelurahan_outlet: "31014",
    alamat_outlet: "Jl. Prof. Moh. Hasan Simpang Surabaya",
    kode_pos_outlet: "11170",
    type_merchant: "0",
    kriteria: "UKE",
    mcc: "5812",
    npwp: "0",
    is_onlineshop: 0
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
