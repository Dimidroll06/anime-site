module.exports = {
    port: process.env.PORT || 8000,
    cookieSecret: process.env.COOKIE_SECRET || 'secret',
    accessSecret: process.env.ACCESS_SECRET || 'secret',
    refreshSecret: process.env.REFRESH_SECRET || 'secret',
}