import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../../components";
import { PlusIcon, ArrowLeftIcon, CloseIcon } from "../../../theme/svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useFormState from "../../../hooks/useFormState";
import {
  saveCampaign,
  openModal,
  loadCampaignFormData,
	addCampaign,
} from "../../../features/adminCampaigns";
import DeleteModal from "./DeleteModal";
import { countriesList } from "../../../utils/countries";
import { validateSlug } from "../../../utils/helper";
import { SnackMessages } from "../../../components/Toast";
import QuillEditor from "../../../components/QuillEditor";
import Modal from "../../../components/ImageUpload/Modal";
import ImageUpload from "../../../components/ImageUpload";



function ErrorLabel({ touched, error, className = "" }) {
  return (
    <div className={"mt-2 text-red-300 text-sm " + className}>
      {touched ? error : ""}
    </div>
  );
}

export default function CampaignDetails() {
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const dispatch = useDispatch();
  const params = useParams();
  const imagesInput = useRef();
  const coverImageInput = useRef();
  const campaignId = params?.id;
  const [isCropOpen, setCropOpen] = useState(false);

	const {
		categories,
		loading: addLoading,
		saving: addSaving
	} = useSelector(state => state.adminCampaigns.add);

	const navigate = useNavigate()

  const {
		id: campaignStateId,
    project: campaignDetails,
    loading: campaignStateLoading,
		saving: campaignStateSaving
  } = useSelector(({ adminCampaigns }) => adminCampaigns.details);

	const loading = addLoading || (campaignId ? campaignStateLoading || campaignStateSaving : addSaving);

  useEffect(() => {
		resetState();
  }, [campaignDetails]);

  useEffect(() => {
    dispatch(loadCampaignFormData());
  }, []);

  const onSubmit = ({ values, arg }) => {
    const body = new FormData();
		for(let i in values) {
			switch(i) {
				case 'images':
					const oldImages = [];
					for (let i of values.images) {
						if (!i.id) body.append("images", i);
						else oldImages.push(i.url);
					}
					if(campaignId) {
						const deletedImages = [];
						for (let i of campaignDetails.CampaignMedia)
							if (oldImages.indexOf(i.url) < 0) deletedImages.push(i.id);
						if (deletedImages.length)
							body.append("deletedImages", deletedImages.join(","));
					}
					break;
				case 'coverImage':
					if (values[i] && (!campaignId || typeof values[i] !== "string")) {
						body.append(i, values[i]);
					}
					break;
				case 'description':
					body.append('description', values[i].html);
					body.append('descriptionText', values[i].text);
					break;
				case 'checkoutType':
				case 'isRamadanCampaign':
					if (!campaignId || !campaignDetails?.haveDonations)
						body.append(i, values[i]);
					break;
				default:
					body.append(i, values[i]);
			}
		}
		if(!campaignId) {
			body.append('status', arg);
		}

		let promise;
		if(campaignId)
			promise = dispatch(saveCampaign({ id: campaignId, body }))
		else
			promise = dispatch(addCampaign(body))

		promise.then((res) => {
			if (res.error) showErrorMessage(res.error.message);
			else {
				showSuccessMessage("Campaign data saved successfully");
				if(!campaignId) navigate('/admin/campaigns')
			}
		});

  };

  const formState = useFormState({
    schema: {
      name: {
        initialValue: "",
        validator: (val) => !val.length && "This field is required",
      },
      categoryId: {
        initialValue: "",
        validator: (val) => !val && "This field is required",
      },
      checkoutType: {
        initialValue: "",
        validator: (val) => !val && "This field is required",
      },
      country: {
        initialValue: "",
        validator: (val) => !val && "This field is required",
      },
      coverImage: { initialValue: "" },
      description: {
        initialValue: "",
        validator: (val) =>
          !val.length
            ? "This field is required"
            : val.length > 1000 ? "Should contain less than 1000 characters" : "",
      },
      images: {
        initialValue: [],
        setHelper: ({ values }, val) => ({ images: [...values.images, val] }),
      },
      isRamadanCampaign: { initialValue: false },
      quickBookClassId: {
        initialValue: "",
        validator: (val) => !val && "This field is required",
      },
      quickBookClassRef: {
        initialValue: "",
        validator: (val) => !val && "This field is required",
      },
      slug: {
				initialValue: "",
				validator: (val) => !val ? "This field is required" : validateSlug(val),
			},
      organiserName: { initialValue: "" },
      organiserEmail: { initialValue: "" },
      organiserDescription: { initialValue: "" },
    },
    onSubmit,
  });

  const checkIsEdited = () => {
    for (let i in formState.touched) if (formState.touched[i]) return true;
    return false;
  };
  const edited = checkIsEdited();

  const resetState = () => {
    if (!campaignId || !campaignDetails) {
			formState.dispatch({type: 'reset'})
			return;
		}

		const values = {
			...campaignDetails,
			images: campaignDetails.CampaignMedia,
			categoryId: campaignDetails.CampaignCategory?.id,
			description: {
				html: campaignDetails.descriptionHtml || campaignDetails.description,
				text: campaignDetails.description,
				length: Math.max(campaignDetails.description.length-1, 0),
			}
		}
		delete values.descriptionHtml;
    formState.dispatch({
      values,
      type: "reset",
    });
    if (coverImageInput.current) coverImageInput.current.value = "";
    if (imagesInput.current) imagesInput.current.value = "";
  };

  const changeStatus = (status) => {
    dispatch(saveCampaign({ id: campaignId, body: { status } })).then((res) => {
      if (res.error) showErrorMessage(res.error.message);
      else showSuccessMessage("Campaign status changed successfully");
    });
  };

  if (campaignId && campaignStateLoading && !campaignDetails) {
    return <div className="mt-6">Loading...</div>;
  } else if (campaignId && campaignStateId != campaignId) {
    return null;
  }

  const setCroppedImage = async (url, name) => {
    const response = await fetch(url);
    const file = await response.blob();
		file.url = url;
    formState.dispatch({
			target: {
				name,
				files: [file],
				type: 'file'
			},
			type: "change",
		});
  };

	const inactivate = () => {
		dispatch(
			openModal({
				title: "Inactivate Campaign?",
				text: "Are you sure you want to Inactivate this campaign?",
				success: [
					"Yes, Inactivate",
					() => changeStatus("INACTIVE"),
				],
				cancel: ["No, Keep it"],
			})
		);
	}
  return (
    <>
			{isCropOpen && (
				<Modal
					getCroppedImage={(url) => {
						setCropOpen(false);
						setCroppedImage(url, 'coverImage');
					}}
					aspect={16 / 9}
					onClose={() => setCropOpen(false)}
				/>
			)}
      <div className="flex justify-between mt-4">
				{!campaignId ? <button
					disabled={addSaving || campaignStateSaving}
					className="flex items-center text-button-lg gap-x-2"
					onClick={() => navigate("/admin/campaigns")}
				>
					<span><ArrowLeftIcon />{" "}</span>
					Back to Campaigns
				</button> : <div />}
        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
					{(!campaignId || edited) && <Button
            className="flex-grow btn btn-outline-secondary text-button-md md:text-button-lg"
						variant="" type="submit" label={"Cancel"}
            disabled={loading} onClick={() => campaignId ? resetState() : navigate("/admin/campaigns")}
          />}
					{(campaignId && edited) && <Button
						className="flex-grow btn btn-dark text-button-md md:text-button-lg"
						variant="" type="submit" label={"Save Changes"}
						disabled={loading} onClick={() => formState.submit()}
					/>}
					{!campaignId && <Button
						className="flex-grow btn btn-dark text-button-md md:text-button-lg"
						variant="" type="submit" label={"Save as Draft"}
						disabled={loading} onClick={() => formState.submit('DRAFT')}
					/>}
					{(!campaignId || !edited && campaignDetails?.status === "DRAFT") && <Button
						className="flex-grow btn btn-primary text-button-md md:text-button-lg"
						variant="" type="submit" label={"Publish"} disabled={loading}
						onClick={() => campaignId ? changeStatus("ACTIVE") : formState.submit('ACTIVE')}
					/>}
					{(campaignId && !edited && campaignDetails?.status === "INACTIVE") && <Button
						className="flex-grow btn btn-primary text-button-md md:text-button-lg"
						variant="" type="submit" label={"Activate"}
						disabled={loading} onClick={() => changeStatus("ACTIVE")}
					/>}
					{(campaignId && !edited && campaignDetails?.status === "ACTIVE") && <Button
						className="flex-grow btn btn-primary text-button-md md:text-button-lg"
						variant="" type="submit" label={"Inactivate"}
						disabled={loading} onClick={inactivate}
					/>}
        </div>
      </div>
      <form className="w-full mt-7.5">
        <div className="flex flex-col mb-6 form-group">
          <div
            htmlFor="dropzone-file"
            className="relative flex flex-col items-center justify-center w-full overflow-hidden bg-center bg-no-repeat bg-cover cursor-pointer rounded-3xl h-76 bg-choose-cover"
          >
            {formState.values.coverImage ? (
              <img
                src={
                  typeof formState.values.coverImage === "string"
                    ? formState.values.coverImage
                    : formState.values.coverImage?.url
                }
                alt="preview"
                className="object-cover w-full h-full transition duration-300 ease-in-out opacity-100 hover:opacity-90"
              />
            ) : null}
            <div className="flex items-center justify-center w-full h-full ">
              <label
                htmlFor="dropzone-file"
                className="!mb-0 cursor-pointer absolute right-5 bottom-5"
              >
                <div className="flex flex-col items-center justify-center px-5 py-3 rounded-lg bg-primary-100 text-primary-300 text-button-lg">
                  Add Cover
                </div>
                <input
                  id="dropzone-file"
                  accept="image/*"
                  // type="file"
                  // onChange={formState.dispatch}
                  onClick={() => setCropOpen(true)}
                  className="hidden"
                  name="coverImage"
                  ref={coverImageInput}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="ProjectName" className="">
            Project Name<span className="text-red-300">*</span>
          </label>
          <input
            type="text"
            name="name"
            className="w-full bg-white form-control"
            id="project-name"
            placeholder="Project Name"
            value={formState.values.name}
            onChange={formState.dispatch}
          />
          <ErrorLabel
            touched={formState.touched.name}
            error={formState.errors.name}
          />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="ProjectSlug" className="">
            Project Slug<span className="text-red-300">*</span>
          </label>
          <input
            type="text"
            name="slug"
            className="w-full bg-white form-control"
            id="ProjectSlug"
            placeholder="Project Slug"
            value={formState.values.slug}
            onChange={formState.dispatch}
          />
          <ErrorLabel
            touched={formState.touched.slug}
            error={formState.errors.slug}
          />
        </div>
        <div className="flex flex-col mb-6 text-area">
          <label htmlFor="description" className="">
            Project Description<span className="text-red-300">*</span>
          </label>
          <div className="relative">
            <QuillEditor
              value={formState.values.description.html}
              onChange={formState.dispatch}
              name="description"
            />
            {/* <textarea
              rows={5}
              className="w-full bg-white !min-h-40 form-control"
              id="description"
              name="description"
              placeholder="Project Description"
              value={formState.values.description}
              onChange={formState.dispatch}
            ></textarea> */}
            <p className="absolute font-medium bg-white text-button-md text-neutral-800 bottom-2 right-2">
              {formState.values.description.length}/1000
            </p>
          </div>
          <ErrorLabel
            touched={formState.touched.description}
            error={formState.errors.description}
          />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="ProjectQuickbooksID" className="">
            Quickbooks Class ID<span className="text-red-300">*</span>
          </label>
          <input
            type="text"
            name="quickBookClassId"
            className="w-full bg-white form-control"
            id="ProjectQuickbooksID"
            placeholder="Quickbook Class ID for the project"
            value={formState.values.quickBookClassId}
            onChange={formState.dispatch}
          />
          <ErrorLabel
            touched={formState.touched.quickBookClassId}
            error={formState.errors.quickBookClassId}
          />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="ProjectQuickbooksRef" className="">
            Quickbooks Class Name<span className="text-red-300">*</span>
          </label>
          <input
            type="text"
            name="quickBookClassRef"
            className="w-full bg-white form-control"
            id="ProjectQuickbooksRef"
            placeholder="Quickbook Class Name for the project"
            value={formState.values.quickBookClassRef}
            onChange={formState.dispatch}
          />
          <ErrorLabel
            touched={formState.touched.quickBookClassRef}
            error={formState.errors.quickBookClassRef}
          />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="ProjectName" className="">
            Project Category<span className="text-red-300">*</span>
          </label>
          <select
            className="w-full bg-white form-control"
            id="project-categoryId"
            placeholder="Project Category"
            name="categoryId"
            onChange={formState.dispatch}
            value={formState.values.categoryId}
          >
            <option value="">Select a Category</option>
            {categories?.map((i) => (
              <option value={i.id} key={i.id}>
                {i.name}
              </option>
            ))}
          </select>
          <ErrorLabel
            touched={formState.touched.categoryId}
            error={formState.errors.categoryId}
          />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="project-organiser-name" className="">
            Project Organiser Name
          </label>
          <input
						type="text"
            className="w-full bg-white form-control"
            id="project-organiser-name"
            name="organiserName"
						placeholder="Project Organiser's Name"
            onChange={formState.dispatch}
            value={formState.values.organiserName}
          />
          <ErrorLabel
            touched={formState.touched.organiserName}
            error={formState.errors.organiserName}
          />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="project-organiser-name" className="">
            Project Organiser Email
          </label>
          <input
						type="text"
            className="w-full bg-white form-control"
            id="project-organiser-email"
            name="organiserEmail"
						placeholder="Project Organiser's Email"
            onChange={formState.dispatch}
            value={formState.values.organiserEmail}
          />
          <ErrorLabel
            touched={formState.touched.organiserEmail}
            error={formState.errors.organiserEmail}
          />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="project-organiser-descripion" className="">
            Project Organiser Description
          </label>
          <textarea
            id="project-organiser-description"
            name="organiserDescription"
						rows={5}
						className="w-full bg-white !min-h-40 form-control"
						placeholder="Project Organiser's Description"
            onChange={formState.dispatch}
            value={formState.values.organiserDescription}
          />
          <ErrorLabel
            touched={formState.touched.organiserDescription}
            error={formState.errors.organiserDescription}
          />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="project-checkout" className="">
            Project Checkout Type<span className="text-red-300">*</span>
          </label>
          <select
            className="w-full bg-white form-control"
            id="project-checkout"
            placeholder="Project Checkout Type"
            name="checkoutType"
            value={formState.values.checkoutType}
            onChange={formState.dispatch}
            disabled={campaignDetails?.haveDonations}
          >
            <option value="">Select a Checkout Type</option>
            {[
              { value: "COMMON", name: "General" },
              { value: "FEDYAH", name: "Fedyah/Kaffarah" },
              { value: "AQEEQAH_ADAHI", name: "Aqeeqah Adahi" },
              {
                value: "ADEEQAH_GENERAL_SACRIFICE",
                name: "Adeeqah General Sacrifice",
              },
              { value: "ZAQAT", name: "Zaqat" },
              { value: "WATER_CAMPAIGN", name: "Water Campaign" },
              { value: "KURBAN", name: "Kurban" },
            ].map((i) => (
              <option value={i.value} key={i.value}>
                {i.name}
              </option>
            ))}
          </select>
          <ErrorLabel
            touched={formState.touched.checkoutType}
            error={formState.errors.checkoutType}
          />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <div className="flex flex-row">
            <input
              type="checkbox"
              name="isRamadanCampaign"
              className="mr-4"
              id="IsRamadan"
              placeholder="Is Ramadan Campaign"
              checked={formState.values.isRamadanCampaign}
              onChange={formState.dispatch}
              disabled={campaignDetails?.haveDonations}
            />
            <label htmlFor="IsRamadan" className="!mb-0">
              Is this a Ramadan Project?
            </label>
          </div>
          <ErrorLabel
            touched={formState.touched.isRamadanCampaign}
            error={formState.errors.isRamadanCampaign}
          />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="ProjectName" className="">
            Project Country<span className="text-red-300">*</span>
          </label>
          <select
            name="country"
            className="w-full bg-white form-control"
            id="project-country"
            placeholder="Project Country"
            value={formState.values.country}
            onChange={formState.dispatch}
          >
            <option value="">Select a country</option>
            {countriesList.map((c, i) => (
              <option value={c.code}>{c.name}</option>
            ))}
          </select>
          <ErrorLabel
            touched={formState.touched.country}
            error={formState.errors.country}
          />
        </div>
      </form>
      <div className="flex flex-wrap items-center justify-between w-full gap-4 mt-6 mb-3">
        <h5 className="flex items-center text-button-lg gap-x-2">
          Project Images
        </h5>
      </div>

      <form className="flex flex-wrap gap-2 p-5 md:flex-nowrap sm:gap-3 lg:gap-5 bg-neutral-200 rounded-2xl">
        {formState.values.images.map((i, index) => (
          <div className="flex flex-grow md:flex-grow-0 form-group" key={i.id}>
            <div
              for="dropzone-file"
              className="flex flex-grow !mb-0 overflow-hidden rounded-lg cursor-pointer md:max-w-51 relative"
            >
              <img
                src={i.url}
                alt="preview"
                className="object-cover w-full h-full transition duration-300 ease-in-out opacity-100 hover:opacity-90"
              />
              <div className="absolute right-2 top-2">
                <CloseIcon
                  onClick={() =>
                    formState.dispatch({
                      type: "remove",
                      target: { index, name: "images" },
                    })
                  }
                />
              </div>
            </div>
          </div>
        ))}
        {formState.values.images.length <= 3 && (
          <ImageUpload
						name={"images"}
						getCroppedImage={(url) => setCroppedImage(url, 'images')}
						aspect={16 / 9}
					/>
        )}
      </form>
      <DeleteModal />
    </>
  );
}
