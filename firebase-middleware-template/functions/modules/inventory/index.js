const axios = require('axios');

exports.update = (transaction, context) => {
    const event = {
        function_name: 'UPDATE-INVENTORY',
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
            const warehouseId = transaction.warehouseId

            const options = {
                method: 'PUT',
                url: `https://logistics.vtexcommercestable.com.br/api/logistics/pvt/inventory/skus/${skuId}/warehouses/${warehouseId}?an=${context.params.account}`,
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