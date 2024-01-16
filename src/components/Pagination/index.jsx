import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../../theme/svg-icons";
import Button from "../Button";

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  sideNavigate,
}) => {
  const maxVisiblePages = 5;
  let pageNumbers = [];

  if (totalPages <= maxVisiblePages) {
    pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
  } else {
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (startPage > 1) {
      pageNumbers.push(1, null);
    }

    pageNumbers = [
      ...pageNumbers,
      ...Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index
      ),
    ];

    if (endPage < totalPages) {
      pageNumbers.push(null, totalPages);
    }
  }
  return (
    <div className="flex justify-center gap-2 py-3 md:gap-2">
      {sideNavigate ? (
        <Button
          className={"btn-pagination btn-neutral-text"}
          variant={"none"}
          onClick={() => onPageChange(parseInt(currentPage) - 1)}
          leftIcon={<ArrowLeftIcon iconSize={20} />}
        />
      ) : (
        <Button
          className="btn-pagination btn-neutral-text"
          onClick={() => onPageChange(parseInt(currentPage) - 1)}
          disabled={
            currentPage == 1 ||
            pageNumbers.length === 1 ||
            pageNumbers.length === 0
          }
          leftIcon={<ArrowLeftIcon iconSize={20} />}
          variant={"none"}
          label={<span className="hidden md:block">Previous</span>}
        />
      )}
      <ul className="flex items-center justify-center gap-3">
        {pageNumbers.length > 1 ? (
          pageNumbers.map((page, index) => (
            <li
              key={index}
              onClick={() => onPageChange(page)}
              className={`flex transition-all items-center justify-center h-10 p-2 border rounded-[3px] cursor-pointer min-w-[2.5rem] border-neutral-300 text-neutral-600 hover:text-primary-300 hover:border-transparent hover:bg-accent-200  ${
                currentPage == page
                  ? "hover:bg-accent-300 text-primary-300 bg-accent-300"
                  : page === null
                  ? "text-neutral-600" // Style for ellipses
                  : ""
              }`}
            >
              {page === null ? "..." : page}
            </li>
          ))
        ) : (
          <li
            key={1}
            onClick={() => onPageChange(1)}
            className={`flex transition-all items-center justify-center h-10 p-2 border rounded-[3px] cursor-pointer min-w-[2.5rem] border-neutral-300 text-neutral-600 hover:text-primary-300 hover:border-transparent hover:bg-accent-200 hover:bg-accent-300 text-primary-300 bg-accent-300
        `}
          >
            1
          </li>
        )}
      </ul>
      {sideNavigate ? (
        <Button
          className={"btn-pagination btn-neutral-text  "}
          variant={"none"}
          onClick={() => onPageChange(parseInt(currentPage) + 1)}
          leftIcon={<ArrowRightIcon iconSize={20} />}
        />
      ) : (
        <Button
          className="btn-pagination btn-neutral-text "
          onClick={() => onPageChange(parseInt(currentPage) + 1)}
          disabled={currentPage === totalPages || pageNumbers.length === 1}
          variant={"none"}
          label={<span className="hidden md:block">Next</span>}
          rightIcon={<ArrowRightIcon iconSize={20} />}
        />
      )}
    </div>
  );
};
