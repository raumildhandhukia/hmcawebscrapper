import nodeMailer from "nodemailer";

// Send email to the receiver
export const sendMail = async () => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SENDER_GMAIL,
        pass: process.env.SENDER_GMAIL_APP_PASSWORD,
      },
    });
    await transporter.sendMail({
      from: {
        name: "Admin Web Scraper",
        address: process.env.SENDER_GMAIL || "",
      },
      to: process.env.RECEIVER_GMAIL,
      subject: "Notification from Web Scraper",
      html: "Products fetched from H&M Canada Website.",
    });
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
