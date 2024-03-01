import React, { useState } from 'react';
import { CloseIcon } from '../../theme/svg-icons';
import Button from '../Button';

export default function ConfirmationModal ({ visible, title, text, rejectLabel, onReject, acceptLabel, onAccept }) {
  return (
    <>
      <div
        className={"relative z-10 "+(visible?'':'hidden')}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
            <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
              <div className="relative w-full gap-4 text-left transition-all transform sm:max-w-modal-sm">
                <div className="flex px-4 pt-4 pb-7.5 sm:pt-10 sm:pb-10 sm:px-10 bg-white rounded-t-3xl sm:rounded-3xl">
                  <div className="flex flex-col flex-grow w-100">
                    <div className="flex justify-between mb-4">
                      <div className="font-bold tracking-tighter text-neutral-1000 text-md sm:text-heading-7">
                        {title}
                      </div>
                      <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                        <CloseIcon iconSize={24} onClick={onReject} />
                      </button>
                    </div>
                    <div className='mb-7.5 sm:mb-10'>
                      <p className='font-medium text-neutral-600 text-md'>
                        {text}
                      </p>
                    </div>
                    <div className='flex justify-between gap-4 sm:gap-5'>
                      <Button variant={"dark"} className="flex-grow" label={rejectLabel} onClick={onReject} />
                      <Button variant={"primary"} className="flex-grow" label={acceptLabel} onClick={onAccept} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}