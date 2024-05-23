import jwt from 'jsonwebtoken';

const generateRefreshToken = (userId: string, email: string, role: string): string => {
    const payload = {
        userId,
        email,
        role,
    };

    const options: jwt.SignOptions = {
        expiresIn: '30d', 
        
    };

    const refreshToken = jwt.sign(payload, String(process.env.ACCESS_REFRESH_SECRET), options);

    return refreshToken;
};

export { generateRefreshToken };
