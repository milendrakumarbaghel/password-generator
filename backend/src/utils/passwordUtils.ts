export const generateRandomPassword = (length: number, includeUppercase: boolean, includeNumbers: boolean, includeSpecialChars: boolean): string => {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSpecialChars) chars += "!@#$%^&*()_+";

    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  };
