import { useGetMe } from "@/domains/query-hook/queries/users";
import DisplayPoint from "@/domains/shared/component/DisplayPoint";
import Spacing from "@/domains/shared/component/Spacing";
import SubTitle from "@/domains/shared/component/SubTitle";
import { css } from "@emotion/react";
import DonateAccessButton from "../components/DonateAccessButton";
import TransferAccessButton from "../components/TransferAccessButton";

interface MyAccountProps {}

export default function MyAccount({}: MyAccountProps) {
  const { data } = useGetMe();

  if (!data?.data) return <div>Not Found</div>;

  return (
    <>
      <Spacing heightGap={15} />
      <SubTitle text="보유 포인트" />
      <DisplayPoint point={data.data.me.points} />
      <Spacing heightGap={10} />
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
        `}
      >
        <DonateAccessButton />
        <Spacing widthGap={13} />
        <TransferAccessButton />
      </div>
      <Spacing heightGap={15} />
    </>
  );
}
