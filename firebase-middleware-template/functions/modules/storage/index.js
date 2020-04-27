const functions = require('firebase-functions')

exports.file = functions.storage.object('{account}/{entity}').onFinalize((object) => {
    const path = require('path')
    const filePathSegments = path.dirname(object.name).split(path.sep)

    const context = { params: { account: filePathSegments[0], entity: filePathSegments[1], filePath: object.name } }
    const event = {
        function_name: 'OPEN-FILE',
        account: context.params.account,
        entity: context.params.entity,
        event: 'storage_finalize'
    }

    console.log(JSON.stringify(event))

    const contentType = object.contentType

    return require('./csv').csv2json(null, context)
        .then(data => {
            return data
        })
        .catch(error => {
            event.error = error.message
            console.error(JSON.stringify(event))
            return error
        })
})