import client from "@/libs/client";

type ID = string;

export async function makeTransferTransaction(
  from: ID,
  fromName: string,
  to: ID,
  toName: string,
  amount: number
) {
  try {
    await client.trasferTransaction.create({
      data: {
        sender: from,
        senderName: fromName,
        receiver: to,
        receiverName: toName,
        amount,
      },
    });
  } catch (error) {
    console.log(error);
    throw Error("Error while making transaction");
  }
}

export async function makeDonationTransaction({
  fromId,
  fromName,
  toUnionId,
  unionName,
  amount,
}: {
  fromId: ID;
  toUnionId: ID;
  fromName: string;
  unionName: string;
  amount: number;
}) {
  try {
    await client.donationTransaction.create({
      data: {
        sender: fromId,
        senderName: fromName,
        unionId: toUnionId,
        receiverName: unionName,
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
