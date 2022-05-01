import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import nodeMailer from 'nodemailer';

type captchaData = {
  success: boolean
}
export default async function route(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if(method !== 'POST'){
    res.status(405).end();
  }
  const { key, file, name, email } = req.body;
  if(!key || !file || !name || !email){
    return res.status(400).end();
  }

  const { data: captchaReturn } = await axios.post<captchaData>(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_BACKEND_KEY}&response=${key}`
  );
  if(captchaReturn.success){
    const { MAIL_PASS, MAIL_USER } = process.env; 
  
    const transport = nodeMailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
      }
    });

    await transport.sendMail({
      from: MAIL_USER,
      to: email,
      subject: 'OneFormes.com - Order List',
      text: `Attached is the zip file with the list of orders.\nClient ${name}`,
      attachments: [
        {
          filename: `${name} list.zip`,
          content: file,
          encoding: 'base64'
        }
      ]
    })
      .catch(() => {
        res.status(500).end();
      });
    res.end();
  }
  res.status(500).end();
}