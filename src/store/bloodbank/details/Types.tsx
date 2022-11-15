export type Address = {
  id?: number;
  country: string;
  city: string;
  street: string;
  number: string;
};

export type User = {
  id?: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  jmbg: string;
  phoneNumber: string;
  occupation: string;
};

export type BloodBank = {
  id?: number;
  name: string;
  description: string;
  rating: number;
  address: Address;
  administrators: User[];
};

export interface IBloodBankDetailsContext {
  bloodBank: BloodBank | null;
  updateBloodBank?: Function;
}
