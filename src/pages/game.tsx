import MyInfo from "@/domains/game/components/MyInfo";
import GameBox from "@/domains/game/layouts/GameBox";
import Guide from "@/domains/game/layouts/Guide";
import Box from "@/domains/shared/component/layout/Box";
import DefaultLayout from "@/domains/shared/component/layout/DefaultLayout";
import SuspensableBox from "@/domains/shared/component/layout/SuspensableBox";
import Spacing from "@/domains/shared/component/Spacing";
import SubTitle from "@/domains/shared/component/SubTitle";
import withAuthentication from "@/domains/shared/hoc/auth/withAuthentication";
import useModal from "@/domains/shared/hooks/useModal";
import { NextPage } from "next";
import { useEffect } from "react";

const Game: NextPage = () => {
  const { open } = useModal();

  useEffect(() => {
    open({
      children: <Guide />,
    });
  }, []);
  return (
    <DefaultLayout isLogined centered>
      <Guide />
      <Spacing heightGap={10} />
      <SuspensableBox>
        <MyInfo />
      </SuspensableBox>
      <Spacing heightGap={10} />
      <GameBox />
    </DefaultLayout>
  );
};

export default withAuthentication(Game);
