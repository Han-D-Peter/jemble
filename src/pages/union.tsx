import DefaultLayout from "@/domains/shared/component/layout/DefaultLayout";
import withAuthentication from "@/domains/shared/hoc/auth/withAuthentication";
import { NextPage } from "next";

const Union: NextPage = () => {
  return (
    <DefaultLayout isLogined>
      <div>Union</div>
    </DefaultLayout>
  );
};

export default withAuthentication(Union);
