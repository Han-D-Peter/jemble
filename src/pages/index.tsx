import {
  useGetFriends,
  useRequestFriendMutation,
} from "@/domains/query-hook/queries/friends";
import { useGetTransactions } from "@/domains/query-hook/queries/transactions";
import DefaultLayout from "@/domains/shared/component/layout/DefaultLayout";

export default function Home() {
  const { data } = useGetTransactions();

  console.log("data", data);
  return (
    <DefaultLayout isLogined>
      <div>hello</div>
    </DefaultLayout>
  );
}
