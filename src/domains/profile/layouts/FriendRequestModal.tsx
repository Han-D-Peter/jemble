import { ChangeEvent, Suspense, useCallback, useState } from "react";
import _ from "lodash";
import { debounce } from "lodash-es";
import ErrorMsg from "@/domains/shared/component/ErrorMsg";
import Input from "@/domains/shared/component/Input";
import Spacing from "@/domains/shared/component/Spacing";
import Title from "@/domains/shared/component/Title";
import useResetableState from "@/domains/shared/hooks/useResetableState";
import SearchedUSersList from "@/domains/profile/layouts/SearchedUsersList";
import Spinner from "@/domains/shared/component/Spinner";

export default function FriendRequestModal() {
  const [error, setError, resetError] = useResetableState({
    status: "",
    message: "",
  });
  const [keyword, setKeyword] = useState("");

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    resetError();
    setKeyword(e.target.value);
  };
  const debouncedChangeHandler = useCallback(debounce(changeHandler, 300), []);

  return (
    <div>
      <Spacing heightGap={20} />
      <Title text="친구추가" />
      <Spacing heightGap={5} />
      <Input onChange={debouncedChangeHandler} />
      <ErrorMsg text={error?.message} />
      <Spacing heightGap={25} />
      <Suspense fallback={<Spinner />}>
        <SearchedUSersList keyword={keyword} />
      </Suspense>
    </div>
  );
}
