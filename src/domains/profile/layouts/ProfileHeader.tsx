import { useGetMyUnion } from "@/domains/query-hook/queries/unions";
import UnionWithRank from "@/domains/profile/components/UnionWithRank";
import SubTitle from "@/domains/shared/component/SubTitle";

interface ProfileHeaderProps {}

export default function ProfileHeader({}: ProfileHeaderProps) {
  const { data, isError } = useGetMyUnion();

  if (isError) return <SubTitle text="소속 유니온이 없습니다." />;
  if (!data?.data) return <SubTitle text="소속 유니온이 없습니다." />;

  return <UnionWithRank unionName={data.data.name} />;
}
