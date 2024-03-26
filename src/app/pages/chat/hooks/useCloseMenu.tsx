import { useEffect, useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useCloseMenu(handler: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: unknown) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [ref, handler]);

  return ref;
}
