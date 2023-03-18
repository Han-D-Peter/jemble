import DefaultLayout from "@/domains/shared/component/layout/DefaultLayout";
import withAuthentication from "@/domains/shared/hoc/auth/withAuthentication";
import { NextPage } from "next";

const Notification: NextPage = () => {
  return (
    <DefaultLayout isLogined>
      <div>Notification</div>
    </DefaultLayout>
  );
};

export default withAuthentication(Notification);
