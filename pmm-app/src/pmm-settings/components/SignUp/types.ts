export interface SignUpData {
  email: string;
  newPassword: string;
  agreement: boolean;
}

export interface SignUpProps {
  userEmail: string | undefined;
}
