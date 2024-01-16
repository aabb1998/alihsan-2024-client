import React, { useEffect, useState } from "react";
import { GridIcon, ListIcon, PdfIcon } from "../../theme/svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { getFinantialReports } from "./financialReports";
import { Transition } from "@headlessui/react";
import Button from "../../components/Button";
import { Pagination } from "../../components/Pagination";
import { financialYearList, itemPerPage } from "../../utils/constants";
import Filter from "../../components/Filter";
import Loader from "../../components/Loader";
const initialState = {
  type: "",
  year: "",
  page: "1",
  sort: "createdAt",
  order: "desc",
  status: "",
};
export const FinancialReport = ({ isOpen }) => {
  const dispatch = useDispatch();
  const [isGrid, setIsGrid] = useState(true);
  const { finantialReports, reportCount, loading } = useSelector(
    (state) => state.finantialReports
  );
  const [filter, setFilter] = useState(initialState);

  const handleDownload = async (doc) => {
    try {
      const response = await fetch(doc);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = "document.pdf";
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {}
  };
  const handleFilterChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };
  const handleFilterReset = () => {
    setFilter({ ...filter, search: "", status: "", order: "desc", year: "" });
  };
  useEffect(() => {
    dispatch(getFinantialReports(filter));
  }, [filter]);

  return (
    <>
      <Filter
        handleFilterChange={handleFilterChange}
        handleFilterReset={handleFilterReset}
        filters={filter}
        filtersList={[
          {
            label: "Select Year",
            name: "year",
            value: "year",
            options: [{ label: "Year", value: "" }, ...financialYearList],
          },
        ]}
        sortList={[
          {
            label: "Sort By",
            name: "order",
            value: "order",
            options: [
              { label: "Newest", value: "desc" },
              { label: "Oldest", value: "asc" },
            ],
          },
        ]}
      >
        <div className="flex border rounded border-neutral-300">
          <button
            onClick={() => setIsGrid(false)}
            className={(isGrid ? "" : "bg-neutral-300") + " p-1"}
          >
            <ListIcon />
          </button>
          <button
            onClick={() => setIsGrid(true)}
            className={(isGrid ? "bg-neutral-300" : "") + " p-1"}
          >
            <GridIcon />
          </button>
        </div>
      </Filter>
      <Transition
        appear={true}
        show={isOpen}
        enter="transition ease-in-out delay-75 duration-300 transform"
        enterFrom="opacity-0 translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-300 transform delay-75"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-full"
      >
        <section className="">
          <div className="container !px-0">
            <div className="grid grid-cols-2 mb-5 gap-x-4 gap-y-5 sm:gap-5 md:gap-x-6 md:gap-y-7.5 md:grid-cols-3 lg:grid-cols-4">
              {loading ? (
                <Loader />
              ) : finantialReports?.length > 0 ? (
                finantialReports?.map((e) =>
                  isGrid ? (
                    <GridView
                      key={e.id}
                      title={"Financial Statement " + e.year}
                      fileName={"alihsan-foundation-financial-report-" + e.year}
                      documents={e.document}
                      handleDownload={handleDownload}
                    />
                  ) : (
                    <ListView
                      key={e.id}
                      title={"Financial Statement " + e.year}
                      fileName={"alihsan-foundation-financial-report-" + e.year}
                      documents={e.document}
                      handleDownload={handleDownload}
                    />
                  )
                )
              ) : (
                <div className="text-neutral-600">
                  Nothing to show. Try using other filters.
                </div>
              )}
            </div>
            <Pagination
              totalPages={Math.ceil(reportCount / itemPerPage)}
              currentPage={filter.page}
              onPageChange={(page) => setFilter((f) => ({ ...f, page }))}
            />
          </div>
        </section>
      </Transition>
    </>
  );
};

export const GridView = ({ documents, fileName, title, handleDownload }) => {
  return (
    <div className="col-span-1 px-4 py-6 border md:pt-10 md:px-5 md:pb-5 border-neutral-300 rounded-2xl">
      <div className="mb-5">
        <PdfIcon />
      </div>
      <p className="mb-5 text-button-md sm:text-heading-7 text-neutral-800 line-clamp-2">
        {title}
      </p>
      <Button
        className="btn btn-primary w-fit"
        // download={fileName + ".pdf"}
        onClick={() => handleDownload(documents)}
        label="Download"
      />
    </div>
  );
};

export const ListView = ({ documents, fileName, title, handleDownload }) => {
  return (
    <div className="flex items-center justify-between col-span-12 gap-2 p-3 border border-neutral-300 rounded-2xl ">
      <div className="flex items-center gap-3 md:gap-5">
        <div className="">
          <PdfIcon iconSize={40} />
        </div>
        <p className="text-button-md sm:text-heading-7 text-neutral-800 line-clamp-2">
          {title}
        </p>
      </div>
      <Button
        className="btn btn-primary w-fit"
        onClick={() => handleDownload(documents)}
        label="Download"
      />
    </div>
  );
};
