import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  async sendMail(data) {
    var nodeoutlook = require('nodejs-nodemailer-outlook')


    return await nodeoutlook.sendEmail({
      auth: {
        user: `${process.env.MAILER_SENDER}`,
        pass: `${process.env.MAILER_PASSOWRD}`
      },
      tls: `${process.env.MAILER_TLS}`,
      secure: false,

      from: `${process.env.MAILER_SENDER}`,
      to: data.to,
      subject: data.subject,
      // html: '<b>This is bold text</b>',
      text: data.text,
      replyTo: `${process.env.MAILER_SENDER}`,
      onError: (e) => console.log(e),
      onSuccess: (i) => console.log(i)
    }

    );
  }

  async testMail() {
    "use strict";
    const nodemailer = require("nodemailer");

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: `${process.env.MAILER_SMTP}`,
        port: `${process.env.MAILER_PORT}`,
        secure: false, // true for 465, false for other ports
        tls: `${process.env.MAILER_TLS}`,
        auth: {
          user: `${process.env.MAILER_SENDER}`, // generated ethereal user
          pass: `${process.env.MAILER_PASSOWRD}`, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `${process.env.MAILER_SENDER}`, // sender address
        to: "rizwan@devbatch.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      //console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);
  }
}
