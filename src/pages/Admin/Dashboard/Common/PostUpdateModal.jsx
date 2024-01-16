import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { CloseIcon, PlusIcon } from '../../../../theme/svg-icons'

export default function PostUpdateModal() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="">
        <button type="button" onClick={openModal} className="btn btn-primary" >
          Post Update Modal
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                        <button onClick={closeModal}><CloseIcon /></button>
                    </div>

                  <div className="max-h-[calc(100vh-17rem)] overflow-auto scroll-px-10 p-0  mb-7.5 border-0">
                    <form className='flex flex-col gap-4 sm:gap-5'>
                        <div className="relative flex flex-col text-area">
                            <label htmlFor="description" className="text-sm font-medium sm:text-md text-neutral-1000">Post</label>
                            <textarea  rows={5}  className="w-full bg-white !min-h-40 form-control" id="description" placeholder="Write your post content">
                            </textarea>
                            <p className='absolute font-medium bg-white text-button-md text-neutral-800 bottom-2 right-2'>0/500</p>
                        </div>
                        <div className='grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:gap-5'>
                            <div for="dropzone-file" className="flex flex-col items-center justify-center flex-grow px-4 py-4 border border-dashed rounded-lg cursor-pointer md:py-12 md:px-8 border-neutral-500">
                                <div className="flex flex-col items-center justify-center gap-2 text-neutral-600">
                                    <PlusIcon/>
                                    <p className="text-center text-button-sm sm:text-button-md text-neutral-600 lg:whitespace-nowrap">Add Photos or Video</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </div>
                            <div for="dropzone-file" className="flex flex-col items-center justify-center flex-grow px-4 py-4 border border-dashed rounded-lg cursor-pointer md:py-12 md:px-8 border-neutral-500">
                                <div className="flex flex-col items-center justify-center gap-2 text-neutral-600">
                                    <PlusIcon/>
                                    <p className="text-center text-button-sm sm:text-button-md text-neutral-600 lg:whitespace-nowrap">Add Photos or Video</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </div>
                            <div for="dropzone-file" className="flex flex-col items-center justify-center flex-grow px-4 py-4 border border-dashed rounded-lg cursor-pointer md:py-12 md:px-8 border-neutral-500">
                                <div className="flex flex-col items-center justify-center gap-2 text-neutral-600">
                                    <PlusIcon/>
                                    <p className="text-center text-button-sm sm:text-button-md text-neutral-600 lg:whitespace-nowrap">Add Photos or Video</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </div>
                            <div for="dropzone-file" className="flex flex-col items-center justify-center flex-grow px-4 py-4 border border-dashed rounded-lg cursor-pointer md:py-12 md:px-8 border-neutral-500">
                                <div className="flex flex-col items-center justify-center gap-2 text-neutral-600">
                                    <PlusIcon/>
                                    <p className="text-center text-button-sm sm:text-button-md text-neutral-600 lg:whitespace-nowrap">Add Photos or Video</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </div>
                        </div>
                        <div class="flex items-center mb-4">
                            <input id="default-checkbox" type="checkbox" class="w-5 h-5 rounded-sm border border-neutral-300"/>
                            <label for="default-checkbox" class="ms-2 font-Montserrat text-sm sm:text-md font-medium text-neutral-800">Email donors</label>
                        </div>


                    </form>
                  </div>

                  <div className="flex flex-wrap items-center justify-start gap-3 p-0 border-0 sm:gap-5">
                    <button type="button" className="flex-grow btn btn-outline-secondary sm:flex-grow-0" >
                    Cancel
                    </button>
                    <button type="button" className="flex-grow btn btn-primary sm:flex-grow-0" onClick={closeModal}>
                    Post Update
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
