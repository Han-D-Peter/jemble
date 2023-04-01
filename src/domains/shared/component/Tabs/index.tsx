import { ReactNode, useMemo, useState } from "react";
import Box from "../layout/Box";
import TabsHeader from "./TabsHeader";
import TabsList from "./TabsList";
import { TabsContext } from "./useTabs";

interface TabsContainer {
  /**
   * 제일 첫줄에 입력된 값이 기본 값이 됩니다.
   */
  tabStacks?: {
    [key: string]: ReactNode;
  };
}

export default function TabsContainer({
  tabStacks = {
    first: <div>first</div>,
    second: <div>second</div>,
    third: <div>third</div>,
  },
}: TabsContainer) {
  const [selectedKey, setSelectedKey] = useState(Object.keys(tabStacks)[0]);

  const changeKey = (key: string) => {
    setSelectedKey(key);
  };

  const providerValues = useMemo(
    () => ({ tabStacks, selectedKey, changeKey }),
    [tabStacks, selectedKey, changeKey]
  );

  return (
    <TabsContext.Provider value={providerValues}>
      <Box noMargin>
        <TabsHeader />
        <TabsList />
      </Box>
    </TabsContext.Provider>
  );
}

TabsContainer.Header = TabsHeader;
TabsContainer.List = TabsList;
