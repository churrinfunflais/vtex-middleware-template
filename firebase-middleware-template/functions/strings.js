module.exports = {
    project_id: 'vtex-middleware-template',
    logging_name: 'vtex-middleware-template-loggs',
    event: {
        firestore_read: 'firestore_read',
        firestore_write: 'firestore_write',
        firestore_create: 'firestore_write',
        storage_finalize: 'storage_finalize',
        get_config: 'get_config',
        set_config: 'set_config',
        del_config: 'del_config',
        api_request: 'api_request',
        csv_to_json: 'csv_to_json',
        get_map: 'get_map',
        reading_file: 'reading_file',
        converting_format_csv: 'converting_format_csv',
        function_open_file: 'OPEN-FILE',
        function_csv_to_json: 'CSV-TO-JSON',
        function_set_transaction: "SET-TRANSACTION",
        function_start_transaction: 'START-TRANSACTION',
        function_transform_transaction_data: "TRANSFORM-TRANSACTION-DATA",
        function_get_map_object: 'GET-MAP-OBJECT',
        function_update_map_object: 'UPDATE-MAP-OBJECT',
        function_set_map_object: 'SET-MAP-OBJECT',
        function_update_inventory: 'UPDATE-INVENTORY',
        set_new_transaction: "set_new_transaction",
        new_transaction: "new_transaction",
        data_transform: 'data_transform',
        transform_from_data_map: 'transform_from_data_map'
    },
    error: {
        no_doc_found: 'No documents found.'
    }
}