import { ReactElement } from "react";
import RequestRow from "@/domains/shared/component/RequestRow";
import { useGetUser } from "@/domains/query-hook/queries/users";

interface RequestFriendTransactionRowProps {
  hostId: string;
  description: string;
  icon: string | ReactElement;
}

export default function RequestFriendTransactionRow({
  hostId,
  description,
  icon,
}: RequestFriendTransactionRowProps) {
  const { data } = useGetUser(hostId);

  if (!data?.data) return <div>Not Found</div>;
  return (
    <RequestRow
      image={data.data.user.profile_image ?? "none"}
      name={data.data.user.name ?? "unknown"}
      description={description}
      icon={icon}
    />
  );
}
