"use strict";

function parsePayload(record) {
    return JSON.parse(
        new Buffer(record.kinesis.data, "base64").toString("utf8")
    );
}

module.exports.getRecords = event => {
    return event.Records.mapp(parsePayload);
};
