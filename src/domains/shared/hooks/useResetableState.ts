import { SetStateAction, useState } from "react";

export default function useResetableState<T>(
  initialState: T
): [T, React.Dispatch<SetStateAction<T>>, () => void] {
  const [state, setState] = useState(initialState);

  const resetState = () => setState(initialState);

  return [state, setState, resetState];
}
