const axios = require('axios');

exports.update = (transaction, context) => {
    const event = {
        function_name: 'UPDATE-PRICING',
        account: context.params.account,
        entity: context.params.entity,
        event: 'api_request'
    }

    console.log(JSON.stringify(event))

    return require('../settings')
        .get(null, context)
        .then(settings => {
            const AppKey = settings['X-VTEX-API-AppKey']
            const AppToken = settings['X-VTEX-API-AppToken']
            const skuId = transaction.skuId

            const options = {
                method: 'PUT',
                url: `https://api.vtex.com/${context.params.account}/pricing/prices/${skuId}`,
                data: transaction,
                headers: {
                    'X-VTEX-API-AppKey': AppKey,
                    'X-VTEX-API-AppToken': AppToken
                }
            }

            event.payload = transaction
            console.log(JSON.stringify(event))

            return axios(options)
        })
        .then(response => {
            return response.data
        })
}