var env = require('env2')('.env');
var api_key = process.env.TEST_MAILGUN_KEY
var domain = process.env.TEST_DOMAIN
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
var emailTemplates = require('./email-templates.js');


var SendMail = function(payload, emailType, callback) {
  var recieptDetails = payload
  if (emailType === "piccniccReciept") {
    var piccniccReciept = emailTemplates.formatPiccniccReciept(recieptDetails)
    var data = {
      from: 'Excited User <postmaster@' + domain + '>',
      to: 'kat_pas@hotmail.co.uk', //this needs to be Jonny's email
      subject: recieptDetails.firstName + ', order #' + recieptDetails.orderNumber,
      html: piccniccReciept
    };
    mailgun.messages().send(data, function (error, body) {
      callback(error)
    });
  } else if (emailType === "userReciept") {
    var userReciept = emailTemplates.formatUserReciept(recieptDetails)
    var data = {
      from: 'Excited User <postmaster@' + domain + '>',
      to: recieptDetails.email,
      subject: recieptDetails.firstName + ', your Piccnicc Order and Receipt',
      html: userReciept
    };
    mailgun.messages().send(data, function (error, body) {
      callback()
    })
  } else if (emailType === "piccniccProccessedPayment") {
    var piccniccProccessedPayment = emailTemplates.formatPiccniccProcessedPayment(recieptDetails)
    var data = {
      from: 'Excited User <postmaster@' + domain + '>',
      to: 'kat_pas@hotmail.co.uk', //this needs to be Jonny's email
      subject: recieptDetails.firstName + ', payment complete for order #' + recieptDetails.orderNumber,
      html: piccniccProccessedPayment
    };
    mailgun.messages().send(data, function (error, body) {
      callback(error)
    });
  } else if (emailType === "piccniccCancelledOrder") {
    var cancelOrder = emailTemplates.formatCancelOrder(recieptDetails)
    var data = {
      from: 'Excited User <postmaster@' + domain + '>',
      to: 'ruth@foundersandcoders.com', //this needs to be Jonny's email
      subject: 'order #' + recieptDetails + ' has CANCELLED!',
      html: cancelOrder
    };
    mailgun.messages().send(data, function (error, body) {
      callback(error)
    });
  }
}

module.exports = SendMail