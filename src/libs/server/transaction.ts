import client from "@/libs/client";

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
