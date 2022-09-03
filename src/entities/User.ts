export type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  isGodfather: boolean;
  isGodmother: boolean;
  relation: string;
  confirmed: boolean;
  isAdmin: boolean;
};

export type Family = {
  data: User[];
};
