import React, { useState, useEffect } from "react";
import { CalendarIcon, CloseIcon, Edit3Icon, InfoIcon, UsaFlagIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import useFormState from '../../../hooks/useFormState'
import { SnackMessages } from '../../../components/Toast';
import { useDispatch, useSelector } from 'react-redux'
import { addQurban, editQurban } from '../../../features/adminSettings'
import ArrayInput from './ArrayInput'
import { countriesList } from '../../../utils/countries'

const validateNumber = v => !/^[0-9]+(.[0-9]+)?$/.test(v)
const ErrorLabel = ({ error }) => <div className="mt-2 text-red-300 text-md">{error}</div>

const AddQurbanModal = ({ onClose, onAdd, state }) => {
  const { qurbanLoader, qurbanValues } = useSelector(state => state.adminSettings)
  useEffect(() => {
    if (state !== null && state !== true) {
      formState.dispatch({ type: 'reset', values: qurbanValues[state] })
    } else if (state === null) {
      formState.dispatch({ type: 'reset', values: {} })
    }
  }, [state, qurbanValues])
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const formState = useFormState({
    schema: {
      group: {
        initialValue: '',
        validator: v => !v.length && 'This field is required',
      },
      amount: {
        initialValue: '',
        validator: v => !v.length ? 'This field is required' : validateNumber(v) && 'Should be a valid amount',
      },
      country: {
        initialValue: [],
        validator: v => !v.length && 'Atleast one country is required',
      },
    }, onSubmit: ({ values }) => {
      setLoading(true)
      const id = qurbanValues[state].id;
      let promise;
      if (state === true)
        promise = dispatch(addQurban({ ...values, country: values.country.join(',') }));
      else
        promise = dispatch(editQurban({ payload: { ...values, country: values.country.join(',') }, id }));
      promise.then(res => {
        setLoading(false)
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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  return (
    <div className={"relative z-10 " + (state === null ? 'hidden' : '')} aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
          <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
            <div className="relative w-full overflow-hidden text-left transition-all transform bg-white rounded-2.5xl sm:rounded-3xl sm:my-8 sm:max-w-38.75 rounded-b-none">
              <div className="bg-white px-4 pt-4 pb-7.5 sm:px-10 sm:pt-10 sm:pb-10 py-10">
                <div className="flex flex-col gap-5 sm:gap-8">
                  <div className="flex justify-between">
                    <div className="font-bold tracking-tighter text-md sm:text-heading-7">Add New Group</div>
                    <button className="text-neutral-1000" onClick={onClose}>
                      <CloseIcon iconSize={24} />
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <div className="w-full mb-4 form-group">
                      <label htmlFor="amount" className="block">Group Name </label>
                      <input type="text" className="w-full form-control" id="Weight" placeholder="Group Name" name="group" onChange={formState.dispatch} value={formState.values.group} />
                      <ErrorLabel
                        error={formState.touched.group && formState.errors.group}
                      />
                    </div>
                    <div className="mb-4 form-group">
                      <label htmlFor="cost" className="block">Cost</label>
                      {/* <input type="text" className="w-full form-control" id="Weight" placeholder="$130" name="amount" onChange={formState.dispatch} value={formState.values.amount} /> */}
                      <div class="relative overflow-hidden form-group grow basis-0">
                        <div class="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
                          <Edit3Icon iconSize={18} />
                        </div>
                        <input type="text" placeholder="$130" name="amount" onChange={formState.dispatch} value={formState.values.amount} className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] w-full" />
                      </div>
                      <ErrorLabel
                        error={formState.touched.amount && formState.errors.amount}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="country" className="block">Country</label>
                      <ArrayInput
                        array={formState.values.country}
                        onChange={formState.dispatch}
                        inputItem={({ onChange, value }) => (
                          <select className="text-sm !text-neutral-800 border-neutral-300 form-control" value={value} onChange={onChange}>
                            <option value="" className="text-neutral-400">Select Country</option>
                            {countriesList.filter(i => formState.values.country.indexOf(i.code) < 0).map(i => (
                              <option value={i.code} key={i.code} className="text-neutral-400">{i.name}</option>
                            ))}
                          </select>
                        )}
                        arrayItem={({ value, onClose }) => (
                          <div className="flex gap-2 p-1 pr-2 rounded w-fit bg-neutral-200">
                            <img
                              src={`${process.env.REACT_APP_COUNTRY_URL}${value}.svg`}
                              className={'w-[1.375rem] h-auto'}
                              alt="flag"
                            />
                            <p className="text-sm text-neutral-800 line-clamp-1">{countriesList.find(c => c.code === value)?.name}</p>
                            <span className="text-red-300 cursor-pointer"><CloseIcon onClick={onClose} /></span>
                          </div>
                        )}
                      />
                      <ErrorLabel
                        error={formState.touched.country && formState.errors.country}
                      />
                    </div>
                  </div>


                  <div className="flex gap-5 sm:gap-7.5">
                    <Button className="flex-grow basis-0 btn btn-outline-secondary" variant="" label={'Cancel'} onClick={cancel} />
                    <Button className="flex-grow basis-0 btn btn-primary" variant="" label={'Submit'} onClick={submit} />
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

export default AddQurbanModal;
