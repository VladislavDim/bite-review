import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (to, code) => {
    const url = `${process.env.FRONTEND_URL}/verify-email`;

    await resend.emails.send({
        from: 'BiteReview <noreply@bitereview.info>',
        to,
        subject: 'Verify your email address',
        html: `
            <h2>Welcome to BiteReview! 🍽️</h2>
            <p>Your verification code is:</p>
            <h1 style="color: #f97316; font-size: 32px;">${code}</h1>

            <p>You can enter this code in the app, or click the button below to verify instantly:</p>
            <a href="${url}" style="display:inline-block; margin: 20px 0; padding: 12px 24px; background-color: #f97316; color: white; border-radius: 6px; text-decoration: none;">Verify Email</a>

            <p>Or copy this link into your browser:</p>
            <p>${url}</p>
        `,
    });
};

export const sendResetEmail = async (to, resetLink) => {
    await resend.emails.send({
        from: 'BiteReview <noreply@bitereview.info>',
        to,
        subject: 'Reset your BiteReview password',
        html: `
            <h2>Password Reset Request</h2>
            <p>We received a request to reset your password.</p>
            <p>You can reset it by clicking the button below:</p>
            <a href="${resetLink}" style="display:inline-block; margin: 20px 0; padding: 12px 24px; background-color: #f97316; color: white; border-radius: 6px; text-decoration: none;">Reset Password</a>

            <p>This link will expire in 15 minutes. If you didn't request this, you can ignore this email.</p>
            <p>${resetLink}</p>
        `,
    });
};
