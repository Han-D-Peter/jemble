import { useQueryClient } from "@tanstack/react-query";
import Button from "@/domains/shared/component/Button";
import { useTransferPointToFriendMutation } from "@/domains/query-hook/queries/trade";

interface TransferButtonProps {
  target: string;
  amount: number;
}

export default function TransferButton({
  target,
  amount,
}: TransferButtonProps) {
  const { mutate } = useTransferPointToFriendMutation();
  const queryClient = useQueryClient();

  const transfer = () => {
    mutate(
      {
        targetUser: target,
        amount,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["me"] });
          queryClient.invalidateQueries({ queryKey: ["myUnion"] });
        },
      }
    );
  };
  return (
    <Button size="sm" onClick={transfer}>
      Send
    </Button>
  );
}
