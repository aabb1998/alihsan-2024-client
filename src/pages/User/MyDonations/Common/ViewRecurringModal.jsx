import { Tab } from '@headlessui/react';
import React, { useState } from 'react';
import { CloseIcon } from '../../../../theme/svg-icons';
import ProjectDetailsRecurring from './ProjectDetailsRecurring';
import PaymentHistoryDetails from './PaymentHistory';


const ViewDetailsRecurring =({onClose})=> {
    const [tab, setTab] = useState('financial');
  return (
    <div>
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
     <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
            <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
                <div className="relative w-full overflow-hidden text-left transition-all transform bg-white rounded-2.5xl sm:rounded-3xl sm:my-8 sm:max-w-38.75 rounded-b-none">
                    <div className="relative p-4 pt-6 bg-white sm:p-6">
                        <div className="flex flex-col">
                            <div className="flex justify-end">
                                <button className="absolute text-neutral-1000" onClick={()=>onClose(false)}>
                                    <CloseIcon iconSize={24} />
                                </button>
                            </div>
                            <div className="flex flex-col gap-4 sm:gap-5">
                            <Tab.Group>
                            <Tab.List className="flex flex-wrap border-b border-b-neutral-300">
                                <Tab className="flex justify-center flex-grow w-auto px-2 py-2 font-bold border-b-2 border-transparent sm:flex-grow-0 sm:py-3 text-button-md sm:text-button-lg hover:border-primary-300 text-neutral-600 hover:text-primary-300 active:text-primary-300 active:border-b-primary-300 focus:outline-none focus-within:outline-none" onClick={() => setTab('project')}>Project Details</Tab>
                                <Tab className="flex justify-center flex-grow w-auto px-2 py-2 font-bold border-b-2 border-transparent sm:flex-grow-0 sm:py-3 text-button-md sm:text-button-lg hover:border-primary-300 text-neutral-600 hover:text-primary-300 focus:outline-none focus-within:outline-none" onClick={() => setTab('payment')}>Payment History</Tab>
                            </Tab.List>
                            <Tab.Panels>
                                <Tab.Panel>
                                    <div className='flex flex-col gap-5'>
                                        <ProjectDetailsRecurring isOpen={tab === 'project'}/>
                                    </div>
                                </Tab.Panel>
                                <Tab.Panel>
                                    <div className='flex flex-col gap-5'>
                                            <PaymentHistoryDetails isOpen={tab === 'payment'}/>
                                    </div>
                                </Tab.Panel>
                            </Tab.Panels>
                            </Tab.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>

    </div>
  );
}
export default ViewDetailsRecurring;