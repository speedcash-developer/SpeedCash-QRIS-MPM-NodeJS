# SpeedCash ❤️ Node.js

Welcome to the Official Node.js API Client for the SpeedCash QRIS MPM API! 🚀

Effortlessly integrate SpeedCash’s QRIS capabilities into your Node.js projects with this library. Designed to be efficient and easy-to-use, our client library allows you to quickly set up payments and access SpeedCash's powerful features.

📂 Code Samples Included: This repository comes with sample code for each essential API endpoint, so you can jump right in and start building.

💡 Explore the Docs: Find detailed [documentation](https://qris-mpm-docs.speedcash.co.id/docs/category/qris-mpm) and examples in this repository for a seamless setup and to make the most of SpeedCash in your application.

Get started now and make cashless payments smoother and faster with SpeedCash!


## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Dependencies](#dependencies)


---

## Requirements

To run this project, ensure that your environment meets the following requirements:

- **Node.js**: Version 16.x or higher. You can download Node.js from [https://nodejs.org](https://nodejs.org).

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/speedcash-developer/SpeedCash-QRIS-MPM-NodeJS
   cd SpeedCash-QRIS-MPM-NodeJS
   ```
2. **Install dependecies**:
   ```bash
   npm install
   ```
3. **Set up environment variables**:
   ```bash
    cp env-example .env
   ```

## Configuration
The project relies on environment variables for configuration. Add the following keys to your .env file:

### env

| Code                  | Description                                          | 
| --------------------- | ---------------------------------------------------- | 
| PORT                  | Port to run the server                               | 
| CLIENT_ID             | Client Identity (get after onboarding)               | 
| CLIENT_SECRET         | Client Secret (get after onboarding)                 | 
| CHANNEL_ID            | Client Channel Id                                    | 
| TOKEN_B2B             | Token After Hit Service (/access-token/b2b)          |                             
| BASE_URL              | Snap Url (get after onboarding)                      |                                    
| YOUR_URL              | lient Service Url for simulate callback transactiond |                                    



### private Key and public Key
``` bash
cb_private_key.pem =              # Private Key using RSA (2048) For Callback Geneate Signature 
cb_public_key.pem =               # Public Key using RSA (2048) For Callback Validation Signature 
private_key.pem =                 # Private Key using RSA (2048) pksc8 For Generate Service Signature 
```

## Usage
You can run specific route files directly for testing and debugging. Here’s how to manually execute a route file with node:

### Manual Route Execution
``` bash
node routes/01-credentials/access-token.js
```
``` bash
node routes/02-registrasi/merchant-status.js 
```

## Dependencies
``` bash
crypto: For cryptographic functions.
dotenv: Manages environment variables.
express: Web framework for handling HTTP requests.
fs: File system operations.
luxon: Date and time library.
superagent: HTTP client for making requests.
```
