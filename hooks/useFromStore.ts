import { useState, useEffect } from "react";

export function useFromStore<T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  storeCallback: (state: T) => F
) {
  const [state, setState] = useState<F>();
  const storeState = store(storeCallback) as F;

  useEffect(() => {
    setState(storeState);
  }, [storeState]);

  return state;
}
