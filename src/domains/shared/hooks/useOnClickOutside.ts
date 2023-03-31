import { RefObject, useCallback, useEffect } from "react";

export function useOnClickOutside(
  ref: RefObject<HTMLElement>,
  callback: () => void
) {
  const handleEvent = useCallback(
    ({ target }: MouseEvent | TouchEvent) => {
      if (target === null) {
        return;
      }

      if (!ref.current) {
        return;
      }

      if (ref.current && target !== null) {
        if (!ref.current.contains(target as Node)) {
          callback();
        }
      }
    },
    [callback]
  );

  useEffect(() => {
    document.addEventListener("click", handleEvent);
    // document.addEventListener("touchend", handleEvent);

    return () => {
      document.removeEventListener("click", handleEvent);
      // document.removeEventListener("touchend", handleEvent);
    };
  });
}
