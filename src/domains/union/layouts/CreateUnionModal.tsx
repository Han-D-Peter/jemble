import { useRef } from "react";
import { css } from "@emotion/react";
import {
  useCreateUnionMutation,
  useMyUnion,
} from "@/domains/query-hook/queries/unions";
import Button from "@/domains/shared/component/Button";
import Input from "@/domains/shared/component/Input";
import Box from "@/domains/shared/component/layout/Box";
import Spacing from "@/domains/shared/component/Spacing";
import SpinnerBox from "@/domains/shared/component/SpinnerBox";
import useResetableState from "@/domains/shared/hooks/useResetableState";
import ErrorMsg from "@/domains/shared/component/ErrorMsg";

interface CreateUnionModalProps {}

function CreateUnionModal({}: CreateUnionModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isLoading, isSuccess } = useCreateUnionMutation();
  const { data, refetch } = useMyUnion();
  const [error, setError, resetError] = useResetableState({
    status: "",
    message: "",
  });

  const createUnion = () => {
    if (!inputRef.current) {
      return;
    }
    mutate(
      { name: inputRef.current.value },
      {
        onSettled: () => {
          refetch();
        },
        onError: async (error: any) => {
          const response = await error.response.json();
          setError(response);
        },
      }
    );
  };

  if (isLoading || isSuccess) return <SpinnerBox />;

  return (
    <Box title="유니온 개설">
      <Input ref={inputRef} />
      <ErrorMsg text={error.message} />
      <Spacing heightGap={20} />
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: flex-end;
        `}
      >
        <Button size="lg" onClick={createUnion}>
          개설
        </Button>
      </div>
    </Box>
  );
}

export default CreateUnionModal;
