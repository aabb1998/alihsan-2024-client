import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { CloseIcon } from '../../../../theme/svg-icons'

export default function SaveDraftModal() {
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
          Save Draft Modal
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
                <Dialog.Panel className="w-full max-w-modal-sm transition-all transform p-5 sm:p-10 rounded-1.5xl bg-white">
                    <div className='flex items-center justify-between mb-6'>
                        <Dialog.Title className="text-heading-7 sm:text-heading-5 text-neutral-1000" >
                        Unsaved changes
                        </Dialog.Title>
                        <button onClick={closeModal}><CloseIcon /></button>
                    </div>

                  <div className="max-h-[calc(100vh-20rem)] overflow-auto scroll-px-10 p-0  mb-10 border-0">
                    <p className="font-medium font-Montserrat text-md text-neutral-600">
                    Your changes will be lost if you navigate away from this page. Are you sure you want to leave this page?
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3 p-0 border-0 sm:gap-5">
                    <button type="button" className="flex-grow btn btn-dark" >
                    Save as draft
                    </button>
                    <button type="button" className="flex-grow btn btn-primary" onClick={closeModal}>
                    Leave page
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
