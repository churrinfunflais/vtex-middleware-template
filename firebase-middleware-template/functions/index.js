const admin = require("firebase-admin")
admin.initializeApp({
    storageBucket: "vtex-middleware-template.appspot.com",
})

exports.api = require('./modules/api')

exports.storage = require('./modules/storage')

exports.transactions = require('./modules/transactions')