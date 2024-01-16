import { Tab } from '@headlessui/react';
import React from 'react';
import { SelectedCampaignComponent } from '../Pages/Campaign/SelectedCampaign';
import { UpdateCampaignComponent } from '../Pages/Campaign/UpdateCampaign';
import { DonationCampaignComponent } from '../Pages/Campaign/DonationsCampaign';

function InfoCampaignTabs() {
  return (
    <div>
    <Tab.Group>
      <Tab.List className="flex flex-wrap border-b border-b-neutral-300">
        <Tab className="flex justify-center flex-grow sm:flex-grow-0 w-auto px-2 py-2 font-bold border-b-2 border-transparent sm:py-3 text-button-md sm:text-button-lg sm:!w-35 hover:border-primary-300 text-neutral-600 hover:text-primary-300 active:text-primary-300 active:border-b-primary-300 focus:outline-none focus-within:outline-none">Edit Campaign</Tab>
        <Tab className="flex justify-center flex-grow sm:flex-grow-0 w-auto px-2 py-2 font-bold border-b-2 border-transparent sm:py-3 text-button-md sm:text-button-lg sm:!w-35 hover:border-primary-300 text-neutral-600 hover:text-primary-300 focus:outline-none focus-within:outline-none">Updates</Tab>
        <Tab className="flex justify-center flex-grow sm:flex-grow-0 w-auto px-2 py-2 font-bold border-b-2 border-transparent sm:py-3 text-button-md sm:text-button-lg sm:!w-35 hover:border-primary-300 text-neutral-600 hover:text-primary-300 focus:outline-none focus-within:outline-none">Donations</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
            <SelectedCampaignComponent />
        </Tab.Panel>
        <Tab.Panel>
        <UpdateCampaignComponent />
          </Tab.Panel>
        <Tab.Panel>
          <DonationCampaignComponent />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
    </div>
  );
}
export default InfoCampaignTabs;