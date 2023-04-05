import { useGetMe } from "@/domains/query-hook/queries/users";
import ProfileRow from "@/domains/shared/component/StatusRow";

export default function MyInfo() {
  const { data } = useGetMe();

  if (!data?.data) return <h1>Not Found</h1>;

  return (
    <ProfileRow
      image={data.data.me.profile_image}
      name={data.data.me.name}
      point={data.data.me.points}
    />
  );
}
