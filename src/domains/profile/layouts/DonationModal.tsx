import { ChangeEvent, useState } from "react";
import ErrorMsg from "@/domains/shared/component/ErrorMsg";
import Input from "@/domains/shared/component/Input";
import DonateButton from "@/domains/shared/component/querying-component/DonateButton";
import Spacing from "@/domains/shared/component/Spacing";
import Title from "@/domains/shared/component/Title";
import useResetableState from "@/domains/shared/hooks/useResetableState";
import { useMyUnion } from "@/domains/query-hook/queries/unions";
import { css } from "@emotion/react";

const leftAlignStyle = css`
  display: flex;
  justify-content: flex-end;
`;

export default function DonationModal() {
  const { data } = useMyUnion();
  const [error, setError, resetError] = useResetableState({
    status: "",
    message: "",
  });
  const [amount, setAmount] = useState(0);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    resetError();
    const stringifiedNumber = e.target.value;
    if (stringifiedNumber) {
      setAmount(Number(stringifiedNumber));
    }
  };

  if (!data?.data) return <div>Not Found</div>;

  return (
    <div>
      <Spacing heightGap={20} />
      <Title text="유니온 기여하기" />
      <Spacing heightGap={5} />
      <Input isOnlyNumber onChange={onInputChange} />
      <ErrorMsg text={error?.message} />
      <Spacing heightGap={25} />
      <div css={leftAlignStyle}>
        <DonateButton
          targetUnion={data.data.id}
          amount={amount}
          onValidatedWhenClick={(args) => setError(args)}
        />
      </div>
    </div>
  );
}
