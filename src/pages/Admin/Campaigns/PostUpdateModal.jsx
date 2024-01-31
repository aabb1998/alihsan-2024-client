import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useReducer, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CloseIcon, PlusIcon } from '../../../theme/svg-icons'
import { Button } from "../../../components";
import { SnackMessages } from '../../../components/Toast';
import { closeUpdateModal, editCampaignUpdate, addCampaignUpdate } from '../../../features/adminCampaigns'

function addUrl(file) {
  if(file)
    file.url = URL.createObjectURL(file);
}

export default function PostUpdateModal() {
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const dispatch = useDispatch()
  const mediaRef = useRef();
  const { id, campaignId, open, saving, details } = useSelector(({adminCampaigns}) => adminCampaigns.update);
  const [ state, setState ] = useReducer((state, action) => {
    if(action.type==='change') {
      action = action.target;
      let val;
      if(!action.type || action.type==="text" || action.tagName==="SELECT" || action.tagName==="TEXTAREA") val = action.value;
      else if(action.type==="file") {
        val = action.files[0];
        addUrl(val);
      } else if(action.type==="checkbox") {
        val = action.checked;
      }
      // doing validation here itself
      let error = '';
      if(action.name==='text') {
        if(!val.length) error = "Post content is required.";
        if(val.length>500) error = "Should contain less than 500 characters.";
      } else if(action.name==='images') {
        return {...state, values: {...state.values, images: [...state.values.images, val]}, touched: {...state.touched, images: true}};
      }
      return {
        values: {...state.values, [action.name]: val},
        errors: {...state.errors, [action.name]: error},
        touched: {...state.touched, [action.name]: true},
      }
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
        return { ...state, values: {...state.values, images, deletedImages} };
      }
    } else if(action.type==='reset') {
      return {
        values: { text: action.values.text, images: action.values.images },
        errors: { text: '', images: '' },
        touched: { text: false, images: false },
      };
    }
  }, {
    values: { text: '', images: [] },
    errors: { text: '', images: '' },
    touched: { text: false, images: false },
  })

  const isReady = state.values.text && !state.errors.text;

  const submit = () => {
    const body = new FormData();
    body.append('text', state.values.text)
    body.append('emailDonors', state.values.emailDonors)
    for(let i of state.values.images) {
      if(!i.id)
        body.append('images', i)
    }
    if(state.values.deletedImages?.length)
      body.append('deletedImages', state.values.deletedImages.join(','))
    if(!id) {
      dispatch(addCampaignUpdate({ campaignId, body })).then(res => {
        if(!res.error) {
          showSuccessMessage("Update posted successfully")
        } else {
          showErrorMessage("Something went wrong. Please try again.")
        }
      })
    } else {
      dispatch(editCampaignUpdate({ updateId: id, body })).then(res => {
        if(!res.error) {
          showSuccessMessage("Edited successfully")
        } else {
          showErrorMessage("Something went wrong. Please try again.")
        }
      })
    }
  }

  useEffect(() => {
    if(open)
      setState({type: 'reset', values: {text: details?.text || '', images: details?.images || []}})
  }, [details, open])


  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-100" onClose={() => dispatch(closeUpdateModal())}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-1000 opacity-40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-modal-md transition-all transform p-5 sm:p-10 rounded-1.5xl bg-white">
                  <div className='flex items-center justify-between mb-6'>
                      <Dialog.Title className="text-heading-7 text-neutral-1000" >
                      Post Update
                      </Dialog.Title>
                      <button onClick={() => dispatch(closeUpdateModal())}><CloseIcon /></button>
                  </div>

                <div className="max-h-[calc(100vh-17rem)] overflow-auto scroll-px-10 p-0  mb-7.5 border-0">
                  <form className='flex flex-col gap-4 sm:gap-5'>
                      <div className="relative flex flex-col text-area">
                          <label htmlFor="description" className="text-sm font-medium sm:text-md text-neutral-1000">Content</label>
                        <div className="relative">
                          <textarea  rows={5}  className="w-full bg-white !min-h-40 form-control !text-neutral-1000" id="description" placeholder="Write your post content" onChange={setState} value={state.values.text} name="text">
                          </textarea>
                          <p className='absolute font-medium bg-white text-button-md text-neutral-800 bottom-2 right-2'>{state.values.text.length}/500</p>
                        </div>
                        <div className="mt-2 text-red-300">{state.errors.text}</div>
                      </div>

                      <input id="dropzone-file" accept="image/*" type="file" className="hidden" ref={mediaRef} onChange={setState} name="images" />
                      <div className='grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:gap-5'>
                        {[
                          state.values.images[0],
                          state.values.images[1],
                          state.values.images[2],
                          state.values.images[3],
                        ].map((image, index) => (
                          <div for="dropzone-file" className={"relative flex flex-col items-center justify-center flex-grow border border-dashed rounded-lg cursor-pointer border-neutral-500"+(image?"":"px-4 py-4 md:py-12 md:px-8")} onClick={() => mediaRef.current?.click()}>
                            {image?(
                              <>
                                <img src={image.url} className="" />
                                <div className="absolute top-2 right-2">
                                  <CloseIcon onClick={(e) => {setState({type: 'remove', target: {name: 'images', index }}); e.stopPropagation();}} />
                                </div>
                              </>
                            ):(
                              <>
                                <div className="flex flex-col items-center justify-center gap-2 text-neutral-600">
                                    <PlusIcon/>
                                    <p className="text-center text-button-sm sm:text-button-md text-neutral-600 lg:whitespace-nowrap">Add Photo or Video</p>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    {id?null:(
                      <div class="flex items-center mb-4">
                          <input id="default-checkbox" type="checkbox" class="w-5 h-5 rounded-sm border border-neutral-300" checked={state.values.emailDonors} onChange={setState} name="emailDonors" />
                          <label for="default-checkbox" class="ms-2 font-Montserrat text-sm sm:text-md font-medium text-neutral-800">Email Donors</label>
                      </div>
                    )}


                  </form>
                </div>

                <div className="flex flex-wrap items-center justify-start gap-3 p-0 border-0 sm:gap-5">
                  <button type="button" className="flex-grow btn btn-outline-secondary sm:flex-grow-0" onClick={() => dispatch(closeUpdateModal())}>
                  Cancel
                  </button>
                  <button type="button" className="flex-grow btn btn-primary sm:flex-grow-0" onClick={submit} disabled={!isReady || saving}>
                    {id?"Save Changes":"Post Update"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
