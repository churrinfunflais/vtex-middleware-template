const admin = require('firebase-admin')

const bucket = admin.storage().bucket()

exports.csv2json = (data, context) => {
    const csv2json = require("csvtojson")
    const event = {
        function_name: 'CSV-TO-JSON',
        account: context.params.account,
        entity: context.params.entity,
        event: 'csv_to_json'
    }

    console.log(JSON.stringify(event))

    const stream = bucket.file(context.params.filePath).createReadStream()

    return csv2json({ trim: true, checkType: true, delimiter: 'auto' })
        .fromStream(stream)
        .subscribe(data => {
            return require('../transactions').set(data, context)
        }, error => {
            throw error
        }, data => {
            return data
        })
}