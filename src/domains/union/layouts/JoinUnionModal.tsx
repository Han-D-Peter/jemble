import ErrorMsg from "@/domains/shared/component/ErrorMsg";
import Input from "@/domains/shared/component/Input";
import Spacing from "@/domains/shared/component/Spacing";
import Spinner from "@/domains/shared/component/Spinner";
import Title from "@/domains/shared/component/Title";
import useResetableState from "@/domains/shared/hooks/useResetableState";
import { debounce } from "lodash";
import {
  ChangeEvent,
  Suspense,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import SearchedUnionList from "../components/SearchedUnionList";

export default function JoinUnionModal() {
  const inputRef = useRef<HTMLInputElement>(null);
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

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });
  return (
    <div>
      <Spacing heightGap={20} />
      <Title text="유니온 가입신청" />
      <Input ref={inputRef} onChange={debouncedChangeHandler} />
      <ErrorMsg text={error.message} />
      <Spacing heightGap={25} />
      <Suspense fallback={<Spinner />}>
        <SearchedUnionList keyword={keyword} />
      </Suspense>
    </div>
  );
}
