import {
  useGetFriends,
  useRequestFriendMutation,
} from "@/domains/query-hook/queries/friends";
import {
  useGetMyUnion,
  useGetUnion,
} from "@/domains/query-hook/queries/unions";

export default function Home() {
  const { mutate } = useRequestFriendMutation();

  // console.log("data", data);
  return (
    <>
      <div>hello</div>
    </>
  );
}
