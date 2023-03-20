import { useQueryClient } from "@tanstack/react-query";
import Button from "@/domains/shared/component/Button";
import { useTransferPointToUnionMutation } from "@/domains/query-hook/queries/trade";
import Spinner from "../Spinner";

type ID = string;

interface DonateButtonProps {
  targetUnion: ID;
  amount: number;
  onValidatedWhenClick?: ({ status, message }: any) => void;
}

export default function DonateButton({
  targetUnion,
  amount,
  onValidatedWhenClick = args => {
    console.log(args);
  },
}: DonateButtonProps) {
  const { mutate, isLoading } = useTransferPointToUnionMutation();
  const queryClient = useQueryClient();

  const transfer = () => {
    mutate(
      {
        targetUnion,
        amount,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["me"] });
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
    <Button size="lg" onClick={transfer}>
      {isLoading ? <Spinner outline size="md" /> : "보내기"}
    </Button>
  );
}
