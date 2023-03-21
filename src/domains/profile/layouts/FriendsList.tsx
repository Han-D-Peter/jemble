import { css } from "@emotion/react";
import { useGetFriends } from "@/domains/query-hook/queries/friends";
import FriendRequestAccessButton from "@/domains/profile/components/FriendRequestAccessButton";
import ProfileRow from "@/domains/shared/component/ProfileRow";
import { getOrdinal } from "@/domains/shared/utils/utils";

interface FriendsListProps {}

export default function FriendsList({}: FriendsListProps) {
  const { data } = useGetFriends();

  if (!data?.data) return <div>Not Found</div>;
  return (
    <div
      css={css`
        min-height: 450px;
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: flex-end;
          width: 100%;
        `}
      >
        <FriendRequestAccessButton />
      </div>
      {data.data.friends.map((friend, index) => (
        <ProfileRow
          key={friend.name}
          image={friend.profile_image}
          name={friend.name}
          point={friend.points}
          icon={getOrdinal(index + 1)}
        />
      ))}
    </div>
  );
}
