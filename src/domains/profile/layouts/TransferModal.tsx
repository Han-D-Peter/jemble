import { useFriends } from "@/domains/query-hook/queries/friends";
import ErrorMsg from "@/domains/shared/component/ErrorMsg";
import Input from "@/domains/shared/component/Input";
import ProfileRow from "@/domains/shared/component/StatusRow";
import TransferButton from "@/domains/shared/component/querying-component/TransferButton";
import Spacing from "@/domains/shared/component/Spacing";
import Title from "@/domains/shared/component/Title";
import useResetableState from "@/domains/shared/hooks/useResetableState";
import { ChangeEvent, useState } from "react";
import { useMe } from "@/domains/query-hook/queries/users";

export default function TransferModal() {
  const [error, setError, resetError] = useResetableState({
    status: "",
    message: "",
  });
  const [amount, setAmount] = useState<string>("");
  const { data } = useFriends();
  const { data: mine } = useMe();

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
      <Title text="포인트 보내기" />
      <Spacing heightGap={5} />
      <Input isOnlyNumber value={amount} onChange={onInputChange} autoFocus />
      <ErrorMsg text={error?.message} />
      <Spacing heightGap={25} />
      {data.data.friends.map((friend) => (
        <ProfileRow
          key={friend.name}
          image={friend.profile_image}
          name={friend.name}
          point={friend.points}
          icon={
            <TransferButton
              target={friend.id}
              amount={Number(amount)}
              onValidatedWhenClick={(args) => setError(args)}
            />
          }
        />
      ))}
    </div>
  );
}
