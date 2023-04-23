export type Company = {
  id: number;
  accountId: number;
  title: string;
  description: string;
  address: string;
  email: string;
  phone?: string;
};

export type CompanyResponse = {
  companies: Company[],
  total: number,
}