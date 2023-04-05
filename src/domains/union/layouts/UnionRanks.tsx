import { useUnionsRank } from "@/domains/query-hook/queries/unions";
import ProfileRow from "@/domains/shared/component/StatusRow";
import { css } from "@emotion/react";
import { getOrdinal } from "@/domains/shared/utils/utils";

interface UnionRanksProps {}

export default function UnionRanks({}: UnionRanksProps) {
  const { data } = useUnionsRank();

  if (!data?.data) return <div>Not Found</div>;
  return (
    <div
      css={css`
        min-height: 450px;
      `}
    >
      {data.data.map((union, index) => (
        <ProfileRow
          key={union.name}
          image={union.union_image}
          name={union.name}
          point={union.points}
          icon={getOrdinal(index + 1)}
        />
      ))}
    </div>
  );
}
