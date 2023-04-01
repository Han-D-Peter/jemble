import Spinner from "@/domains/shared/component/Spinner";
import { css } from "@emotion/react";
import { Suspense } from "react";
import UnionProfile from "../components/UnionProfile";
import UnionStatus from "./UnionStatus";
import UnionTabsProps from "./UnionTabs";

export default function HasUnion() {
  return (
    <div
      css={css`
        width: 100%;
      `}
    >
      <Suspense fallback={<Spinner size="sm" />}>
        <UnionProfile />
      </Suspense>
      <Suspense fallback={<Spinner size="sm" />}>
        <UnionStatus />
      </Suspense>
      <UnionTabsProps />
    </div>
  );
}
