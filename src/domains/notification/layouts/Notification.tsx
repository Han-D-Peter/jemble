import { useTransactions } from "@/domains/query-hook/queries/transactions";
import Spinner from "@/domains/shared/component/Spinner";
import { parseTransactions } from "@/domains/shared/utils/componentUtils";
import { css } from "@emotion/react";
import { useSession } from "next-auth/react";
import { Suspense } from "react";

interface NotificationBoxProps {}

const notificationStyle = css``;

export default function NotificationBox({}: NotificationBoxProps) {
  const me = useSession();
  const { data } = useTransactions();
  return (
    <div css={notificationStyle}>
      {data?.data?.transactions.map((item) => {
        return (
          <Suspense fallback={<Spinner size="sm" />}>
            {parseTransactions(item, me.data?.user.id as string)}
          </Suspense>
        );
      })}
    </div>
  );
}
