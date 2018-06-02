'use strict';

/**
 * Load Module dependencies.
 */
const env = process.env;

module.exports = {
  development: `postgres://${env.POSTGRES_DB_USER}:${env.POSTGRES_DB_PASSWORD}@${env.POSTGRES_DB_HOST}`,
  test: `postgres://${env.POSTGRES_DB_USER}:${env.POSTGRES_DB_PASSWORD}@${env.POSTGRES_DB_HOST}`,
  production: `postgres://${env.POSTGRES_DB_USER}:${env.POSTGRES_DB_PASSWORD}@${env.POSTGRES_DB_HOST}`
};