import { ReactElement } from "react";
import ProfileRow from "@/domains/shared/component/ProfileRow";
import { useUser } from "@/domains/query-hook/queries/users";

interface TransferTransactionRowProps {
  hostId: string;
  point: number;
  icon?: string | ReactElement;
}

export default function TransferTransactionRow({
  hostId,
  point,
  icon,
}: TransferTransactionRowProps) {
  const { data } = useUser(hostId);

  if (!data?.data) return <div>Not Found</div>;
  return (
    <ProfileRow
      image={data.data.user.profile_image ?? "none"}
      name={data.data.user.name ?? "unknown"}
      point={point}
      icon={icon}
    />
  );
}
