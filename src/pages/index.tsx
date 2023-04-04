import { NextPage } from "next";
import ProfileHeader from "@/domains/profile/layouts/ProfileHeader";
import DefaultLayout from "@/domains/shared/component/layout/DefaultLayout";
import SuspensableBox from "@/domains/shared/component/layout/SuspensableBox";
import withAuthentication from "@/domains/shared/hoc/auth/withAuthentication";
import MyAccount from "@/domains/profile/layouts/MyAccount";
import FriendsList from "@/domains/profile/layouts/FriendsList";
import Spinner from "@/domains/shared/component/Spinner";
import Timer from "@/domains/shared/component/Timer";

const Home: NextPage = () => {
  return (
    <DefaultLayout isLogined>
      <SuspensableBox fallback={<Spinner size="sm" />}>
        <ProfileHeader />
      </SuspensableBox>
      <SuspensableBox fallback={<Spinner size="md" />}>
        <MyAccount />
      </SuspensableBox>
      <SuspensableBox title="친구 목록" fallback={<Spinner size="lg" />}>
        <FriendsList />
      </SuspensableBox>
      <Timer />
    </DefaultLayout>
  );
};

export default withAuthentication(Home);
