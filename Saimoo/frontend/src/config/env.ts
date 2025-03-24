const env = {
    API_URL: process.env.API_URL ?? 'http://localhost:3000/api',
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY ?? 'YOUR_GOOGLE_MAP_API_KEY',
    QR_PHONE_NUMBER: process.env.QR_PHONE_NUMBER ?? 'YOUR_PHONE_NUMBER',
}

export default env;