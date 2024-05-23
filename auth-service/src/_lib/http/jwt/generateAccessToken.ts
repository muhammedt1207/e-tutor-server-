import jwt from 'jsonwebtoken';

export const generateAccessToken = (userId: string, email: string, role: string, expiresIn: string = '14h'): string => {
    try {
        const payload = { userId, email, role };
        const token = jwt.sign(payload, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn });
        return token;
    } catch (error) {
        throw new Error('Error occurred while generating access token');
    }
};
