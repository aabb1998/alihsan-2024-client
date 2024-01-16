import React from 'react';
import { Menu} from '@headlessui/react'
import { MoreverticalIcon } from '../../../../theme/svg-icons';

export default function TableActionbtn() {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="p-2 rounded bg-neutral-200">
            <MoreverticalIcon/>
          </Menu.Button>
        </div>
          <Menu.Items className="absolute right-0 z-10 mt-2 bg-white border rounded-md shadow-lg w-fit border-neutral-200">
            <div className="p-2">
              <Menu.Item>
                  <button className='w-full px-3 py-2 text-sm font-medium rounded hover:bg-primary-200 text-start text-neutral-1000 font-Montserrat'> Edit</button>
              </Menu.Item>
              <Menu.Item>
                  <button className='w-full px-3 py-2 text-sm font-medium rounded hover:bg-primary-200 text-start text-neutral-1000 font-Montserrat'> Delete</button>
              </Menu.Item>
            </div>
          </Menu.Items>
      </Menu>
    </div>
  )
}
