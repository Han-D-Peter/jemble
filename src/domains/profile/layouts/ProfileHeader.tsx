import { useGetMyUnion } from "@/domains/query-hook/queries/unions";
import UnionWithRank from "@/domains/profile/components/UnionWithRank";

interface ProfileHeaderProps {}

export default function ProfileHeader({}: ProfileHeaderProps) {
  const { data } = useGetMyUnion();

  if (!data?.data) return <div>Not Found</div>;

  return <UnionWithRank unionName={data.data.name} />;
}
