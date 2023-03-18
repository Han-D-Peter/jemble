import DefaultLayout from "@/domains/shared/component/layout/DefaultLayout";
import withAuthentication from "@/domains/shared/hoc/auth/withAuthentication";
import { NextPage } from "next";

const MyProfile: NextPage = () => {
  return (
    <DefaultLayout isLogined>
      <div>MyProfile</div>
    </DefaultLayout>
  );
};

export default withAuthentication(MyProfile);
