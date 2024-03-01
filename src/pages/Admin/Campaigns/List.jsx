import React, { useEffect } from "react";
import { Pagination } from "../../../components/Pagination";
import { Button } from "../../../components";
import Img from "../../../components/Image";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCampaignFormData,
  loadCampaignsList,
} from "../../../features/adminCampaigns";
import { ProjectStatuses } from "../../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { ListFilter } from "./ListFilter";

function ProjectStatus({ status }) {
  const statusData = ProjectStatuses.find((i) => i.value === status);
  return (
    <div className={"py-1.5 px-5 rounded-lg w-fit " + statusData.bgColorClass}>
      <h6 className={"text-button-lg " + statusData.textColorClass}>
        {statusData.label}
      </h6>
    </div>
  );
}

export default function Campaigns() {
  const list = useSelector(({ adminCampaigns }) => adminCampaigns.list);
  const categories = useSelector(
    (state) => state.adminCampaigns.add.categories
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setFilters = (filters) => {
    if (!filters)
      dispatch(
        loadCampaignsList({
          search: "",
          status: "",
          checkoutType: "",
          categoryId: "",
          page: 1,
        })
      );
    else dispatch(loadCampaignsList({ ...list.filters, ...filters }));
  };

  useEffect(() => {
    setFilters(list.filters);
    dispatch(loadCampaignFormData());
  }, []);

  return (
    <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
      {/* dashboard title rea */}
      <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
        <h5 className="text-heading-7 md:text-heading-4">Campaigns</h5>
        <Button
          className=" btn btn-primary text-button-md md:text-button-lg"
          variant=""
          type="submit"
          label={"Add New"}
          onClick={() => navigate("/admin/campaigns/add")}
        />
      </div>
      {list.count !== null &&
      (list.count !== 0 ||
        list.filters.search ||
        list.filters.status ||
        list.loading) ? (
        <>
          <ListFilter
            filters={list.filters}
            setFilters={setFilters}
            categories={categories}
          />
          {list.rows.length ? (
            <div className="gap-5 md:gap-7.5 grid sm:grid-cols-2 md:grid-cols-3">
              {list.rows.map((i) => (
                <Link
                  to={"/admin/campaign/" + i.id}
                  key={i.id}
                  className="flex h-full"
                >
                  <div
                    key={i.id}
                    className="flex flex-col w-full gap-5 p-3 pb-5 border border-neutral-300 rounded-2xl hover:border-transparent hover:shadow-card hover:bg-white"
                  >
                    <div className="w-full overflow-hidden h-52 rounded-2xl">
                      <Img
                        src={i.coverImage}
                        alt={i.name}
                        className="object-cover w-full h-full transition duration-300 ease-in-out opacity-100 rounded-2xl hover:opacity-90"
                      />
                    </div>
                    <div>
                      <h6 className="mb-3 line-clamp-1 text-heading-6 text-neutral-800">
                        {i.name}
                      </h6>
                      <p className="overflow-hidden text-sm font-medium max-h-16 font-Montserrat text-neutral-600 line-clamp-3 sm:min-h-[3.75rem]">
                        {i.descriptionText || i.description}
                      </p>
                    </div>
                    <ProjectStatus status={i.status} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-sm text-neutral-600">No Data Found.</div>
          )}
          <div className="mt-7.5">
            <Pagination
              totalPages={Math.ceil(list.count / 20)}
              currentPage={list.filters.page}
              onPageChange={(page) => setFilters({ page })}
            />
          </div>
        </>
      ) : list.count !== null && !list.loading ? (
        <div className="flex flex-col items-center justify-center gap-5 py-10 mt-5 text-center bg-neutral-200 rounded-xl">
          <Img
            src={"../../images/no-campaign.png"}
            alt="No campaign"
            className="w-2/4 sm:w-fit"
          />
          <div>
            <h6 className="mb-2 font-bold text-button-lg text-neutral-1000 md:text-heading-6">
              No Campaigns yet
            </h6>
            <p className="text-sm font-medium w-60 font-Montserrat text-neutral-600">
              No Campaigns has been made. Please add a campaign.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
