
import nodemailer from 'nodemailer';

export const generateAcceptanceMail = async (
  email: string,
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
      from: process.env.MAIL_EMAIL || '',
      to: email,
      subject: 'Congratulations on Becoming an Instructor at E-tutor!',
      html: `
        <p>Dear Instructor,</p>
        <p>Congratulations! We are pleased to inform you that your request to become an instructor at E-tutor has been accepted.</p>
        <p>We look forward to seeing your valuable contributions to our platform.</p>
        <p>Best regards,</p>
        <p>The E-tutor Team</p>
      `,
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