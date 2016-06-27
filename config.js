'use strict'
let express = require('express')
let promise = require('bluebird');
let options = {
    // Initialization Options
    promiseLib: promise
};
let pgp = require('pg-promise')(options);
let connectionString = {
    host: 'kiwaidae.xyz',
    port: 5432,
    database: 'partyband',
    user: 'postgres',
    password: 'julioorellana'
};
let db = pgp(connectionString);

module.exports = db;
