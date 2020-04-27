const DataTransform = require('node-json-transform').DataTransform

exports.fromMap = ((transaction, context) => {
    const event = {
        function_name: 'TRANSFORM-TRANSACTION-DATA',
        account: context.params.account,
        entity: context.params.entity,
        event: 'data_transform'
    }

    console.log(JSON.stringify(event))

    return require('../maps').get(null, context)
        .then(map => {
            return DataTransform({items:[transaction]}, map).transformAsync()
        })
})