import { Suspense } from "react";
import SpinnerBox from "@/domains/shared/component/SpinnerBox";
import Tabs from "@/domains/shared/component/Tabs";
import UnionRanks from "./UnionRanks";
import UnionMyMember from "./UnionMyMember";

interface UnionTabsProps {}

export default function UnionTabsProps({}: UnionTabsProps) {
  return (
    <Tabs
      tabStacks={{
        Rank: (
          <Suspense fallback={<SpinnerBox />}>
            <UnionRanks />
          </Suspense>
        ),
        Member: (
          <Suspense fallback={<SpinnerBox />}>
            <UnionMyMember />
          </Suspense>
        ),
      }}
    />
  );
}
