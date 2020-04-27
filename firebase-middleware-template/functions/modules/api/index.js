const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const app = express()

// Allow cross-origin requests from VTEX
app.use(cors({ origin: [/myvtex\.com$/, /vtexcommercestable\.com\.br$/] }))

// GET Account Settings
app.get('/:account/:entity', (req, res) => {
    const event = {
        function_name: 'GET-ACCOUNT-SETTINGS-API',
        account: req.params.account,
        entity: req.params.entity,
        event: 'api_request'
    }

    const data = req.body
    const context = { params: req.params }

    console.log(JSON.stringify(event))

    return require('../settings')
        .get(null, context)
        .then(data => {
            return res.status(200).send(data)
        })
        .catch(error => {
            event.error = error.message
            console.error(JSON.stringify(event))
            return res.status(404).send(error.message)
        })
})

// UPDATE Account Settings
app.post('/:account/:entity', (req, res) => {
    const event = {
        function_name: 'UPDATE-ACCOUNT-SETTINGS-API',
        account: req.params.account,
        entity: req.params.entity,
        event: 'api_request'
    }

    const data = req.body
    const context = { params: req.params }

    console.log(JSON.stringify(event))

    return require('../settings')
        .update(data, context)
        .then(data => {
            return res.status(200).send(data)
        })
        .catch(error => {
            event.error = error.message
            console.error(JSON.stringify(event))
            return res.status(404).send(error.message)
        })
})

// GET entity Map
app.get('/:account/:entity/map', (req, res) => {
    const event = {
        function_name: 'GET-MAP-OBJECT-API',
        account: req.params.account,
        entity: req.params.entity,
        event: 'api_request'
    }

    const data = req.body
    const context = { params: req.params }

    console.log(JSON.stringify(event))

    return require('../maps')
        .get(null, context)
        .then(data => {
            return res.status(200).send(data)
        })
        .catch(error => {
            event.error = error.message
            console.error(JSON.stringify(event))
            return res.status(404).send(error.message)
        })
})

// UPDATE entity Map
app.post('/:account/:entity/map', (req, res) => {
    const event = {
        function_name: 'UPDATE-MAP-OBJECT-API',
        account: req.params.account,
        entity: req.params.entity,
        event: 'api_request'
    }

    const data = req.body
    const context = { params: req.params }

    console.log(JSON.stringify(event))

    return require('../maps')
        .update(data, context)
        .then(data => {
            return res.status(200).send(data)
        })
        .catch(error => {
            event.error = error.message
            console.error(JSON.stringify(event))
            return res.status(404).send(error.message)
        })
})

// Expose Express API as a single Cloud Function:
exports.settings = functions.https.onRequest(app)