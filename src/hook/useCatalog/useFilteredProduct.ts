import { useState, useMemo, useEffect, useCallback } from "react";
import { shallow } from "zustand/shallow";

//store
import useFilteredProductStore from "store/useFilteredProductStore.store";

//hook
import { useGlobalLoading } from "../useGlobalLoading";

//type
import { ProductsType } from "api/products/products.type";

type useFilteredProductPropsType = {
  products: ProductsType | null;
  searchText: string;
};

function useFilteredProduct({ products, searchText }: useFilteredProductPropsType) {
  const { selectedCategories, setFilteredProduct } = useFilteredProductStore(
    (state) => ({
      selectedCategories: state.selectedCategories,
      setFilteredProduct: state.setFilteredProduct,
    }),
    shallow,
  );

  const { onUpdateIsOpen } = useGlobalLoading();

  //useState
  const [sortOrder, setSortOrder] = useState<string>("asc");

  //useMemo
  const filteredProduct = useMemo(() => {
    const filtered =
      products?.data?.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchText.toLowerCase().trim()) &&
          (selectedCategories.length === 0 ||
            (product.category &&
              product.category.id &&
              selectedCategories.includes(product.category.id))),
      ) || [];

    const sortedProducts = filtered.sort((a, b) => {
      const nameA = a.name || "";
      const nameB = b.name || "";
      const priceA = a.price || 0;
      const priceB = b.price || 0;

      switch (sortOrder) {
        case "asc":
          return nameA.localeCompare(nameB);
        case "desc":
          return nameB.localeCompare(nameA);
        case "price_asc":
          return priceA - priceB;
        case "price_desc":
          return priceB - priceA;
        default:
          return 0;
      }
    });

    return sortedProducts;
  }, [searchText, products, selectedCategories, sortOrder]);

  //useEffect
  useEffect(() => {
    setFilteredProduct(filteredProduct);
  }, [filteredProduct]);

  //useCallback SortOrder
  const handleSortOrderChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdateIsOpen();
    const newSortOrder = event.target.value;
    const timerId = setTimeout(() => {
      setSortOrder(newSortOrder);
      onUpdateIsOpen();
    }, 250);
    return () => clearTimeout(timerId);
  }, []);

  return {
    sortOrder,
    filteredProduct,
    handleSortOrderChange,
  };
}

export default useFilteredProduct;
//.sort() สำหรับเรียงลำดับทั้ง number และ string
//.sort() การใช้งานกับ number ถ้าเป็นการใช้แบบปกติจะเรียงลำดับตามค่า Unicode ซึ่งอาจทำให้การเรียงลำดับไม่ถูกต้องตามค่าตัวเลข เช่น const numberArray = [10, 5, 8, 1, 7] numberArray.sort() Output: [1, 10, 5, 7, 8]
//แต่ .sort((a, b) => a.localeCompare(b)) เพื่อเปรียบเทียบข้อมูลตัวเลข ซึ่งจะทำให้ข้อมูลถูกเรียงลำดับจากน้อยไปหามากอย่างถูกต้องตามค่าตัวเลข numberArray.sort((a, b) => a - b) Output: [1, 5, 7, 8, 10]
//.sort() การใช้งานกับ string ถ้าเป็นการใช้แบบปกติจะเรียงลำดับตามค่า Unicode ของข้อมูลการเรียงลำดับนี้อาจไม่ตรงในบางกรณี
//แต่ .sort((a, b) => a.localeCompare(b)) การใช้แบบนี้จะเรียงลำดับถูกต้องตามภาษาท้องถิ่น ซึ่งอาจต่างจากการเรียงลำดับตามค่า Unicode

//trim() สำหรับตัดช่องว่างออกไป
//parseInt(ข้อมูลที่ต้องการจะแปล, แปลงเป็นอะไร เช่น เลขฐาน 2,10,16)
