import { ChangeEvent, useState } from "react";
import ErrorMsg from "@/domains/shared/component/ErrorMsg";
import Input from "@/domains/shared/component/Input";
import DonateButton from "@/domains/shared/component/querying-component/DonateButton";
import Spacing from "@/domains/shared/component/Spacing";
import Title from "@/domains/shared/component/Title";
import useResetableState from "@/domains/shared/hooks/useResetableState";
import { useMyUnion } from "@/domains/query-hook/queries/unions";
import { css } from "@emotion/react";
import { useMe } from "@/domains/query-hook/queries/users";

const leftAlignStyle = css`
  display: flex;
  justify-content: flex-end;
`;

export default function DonationModal() {
  const { data } = useMyUnion();
  const { data: mine } = useMe();
  const [error, setError, resetError] = useResetableState({
    status: "",
    message: "",
  });
  const [amount, setAmount] = useState<string>("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    resetError();
    const stringifiedNumber = e.target.value;

    const userPoints = mine?.data?.me.points as number;

    if (Number(stringifiedNumber) > userPoints) {
      alert("보유 금액을 초과합니다.");
      return;
    }

    setAmount(stringifiedNumber);
  };

  if (!data?.data || !mine?.data) return <div>Not Found</div>;

  return (
    <div>
      <Spacing heightGap={20} />
      <Title text="유니온 기여하기" />
      <Spacing heightGap={5} />
      <Input isOnlyNumber value={amount} onChange={onInputChange} autoFocus />
      <ErrorMsg text={error?.message} />
      <Spacing heightGap={25} />
      <div css={leftAlignStyle}>
        <DonateButton
          targetUnion={data.data.id}
          amount={Number(amount)}
          onValidatedWhenClick={(args) => setError(args)}
        />
      </div>
    </div>
  );
}
