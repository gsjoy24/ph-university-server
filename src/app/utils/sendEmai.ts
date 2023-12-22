import nodemailer from 'nodemailer';
import config from '../config';
export const sendEmail = async (to: string, resetUILink: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production',
    auth: {
      user: 'gour.joy24@gmail.com',
      pass: 'hetc dito wadw oenp',
    },
  });

  await transporter.sendMail({
    from: 'gour.joy24@gmail.com', // sender address
    to, // list of receivers
    subject: 'Change Your Password', // Subject line
    text: `Reset Your Password in 15 minutes`, // plain text body
    html: `Change Your Password here, ${resetUILink}`, // html body
  });
};
