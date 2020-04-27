const functions = require('firebase-functions')
const admin = require('firebase-admin')

const firestore = admin.firestore()

exports.start = functions.firestore.document('{account}/{entity}/transactions/{transaction}').onCreate((snap, context) => {
    const event = {
        function_name: 'START-TRANSACTION',
        account: context.params.account,
        entity: context.params.entity,
        event: 'firestore_create'
    }

    const transaction = snap.data()

    console.log(JSON.stringify(event))

    return require('../transform')
        .fromMap(transaction, context)
        .then(transaction => {
            return require(`../${event.entity}`)
                .update(transaction[0], context)
        })
        .catch(error => {
            event.error = error.message
            console.error(JSON.stringify(event))
            return error
        })
})

exports.set = (data, context) => {
    const event = {
        function_name: 'SET-TRANSACTION',
        account: context.params.account,
        entity: context.params.entity,
        event: 'firestore_write'
    }

    console.log(JSON.stringify(event))

    const ref = firestore.collection(context.params.account)
        .doc(context.params.entity)
        .collection('transactions')
        .doc()

    return ref.set(data)
        .then(data => {
            return data
        })
}