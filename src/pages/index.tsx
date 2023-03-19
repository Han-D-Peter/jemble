import DefaultLayout from "@/domains/shared/component/layout/DefaultLayout";
import withAuthentication from "@/domains/shared/hoc/auth/withAuthentication";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <DefaultLayout isLogined>
      <div>profile</div>
    </DefaultLayout>
  );
};

export default withAuthentication(Home);
