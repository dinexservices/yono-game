export interface Game {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  logoUrl?: string;
  category?: string;
  rating?: number;
  size?: string;
  signupBonus?: number;
  minWithdraw?: number;
  downloadUrl?: string;
  description?: string;
  longDescription?: string;
  tags?: string[];
  isNewGame?: boolean;
  isFree?: boolean;
  createdAt?: string;
}
