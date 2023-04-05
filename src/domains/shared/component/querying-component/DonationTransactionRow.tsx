import { ReactElement } from "react";
import ProfileRow from "@/domains/shared/component/StatusRow";
import { useUnion } from "@/domains/query-hook/queries/unions";

interface DonationTransactionRowProps {
  unionName: string;
  point: number;
  icon?: string | ReactElement;
}

export default function DonationTransactionRow({
  unionName,
  point,
  icon,
}: DonationTransactionRowProps) {
  const { data } = useUnion(unionName);
  if (!data?.data) return <div>Not Found</div>;
  return (
    <ProfileRow
      image={data.data.union_image}
      name={data.data.name ?? "unknown"}
      point={point}
      icon={icon}
    />
  );
}
