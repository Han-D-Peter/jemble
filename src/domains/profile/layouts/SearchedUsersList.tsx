import { memo, useEffect, useState } from "react";
import UserRepository from "@/domains/query-hook/repository/users";
import { useSearchUsersByKeyword } from "@/domains/query-hook/queries/users";
import ProfileRow from "@/domains/shared/component/ProfileRow";
import { CheckUsersResponse, NetworkResult } from "@/interface/network";
import ReuqestFrinedButton from "@/domains/shared/component/querying-component/RequestFriendButton";

interface SearchedUsersListProps {
  keyword: string;
}

function SearchedUSersList({ keyword }: SearchedUsersListProps) {
  const [data, setData] = useState<NetworkResult<CheckUsersResponse>>();
  const fetch = async () => {
    const result = await UserRepository.searchUser(keyword);
    setData(result);
  };
  useEffect(() => {
    fetch();
  }, [keyword]);

  return (
    <>
      {data?.data?.users.length === 0 && <div>검색결과 없음.</div>}
      {data?.data?.users.map(user => (
        <ProfileRow
          key={user.name}
          image={user.profile_image ?? "not found"}
          name={user.name ?? "unknown"}
          point={user.points}
          icon={<ReuqestFrinedButton userId={user.id} />}
        />
      ))}
    </>
  );
}

export default memo(SearchedUSersList);
