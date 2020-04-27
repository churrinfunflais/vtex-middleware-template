const admin = require('firebase-admin')

const firestore = admin.firestore()

exports.get = (data, context) => {
    const event = {
        function_name: 'GET-ACCOUNT-SETTINGS',
        account: context.params.account,
        entity: context.params.entity,
        event: 'firestore_read'
    }

    console.log(JSON.stringify(event))

    return firestore.collection(context.params.account)
        .doc(context.params.entity)
        .get()
        .then(doc => {
            if (doc.exists && doc.data().settings) {
                return doc.data().settings
            }
            throw new Error("No settings found")
        })
}

exports.update = (data, context) => {
    const event = {
        function_name: 'UPDATE-ACCOUNT-SETTINGS',
        account: context.params.account,
        entity: context.params.entity,
        event: 'firestore_write',
    }

    console.log(JSON.stringify(event))

    return firestore.collection(context.params.account)
        .doc(context.params.entity)
        .update({ settings: data })
        .then(data => {
            return this.get(null, context)
        })
}

exports.set = (data, context) => {
    const event = {
        function_name: 'SET-ACCOUNT-SETTINGS',
        account: context.params.account,
        entity: context.params.entity,
        event: 'firestore_write',
    }

    console.log(JSON.stringify(event))

    return firestore.collection(context.params.account)
        .doc(context.params.entity)
        .set({ settings: data })
        .then(data => {
            return this.get(null, context)
        })
}