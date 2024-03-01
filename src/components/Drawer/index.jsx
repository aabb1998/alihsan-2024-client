import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'


export const SideDrawer = ({ open, handleClose, children }) => {

    const onClose = () => handleClose();

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500 "
                    enterFrom="opacity-0"
                    enterTo="opacity-100 bg-opacity-30 bg-neutral-1000"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="fixed inset-y-0 right-0 flex max-w-full pointer-events-none">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="relative w-screen pointer-events-auto">
                                    <div className="flex flex-col h-full overflow-y-scroll shadow-xl">
                                        <div className="relative flex-1 flex flex-row">
                                            {children}
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

SideDrawer.defaultProps = {
    open: false,
    handleClose: () => { },
    children: <></>
}
