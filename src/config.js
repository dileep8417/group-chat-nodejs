// To connect with database
exports.dbCredentials = {
    host: process.env.HOST || 'localhost',
    user: process.env.USER || 'dileep',
    password: process.env.PASSWORD || '4242',
    database: process.env.DB || 'my_chat_app',
};

// To authenticate admin
exports.adminCredentials = {
    mobile: process.env.ADMIN_MOBILE_NUMBER || '9999999999',
    password: process.env.ADMIN_PASSWORD || '123456'
};

// To use in tests
exports.testCredentials = [
    {
        userName: 'Dileep Test',
        mobile: '7013104703',
        password: 'Dileep@test'
    },
    {
        userName: 'Ben Tenison',
        mobile: '9813104788',
        password: 'Ben@test'
    }
];