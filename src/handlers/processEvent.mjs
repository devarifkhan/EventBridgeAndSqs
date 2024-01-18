export const handler = async (event) => {


    console.info('received:', event);
    let records = event.Records;
    let batchItemFailures = [];
    if (records.length) {
        for (const record of records) {
            try {
                const parseBody = JSON.parse(record.body);
                console.log("Processing vehicle details" + parseBody.vehicleNo)
                console.log("Processing is successful" + record.messageId)
            } catch (err) {
                batchItemFailures.push({
                    id: record.messageId,
                    senderFault: false,
                    errorCode: 'InvalidMessageContents',
                    errorMessage: err.message
                });
            }

        }
    }

    return {batchItemFailures:batchItemFailures}

}