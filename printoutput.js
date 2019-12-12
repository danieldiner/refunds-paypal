

const fs = require('fs')


let PayPalresponse = [

    { "id": "26V12193BG1297235", "create_time": "2019-12-09T23:23:37Z", "update_time": "2019-12-09T23:23:37Z", "state": "completed", "amount": { "total": "20.00", "currency": "MXN" }, "refund_from_transaction_fee": { "currency": "MXN", "value": "5.56" }, "total_refunded_amount": { "currency": "MXN", "value": "20.00" }, "refund_from_received_amount": { "currency": "MXN", "value": "14.44" }, "sale_id": "73Y65324X1087961U", "links": [{ "href": "https://api.sandbox.paypal.com/v1/payments/refund/26V12193BG1297235", "rel": "self", "method": "GET" }, { "href": "https://api.sandbox.paypal.com/v1/payments/sale/73Y65324X1087961U", "rel": "sale", "method": "GET" }], "httpStatusCode": 201 },

    { "id": "8C810271JJ790551M", "create_time": "2019-12-09T23:23:37Z", "update_time": "2019-12-09T23:23:37Z", "state": "completed", "amount": { "total": "20.00", "currency": "MXN" }, "refund_from_transaction_fee": { "currency": "MXN", "value": "5.56" }, "total_refunded_amount": { "currency": "MXN", "value": "20.00" }, "refund_from_received_amount": { "currency": "MXN", "value": "14.44" }, "sale_id": "89X67405H1395882C", "links": [{ "href": "https://api.sandbox.paypal.com/v1/payments/refund/8C810271JJ790551M", "rel": "self", "method": "GET" }, { "href": "https://api.sandbox.paypal.com/v1/payments/sale/89X67405H1395882C", "rel": "sale", "method": "GET" }], "httpStatusCode": 201 },

    { "id": "6JJ23215J7415512L", "create_time": "2019-12-09T23:23:37Z", "update_time": "2019-12-09T23:23:37Z", "state": "completed", "amount": { "total": "20.00", "currency": "MXN" }, "refund_from_transaction_fee": { "currency": "MXN", "value": "0.92" }, "total_refunded_amount": { "currency": "MXN", "value": "20.00" }, "refund_from_received_amount": { "currency": "MXN", "value": "19.08" }, "sale_id": "0CJ21228S29429634", "links": [{ "href": "https://api.sandbox.paypal.com/v1/payments/refund/6JJ23215J7415512L", "rel": "self", "method": "GET" }, { "href": "https://api.sandbox.paypal.com/v1/payments/sale/0CJ21228S29429634", "rel": "sale", "method": "GET" }], "httpStatusCode": 201 }

]

const { Parser } = require('json2csv')
 
const fields = ['id', 'httpStatusCode', 'create_time',"update_time", "state" ,"amount", "sale_id" ]

 
const json2csvParser = new Parser({ fields })
const csvParsed = json2csvParser.parse(PayPalresponse)
 
console.log(csvParsed);

function parsedDataToCSV() {
    
    var stream = fs.createWriteStream("createdReply.csv", {flags:'a'})
    stream.write( csvParsed )
    stream.end()
  }

  parsedDataToCSV(csvParsed);

