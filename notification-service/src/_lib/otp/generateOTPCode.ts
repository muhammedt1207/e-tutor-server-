export const generateOTPCode = (): string => {
    const random4DigitNumber: number = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    console.log(random4DigitNumber);
    
    return String(random4DigitNumber);
  }
  
 
   