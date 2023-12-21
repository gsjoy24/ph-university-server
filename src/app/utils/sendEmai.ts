import nodemailer from 'nodemailer';
export const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.forwardemail.net',
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
      pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD',
    },
  });

  await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  });
};
