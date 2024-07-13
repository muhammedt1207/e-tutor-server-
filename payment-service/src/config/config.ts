export default () => ({
  
  
    stripeKey: process.env.STRIPE_SECRET_KEY ,
    frontendUrl: process.env.FRONTEND_URL,
    mongoUri: process.env.MONGO_URL,
  });
  