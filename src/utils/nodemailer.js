//Use at least Nodemailer v4.1.0

import nodemailer from "nodemailer";

//configure and sent email

const sendEmail = async (obj) => {
  try {
    //config

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP,
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //send email
    const info = await transporter.sendMail(obj);
    console.log("Message sent %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

//make email template and data ready

export const newAccountEmailVerificationEmail = (link, obj) => {
  const emailBody = {
    from: `"Coding Shop, <${process.env.EMAIL_USER}>`,
    to: obj.email,
    subject: "Verify your email!",
    text: "Please follow the link to verify your account" + link,
    html: `
    <p>
       Hi ${obj.fName}
    </p>

    <br/>
    
    <p>
    Please follow the link to verify your new account.

    </P>

    <br/>

    <p>
    Hi <a href=${link}> ${link} </a>

    </p>

    <br>

    <p>
    Regards,
    <br>

    Coding Shop customer care team.

    </p>


    `,
  };

  sendEmail(emailBody);
};
