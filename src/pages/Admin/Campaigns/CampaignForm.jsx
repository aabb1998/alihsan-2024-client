import React, { useEffect, useRef } from "react";
import { Button } from "../../../components";
import { PlusIcon, ArrowLeftIcon, CloseIcon } from "../../../theme/svg-icons";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useFormState from '../../../hooks/useFormState';
import { saveCampaign, openModal, loadCampaignFormData } from '../../../features/adminCampaigns'
import Modal from './Modal'
import { countriesList } from '../../../utils/countries'
import { validateSlug } from '../../../utils/helper'
import { SnackMessages } from '../../../components/Toast';
import QuillEditor from "../../../components/QuillEditor";

function ErrorLabel ({ touched, error, className='' }) {
  return (
    <div className={"mt-2 text-red-300 "+className}>
      {touched ? error : ''}
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

  const { categories, organisers } = useSelector(({adminCampaigns}) => adminCampaigns.add);
  const {
    id: campaignStateId,
    project: campaignDetails,
    loading: campaignStateLoading,
  } = useSelector(({ adminCampaigns }) => adminCampaigns.details);

  useEffect(() => {
    //if (campaignId == campaignStateId && !campaignStateLoading) {
      resetState();
    //}
  }, [campaignDetails]);

  useEffect(() => {
    dispatch(loadCampaignFormData())
  }, [])

  const onSubmit = (status) => {
    const body = new FormData();
    body.append('name', formState.values.name);
    body.append('slug', formState.values.slug);
    body.append('description', formState.values.description);
    body.append('quickBookClassId', formState.values.quickBookClassId);
    body.append('quickBookClassRef', formState.values.quickBookClassRef);
    body.append('country', formState.values.country);
    body.append('categoryId', formState.values.categoryId);
    body.append('organiser', formState.values.organiser);
    const oldImages = [];
    for(let i of formState.values.images) {
      if(!i.id) body.append('images', i)
      else oldImages.push(i.url)
    }
    const deletedImages = [];
    for(let i of campaignDetails.CampaignMedia)
      if(oldImages.indexOf(i.url) < 0)
        deletedImages.push(i.id)
    if(deletedImages.length)
      body.append('deletedImages', deletedImages.join(','))
    if(typeof formState.values.coverImage !== "string")
      body.append('coverImage', formState.values.coverImage);

    if(!campaignDetails?.haveDonations) {
      body.append('checkoutType', formState.values.checkoutType);
      body.append('isRamadanCampaign', formState.values.isRamadanCampaign);
    }
    dispatch(saveCampaign({id: campaignId, body })).then(res => {
      if(res.error) showErrorMessage(res.error.message)
      else showSuccessMessage("Campaign data updated successfully")
    })
  }

  const formState = useFormState({schema: {
    name: { initialValue: '', validator: val => !val.length && 'This field is required' },
    categoryId: { initialValue: '', validator: val => !val && 'This field is required' },
    organiser: { initialValue: '', validator: val => !val && 'This field is required' },
    checkoutType: { initialValue: '', validator: val => !val && 'This field is required' },
    country: { initialValue: '', validator: val => !val && 'This field is required' },
    coverImage: { initialValue: '' },
    description: { initialValue: '', validator: val => !val.length ? 'This field is required' : val.length > 1000 && 'Should contain less than 1000 characters' },
    images: { initialValue: [], setHelper: ({ values }, val) => ({ images: [ ...values.images, val ] }) },
    isRamadanCampaign: { initialValue: false },
    quickBookClassId: { initialValue: '', validator: val => !val && 'This field is required' },
    quickBookClassRef: { initialValue: '', validator: val => !val && 'This field is required' },
    slug: { initialValue: '', validator: val => validateSlug(val) },
  }, onSubmit})

  const checkIsEdited = () => {
    for(let i in formState.touched)
      if(formState.touched[i])
        return true;
    return false;
  }
  const edited = checkIsEdited()

  const resetState = () => {
    if(!campaignDetails) return;
    const {name, country, description, coverImage, CampaignMedia, CampaignCategory, checkoutType, quickBookClassId, quickBookClassRef, slug, isRamadanCampaign, organiser} = campaignDetails;
    formState.dispatch({
      values: {name, country, description, coverImage, images: CampaignMedia, checkoutType, categoryId: CampaignCategory?.id, quickBookClassId, organiser, quickBookClassRef, slug, isRamadanCampaign},
      type: 'reset'
    });
    if(coverImageInput.current)
      coverImageInput.current.value = "";
    if(imagesInput.current)
      imagesInput.current.value = "";
  }

  const changeStatus = (status) => {
    dispatch(saveCampaign({id: campaignId, body: { status }})).then(res => {
      if(res.error) showErrorMessage(res.error.message)
      else showSuccessMessage("Campaign status changed successfully")
    });
  }


  if(campaignStateLoading && !campaignDetails) {
    return <div className="mt-6">Loading...</div>
  } else if (campaignStateId != campaignId) {
    return null;
  }


  return (
    <>
      <div className="flex justify-end mt-4">
        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
          <Button
            className="flex-grow btn btn-outline-secondary text-button-md md:text-button-lg"
            disabled={!edited}
            variant=""
            type="submit"
            label={"Cancel"}
            onClick={() => resetState()}
          />
          {edited?(
            <Button
              className="flex-grow btn btn-dark text-button-md md:text-button-lg"
              variant=""
              disabled={!edited}
              type="submit"
              label={"Save Changes"}
              onClick={() => formState.submit()}
            />
          ):(
            <>
              {campaignDetails?.status==='DRAFT'?
                <Button
                  className="flex-grow btn btn-primary text-button-md md:text-button-lg"
                  variant=""
                  type="submit"
                  label={"Publish"}
                  onClick={() => changeStatus('ACTIVE')}
                />
              :null}
              {campaignDetails?.status==='ACTIVE'?
                <Button
                  className="flex-grow btn btn-danger text-button-md md:text-button-lg"
                  variant=""
                  type="submit"
                  label={"Inactivate"}
                  onClick={() => {
                    dispatch(openModal({title: "Inactivate Campaign?", text: "Are you sure you want to Inactivate this campaign?", success: ["Yes, Inactivate", () => changeStatus('INACTIVE')], cancel: ["No, Keep it"]}))
                  }}
                />
              :null}
              {campaignDetails?.status==='INACTIVE'?
                <Button
                  className="flex-grow btn btn-primary text-button-md md:text-button-lg"
                  variant=""
                  type="submit"
                  label={"Activate"}
                  onClick={() => changeStatus('ACTIVE')}
                />
              :null}
            </>
          )}



        </div>
      </div>
      <form className="w-full mt-7.5">
        <div className="flex flex-col mb-6 form-group">
          <div
            htmlFor="dropzone-file"
            className="relative flex flex-col items-center justify-center w-full overflow-hidden bg-center bg-no-repeat bg-cover cursor-pointer rounded-3xl h-76 bg-choose-cover"
          >
            {formState.values.coverImage?<img
              src={typeof formState.values.coverImage === 'string'? formState.values.coverImage: formState.values.coverImage?.url}
              alt="preview"
              className="object-cover w-full h-full transition duration-300 ease-in-out opacity-100 hover:opacity-90"
            />:null}
            <div className="flex items-center justify-center w-full h-full ">
              <label
                htmlFor="dropzone-file"
                className="!mb-0 cursor-pointer absolute right-5 bottom-5"
              >
                <div className="flex flex-col items-center justify-center px-5 py-3 rounded-lg bg-primary-100 text-primary-300 text-button-lg">
                  Change Cover
                </div>
                <input id="dropzone-file" accept="image/*" type="file" className="hidden" onChange={formState.dispatch} name="coverImage" ref={coverImageInput} />
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="ProjectName" className="">
            Project Name
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
          <ErrorLabel touched={formState.touched.name} error={formState.errors.name} />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="ProjectSlug" className="">
            Project Slug
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
          <ErrorLabel touched={formState.touched.slug} error={formState.errors.slug} />
        </div>
        <div className="flex flex-col mb-6 text-area">
          <label htmlFor="description" className="">
            Project Description
          </label>
          <div className="relative">
						<QuillEditor
							value={formState.values.description}
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
          <ErrorLabel touched={formState.touched.description} error={formState.errors.description} />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="ProjectQuickbooksID" className="">
            Quickbooks Class ID
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
          <ErrorLabel touched={formState.touched.quickBookClassId} error={formState.errors.quickBookClassId} />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="ProjectQuickbooksRef" className="">
            Quickbooks Class Name
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
          <ErrorLabel touched={formState.touched.quickBookClassRef} error={formState.errors.quickBookClassRef} />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="ProjectName" className="">
            Project Category
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
            {categories?.map(i => <option value={i.id} key={i.id}>{i.name}</option>)}
          </select>
          <ErrorLabel touched={formState.touched.categoryId} error={formState.errors.categoryId} />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="project-organiser" className="">
            Project Organiser
          </label>
          <select
            className="w-full bg-white form-control"
            id="project-organiser"
            name="organiser"
            onChange={formState.dispatch}
            value={formState.values.organiser}
          >
            <option value="">Select an Organiser</option>
            {organisers?.map(i => <option value={i.id} key={i.id}>{i.firstName} {i.lastName}</option>)}
          </select>
          <ErrorLabel touched={formState.touched.organiser} error={formState.errors.organiser} />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="project-checkout" className="">
            Project Checkout Type
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
              {value: 'COMMON', name: 'General'},
              {value: 'FEDYAH', name: 'Fedyah/Kaffarah'},
              {value: 'AQEEQAH_ADAHI', name: 'Aqeeqah Adahi'},
              {value: 'ADEEQAH_GENERAL_SACRIFICE', name: 'Adeeqah General Sacrifice'},
              {value: 'ZAQAT', name: 'Zaqat'},
              {value: 'WATER_CAMPAIGN', name: 'Water Campaign'},
              {value: 'KURBAN', name: 'Kurban'},
            ].map(i => <option value={i.value} key={i.value}>{i.name}</option>)}
          </select>
          <ErrorLabel touched={formState.touched.checkoutType} error={formState.errors.checkoutType} />
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
          <ErrorLabel touched={formState.touched.isRamadanCampaign} error={formState.errors.isRamadanCampaign} />
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="ProjectName" className="">
            Project Country
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
          <ErrorLabel touched={formState.touched.country} error={formState.errors.country} />
        </div>
      </form>
      <div className="flex flex-wrap items-center justify-between w-full gap-4 mt-6 mb-3">
        <h5 className="flex items-center text-button-lg gap-x-2">
          Project Images
        </h5>
      </div>

      <form className="flex flex-wrap gap-2 p-5 md:flex-nowrap sm:gap-3 lg:gap-5 bg-neutral-200 rounded-2xl">
        {formState.values.images.map((i,index) => (
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
                <CloseIcon onClick={() => formState.dispatch({type: 'remove', target: {index, name: 'images'}})} />
              </div>
            </div>
          </div>
        ))}
        {formState.values.images.length>3?null:
          <div
            for="dropzone-file"
            className="flex flex-col items-center justify-center flex-grow px-4 py-4 border border-dashed rounded-lg cursor-pointer lg:max-w-51 md:py-12 md:px-8 border-neutral-500"
            onClick={() => imagesInput.current.click()}
          >
            <div className="flex flex-col items-center justify-center gap-2 text-neutral-600">
              <PlusIcon />
              <p className="text-center text-button-sm sm:text-button-md text-neutral-600 lg:whitespace-nowrap">
                Add Photos or Video
              </p>
            </div>
            <input
              id="dropzone-file"
              accept="image/*"
              type="file"
              className="hidden"
              ref={imagesInput}
              name="images"
              onChange={formState.dispatch}
            />
          </div>
        }
      </form>
      <Modal />
    </>
  );
}
