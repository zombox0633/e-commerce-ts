import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { shallow } from "zustand/shallow";

//store
import useFilteredProductStore from "store/useFilteredProductStore.store";

//hook
import { useGlobalLoading } from "../useGlobalLoading";


function usePagination() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { filteredProduct, selectedCategories } = useFilteredProductStore(
    (state) => ({
      filteredProduct: state.filteredProduct,
      selectedCategories: state.selectedCategories,
    }),
    shallow,
  );

  const { onUpdateIsOpen } = useGlobalLoading();

  //useState
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProduct.slice(indexOfFirstItem, indexOfLastItem);

  //useEffect
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1");
    setCurrentPage(page);
  }, [location]);

  useEffect(() => {
    if (selectedCategories.length > 0) {
      setCurrentPage(1);
      navigate("?page=1");
    }
  }, [selectedCategories, navigate]);

  //useCallback
  const handlePerPageChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateIsOpen();
    const newPerPage = event.target.value;
    const timerId = setTimeout(() => {
      setItemsPerPage(parseInt(newPerPage));
      onUpdateIsOpen();
    }, 250);
    return () => clearTimeout(timerId);
  }, []);

  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    currentItems,
    handlePerPageChange,
  };
}

export default usePagination;
//parseInt(string, radix) สามารถแปลงเป็นตัวเลข และหยุดทันทีเมื่อเจอตัวอักษรที่ไม่สามารถแปลงเป็นตัวเลขได้ เช่น parseInt("1010", 2); output 10
