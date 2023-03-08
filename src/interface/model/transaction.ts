export type DonationTransaction = {
  id: string;
  sender: string;
  unionId: string;
  amount: number;
};

export type TransferTransaction = {
  id: string;
  sender: string;
  receiver: string;
  unionId: string;
  amount: number;
};
