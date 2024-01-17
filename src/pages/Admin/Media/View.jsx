import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  addPostDetails,
  getMediaPost,
  updatePostDetails,
  resetMedia,
  getMediaVideo,
} from "../../../features/adminMedia/adminMediaSlice";
import { formDetailsValues } from "../../../utils/constants";
import Img from "../../../components/Image";
import YoutubeVideo from "../../../components/YoutubeVideo";

export const View = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { media, isLoading } = useSelector((state) => state.adminMedia);
  console.log(media);

  useEffect(() => {
    if (id) {
      if (pathname.replace(id, "") === "/admin/video/")
        dispatch(getMediaVideo(id));
      else dispatch(getMediaPost(id));
    }
  }, [id]);

  return (
    <div className="py-10 px-2 sm:px-7.5 w-full h-[calc(100vh-4.5rem)] overflow-auto">
      <div className="flex flex-wrap gap-4 items-center justify-between w-full border-b border-neutral-300 pb-3.5">
        <Button
          className="flex items-center text-button-lg gap-x-2"
          label={
            pathname.replace(id, "") === "/admin/video/"
              ? "Back to On Ground Videos"
              : "Back to Post Campaign Updates"
          }
          variant={"none"}
          leftIcon={
            <span>
              <ArrowLeftIcon />{" "}
            </span>
          }
          onClick={() =>
            navigate(
              pathname.replace(id, "") === "/admin/video/"
                ? "/admin/videos"
                : "/admin/posts"
            )
          }
        />
      </div>
      <div className="w-full mt-7.5">
        <div className="flex flex-col mb-6 form-group">
          <table className="w-full table-auto text-start">
            <tbody>
              {formDetailsValues[pathname.replace(id, "")]?.map(
                (detailsValue, i) => (
                  <tr
                    key={i}
                    className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                  >
                    <td className="p-4 min-w-[12rem] break-words text-sm font-medium font-Montserrat text-neutral-700">
                      <label htmlFor="title" className="">
                        {detailsValue?.label}
                      </label>
                    </td>
                    <td className="p-4 text-sm font-medium break-words font-Montserrat text-neutral-700">
                      {media && detailsValue?.image ? (
                        <div className="h-auto max-w-xs overflow-hidden rounded-lg">
                          <Img
                            src={media[detailsValue?.key]}
                            className="object-cover w-full h-full"
                            alt="Media Image"
                          />
                        </div>
                      ) : media && detailsValue?.video ? (
                        <div className="w-full overflow-hidden rounded-lg h-80">
                        <YoutubeVideo url={media[detailsValue?.key]} />
                      </div>

                      ) : (
                        media && media[detailsValue?.key]
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
