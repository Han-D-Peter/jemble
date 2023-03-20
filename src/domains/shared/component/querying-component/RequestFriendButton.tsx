import {
  useCheckRequestFriend,
  useRequestFriendMutation,
} from "@/domains/query-hook/queries/friends";
import Button from "@/domains/shared/component/Button";
import Badge from "../Badge";
import Spinner from "../Spinner";

type ID = string;

interface RequestFriendButtonProps {
  userId: ID;
}

export default function ReuqestFrinedButton({
  userId,
}: RequestFriendButtonProps) {
  const { mutate, isLoading } = useRequestFriendMutation();
  const { data, refetch } = useCheckRequestFriend(userId);

  const requestFriend = () => {
    mutate(
      {
        friendId: userId,
      },
      {
        onSettled: () => {
          refetch();
        },
      }
    );
  };

  if (data?.data?.isPending)
    return <Badge outline color="#4B7FF0" text="isPending" />;
  return (
    <Button onClick={requestFriend} size="sm">
      {isLoading ? <Spinner outline size="sm" /> : "Request"}
    </Button>
  );
}
