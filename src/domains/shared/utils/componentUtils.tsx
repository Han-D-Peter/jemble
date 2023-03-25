import {
  DonationTransaction,
  RequestFriendTransaction,
  TrasferTransaction,
} from "@/api/server/generated";
import ResponseBox from "@/domains/notification/components/ResponseBox";
import { Suspense } from "react";
import Badge from "../component/Badge";
import Spinner from "../component/Spinner";
import TransactionRow from "../component/TransactionRow";

export function parseTransactions(
  item: DonationTransaction | TrasferTransaction | RequestFriendTransaction,
  myId: string
) {
  if (item.type === "donation") {
    const transaction = item as DonationTransaction;
    const text = `유니온에게 ${transaction.amount.toLocaleString()}Pt를 기여했습니다.`;
    return (
      <TransactionRow
        text={text}
        icon={<Badge outline text={"Donated"} color="#4B7FF0" />}
      />
    );
  }

  if (item.type === "transfer") {
    const transaction = item as TrasferTransaction;
    if (transaction.receiver === myId) {
      const text = `${
        transaction.senderName
      }님으로부터 ${transaction.amount.toLocaleString()}Pt를 받았습니다.`;
      return (
        <TransactionRow
          text={text}
          icon={<Badge outline text="Received" color="#4B7FF0" />}
        />
      );
    }
    if (transaction.sender === myId) {
      const text = `${
        transaction.receiverName
      }님에게 ${transaction.amount.toLocaleString()}Pt를 보냈습니다.`;
      return (
        <TransactionRow
          text={text}
          icon={<Badge outline text="Transfered" color="#4B7FF0" />}
        />
      );
    }
  }

  if (item.type === "request") {
    const transaction = item as RequestFriendTransaction;
    if (transaction.receiver === myId) {
      const text = `${transaction.senderName}님이 친구가 되고 싶어합니다.`;
      if (transaction.status === "Rejected")
        return (
          <TransactionRow
            text={text}
            icon={<Badge outline text={transaction.status} color="#fc2f2f" />}
          />
        );

      if (transaction.status === "Accepted")
        return (
          <TransactionRow
            text={text}
            icon={<Badge outline text={transaction.status} color="#4B7FF0" />}
          />
        );
      if (transaction.status === "Pending")
        return (
          <TransactionRow
            text={text}
            icon={
              <Suspense fallback={<Spinner size="md" />}>
                <ResponseBox invitationId={transaction.id} />
              </Suspense>
            }
          />
        );
    }
    if (transaction.sender === myId) {
      const text = `${transaction.receiverName}님에게 친구 요청을 했습니다.`;
      if (transaction.status === "Reject")
        return (
          <TransactionRow
            text={text}
            icon={<Badge outline text={transaction.status} color="#fc2f2f" />}
          />
        );

      if (transaction.status === "Accepted")
        return (
          <TransactionRow
            text={text}
            icon={<Badge outline text={transaction.status} color="#4B7FF0" />}
          />
        );
      if (transaction.status === "Pending")
        return (
          <TransactionRow
            text={text}
            icon={<Badge outline text={transaction.status} color="#4B7FF0" />}
          />
        );
    }
  }
}
