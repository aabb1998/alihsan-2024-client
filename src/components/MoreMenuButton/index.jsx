import React, { Fragment } from 'react';
import { Menu } from '@headlessui/react'
import { EditIcon, MoreverticalIcon, Trash2Icon } from '../../theme/svg-icons';

export default function MoreMenuButton({ items }) {
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
              {items.map((i, index) => (
                <Fragment key={index}>
                  <Menu.Item>
                    <button className='flex w-full gap-2 px-3 py-2 text-sm font-medium rounded hover:bg-primary-200 text-start text-neutral-1000 font-Montserrat' onClick={i.onClick}>
                      {i.icon} {i.text}
                    </button>
                  </Menu.Item>
                  {index!==items.length && <hr className=' border-neutral-300' />}
                </Fragment>
              ))}
            </div>
          </Menu.Items>
      </Menu>
    </div>
  )
}
