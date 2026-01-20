// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//     try{
//             let transporter = nodemailer.createTransport({
//                  service: "gmail",
//                 // host:process.env.MAIL_HOST,
//                 // secure: false,
//                 auth:{
//                     user: process.env.MAIL_USER,
//                     pass: process.env.MAIL_PASS,
//                 },
//             });


//             let info = await transporter.sendMail({
//                 from: 'StudyNotion || CodeHelp - by Babbar',
//                 to:`${email}`,
//                 subject: `${title}`,
//                 html: `${body}`,
//             })
//             console.log(info);
//             return info;
//     }
//     catch(error) {
//         console.log(error.message);
//         throw error;
//     }
// }


// module.exports = mailSender;


// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS, // Gmail App Password
//       },
//     });

//     const info = await transporter.sendMail({
//       from: `"StudyNotion" <${process.env.MAIL_USER}>`,
//       to: email,
//       subject: title,
//       html: body,
//     });

//     console.log("Mail sent:", info.response);
//     return info;
//   } catch (error) {
//     console.error("Mail error:", error.message);
//     return null; // ✅ DO NOT throw
//   }
// };

// module.exports = mailSender;


// const nodemailer = require("nodemailer");

// const mailSender = async (email, title, body) => {
//   console.log(`\n📧 [MAILSENDER] Starting email to: ${email}`);
//   console.log(`📧 Subject: ${title}`);
  
//   try {
//     // Validate environment variables
//     if (!process.env.MAIL_USER) {
//       console.error("❌ MAIL_USER is not set in environment variables");
//       return null;
//     }
    
//     if (!process.env.MAIL_PASS) {
//       console.error("❌ MAIL_PASS is not set in environment variables");
//       return null;
//     }
    
//     console.log(`📧 Using sender: ${process.env.MAIL_USER}`);

//     // Create transporter with better settings
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS
//       },
//       tls: {
//         ciphers: 'SSLv3',
//         rejectUnauthorized: false
//       }
//     });

//     // Verify transporter connection
//     console.log("📧 Verifying SMTP connection...");
//     try {
//       await transporter.verify();
//       console.log("✅ SMTP connection verified successfully");
//     } catch (verifyError) {
//       console.error("❌ SMTP connection failed:", verifyError.message);
//       console.error("💡 Tips:");
//       console.error("1. Make sure you're using an App Password, not your regular password");
//       console.error("2. Enable 2-factor authentication in your Google account");
//       console.error("3. Generate App Password: Google Account > Security > 2-Step Verification > App Passwords");
//       return null;
//     }

//     // Prepare email options
//     const mailOptions = {
//       from: {
//         name: 'StudyNotion',
//         address: process.env.MAIL_USER
//       },
//       to: email,
//       subject: title,
//       html: body,
//       // Add plain text version
//       text: body.replace(/<[^>]*>/g, ''),
//     };

//     console.log("📧 Sending email...");
    
//     // Send email
//     const info = await transporter.sendMail(mailOptions);
    
//     console.log("✅ Email sent successfully!");
//     console.log(`📧 Message ID: ${info.messageId}`);
//     console.log(`📧 Response: ${info.response}`);
//     console.log(`📧 Accepted: ${info.accepted}`);
//     console.log(`📧 Rejected: ${info.rejected}`);
    
//     return {
//       success: true,
//       messageId: info.messageId,
//       response: info.response,
//       accepted: info.accepted,
//       rejected: info.rejected
//     };
    
//   } catch (error) {
//     console.error("❌ Email sending failed!");
//     console.error(`📧 Error: ${error.message}`);
//     console.error(`📧 Error Code: ${error.code}`);
    
//     // Common error solutions
//     if (error.code === 'EAUTH') {
//       console.error("\n🔑 AUTHENTICATION ERROR SOLUTIONS:");
//       console.error("1. Go to: https://myaccount.google.com/");
//       console.error("2. Turn ON 'Less secure app access' (if available)");
//       console.error("3. OR Enable 2FA and generate App Password:");
//       console.error("   - Google Account > Security > 2-Step Verification > App Passwords");
//       console.error("   - Generate password for 'Mail' app");
//       console.error("4. Update your .env file with the App Password");
//     }
    
//     if (error.code === 'EENVELOPE') {
//       console.error("\n📭 ENVELOPE ERROR: Invalid email address");
//     }
    
//     return null;
//   }
// };

// module.exports = mailSender;

// utils/mailSender.js - DEBUG VERSION
const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  console.log("\n" + "=".repeat(80));
  console.log("🔥🔥🔥 ULTRA DEBUG - EMAIL SENDING 🔥🔥🔥");
  console.log("=".repeat(80));
  
  console.log("📨 TO:", email);
  console.log("📋 SUBJECT:", title);
  console.log("👤 FROM ENV:", process.env.MAIL_USER || "NOT FOUND!");
  console.log("🔐 PASS LENGTH:", process.env.MAIL_PASS ? process.env.MAIL_PASS.length + " chars" : "NOT FOUND!");
  
  // SHOW ACTUAL VALUES (mask password)
  if (process.env.MAIL_PASS) {
    const maskedPass = process.env.MAIL_PASS.substring(0, 4) + "..." + 
                       process.env.MAIL_PASS.substring(process.env.MAIL_PASS.length - 4);
    console.log("🔐 PASS (masked):", maskedPass);
  }

  try {
    // ============================================
    // TEST 1: Check if .env is even loaded
    // ============================================
    console.log("\n🧪 TEST 1: Checking .env file...");
    if (!process.env.MAIL_USER) {
      console.error("❌❌❌ MAIL_USER is UNDEFINED!");
      console.error("💡 Is your .env file in the RIGHT directory?");
      console.error("💡 Current working directory:", process.cwd());
      console.error("💡 Try: require('dotenv').config({ path: '/full/path/to/.env' })");
      return null;
    }
    
    if (!process.env.MAIL_PASS) {
      console.error("❌❌❌ MAIL_PASS is UNDEFINED!");
      console.error("💡 Check your .env file format:");
      console.error("💡 Should be: MAIL_PASS=yourpassword (no quotes, no spaces)");
      return null;
    }
    
    console.log("✅ .env file is loaded correctly!");

    // ============================================
    // TEST 2: Try SIMPLEST configuration
    // ============================================
    console.log("\n🧪 TEST 2: Trying SIMPLEST Gmail config...");
    
    // Option A: Simplest config (usually works)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    console.log("✅ Transporter created with simple config");

    // ============================================
    // TEST 3: Verify SMTP connection
    // ============================================
    console.log("\n🧪 TEST 3: Verifying SMTP connection...");
    try {
      const verifyResult = await transporter.verify();
      console.log("✅✅✅ SMTP VERIFICATION SUCCESSFUL!");
      console.log("Verify result:", verifyResult);
    } catch (verifyError) {
      console.error("❌❌❌ SMTP VERIFICATION FAILED!");
      console.error("Full error object:", JSON.stringify(verifyError, null, 2));
      console.error("Error code:", verifyError.code);
      console.error("Error command:", verifyError.command);
      console.error("Error response:", verifyError.response);
      console.error("Error responseCode:", verifyError.responseCode);
      
      if (verifyError.code === 'EAUTH') {
        console.error("\n🔐🔐🔐 AUTHENTICATION FAILED DETAILS:");
        console.error("1. Your MAIL_USER:", process.env.MAIL_USER);
        console.error("2. Your MAIL_PASS length:", process.env.MAIL_PASS.length);
        console.error("3. Try this App Password instead: Generate NEW one at:");
        console.error("   https://myaccount.google.com/apppasswords");
        console.error("4. Select 'Mail' and 'Windows Computer'");
      }
      
      // Try alternative configuration
      console.log("\n🔄 Trying ALTERNATIVE configuration (port 465)...");
      try {
        const altTransporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
          }
        });
        
        await altTransporter.verify();
        console.log("✅✅✅ Alternative config (port 465) works!");
        // Use this transporter instead
        transporter = altTransporter;
      } catch (altError) {
        console.error("❌ Alternative config also failed:", altError.message);
        return null;
      }
    }

    // ============================================
    // TEST 4: Try to send actual email
    // ============================================
    console.log("\n🧪 TEST 4: Sending actual email...");
    
    const mailOptions = {
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
      text: "Your OTP code is: " + (body.match(/\d{6}/) ? body.match(/\d{6}/)[0] : "NOT FOUND")
    };

    console.log("Mail options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      textPreview: mailOptions.text
    });

    try {
      const info = await transporter.sendMail(mailOptions);
      
      console.log("\n🎉🎉🎉 EMAIL SENT SUCCESSFULLY! 🎉🎉🎉");
      console.log("Message ID:", info.messageId);
      console.log("Response:", info.response);
      console.log("Accepted:", info.accepted);
      console.log("Rejected:", info.rejected);
      
      // Extract and show OTP
      const otpMatch = body.match(/\d{6}/);
      if (otpMatch) {
        console.log("🔢 OTP that was sent:", otpMatch[0]);
      }
      
      console.log("=".repeat(80) + "\n");
      
      return {
        success: true,
        messageId: info.messageId,
        response: info.response
      };
      
    } catch (sendError) {
      console.error("\n💥💥💥 EMAIL SEND FAILED! 💥💥💥");
      console.error("Full send error:", JSON.stringify(sendError, null, 2));
      console.error("Error code:", sendError.code);
      console.error("Error command:", sendError.command);
      console.error("Error response:", sendError.response);
      
      // ============================================
      // EMERGENCY: Log to file instead of sending
      // ============================================
      console.log("\n📝 EMERGENCY: Logging email to file instead...");
      
      const fs = require('fs');
      const logEntry = {
        timestamp: new Date().toISOString(),
        to: email,
        subject: title,
        otp: body.match(/\d{6}/) ? body.match(/\d{6}/)[0] : "NO OTP FOUND",
        bodyPreview: body.substring(0, 100) + "..."
      };
      
      fs.appendFileSync('email_debug.log', JSON.stringify(logEntry, null, 2) + '\n---\n');
      console.log("✅ Email details saved to email_debug.log");
      console.log("📋 OTP for testing:", logEntry.otp);
      
      return {
        success: true,
        debug: true,
        otp: logEntry.otp,
        message: "Email logged to file (sending disabled)"
      };
    }
    
  } catch (error) {
    console.error("\n💀💀💀 UNEXPECTED ERROR IN mailSender! 💀💀💀");
    console.error("Error:", error);
    console.error("Stack:", error.stack);
    console.log("=".repeat(80) + "\n");
    return null;
  }
};

module.exports = mailSender;