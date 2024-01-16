import React, { useReducer, useEffect, useRef } from "react";
import { ArrowLeftIcon, PlusIcon, CloseIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import CampaignForm from "./CampaignForm";
import { useNavigate } from 'react-router-dom'
import { addCampaign, loadCategories } from '../../../features/adminCampaigns'
import { useDispatch, useSelector } from 'react-redux'
import { countriesList } from '../../../utils/countries'
import { SnackMessages } from '../../../components/Toast';

function addUrl(file) {
  if(file)
    file.url = URL.createObjectURL(file);
}

const AddCampaign = () => {
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const imagesInput = useRef();
  const dispatch = useDispatch()
  const { loading, saving, categories } = useSelector(({adminCampaigns}) => adminCampaigns.add);
  const [ state, setState ] = useReducer((state, action) => {
    if(action.type==="change") {
      action = action.target;
      let val;
      if(!action.type || action.type==="text" || action.tagName==="SELECT" || action.tagName==="TEXTAREA") val = action.value;
      else if(action.type==="file") {
        val = action.files[0];
        addUrl(val);
      }
      // doing validation here itself
      let error = '';
      if(action.name==='name') {
        if(!val.length) error = "Project Name is required.";
      } else if(action.name==='description') {
        if(!val.length) error = "Project Description is required.";
        if(val.length>1000) error = "Should contain less than 1000 characters.";
      } else if(action.name==='checkoutType') {
        if(!val.length) error = "Project Checkout Type is required.";
      } else if(action.name==='categoryId') {
        if(!val.length) error = "Project Category is required.";
      } else if(action.name==='country') {
        if(!val.length) error = "Project Country is required.";
      } else if(action.name==='quickBookClassId') {
        if(!val) error = 'Quickbooks Class ID is required.'
      } else if(action.name==='quickBookClassRef') {
        if(!val) error = 'Quickbooks Class Reference is required.'
      } else if(action.name==='coverImage') {
        if(!val) error = 'Cover Image is required.'
      } else if(action.name==='images') {
        return { ...state, values: {...state.values, images: [...state.values.images, val]}, touched: {...state.touched, images: true} }
      }
      return {
        values: {...state.values, [action.name]: val},
        errors: {...state.errors, [action.name]: error},
        touched: {...state.touched, [action.name]: true},
      }
    } else if(action.type==="remove") {
      if(action.target?.name==="images") {
        const images = state.values.images.filter((_,i) => i!==action.target.index);
        return { ...state, values: {...state.values, images} }
      }
    }
    return state;
  }, {
    values: { name: '', description: '', coverImage: null, images: [], categoryId: '', country: '', checkoutType: '', quickBookClassId: '', quickBookClassRef: '' },
    errors: { name: '', description: '', coverImage: '', images: '', categoryId: '', country: '', checkoutType: '', quickBookClassId: '', quickBookClassRef: '' },
    touched: { name: false, description: false, coverImage: false, images: false, country: false, checkoutType: false, quickBookClassId: false, quickBookClassRef: '' },
  })

  const checkReady = () => {
    for(let i of ['name', 'description', 'categoryId', 'country', 'checkoutType', 'quickBookClassRef']) {
      if(!state.values[i]) return false;
    }
    for(let i in state.errors) {
      if(state.errors[i]) return false;
    }
    return true
  }
  const isReady = checkReady()

  const submit = (shouldDraft) => {
    const formData = new FormData();
    formData.append('name', state.values.name)
    formData.append('description', state.values.description)
    formData.append('categoryId', state.values.categoryId)
    formData.append('country', state.values.country)
    formData.append('checkoutType', state.values.checkoutType)
    formData.append('coverImage', state.values.coverImage)
    formData.append('quickBookClassId', state.values.quickBookClassId)
    formData.append('quickBookClassRef', state.values.quickBookClassRef)
    for(let i of state.values.images) {
      formData.append('images', i)
    }
    formData.append('status', shouldDraft?'DRAFT':'ACTIVE')
    dispatch(addCampaign(formData)).then(res => {
      if(!res.error) {
        showSuccessMessage("Campaign successfully added to "+(shouldDraft?"Drafts":"Active Campaigns"))
        navigate('/admin/campaigns')
      } else {
        showErrorMessage("Something went wrong. Please try again.")
      }
    })
  }
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadCategories())
  }, [])

  return (
    <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
      {/* dashboard title rea */}
      <div className="flex flex-wrap items-center justify-between w-full gap-4">
        <button disabled={saving} className="flex items-center text-button-lg gap-x-2" onClick={() => navigate('/admin/campaigns')}>
          <span>
            <ArrowLeftIcon />{" "}
          </span>
          Back to Campaigns
        </button>
        <div className="flex flex-wrap items-center gap-2 lg:gap-3">
          <Button
            className="flex-grow btn btn-outline-secondary text-button-md md:text-button-lg"
            variant=""
            type="submit"
            label={"Cancel"}
            disabled={saving}
            onClick={() => navigate(-1)}
          />
          <Button
            className="flex-grow btn btn-dark text-button-md md:text-button-lg"
            variant=""
            type="submit"
            disabled={!isReady || loading || saving}
            onClick={() => submit(true)}
            label="Save as Draft"
          />
          <Button
            className="flex-grow btn btn-primary text-button-md md:text-button-lg"
            variant=""
            type="submit"
            disabled={!isReady || loading || saving}
            onClick={() => submit(false)}
            label="Publish"
          />
        </div>
      </div>
      <div className="mt-7.5">
        <form className="w-full mt-7.5">
          <div className="flex flex-col mb-6 form-group">
            {/*
            <div
              for="dropzone-file"
              className="relative flex flex-col items-center justify-center w-full overflow-hidden bg-center bg-no-repeat bg-cover cursor-pointer rounded-3xl h-76 bg-choose-color"
            >
              <img
                src={state.coverImage?.url}
                alt="preview"
                className="object-cover w-full h-full transition duration-300 ease-in-out opacity-100 hover:opacity-90"
              />
              <div className="relative flex items-center justify-center w-full h-full bg-choose-cover">
                <label
                  for="dropzone-file"
                  className="!mb-0 cursor-pointer absolute right-5 bottom-5"
                >
                  <div className="flex flex-col items-center justify-center px-5 py-3 rounded-lg bg-primary-100 text-primary-300 text-button-lg">
                    Change Cover
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" onChange={setState} />
                </label>
              </div>
            </div>
          */}
                    <div for="dropzone-file" className="relative flex flex-col items-center justify-center w-full overflow-hidden bg-center bg-no-repeat bg-cover cursor-pointer rounded-3xl h-76 bg-choose-cover">
                        {/* <Button className='absolute btn btn-lite-primary text-button-md md:text-button-lg right-5 bottom-5' label={'Change Cover'} /> */}
                        <div className="flex items-center justify-center w-full h-full">
                          {/*<img src="https://i.pinimg.com/originals/f7/91/1a/f7911a732532fa6c64748dc7281d915f.jpg" alt="preview" className='object-cover w-full' />*/}
                          {state.values.coverImage?<img src={state.values.coverImage?.url} alt="preview" className='object-cover w-full' />:null}
                <label for="dropzone-file" className="!mb-0 cursor-pointer absolute right-5 bottom-5">
                  <div className="flex flex-col items-center justify-center px-5 py-3 rounded-lg bg-primary-100 text-primary-300 text-button-lg">
                    Change Cover
                  </div>
                  <input id="dropzone-file" accept="image/*" type="file" className="hidden"  name={`coverImage`} onChange={setState} />
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
            />
            <div className="mt-2 text-red-300">{state.errors.name}</div>
          </div>
          <div className="flex flex-col mb-6 form-group">
            <label htmlFor="ProjectQuickbookId" className="">
              Quickbooks Class ID
            </label>
            <input
              type="text"
              name="quickBookClassId"
              className="w-full bg-white form-control"
              id="ProjectQuickbookID"
              placeholder="Quickbooks Class ID for the Project"
              value={state.values.quickBookClassId}
              onChange={setState}
            />
            <div className="mt-2 text-red-300">{state.errors.quickBookClassId}</div>
          </div>
          <div className="flex flex-col mb-6 form-group">
            <label htmlFor="ProjectQuickbookRef" className="">
              Quickbooks Class Reference
            </label>
            <input
              type="text"
              name="quickBookClassRef"
              className="w-full bg-white form-control"
              id="ProjectQuickbookRef"
              placeholder="Quickbooks Class Reference for the Project"
              value={state.values.quickBookClassRef}
              onChange={setState}
            />
            <div className="mt-2 text-red-300">{state.errors.quickBookClassRef}</div>
          </div>
          <div className="flex flex-col mb-6 form-group">
            <label htmlFor="ProjectName" className="">
              Project Category
            </label>
            <select
              name="categoryId"
              className="w-full bg-white form-control"
              id="project-categoryId"
              placeholder="Project Category"
              value={state.values.categoryId}
              onChange={setState}
            >
              <option value="">Select a Category</option>
              {categories?.map(i => <option value={i.id} key={i.id}>{i.name}</option>)}
            </select>
            <div className="mt-2 text-red-300">{state.errors.categoryId}</div>
          </div>
          <div className="flex flex-col mb-6 form-group">
            <label htmlFor="project-checkout" className="">
              Project Checkout Type
            </label>
            <select
              name="checkoutType"
              className="w-full bg-white form-control"
              id="project-checkout"
              placeholder="Project Checkout Type"
              value={state.values.checkoutType}
              onChange={setState}
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
            <div className="mt-2 text-red-300">{state.errors.checkoutType}</div>
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
              <option value="">Select a Country</option>
              {countriesList.map(i => <option value={i.code} key={i.code}>{i.name}</option>)}
            </select>
            <div className="mt-2 text-red-300">{state.errors.country}</div>
          </div>
          <div className="relative flex flex-col mb-6 text-area">
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
                onChange={setState}
              ></textarea>
              <p className="absolute font-medium bg-white text-button-md text-neutral-800 bottom-2 right-2">
                {state.values.description.length}/1000
              </p>
            </div>
            <div className="mt-2 text-red-300">{state.errors.description}</div>
          </div>
        </form>
        <div className="flex flex-wrap items-center justify-between w-full gap-4 mt-6 mb-3">
          <h5 className="flex items-center text-button-lg gap-x-2">
            Project Images
          </h5>
          <button
            className="btn btn-primary text-button-md md:text-button-lg"
            variant="primaryFull"
            type="submit"
            onClick={() => imagesInput.current.click()}
          >
            Add Image
          </button>
        </div>

        <form className="flex flex-wrap gap-2 p-5 md:flex-nowrap sm:gap-3 lg:gap-5 bg-neutral-200 rounded-2xl">
          {state.values.images.map((i, index) => (
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
                <div className="absolute top-2 right-2">
                  <CloseIcon onClick={() => setState({type: 'remove', target: {name: 'images', index }})} />
                </div>
              </div>
            </div>
          ))}
          {/*
          <div className="flex flex-grow md:flex-grow-0 form-group">
            <div
              for="dropzone-file"
              className="flex flex-grow !mb-0 overflow-hidden rounded-lg cursor-pointer md:max-w-51"
            >
              <img
                src="/images/campaign/campaign-details-1.png"
                alt="preview"
                className="object-cover w-full h-full transition duration-300 ease-in-out opacity-100 hover:opacity-90"
              />
            </div>
          </div>
          <div className="flex flex-grow md:flex-grow-0 form-group ">
            <div
              for="dropzone-file"
              className="flex flex-grow !mb-0 overflow-hidden rounded-lg cursor-pointer md:max-w-51"
            >
              <img
                src="/images/campaign/campaign-details-2.png"
                alt="preview"
                className="object-cover w-full h-full transition duration-300 ease-in-out opacity-100 hover:opacity-90"
              />
            </div>
          </div>
          <div className="flex flex-grow md:flex-grow-0 form-group ">
            <div
              for="dropzone-file"
              className="flex flex-grow !mb-0 overflow-hidden rounded-lg cursor-pointer md:max-w-51"
            >
              <img
                src="/images/campaign/campaign-details-3.png"
                alt="preview"
                className="object-cover w-full h-full transition duration-300 ease-in-out opacity-100 hover:opacity-90"
              />
            </div>
          </div>
          */}
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
              <input ref={imagesInput} id="dropzone-file" accept="image/*" type="file" className="hidden" name="images" onChange={setState} />
            </div>
          }
        </form>
      </div>
    </div>
  )
}

export default AddCampaign;
