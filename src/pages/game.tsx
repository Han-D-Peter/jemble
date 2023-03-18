import DefaultLayout from "@/domains/shared/component/layout/DefaultLayout";
import withAuthentication from "@/domains/shared/hoc/auth/withAuthentication";
import { NextPage } from "next";

const Game: NextPage = () => {
  return (
    <DefaultLayout isLogined>
      <div>Game</div>
    </DefaultLayout>
  );
};

export default withAuthentication(Game);
