"use strict";

function parsePayload(record) {
    return JSON.parse(
        Buffer.from(record.kinesis.data, "base64").toString("utf8")
    );
}

module.exports.getRecords = event => {
    return event.Records.map(parsePayload);
};
