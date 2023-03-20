import { useGetMyUnion } from "@/domains/query-hook/queries/unions";
import UnionWithRank from "@/domains/profile/components/UnionWithRank";

interface ProfileHeaderProps {}

export default function ProfileHeader({}: ProfileHeaderProps) {
  const { data, isError } = useGetMyUnion();

  if (!data?.data || isError) return <div>소속된 유니온이 없습니다.</div>;

  return <UnionWithRank unionName={data.data.name} />;
}
