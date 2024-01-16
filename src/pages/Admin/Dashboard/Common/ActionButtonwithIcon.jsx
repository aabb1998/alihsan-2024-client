import React from 'react';
import { Menu} from '@headlessui/react'
import { EditIcon, MoreverticalIcon, Trash2Icon } from '../../../../theme/svg-icons';


export default function ActionButtonWithIcon() {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="">
            <MoreverticalIcon />
          </Menu.Button>
        </div>
          <Menu.Items className="absolute right-0 z-10 mt-2 bg-white border rounded-md shadow-lg w-fit border-neutral-200">
            <div className="p-2.5">
              <Menu.Item>
                  <button className='flex w-full gap-2 px-3 py-2 text-sm font-medium rounded hover:bg-primary-200 text-start text-neutral-1000 font-Montserrat'>
                    <EditIcon iconSize={16} /> Edit</button>
              </Menu.Item>
              <hr className=' border-neutral-300' />
              <Menu.Item>
                  <button className='flex w-full gap-2 px-3 py-2 text-sm font-medium rounded hover:bg-primary-200 text-start text-neutral-1000 font-Montserrat'>
                    <Trash2Icon iconSize={16}/> Delete</button>
              </Menu.Item>
            </div>
          </Menu.Items>
      </Menu>
    </div>
  )
}