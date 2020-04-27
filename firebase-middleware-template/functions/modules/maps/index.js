const admin = require('firebase-admin')

const firestore = admin.firestore()

exports.get = (data, context) => {
    const event = {
        function_name: 'GET-MAP-OBJECT',
        account: context.params.account,
        entity: context.params.entity,
        event: 'firestore_read'
    }

    console.log(JSON.stringify(event))

    return firestore.collection(context.params.account)
        .doc(context.params.entity)
        .get()
        .then(doc => {
            if (doc.exists && doc.data().map) {
                let map = doc.data().map
                map.list= 'items'

                //TODO: implement operations array

                return map
            }
            throw new Error("No map found")
        })
}

exports.update = (data, context) => {
    const event = {
        function_name: 'UPDATE-MAP-OBJECT',
        account: context.params.account,
        entity: context.params.entity,
        event: 'firestore_write',
    }

    console.log(JSON.stringify(event))

    return firestore.collection(context.params.account)
        .doc(context.params.entity)
        .update({ map: data })
        .then(data => {
            return this.get(null, context)
        })
}

exports.set = (data, context) => {
    const event = {
        function_name: 'SET-MAP-OBJECT',
        account: context.params.account,
        entity: context.params.entity,
        event: 'firestore_write',
    }

    console.log(JSON.stringify(event))

    return firestore.collection(context.params.account)
        .doc(context.params.entity)
        .update({ map: data })
        .then(data => {
            return this.get(null, context)
        })
}