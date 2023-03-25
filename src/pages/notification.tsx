import { NextPage } from "next";
import NotificationBox from "@/domains/notification/layouts/Notification";
import DefaultLayout from "@/domains/shared/component/layout/DefaultLayout";
import SuspensableBox from "@/domains/shared/component/layout/SuspensableBox";
import withAuthentication from "@/domains/shared/hoc/auth/withAuthentication";

const Notification: NextPage = () => {
  return (
    <DefaultLayout isLogined>
      <SuspensableBox title="알림" fullHeight>
        <NotificationBox />
      </SuspensableBox>
    </DefaultLayout>
  );
};

export default withAuthentication(Notification);
