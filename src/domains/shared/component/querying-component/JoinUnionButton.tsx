import {
  useGetMyUnion,
  useJoinUnionMutation,
} from "@/domains/query-hook/queries/unions";
import Button from "@/domains/shared/component/Button";
import Spinner from "../Spinner";

type Name = string;

interface JoinUnionButtonProps {
  name: Name;
}

export default function JoinUnionButton({ name }: JoinUnionButtonProps) {
  const { mutate, isLoading } = useJoinUnionMutation();
  const { refetch } = useGetMyUnion();

  const joinUnion = () => {
    mutate(
      {
        name,
      },
      {
        onSettled: () => {
          refetch();
        },
      }
    );
  };

  return (
    <Button onClick={joinUnion} size="sm">
      {isLoading ? <Spinner outline size="sm" /> : "Join"}
    </Button>
  );
}
