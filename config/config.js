module.exports = {
    development: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: 'epubpress_development',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql',
        omitNull: true,
    },
    test: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: 'epubpress_test',
        host: process.env.DB_HOST || '127.0.0.1',
        dialect: 'mysql',
        omitNull: true,
    },
    production: {
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: 'epubpress_production',
        host: process.env.DB_HOST,
        dialect: 'mysql',
        omitNull: true,
    },
};
