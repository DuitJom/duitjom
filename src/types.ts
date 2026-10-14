export type AuthMode = 'login' | 'register';

export type Language = 'ms' | 'en';

export type ThemeMode = 'auto' | 'purple-black' | 'oled';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
  twoFactorEnabled: boolean;
  twoFactorMethod: 'sms' | 'email' | 'authenticator' | 'passkey';
  balance: number;
  currency: string;
  avatarUrl?: string;
  joinedDate: string;
  lastLogin: string;
}

export interface OTPState {
  isOpen: boolean;
  email: string;
  phone: string;
  code: string[];
  testCode: string;
  timeLeft: number;
  isVerifying: boolean;
  error: string | null;
  isSuccess: boolean;
  registrationData?: {
    name: string;
    email: string;
    phone: string;
    password: string;
  };
}

export interface PasswordCriteria {
  minLength: boolean;
  hasUpper: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}
