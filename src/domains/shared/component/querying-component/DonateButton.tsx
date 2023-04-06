import { useQueryClient } from "@tanstack/react-query";
import Button from "@/domains/shared/component/Button";
import { useTransferPointToUnionMutation } from "@/domains/query-hook/queries/trade";
import Spinner from "../Spinner";

type ID = string;

interface DonateButtonProps {
  targetUnion: ID;
  amount: number;
  onValidatedWhenClick?: ({ status, message }: any) => void;
  onSuccess?: () => void;
  onError?: () => void;
  onMutate?: () => void;
}

export default function DonateButton({
  targetUnion,
  amount,
  onValidatedWhenClick = (args) => {
    console.log(args);
  },
  onSuccess,
  onError,
  onMutate,
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
          if (onSuccess) {
            onSuccess();
          }
        },
        onError: async (error: any) => {
          const response = await error.response.json();
          onValidatedWhenClick(response);
          if (onError) {
            onError();
          }
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
