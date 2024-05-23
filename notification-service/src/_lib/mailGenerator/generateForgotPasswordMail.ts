
import nodemailer from 'nodemailer';

export const genereateForgetPasswordMail = async (
  email: string,
  url: string
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
    
    const mailDesign=`
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Forgot Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            padding: 20px;
            margin: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            color: #333;
            text-align: center;
            margin-top: 0;
        }

        p {
            color: #666;
            font-size: 16px;
            margin-bottom: 20px;
        }

        .btn {
            display: inline-block;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
        }

        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>

<body>
    <div class="container">
        <h2>Forgot Password</h2>
        <p>You have requested to reset your password. Click the button below to reset it:</p>
        <a href=${url} class="btn">Reset Password</a>
        <p>If you didn't request this, you can ignore this email.</p>
        <p>Thank you,</p>
        <p>Your Website Team</p>
    </div>
</body>

</html>
`

    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.MAIL_EMAIL || '',
      to: email,
      subject: "Verify your forgot password",
      html: mailDesign
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