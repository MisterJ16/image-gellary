import { useEffect } from "react";
const useOutsideClick = (
  ref?: React.RefObject<HTMLInputElement> | any,
  callback?: any
) => {
  const handleClick = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback(e);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
    // eslint-disable-next-line
  }, []);
};

export default useOutsideClick;
