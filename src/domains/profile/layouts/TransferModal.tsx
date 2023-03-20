import { useGetFriends } from "@/domains/query-hook/queries/friends";
import ErrorMsg from "@/domains/shared/component/ErrorMsg";
import Input from "@/domains/shared/component/Input";
import ProfileRow from "@/domains/shared/component/ProfileRow";
import TransferButton from "@/domains/shared/component/querying-component/TransferButton";
import Spacing from "@/domains/shared/component/Spacing";
import Title from "@/domains/shared/component/Title";
import useResetableState from "@/domains/shared/hooks/useResetableState";
import { ChangeEvent, useState } from "react";

export default function TransferModal() {
  const [error, setError, resetError] = useResetableState({
    status: "",
    message: "",
  });
  const [amount, setAmount] = useState(0);
  const { data } = useGetFriends();

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
      <Title text="포인트 보내기" />
      <Spacing heightGap={5} />
      <Input isOnlyNumber onChange={onInputChange} />
      <ErrorMsg text={error?.message} />
      <Spacing heightGap={25} />
      {data.data.friends.map(friend => (
        <ProfileRow
          key={friend.name}
          image={friend.profile_image}
          name={friend.name}
          point={friend.points}
          icon={
            <TransferButton
              target={friend.id}
              amount={amount}
              onValidatedWhenClick={args => setError(args)}
            />
          }
        />
      ))}
    </div>
  );
}
