import React from "react";
import ReactPaginate from "react-paginate";
import {motion} from "framer-motion";

const PaginationButtons = ({ totalPages, currentPage, setCurrentPage }) => {

    const handlePageClick = ({selected}) => {
        setCurrentPage(selected);
    }

    const paginationVariants = {
        hidden: {
            opacity: 0,
            y: 100
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20,
                duration: 1
            }
        }
    };

    const showNextButton = currentPage !== totalPages - 1;
    const showPrevButton = currentPage !== 0;

  return (
    <motion.div 
        variants={paginationVariants}
        initial="hidden"
        animate="visible"
    >
      <ReactPaginate
        breakLabel={
            <span className="mr-2">
                ...
            </span>
        }
        nextLabel={
          <button disabled={!showNextButton} className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              ></path>
            </svg>
          </button>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel={
          <button disabled={!showPrevButton} className="flex items-center mr-2 gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              ></path>
            </svg>
            Previous
          </button>
        }
        containerClassName="flex justify-center items-center mt-8 mb-4"
        pageClassName="flex justify-center items-center block border border-solid border-bg-gray-900/10 hover:bg-[#00a99d] hover:text-white w-10 h-10 rounded-md mr-2"
        activeClassName="bg-[#00a99d] text-white"
        initialPage={currentPage}
      />
    </motion.div>
  );
};

export default PaginationButtons;
