import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (to, code) => {
    const url = `${process.env.FRONTEND_URL}/verify-email?code=${code}&email=${encodeURIComponent(to)}`;

    await resend.emails.send({
        from: 'BiteReview <onboarding@resend.dev>',
        to,
        subject: 'Verify your email address',
        html: `
            <h2>Welcome to BiteReview! 🍽️</h2>
            <p>Click the button below to verify your email address:</p>
            <a href="${url}" style="padding: 10px 20px; background-color: #f97316; color: white; border-radius: 5px; text-decoration: none;">Verify Email</a>
            <p>Or copy this link into your browser:</p>
            <p>${url}</p>
        `,
    });
};
