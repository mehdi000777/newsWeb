import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Pagination = ({ page, setPage, pageCount }) => {
  const nextHandler = () => {
    if (page + 1 < pageCount) setPage(page + 1);
  };

  const beforHandler = () => {
    if (page + 1 > 1) setPage(page - 1);
  };

  return (
    <div className="flex justify-center gap-2 w-full">
      <button onClick={nextHandler}>
        <FaArrowRight />
      </button>
      <div className="flex gap-3" style={{ direction: "ltr" }}>
        {pageCount < 5 ? (
          Array.from({ length: pageCount }, (_, i) => i).map((item) => (
            <button
              key={item}
              onClick={() => setPage(item)}
              className={`${
                page === item ? "bg-orange" : "bg-primary"
              }  w-7 h-full rounded-lg text-white hover:bg-orange transition-all`}
            >
              {item + 1}
            </button>
          ))
        ) : (
          <>
            {page !== 0 && (
              <button
                onClick={() => setPage(page - 1)}
                className={`bg-primary w-7 h-full rounded-lg text-white hover:bg-orange transition-all`}
              >
                {page}
              </button>
            )}
            <button
              className={`bg-orange w-7 h-full rounded-lg text-white hover:bg-orange transition-all`}
            >
              {page + 1}
            </button>
            {page + 1 < pageCount && (
              <button
                onClick={() => setPage(page + 1)}
                className={`bg-primary w-7 h-full rounded-lg text-white hover:bg-orange transition-all`}
              >
                {page + 2}
              </button>
            )}
            {page + 1 < pageCount - 1 && (
              <>
                <span>...</span>
                <button
                  onClick={() => setPage(pageCount - 1)}
                  className={`${
                    page + 1 === pageCount ? "bg-orange" : "bg-primary"
                  }  w-7 h-full rounded-lg text-white hover:bg-orange transition-all`}
                >
                  {pageCount}
                </button>
              </>
            )}
          </>
        )}
      </div>
      <button onClick={beforHandler}>
        <FaArrowLeft />
      </button>
    </div>
  );
};

export default Pagination;
