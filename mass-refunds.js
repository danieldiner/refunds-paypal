//Mass Refunds for PayPal API 
//
//Dependencies --
//npm install fast-csv
//npm install paypal-rest-sdk
//npm intall json2csv


//Set Environment to production when needed
const env = process.env.NODE_ENV || 'development'
const config = require('./config')[env];
const { Parser } = require('json2csv')


const fs = require('fs')
const csv = require('fast-csv')
const https = require('https')
var paypal = require('paypal-rest-sdk')
const ws = fs.createWriteStream("out.csv");
const output = []





paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': `${config.Client_ID}`,
    'client_secret': `${config.Secret}`
})




//Read transactions from the csv
fs.createReadStream('transactions.csv')
    .pipe(csv.parse({ headers: true }))
    .on('data', row => {

        if (row.transaction_id.length == 17) {

            //PayPal refund Call 
            console.log('Here goes the PayPal Call')

            var data = {
                "amount": {
                    "currency": "MXN"
                    // "total": "20"
                }
            },

                saleId = `${row.transaction_id}`

            paypal.sale.refund(saleId, data, function (error, refund) {
                if (error) {
                    console.log('Format error:::', error)
                    throw error;
                } else {
                    //Response from the refund
                    console.log("Refund Sale Response")
                    console.log(JSON.stringify(refund))
                    output.push(JSON.stringify(refund))
                }
            })
        }
        else 
        output.push({"Invalid": row.transaction_id})

    })

    console.log(output)


    const fields = ['id', 'httpStatusCode', 'create_time',"update_time", "state" ,"amount", "sale_id" ]

    const json2csvParser = new Parser({ fields })
    const csvParsed = json2csvParser.parse(output)
     
    console.log(csvParsed)

    function parsedDataToCSV(csvFormatedData) {
    
        var stream = fs.createWriteStream("output.csv", {flags:'a'})
        stream.write( csvFormatedData )
        stream.end()
      }
    
      parsedDataToCSV(csvParsed)