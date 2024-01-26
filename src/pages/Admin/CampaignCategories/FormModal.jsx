import React, { useState, useEffect } from "react";
import { CalendarIcon, CloseIcon, InfoIcon, UsaFlagIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import useFormState from '../../../hooks/useFormState'
import { SnackMessages } from '../../../components/Toast';
import { useDispatch, useSelector } from 'react-redux'
import { createCategory, editCategory } from '../../../features/adminCampaignCategories'

const ErrorLabel = ({ error }) => <div className="mt-2 text-red-300 text-md">{error}</div>

const CategoryFormModal = ({ onClose, state }) => {
  const { rows, loader } = useSelector(state => state.adminCampaignCategories)
  useEffect(() => {
    if (state !== null && state !== true) {
      formState.dispatch({ type: 'reset', values: rows.find(i => i.id === state) })
    } else if (state === null) {
      formState.dispatch({ type: 'reset', values: {} })
    }
  }, [state, rows])
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const formState = useFormState({
    schema: {
      name: {
        initialValue: '',
        validator: v => !v.length && 'This field is required',
      },
      description: {
        initialValue: '',
        validator: v => !v.length && 'This field is required',
      },
    }, onSubmit: ({ values }) => {
      let promise;
      if (state === true)
        promise = dispatch(createCategory(values));
      else
        promise = dispatch(editCategory({ payload: values, id: state }));
      promise.then(res => {
        if (res.error)
          showErrorMessage(res.error.message)
        else {
          showSuccessMessage(res.payload.message)
          onClose();
        }
      })
    }
  })
  const cancel = () => {
    formState.dispatch({ type: 'reset' })
    onClose();
  }
  const submit = () => {
    formState.submit();
  }
  const changed = formState.touched.name || formState.touched.description;
  const dispatch = useDispatch();
  return (
    <div className={"relative z-10 " + (state === null ? 'hidden' : '')} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
          <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
            <div className="relative w-full overflow-hidden text-left transition-all transform bg-white rounded-2.5xl sm:rounded-3xl sm:my-8 sm:max-w-38.75 rounded-b-none">
              <div className="bg-white px-4 pt-4 pb-7.5 sm:px-10 sm:pt-10 sm:pb-10 py-10">
                <div className="flex flex-col gap-5 sm:gap-8">

                  <div className="flex justify-between">
                    <div className="font-bold tracking-tighter text-md sm:text-heading-7">Add Category</div>
                    <button className="text-neutral-1000" onClick={onClose}>
                      <CloseIcon iconSize={24} />
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <div className="w-full mb-4 form-group">
                      <label htmlFor="amount" className="block">Category Name</label>
                      <input type="text" className="w-full form-control" id="Weight" placeholder="Category Name" name="name" onChange={formState.dispatch} value={formState.values.name} />
                      <ErrorLabel
                        error={formState.touched.group && formState.errors.group}
                      />
                    </div>
                    <div className="w-full form-group">
                      <label htmlFor="cost" className="block">Description</label>
                      <textarea type="text" className="w-full form-control min-h-[7.5em]" id="Weight" placeholder="Description" name="description" onChange={formState.dispatch} value={formState.values.description} />
                      <ErrorLabel
                        error={formState.touched.description && formState.errors.description}
                      />
                    </div>
                  </div>

                  <div className="flex gap-5 sm:gap-7.5">
                    <Button className="flex-grow basis-0 btn btn-outline-secondary" variant="" label={'Cancel'} onClick={cancel} />
                    <Button className="flex-grow basis-0 btn btn-primary" variant="" label={'Submit'} disabled={loader || state !== true && !changed} onClick={submit} />
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

export default CategoryFormModal;
