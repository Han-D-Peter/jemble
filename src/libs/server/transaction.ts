import client from "@/libs/client";

type ID = string;

export async function makeTransferTransaction(
  from: ID,
  to: ID,
  amount: number
) {
  try {
    await client.trasferTransaction.create({
      data: {
        sender: from,
        receiver: to,
        amount,
      },
    });
  } catch (error) {
    console.log(error);
    throw Error("Error while making transaction");
  }
}

export async function makeDonationTransaction(
  from: ID,
  toUnion: ID,
  amount: number
) {
  try {
    await client.donationTransaction.create({
      data: {
        sender: from,
        unionId: toUnion,
        amount,
      },
    });
  } catch (error) {
    console.log(error);
    throw Error("Error while making transaction");
  }
}

export async function getFriendTransactions(myId: string) {
  try {
    const transactions = await client.requestFriendTransaction.findMany({
      where: {
        OR: [{ sender: myId }, { receiver: myId }],
      },
    });
    return transactions;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getDonationTransactions(myId: string) {
  try {
    const transactions = await client.donationTransaction.findMany({
      where: {
        sender: myId,
      },
    });
    return transactions;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getTransferTransactions(myId: string) {
  try {
    const transactions = await client.trasferTransaction.findMany({
      where: {
        OR: [{ sender: myId }, { receiver: myId }],
      },
    });
    return transactions;
  } catch (error) {
    console.log(error);
    return [];
  }
}
