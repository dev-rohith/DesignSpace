import { useEffect, useRef, useState } from "react";

const usePopUp = () => {   //I preffer use the custom hooks if the operation is repeating 
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { isPopupOpen, setIsPopupOpen, dropdownRef };
};
export default usePopUp;
