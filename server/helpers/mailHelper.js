const fs = require('fs')
const nodemailer = require('nodemailer')
const path = require('path')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shepelevich.serje@gmail.com',
    pass: '****'
  }
})

let mailOptions = {}

fs.readFile(__dirname + '/Capture.png', function(err, data) {
  if (err) {
    console.log(err, 'err')
  }

  mailOptions = {
    from: 'sender@sender.com',
    to: 'shepelevich.serje@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    attachments: [{filename: 'attachment.png', content: data}]
  }
})

const sendMail = () => {
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

module.exports = sendMail
