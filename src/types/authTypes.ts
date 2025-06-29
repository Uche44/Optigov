type UserRole = "citizen" | "company" | "admin";

interface SignupData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

interface LoginData {
  emailOrPhone: string;
  password: string;
}

interface StoredUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
  createdAt: string;
}

type ValidationContext = {
  mode: 'signup' | 'login';
  role: UserRole;
  signupData?: SignupData;
  loginData?: LoginData;
};

export type { UserRole, SignupData, LoginData, StoredUser, ValidationContext };