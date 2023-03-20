import { useQueryClient } from "@tanstack/react-query";
import Button from "@/domains/shared/component/Button";
import { useTransferPointToFriendMutation } from "@/domains/query-hook/queries/trade";

type ID = string;

interface TransferButtonProps {
  target: ID;
  amount: number;
  onValidatedWhenClick?: ({ status, message }: any) => void;
}

export default function TransferButton({
  target,
  amount,
  onValidatedWhenClick = args => {
    console.log(args);
  },
}: TransferButtonProps) {
  const { mutate, isLoading } = useTransferPointToFriendMutation();
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
          queryClient.invalidateQueries({ queryKey: ["friends"] });
          queryClient.invalidateQueries({ queryKey: ["myUnion"] });
        },
        onError: async (error: any) => {
          const response = await error.response.json();
          onValidatedWhenClick(response);
        },
      }
    );
  };
  return (
    <Button size="sm" onClick={transfer}>
      {isLoading ? "Loading..." : "Send"}
    </Button>
  );
}
