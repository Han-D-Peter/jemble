import { memo, useEffect, useState } from "react";
import UnionRepository from "@/domains/query-hook/repository/unions";
import ProfileRow from "@/domains/shared/component/StatusRow";
import { CheckUnionsResponse, NetworkResult } from "@/interface/network";
import ReuqestFrinedButton from "@/domains/shared/component/querying-component/RequestFriendButton";
import JoinUnionButton from "@/domains/shared/component/querying-component/JoinUnionButton";

interface SearchedUnionListProps {
  keyword: string;
}

function SearchedUnionList({ keyword }: SearchedUnionListProps) {
  const [data, setData] = useState<NetworkResult<CheckUnionsResponse>>();
  const [isFetched, setIsFetched] = useState(false);
  const fetch = async () => {
    const result = await UnionRepository.searchUnions(keyword);
    setData(result);
    setIsFetched(true);
  };
  useEffect(() => {
    fetch();
  }, [keyword]);

  return (
    <>
      {data?.data?.length === 0 && !isFetched && null}
      {data?.data?.length === 0 && isFetched && <div>검색결과 없음.</div>}
      {data?.data?.map((union) => (
        <ProfileRow
          key={union.name}
          image={union.union_image}
          name={union.name ?? "unknown"}
          point={union.points}
          icon={<JoinUnionButton name={union.name} />}
        />
      ))}
    </>
  );
}

export default memo(SearchedUnionList);
