
import nodemailer from 'nodemailer';

export const generateVerificationMail = async (
  email: string,
  otp: string
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || '',
      auth: {
        user: process.env.MAIL_EMAIL || '',
        pass: process.env.MAIL_PASSWORD || ''
      }
    });
    console.log('mail transppoprt creaeted');
    
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.MAIL_EMAIL ,
      to: email,
      subject: "Verify your email using this OTP",
      html: `
        <p>Hello new user, use the following OTP to verify your email:</p>
        <p style="color: tomato; font-size: 25px; letter-spacing: 2px;"><b>${otp}</b></p>
        <p>OTP will expire in <b>10 minute(s)</b>.</p>
      `
    };
    console.log('mail potion created');
    
    transporter.verify((error: Error | null, success: boolean) => {
      if (error) {
        console.error("Error verifying transporter:", error);
      } else {
        console.log("Transporter is ready:", success);
      }
    });

    const sendEmail = async (mailOptions: nodemailer.SendMailOptions) => {
      try {
        console.log(mailOptions,'mail option');
        
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
      } catch (error) {
        console.error("Error sending email:", error);
      }
    };
    console.log('mail sended');
    
    await sendEmail(mailOptions);
    console.log('mail sended successfully');
    
  } catch (error) {
    console.error("Error generating verification mail:", error);
  }
};