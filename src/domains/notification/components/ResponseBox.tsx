import { useAcceptRequestFriendMutation } from "@/domains/query-hook/queries/friends";
import { useQueryClient } from "@tanstack/react-query";
import Button from "@/domains/shared/component/Button";
import Spinner from "@/domains/shared/component/Spinner";
import { css } from "@emotion/react";

type ID = string;

type AcceptionType = "Accepted" | "Rejected";

interface ResponseBoxProps {
  invitationId: ID;
}

export default function ResponseBox({ invitationId }: ResponseBoxProps) {
  const { mutate, isLoading } = useAcceptRequestFriendMutation();
  const queryClient = useQueryClient();

  const acceptRequestFrind = (condition: AcceptionType) => {
    mutate(
      { requestId: invitationId, condition },
      {
        onSettled: () => {
          queryClient.fetchQuery(["transactions"]);
        },
      }
    );
  };

  if (isLoading) return <Spinner size="sm" />;
  return (
    <div
      css={css`
        display: flex;
      `}
    >
      <Button size="sm" onClick={() => acceptRequestFrind("Accepted")}>
        Y
      </Button>
      <Button
        size="sm"
        color="#fc4141"
        onClick={() => acceptRequestFrind("Rejected")}
      >
        N
      </Button>
    </div>
  );
}
