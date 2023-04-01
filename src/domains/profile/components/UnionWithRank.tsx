import { useGetUnionRank } from "@/domains/query-hook/queries/unions";
import StatusRow from "@/domains/shared/component/StatusRow";
import { getOrdinal } from "@/domains/shared/utils/utils";

interface UnionWithRankProps {
  unionName: string;
}

export default function UnionWithRank({ unionName }: UnionWithRankProps) {
  const { data } = useGetUnionRank(unionName);

  if (!data?.data) return <div>Not Found</div>;
  return (
    <StatusRow
      point={data.data.points}
      name={data.data.name}
      image={data.data.union_image}
      icon={`${getOrdinal(data.data.rank)}`}
    />
  );
}
