import React from "react";
import MoreMenuButton from "../../../components/MoreMenuButton";
import {
  EditIcon,
  Trash2Icon,
} from "../../../theme/svg-icons";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../../../components";
import PostUpdateModal from './PostUpdateModal'
import { openAddUpdateModal, openEditUpdateModal, deleteCampaignUpdate } from '../../../features/adminCampaigns'
import { useConfirmationModal } from '../../../components/ConfirmationModal'
import { nl2br } from "../../../utils/helper";

export default function CampaignUpdates () {
  const params = useParams();
  const campaignId = params?.id;
  const dispatch = useDispatch();
	const askConfirmation = useConfirmationModal()

  const campaignDetails = useSelector(
    ({ adminCampaigns }) => adminCampaigns.details,
  );

  if(campaignDetails.loading) {
    return <div>Loading...</div>
  } else if (campaignDetails.id != campaignId) {
    return null;
  }

  const edit = (post) => dispatch(openEditUpdateModal({
    updateId: post.id, campaignId,
    details: {text: post.text, images: post.PostMedia},
  }))

  const remove = (post) => {
		askConfirmation({
			title: "Delete Post Update?",
			text: "Are you sure you want to delete this Post Update?",
			accept: {label: "Yes, Delete", onClick: () => {
				dispatch(deleteCampaignUpdate(post.id))
			}},
			reject: {label: "No, Keep it"}
		})
	}


  return (
    <>
      <div className="flex justify-end mt-4">
        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
          <Button
            className="flex-grow btn btn-primary text-button-md md:text-button-lg"
            variant=""
            type="submit"
            label="Post Updates"
            onClick={() => dispatch(openAddUpdateModal({ campaignId }))}
          />
          <PostUpdateModal />
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-10 sm:gap-6">
        {campaignDetails.project.Posts.map(post => (
          <div key={post.id} className="flex flex-col items-start w-full gap-5 p-5 border rounded-4xl border-neutral-300 bg-neutral-100flex">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <img
                  src="../../images/avatar/avatar-2.jpg"
                  width={44}
                  height={44}
                  className="object-cover rounded-full w-11 h-11"
                  alt="avatar"
                />
                <div className="flex flex-col gap-2">
                  <h6 className="text-heading-7 text-neutral-1000">{post.User.firstName} {post.User.lastName}</h6>
                  <p className="text-sm font-medium font-Montserrat text-neutral-500">
                    {post.displayTime}
                  </p>
                </div>
              </div>
              <MoreMenuButton items={[
                {icon: <EditIcon iconSize={16} />, text: "Edit", onClick: () => edit(post)},
                {icon: <Trash2Icon iconSize={16}/>, text: "Delete", onClick: () => remove(post)},
              ]} />
            </div>
            <p className="text-sm font-medium font-Montserrat text-neutral-800" dangerouslySetInnerHTML={nl2br(post.text)}>
              {/* {nl2br(post.text)} */}
            </p>
            <div className="grid flex-wrap grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-4 md:gap-5">
              {post.PostMedia.map(media => (
                <img
                  key={media.id}
                  src={media.url}
                  className="rounded-lg sm:rounded-xl md:rounded-2.5xl flex-grow w-full object-cover opacity-100 transition duration-300 ease-in-out hover:opacity-90"
                  alt="Update Image"
                />
              ))}
            </div>
          </div>
        ))}
        {/*
        <div className="flex flex-col items-start w-full gap-5 p-5 border rounded-4xl border-neutral-300 bg-neutral-100flex">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <img
                src="../../images/avatar/avatar-2.jpg"
                width={44}
                height={44}
                className="object-cover rounded-full w-11 h-11"
                alt="avatar"
              />
              <div className="flex flex-col gap-2">
                <h6 className="text-heading-7 text-neutral-1000">Jone Joe</h6>
                <p className="text-sm font-medium font-Montserrat text-neutral-500">
                  25 days ago
                </p>
              </div>
            </div>
            <MoreMenuButton items={[
              {icon: <EditIcon iconSize={16} />, text: "Edit"},
              {icon: <Trash2Icon iconSize={16}/>, text: "Delete"},
            ]} />
          </div>
          <p className="text-sm font-medium font-Montserrat text-neutral-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            finibus, neque non sodales porttitor, dolor tellus sodales metus, ac
            condimentum erat ante sed tortor. Ut et urna pulvinar, varius velit
            at, ultrices quam. Nunc rhoncus dui at urna.
          </p>
          <div className="w-full">
            <img
              src="../../images/campaign/update-Image-5.png"
              className="rounded-lg sm:rounded-xl md:rounded-2.5xl flex-grow w-full object-cover opacity-100 transition duration-300 ease-in-out hover:opacity-90"
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col items-start w-full gap-5 p-5 border rounded-4xl border-neutral-300 bg-neutral-100flex">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <img
                src="../../images/avatar/avatar-2.jpg"
                width={44}
                height={44}
                className="object-cover rounded-full w-11 h-11"
                alt="avatar"
              />
              <div className="flex flex-col gap-2">
                <h6 className="text-heading-7 text-neutral-1000">Jone Joe</h6>
                <p className="text-sm font-medium font-Montserrat text-neutral-500">
                  25 days ago
                </p>
              </div>
            </div>
            <MoreMenuButton items={[
              {icon: <EditIcon iconSize={16} />, text: "Edit"},
              {icon: <Trash2Icon iconSize={16}/>, text: "Delete"},
            ]} />
          </div>
          <p className="text-sm font-medium font-Montserrat text-neutral-800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            finibus, neque non sodales porttitor, dolor tellus sodales metus, ac
            condimentum erat ante sed tortor. Ut et urna pulvinar, varius velit
            at, ultrices quam. Nunc rhoncus dui at urna.
          </p>
        </div>
        */}
      </div>
    </>
  );
};
