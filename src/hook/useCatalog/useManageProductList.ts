import { useMemo, useCallback } from "react";

//hook
import useCatalogData from "./useCatalogData";
import useSearchProduct from "./useSearchProduct";
import useCategoryFilterProduct from "./useCategoryFilterProduct";
import useFilteredProduct from "./useFilteredProduct";
import usePagination from "./usePagination";

function useManageProductList() {
  const [products, category] = useCatalogData();

  const { searchText, setSearchText, searchRef, handleSearchSubmit} =
    useSearchProduct();
  const { currentPage, setCurrentPage, itemsPerPage, currentItems, handlePerPageChange } =
    usePagination();
  const { handleCategorySubmit, handleResetForm, handleCategoryInputChange } =
    useCategoryFilterProduct({ setSearchText: setSearchText });
  const { sortOrder, filteredProduct, handleSortOrderChange } = 
    useFilteredProduct({
    products: products,
    searchText: searchText,
  });

  //useMemo
  const dataCategoryFilter = useMemo(() => category?.data, [category]);
  const totalItemsPagination = useMemo(() => filteredProduct.length, [filteredProduct]);

  //useCallback
  const onPageChangePagination = useCallback(
    (pageNumber: number) => setCurrentPage(pageNumber),
    [],
  );

  return {
    sortOrder,
    searchRef,
    handleSearchSubmit,
    handleCategorySubmit,
    handleResetForm,
    handleCategoryInputChange,
    handleSortOrderChange,
    currentPage,
    itemsPerPage,
    currentItems,
    handlePerPageChange,
    dataCategoryFilter,
    totalItemsPagination,
    onPageChangePagination,
  };
}

export default useManageProductList;
