//hook
import useManageProductList from "hook/useCatalog/useManageProductList";

// Components
import SearchBox from "./SearchBox";
import CategoryFilter from "./CategoryFilter";
import Product from "./Product";
import Pagination from "./Pagination";
import SelectSort from "./SelectSort";

//constraint
import { itemsPerPageOptions, sortOrderOptions } from "src/constraint/SELECT_SORT_LIST";

function ProductsList() {
  const {
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
  } = useManageProductList();

  return (
    <div className='py-[5%] lg:py-[2.5%]'>
      <div className='flex justify-center items-center mt-6 mb-3 mx-[5%]'>
        <div className='flex justify-center items-center flex-col w-full md:w-[506px] lg:w-[674px] xl:w-[920px] 2xl:w-[1000px] md:ml-[15rem] lg:ml-56 xl:ml-48 2xl:ml-20'>
          <SearchBox searchRef={searchRef} onSubmitForm={handleSearchSubmit} />
          <div className='flex justify-end items-center w-full mt-6'>
            <SelectSort
              options={Array.from(itemsPerPageOptions)}
              value={itemsPerPage}
              onChange={handlePerPageChange}
              className='hidden sm:block w-52 rounded-md border border-gray-300 mr-2 px-3 py-2 text-slate-800'
            />
            <SelectSort
              options={Array.from(sortOrderOptions)}
              value={sortOrder}
              onChange={handleSortOrderChange}
              className='w-52 rounded-md border border-gray-300 px-3 py-2 text-slate-800'
            />
          </div>
        </div>
      </div>
      <div className='flex justify-center flex-row px-[7.5%] md:px-0 md:pr-[7%] md:pl-[3%] 2xl:mr-[5%]'>
        <div className=' hidden md:block mt-10 md:mr-6 2xl:mr-0'>
          <CategoryFilter
            category={dataCategoryFilter}
            onSubmitForm={handleCategorySubmit}
            onResetForm={handleResetForm}
            onChangeInput={handleCategoryInputChange}
          />
        </div>
        <div className='flex justify-center items-center w-full md:w-[506px] lg:w-[674px] xl:w-[920px] 2xl:w-[1066px]'>
          {totalItemsPagination ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-x-6 lg:gap-x-10 gap-y-10 justify-items-center items-center my-10 z-20'>
              {currentItems?.map((data) => {
                return (
                  <Product
                    key={data.id}
                    name={data.name}
                    price={data.price}
                    img={data.img?.formats?.small?.url}
                    imgName={data.img?.name}
                    stock={data.stock ?? 0}
                  />
                );
              })}
            </div>
          ) : (
            <div className='my-20 mr-auto ml-auto'>
              <span className='text-lg sm:text-2xl text-zinc-700'>
                Product is not matched by{" "}
                <strong>
                  <i>{searchRef.current?.value}</i>
                </strong>{" "}
                !!
              </span>
            </div>
          )}
        </div>
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={totalItemsPagination}
        currentPage={currentPage}
        onPageChange={onPageChangePagination}
      />
    </div>
  );
}

export default ProductsList;
//JSON.stringify() เปลี่ยน [] เป็น text ที่สามารถแสดงใน html ได้
//JSON.parse() เปลี่ยน text เป็น []
//<pre><code>{JSON.stringify(...)}<code><pre> การแสดงข้อมูล[]
