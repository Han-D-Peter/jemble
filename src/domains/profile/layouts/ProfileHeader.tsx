import { useGetMyUnion } from "@/domains/query-hook/queries/unions";
import Box from "@/domains/shared/component/layout/Box";
import ProfileRow from "@/domains/shared/component/ProfileRow";

interface ProfileHeaderProps {}

export default function ProfileHeader({}: ProfileHeaderProps) {
  const { data } = useGetMyUnion();

  if (!data?.data) return <div>Not Found</div>;

  return (
    <ProfileRow
      point={data.data.points}
      name={data.data.name}
      image={data.data.union_image}
    />
  );
}
