import {
  useGetFriends,
  useRequestFriendMutation,
} from "@/domains/query-hook/queries/friends";
import { useGetTransactions } from "@/domains/query-hook/queries/transactions";

export default function Home() {
  const { data } = useGetTransactions();

  console.log("data", data);
  return (
    <>
      <div>hello</div>
    </>
  );
}
