import { Request, Response } from "express";
import nodemailer from "nodemailer";

const sendEmailInvite = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if(!email) {
       res.status(400).json({message: "Please enter emailId"});
    }
    
    const smtpTransport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.ADMIN_EMAIL, 
        pass:  process.env.ADMIN_PASSWORD, 
      },
    });

    const mailOptions = {
          to: email,
          subject: "This is a test email from a developer",
          html: "<h1>Welcome to my website 2</h1>"
      }

    const response = await smtpTransport.sendMail(mailOptions);
    console.log('response', response);
  
    res.status(200).json({message: "Successfully sent invitation"});
  } catch(error:any) {
    res.status(400).json({message: `Failed to invite`});
  }
}

export {
  sendEmailInvite
}