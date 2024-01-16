import React, { useEffect, useReducer, useRef } from "react";
import { Button } from "../../../components";
import { PlusIcon, ArrowLeftIcon, CloseIcon } from "../../../theme/svg-icons";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveCampaign, openModal, loadCategories } from '../../../features/adminCampaigns'
import Modal from './Modal'
import { countriesList } from '../../../utils/countries'

function addUrl(file) {
  if(file)
    file.url = URL.createObjectURL(file);
}

export default function CampaignDetails() {
  const dispatch = useDispatch();
  const params = useParams();
  const imagesInput = useRef();
  const coverImageInput = useRef();
  const campaignId = params?.id;

  const { categories } = useSelector(({adminCampaigns}) => adminCampaigns.add);
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
    dispatch(loadCategories())
  }, [])

  const [ state, setState ] = useReducer((state, action) => {
    if(action.type==='change') {
      action = action.target;
      let val;
      if(!action.type || action.type==="text" || action.tagName==="SELECT" || action.tagName==="TEXTAREA") val = action.value;
      else if(action.type==="file") {
        val = action.files[0];
        if(!val) return state;
        addUrl(val);
      }

      // doing validation here itself
      let error = '';
      if(action.name==='name') {
        if(!val.length) error = "This field is required";
      } else if(action.name==='description') {
        if(!val.length) error = "This field is required";
        else if(val.length>1000) error = "Should contain less than 1000 characters"
      } else if(action.name==="coverImage") {
        if(!val) error = "This field is required"
      } else if(action.name==="quickBookClassId") {
        if(!val) error = "This field is required"
      } else if(action.name==="quickBookClassRef") {
        if(!val) error = "This field is required"
      } else if(action.name==="images") {
        return {...state, values: {...state.values, images: [...state.values.images, val]}, edited: true}
      } else if(action.name==="country") {
        if(!val) error = "This field is required"
      } else if(action.name==="category") {
        if(!val) error = "This field is required"
      } else {
        console.log('unknown input', action)
      }
      return {
        values: {...state.values, [action.name]: val},
        errors: error || state.errors[action.name]?{...state.errors, [action.name]: error}:state.errors,
        edited: true
      }
    } else if(action.type==='reset') {
      return {
        values: action.values,
        errors: {},
        edited: false,
      };
    } else if(action.type==="remove") {
      if(action.target?.name==="images") {
        const images = [];
        const deletedImages = [...(state.values.deletedImages || [])];
        for(let i=0; i<state.values.images.length; i++) {
          const img = state.values.images[i];
          if(i===action.target.index) {
            if(img.id) deletedImages.push(img.id)
          } else images.push(img);
        }
        return { ...state, values: {...state.values, images, deletedImages}, edited: true };
      }
    }
    return state;
  }, {
    values: {name: "", status: "", description: "", coverImage: "", images: [], categoryId: '', checkoutType: "", deletedImages: [], quickBookClassId: "", quickBookClassRef: ""},
    errors: {},
    edited: false,
  })


  const ready = !state.errors.name && !state.errors.description && !state.errors.quickBookClassRef && !state.errors.quickBookClassId && !state.errors.country;

  const resetState = () => {
    if(!campaignDetails) return;
    const {name, country, status, description, coverImage, CampaignMedia, CampaignCategory, checkoutType, quickBookClassId, quickBookClassRef} = campaignDetails;
    setState({values: {name, country, status, description, coverImage, images: CampaignMedia, checkoutType, categoryId: CampaignCategory?.id, quickBookClassId, quickBookClassRef}, type: 'reset'});
    if(coverImageInput.current)
      coverImageInput.current.value = "";
    if(imagesInput.current)
      imagesInput.current.value = "";
  }

  const uploadClick = (status) => {
    const body = new FormData();
    body.append('name', state.values.name);
    body.append('description', state.values.description);
    body.append('quickBookClassId', state.values.quickBookClassId);
    body.append('quickBookClassRef', state.values.quickBookClassRef);
    body.append('country', state.values.country);
    body.append('categoryId', state.values.categoryId);
    if(state.values.deletedImages?.length) {
      body.append('deletedImages', state.values.deletedImages.join(','));
    }
    if(typeof state.values.coverImage !== "string")
      body.append('coverImage', state.values.coverImage);
    for(let i of state.values.images)
      if(!i.id)
        body.append('images', i);

    dispatch(saveCampaign({id: campaignId, body }))
  }

  const changeStatus = (status) => {
    dispatch(saveCampaign({id: campaignId, body: { status }}));
  }

  if(campaignStateLoading && !campaignDetails) {
    return <div>Loading...</div>
  } else if (campaignStateId != campaignId) {
    return null;
  }

  return (
    <>
      <div className="flex justify-end mt-4">
        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
          <Button
            className="flex-grow btn btn-outline-secondary text-button-md md:text-button-lg"
            disabled={!state.edited}
            variant=""
            type="submit"
            label={"Cancel"}
            onClick={() => resetState()}
          />
          {state.edited?(
            <Button
              className="flex-grow btn btn-dark text-button-md md:text-button-lg"
              variant=""
              disabled={!state.edited || !ready}
              type="submit"
              label={"Save Changes"}
              onClick={() => uploadClick()}
            />
          ):(
            <>
              {state.values.status==='DRAFT'?
                <Button
                  className="flex-grow btn btn-primary text-button-md md:text-button-lg"
                  variant=""
                  type="submit"
                  label={"Publish"}
                  onClick={() => changeStatus('ACTIVE')}
                />
              :null}
              {state.values.status==='ACTIVE'?
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
              {state.values.status==='INACTIVE'?
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
            {state.values.coverImage?<img
              src={typeof state.values.coverImage === 'string'? state.values.coverImage: state.values.coverImage?.url}
              alt="preview"
              className="object-cover w-full h-full transition duration-300 ease-in-out opacity-100 hover:opacity-90"
            />:null}
            {/* <button className='absolute btn btn-lite-primary text-button-md md:text-button-lg right-5 bottom-5'>Change Cover</button> */}
            <div className="flex items-center justify-center w-full h-full ">
              <label
                htmlFor="dropzone-file"
                className="!mb-0 cursor-pointer absolute right-5 bottom-5"
              >
                <div className="flex flex-col items-center justify-center px-5 py-3 rounded-lg bg-primary-100 text-primary-300 text-button-lg">
                  Change Cover
                </div>
                <input id="dropzone-file" accept="image/*" type="file" className="hidden" onChange={setState} disabled={state.values.status==='DELETED'} name="coverImage" ref={coverImageInput} />
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
            value={state.values.name}
            onChange={setState}
            disabled={state.values.status==='DELETED'}
          />
          <div className="mt-2 text-red-300">{state.errors.name}</div>
        </div>
        <div className="flex flex-col mb-6 text-area">
          <label htmlFor="description" className="">
            Project Description
          </label>
          <div className="relative">
            <textarea
              /*onChange={e => setCount(e.target.value.length)}*/ rows={5}
              className="w-full bg-white !min-h-40 form-control"
              id="description"
              name="description"
              placeholder="Project Description"
              value={state.values.description}
              disabled={state.values.status==='DELETED'}
              onChange={setState}
            ></textarea>
            <p className="absolute font-medium bg-white text-button-md text-neutral-800 bottom-2 right-2">
              {state.values.description.length}/1000
            </p>
          </div>
          <div className="mt-2 text-red-300">{state.errors.description}</div>
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
            value={state.values.quickBookClassId}
            onChange={setState}
            disabled={state.values.status==='DELETED'}
          />
          <div className="text-red-300 mt-2">{state.errors.quickBookClassId}</div>
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="ProjectQuickbooksRef" className="">
            Quickbooks Class Reference
          </label>
          <input
            type="text"
            name="quickBookClassRef"
            className="w-full bg-white form-control"
            id="ProjectQuickbooksRef"
            placeholder="Quickbook Class Reference for the project"
            value={state.values.quickBookClassRef}
            onChange={setState}
            disabled={state.values.status==='DELETED'}
          />
          <div className="text-red-300 mt-2">{state.errors.quickBookClassRef}</div>
        </div>
        {/*
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="ProjectQuickbooksID" className="">
            Quickbooks Class Reference
          </label>
          <input
            type="text"
            name="quickbooksClassId"
            className="w-full bg-white form-control"
            id="ProjectQuickbooksID"
            placeholder="Project Name"
            value={state.values.name}
            onChange={setState}
            disabled={state.values.status==='DELETED'}
          />
          <div className="text-red-300 mt-2">{state.errors.name}</div>
        </div>
        */}
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="ProjectName" className="">
            Project Category
          </label>
          <select
            className="w-full bg-white form-control"
            id="project-categoryId"
            placeholder="Project Category"
            name="categoryId"
            onChange={setState}
            value={state.values.categoryId}
          >
            <option value="">Select a Category</option>
            {categories?.map(i => <option value={i.id} key={i.id}>{i.name}</option>)}
          </select>
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="project-checkout" className="">
            Project Checkout Type
          </label>
          <select
            className="w-full bg-white form-control"
            id="project-checkout"
            placeholder="Project Checkout Type"
            value={state.values.checkoutType}
            disabled
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
            value={state.values.country}
            onChange={setState}
          >
            <option value="">Select a country</option>
            {countriesList.map((c, i) => (
              <option value={c.code}>{c.name}</option>
            ))}
              {/*{countriesList.find(i => i.code===state.values.country)?.name}</option>*/}
          </select>
        </div>
      </form>
      <div className="flex flex-wrap items-center justify-between w-full gap-4 mt-6 mb-3">
        <h5 className="flex items-center text-button-lg gap-x-2">
          Project Images
        </h5>
        {/*
        <button
          className="btn btn-primary text-button-md md:text-button-lg"
          variant="primaryFull"
          disabled={state.values.status==='DELETED'}
          type="submit"
          onClick={() => imagesInput.current.click()}
        >
          Add Image
        </button>
        */}
      </div>

      <form className="flex flex-wrap gap-2 p-5 md:flex-nowrap sm:gap-3 lg:gap-5 bg-neutral-200 rounded-2xl">
        {state.values.images.map((i,index) => (
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
                <CloseIcon onClick={() => setState({type: 'remove', target: {index, name: 'images'}})} />
              </div>
            </div>
          </div>
        ))}
        {state.values.images.length>3?null:
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
            <input id="dropzone-file" accept="image/*" type="file" className="hidden" ref={imagesInput} disabled={state.values.status==='DELETED'} name="images" onChange={setState} />
          </div>
        }
      </form>
      <Modal />
    </>
  );
}

