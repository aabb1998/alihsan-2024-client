import React from 'react';
import { Menu} from '@headlessui/react'
import { ChevronDownIcon } from '../../../../../../theme/svg-icons';

export default function AdminRoleDropdown() {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="">
                <div className='flex items-center gap-1.5'>
                    <p className='text-sm font-medium font-Montserrat text-neutral-700'>Admin</p>
                    <ChevronDownIcon iconSize={16} />
                </div>
          </Menu.Button>
        </div>
          <Menu.Items className="absolute right-0 z-10 mt-2 bg-white border rounded-md shadow-lg w-fit min-w-35 border-neutral-200">
            <div className="p-2.5">
              <Menu.Item>
                  <button className='w-full px-3 py-2 text-sm font-medium rounded text-start text-neutral-1000 font-Montserrat hover:bg-primary-200'> Admin</button>
              </Menu.Item>
              <Menu.Item>
                  <button className='w-full px-3 py-2 text-sm font-medium rounded text-start text-neutral-1000 font-Montserrat hover:bg-primary-200'> Editor</button>
              </Menu.Item>
              <Menu.Item>
                  <button className='w-full px-3 py-2 text-sm font-medium rounded text-start text-neutral-1000 font-Montserrat hover:bg-primary-200'> Viewer</button>
              </Menu.Item>
            </div>
          </Menu.Items>
      </Menu>
    </div>
  )
}
