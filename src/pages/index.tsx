import { NextPage } from "next";
import ProfileHeader from "@/domains/profile/layouts/ProfileHeader";
import DefaultLayout from "@/domains/shared/component/layout/DefaultLayout";
import SuspensableBox from "@/domains/shared/component/layout/SuspensableBox";
import withAuthentication from "@/domains/shared/hoc/auth/withAuthentication";
import MyAccount from "@/domains/profile/layouts/MyAccount";
import FriendsList from "@/domains/profile/layouts/FriendsList";

const Home: NextPage = () => {
  return (
    <DefaultLayout isLogined>
      <SuspensableBox fallback={<div>Loading...</div>}>
        <ProfileHeader />
      </SuspensableBox>
      <SuspensableBox fallback={<div>Loading...</div>}>
        <MyAccount />
      </SuspensableBox>
      <SuspensableBox title="친구 목록" fallback={<div>Loading...</div>}>
        <FriendsList />
      </SuspensableBox>
    </DefaultLayout>
  );
};

export default withAuthentication(Home);
