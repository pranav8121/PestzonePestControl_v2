const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration for production
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? [process.env.FRONTEND_URL, 'https://your-site-name.netlify.app']
        : ['http://localhost:4200', 'http://192.168.31.213:4200'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'santoshkadam1916@gmail.com',
        pass: process.env.EMAIL_PASS || 'your-app-password' // Use app password for Gmail
    }
});

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Pestzone Pest Control Backend API' });
});

// Contact form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;

        // Basic validation
        if (!name || !phone) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name and phone number are required' 
            });
        }

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER || 'santoshkadam1916@gmail.com',
            to: process.env.EMAIL_USER_TO || 'santoshkadam1916@gmail.com',
            subject: 'New Enquiry from PEST Zone Website',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #2c5aa0; border-bottom: 2px solid #2c5aa0; padding-bottom: 10px;">
                        New Customer Enquiry
                    </h2>
                    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Phone:</strong> <a href="tel:${phone}" style="color: #2c5aa0; text-decoration: none; font-weight: bold;">${phone}</a></p>
                        ${email ? `<p><strong>Email:</strong> <a href="mailto:${email}" style="color: #2c5aa0; text-decoration: none;">${email}</a></p>` : ''}
                        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ''}
                        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
                    </div>
                    <div style="background-color: #2c5aa0; color: white; padding: 15px; text-align: center; border-radius: 5px;">
                        <p style="margin: 0;">📞 Click to call customer for callback service</p>
                        <p style="margin: 10px 0 0 0;">
                            <a href="tel:${phone}" style="color: white; text-decoration: none; font-size: 20px; font-weight: bold; padding: 8px 16px; background: rgba(255,255,255,0.2); border-radius: 5px; display: inline-block;">
                                📱 Call ${phone}
                            </a>
                        </p>
                    </div>
                    <div style="margin-top: 20px; padding: 15px; background: #e8f4f8; border-radius: 5px; text-align: center;">
                        <p style="margin: 0; color: #666; font-size: 14px;">
                            <strong>Quick Actions:</strong><br>
                            <a href="tel:${phone}" style="color: #2c5aa0; text-decoration: none; margin: 0 10px;">📞 Call Now</a> |
                            ${email ? `<a href="mailto:${email}" style="color: #2c5aa0; text-decoration: none; margin: 0 10px;">📧 Email</a> |` : ''}
                            <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #25d366; text-decoration: none; margin: 0 10px;">💬 WhatsApp</a>
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ 
            success: true, 
            message: 'Enquiry submitted successfully! We will contact you soon.' 
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to submit enquiry. Please try again later.' 
        });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`PEST Zone Backend server running on port ${PORT}`);
});

module.exports = app;