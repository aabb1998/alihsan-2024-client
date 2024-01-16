import { Tab } from '@headlessui/react';
import React, { useState } from 'react';
import ProjectDetailsOnetime from './ProjectDetailsOnetime';

function ItemDonationsTabView() {
  const [tab, setTab] = useState('project');
  return (
    <div>
    <Tab.Group>
      <Tab.List className="flex flex-wrap border-b border-b-neutral-300">
        <Tab className="flex justify-center flex-grow w-auto px-2 py-2 font-bold border-b-2 border-transparent sm:flex-grow-0 sm:py-3 text-button-md sm:text-button-lg hover:border-primary-300 text-neutral-600 hover:text-primary-300 active:text-primary-300 active:border-b-primary-300 focus:outline-none focus-within:outline-none" onClick={() => setTab('project')}>Project Details</Tab>
        <Tab className="flex justify-center flex-grow w-auto px-2 py-2 font-bold border-b-2 border-transparent sm:flex-grow-0 sm:py-3 text-button-md sm:text-button-lg hover:border-primary-300 text-neutral-600 hover:text-primary-300 focus:outline-none focus-within:outline-none" onClick={() => setTab('payment')}>Payment History</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
            <div className='flex flex-col gap-5'>
                <ProjectDetailsOnetime isOpen={tab === 'project'} />
            </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
    </div>
  );
}
export default ItemDonationsTabView;