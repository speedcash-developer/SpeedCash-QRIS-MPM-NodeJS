const { DateTime } = require('luxon');
const crypto = require('crypto');

const dateTime = () => {
    const dateTime = DateTime.now().setZone('Asia/Jakarta');
    const timeStamp = dateTime.toISO();
    return timeStamp;
}

function generateToken(length) {
    const token = crypto.randomBytes(length).toString('base64')
    return token
}

module.exports = {
    dateTime,
    generateToken
}