import { useGetUnionsRank } from "@/domains/query-hook/queries/unions";
import StatusRow from "@/domains/shared/component/StatusRow";
import Box from "@/domains/shared/component/layout/Box";
import { getOrdinal } from "@/domains/shared/utils/utils";

export default function UnionProfile() {
  const { data } = useGetUnionsRank();

  if (!data?.data?.length || data?.data?.length === 0)
    return <div>Not Found</div>;
  return (
    <Box>
      <StatusRow
        point={data.data[0].points}
        name={data.data[0].name}
        image={data.data[0].union_image}
        icon={`${getOrdinal(data.data[0].rank)}`}
      />
    </Box>
  );
}
