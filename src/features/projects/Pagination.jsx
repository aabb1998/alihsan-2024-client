import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../theme/svg-icons";
import Button from "../../components/Button";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  sideNavigate,
}) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="flex justify-center gap-2 py-3 md:gap-2">
      {sideNavigate ? (
        <button className={"btn-pagination btn-neutral-text  "}>
          <ArrowLeftIcon iconSize={20} />
        </button>
      ) : (
        <button
          className="btn-pagination btn-neutral-text"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage == 1}
        >
          <ArrowLeftIcon iconSize={20} />{" "}
          <span className="hidden md:block">Previous</span>{" "}
        </button>
      )}
      <ul className="flex items-center justify-center gap-3">
        {pageNumbers.map((page) => (
          <li
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex transition-all items-center justify-center h-10 p-2 border rounded-[3px] cursor-pointer min-w-[2.5rem] border-neutral-300 text-neutral-600 hover:text-primary-300 hover:border-transparent hover:bg-accent-200  ${
              currentPage == page
                ? "hover:bg-accent-300 text-primary-300 bg-accent-300"
                : ""
            }`}
            // hover:bg-accent-300 text-primary-300 bg-accent-300
          >
            {page}
          </li>
        ))}
      </ul>
      {sideNavigate ? (
        <button className={"btn-pagination btn-neutral-text  "}>
          <ArrowRightIcon iconSize={20} />
        </button>
      ) : (
        <button
          className="btn-pagination btn-neutral-text "
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage == totalPages}
        >
          {" "}
          <span className="hidden md:block">Next</span>{" "}
          <ArrowRightIcon iconSize={20} />{" "}
        </button>
      )}
    </div>
  );
};
