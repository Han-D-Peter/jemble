import { memo, useEffect, useState } from "react";
import UserRepository from "@/domains/query-hook/repository/users";
import ProfileRow from "@/domains/shared/component/StatusRow";
import { CheckUsersResponse, NetworkResult } from "@/interface/network";
import ReuqestFrinedButton from "@/domains/shared/component/querying-component/RequestFriendButton";

interface SearchedUsersListProps {
  keyword: string;
}

function SearchedUSersList({ keyword }: SearchedUsersListProps) {
  const [data, setData] = useState<NetworkResult<CheckUsersResponse>>();
  const [isFetched, setIsFetched] = useState(false);
  const fetch = async () => {
    const result = await UserRepository.searchUser(keyword);
    setData(result);
    setIsFetched(true);
  };
  useEffect(() => {
    fetch();
  }, [keyword]);

  return (
    <>
      {data?.data?.users.length === 0 && !isFetched && null}
      {data?.data?.users.length === 0 && isFetched && <div>검색결과 없음.</div>}
      {data?.data?.users.map((user) => (
        <ProfileRow
          key={user.name}
          image={user.profile_image}
          name={user.name ?? "unknown"}
          point={user.points}
          icon={<ReuqestFrinedButton userId={user.id} />}
        />
      ))}
    </>
  );
}

export default memo(SearchedUSersList);
