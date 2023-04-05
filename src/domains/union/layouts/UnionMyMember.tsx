import { useMyUnion } from "@/domains/query-hook/queries/unions";
import ProfileRow from "@/domains/shared/component/StatusRow";
import { getOrdinal } from "@/domains/shared/utils/utils";
import { css } from "@emotion/react";

interface UnionMyMember {}

export default function UnionMyMember({}: UnionMyMember) {
  const { data } = useMyUnion();
  if (!data?.data) return <div>Not Found</div>;
  return (
    <div
      css={css`
        min-height: 450px;
      `}
    >
      {data.data.user.map((user, index) => (
        <ProfileRow
          key={user.name}
          image={user.profile_image}
          name={user.name}
          point={user.points}
          icon={getOrdinal(index + 1)}
        />
      ))}
    </div>
  );
}
