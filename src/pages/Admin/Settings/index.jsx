import { useState, useEffect } from 'react'
import useFormState from '../../../hooks/useFormState'
import { Button } from '../../../components'
import AmountInput from './AmountInput'
//import Arrayinput from './ArrayInput'
import SettingsGroup from './SettingsGroup'
import SettingsField from './SettingsField'
import { Pagination } from '../../../components/Pagination'
import { countriesList } from '../../../utils/countries'
import ActionButtonBgWithIcon from "../Common/ActionButtonBgWithIcon";
import AddQurbanModal from './AddQurbanModal'
import { useDispatch, useSelector } from 'react-redux'
import { getSettings, updateCampaignOptions, getQurban, deleteQurban } from '../../../features/adminSettings'
import { currencyConfig } from '../../../utils/constants'
import { useConfirmationModal } from '../../../components/ConfirmationModal'
import ArrayInput from './ArrayInput'
import { CloseIcon } from '../../../theme/svg-icons'
import CountriesSelector from '../../../components/CountriesSelector'

const validateNumber = v => !/^[0-9]+(.[0-9]+)?$/.test(v)

export default function Settings() {
  const dispatch = useDispatch();
  const { settings, settingsLoader, qurbanValues, qurbanLoader } = useSelector(state => state.adminSettings);
  useEffect(() => {
		resetState();
  }, [settings])
	const resetState = () => {
    formState.dispatch({
      type: 'reset', values: {
        ...settings,
        ramadanEndDate: settings.ramadanEndDate?.split('T')[0],
        ramadanStartDate: settings.ramadanStartDate?.split('T')[0],
        generalAmounts: settings.generalAmounts?.split(',') || ['', '', ''],
        fedyahAmounts: settings.fedyahAmounts?.split(',') || ['', '', '', ''],
        shallowWaterCountries: settings.shallowWaterCountries?.split(',') || [],
        deepWaterCountries: settings.deepWaterCountries?.split(',') || [],
        deepWaterStationCountries: settings.deepWaterStationCountries?.split(',') || [],
      }
    })
	}
  useEffect(() => {
    dispatch(getSettings());
    dispatch(getQurban());
  }, [])
  const formState = useFormState({
    schema: {
      ramadanStartDate: {
        initialValue: '',
        validator: v => !v && 'This field is required',
      },
      ramadanEndDate: {
        initialValue: '',
        validator: (v,{ramadanStartDate}) => {
					if(!v) return 'This field is required'
					const ed = new Date(v).getTime(), sd = new Date(ramadanStartDate).getTime();
					if(ed<=sd) return "End date should be after start date"
				},
      },
      fedyahAmounts: {
        initialValue: ['', '', ''],
        validator: (v) => !v[0] || !v[1] || !v[2] || !v[3] ? '4 price fields are required' : validateNumber(v[0]) || validateNumber(v[1]) || validateNumber(v[2]) || validateNumber(v[3]) ? 'Each fields should have valid price amounts' : '',
        setHelper: ({ values }, v) => {
          let arr = [...values.fedyahAmounts];
          arr[v.index] = v.value;
          return { fedyahAmounts: arr };
        },
      },
      generalAmounts: {
        initialValue: ['', '', ''],
        validator: (v) => !v[0] || !v[1] || !v[2] ? '3 price fields are required' : validateNumber(v[0]) || validateNumber(v[1]) || validateNumber(v[2]) ? 'Each fields should have valid price amounts' : '',
        setHelper: ({ values }, v) => {
          let arr = [...values.generalAmounts];
          arr[v.index] = v.value;
          return { generalAmounts: arr };
        },
      },
      shallowWaterCountries: {
        initialValue: [],
        validator: (v) => !v.length && "Atleast one country should be selected",
      },
      deepWaterCountries: {
        initialValue: [],
        validator: (v) => !v.length && "Atleast one country should be selected",
      },
      deepWaterStationCountries: {
        initialValue: [],
        validator: (v) => !v.length && "Atleast one country should be selected",
      },
      feedPrice: { initialValue: '', validator: v => !v ? 'This field is required' : isNaN(parseFloat(v)) && 'Should be a valid price amount' },
      clothePrice: { initialValue: '', validator: v => !v ? 'This field is required' : isNaN(parseFloat(v)) && 'Should be a valid price amount' },
      cowPrice: { initialValue: '', validator: v => !v ? 'This field is required' : isNaN(parseFloat(v)) && 'Should be a valid price amount' },
      goatPrice: { initialValue: '', validator: v => !v ? 'This field is required' : isNaN(parseFloat(v)) && 'Should be a valid price amount' },
      ricePrice: { initialValue: '', validator: v => !v ? 'This field is required' : isNaN(parseFloat(v)) && 'Should be a valid price amount' },
      aqeeqahAdahiPrice: { initialValue: '', validator: v => !v ? 'This field is required' : isNaN(parseFloat(v)) && 'Should be a valid price amount' },
      shallowWaterPrice: { initialValue: '', validator: v => !v ? 'This field is required' : isNaN(parseFloat(v)) && 'Should be a valid price amount' },
      deepWaterPrice: { initialValue: '', validator: v => !v ? 'This field is required' : isNaN(parseFloat(v)) && 'Should be a valid price amount' },
      deepWaterStationPrice: { initialValue: '', validator: v => !v ? 'This field is required' : isNaN(parseFloat(v)) && 'Should be a valid price amount' },
    }, onSubmit: async ({ values }) => {
      dispatch(updateCampaignOptions({
        ...values,
				shallowWaterCountries: values.shallowWaterCountries.join(','),
				deepWaterCountries: values.deepWaterCountries.join(','),
				deepWaterStationCountries: values.deepWaterStationCountries.join(','),
        generalAmounts: values.generalAmounts.join(','),
        fedyahAmounts: values.fedyahAmounts.join(','),
        waterWellCountries: (values.waterWellCountries || ['IN']).join(','),
      }))
    }
  })

  const [qurbanAdder, setQurbanAdder] = useState(null)
	const askConfirmation = useConfirmationModal()
  const checkEdited = () => {
    for (let i in formState.touched)
      if (formState.touched[i]) return true
    return false;
  }
  const edited = checkEdited();

  const onAddQurban = async () => {
    setQurbanAdder(true)
  }

  const onDeleteQurban = (id) => {
		askConfirmation({
			title: "Delete Qurban Group?",
			text: "Are you sure you want to delete this Qurban Group?",
			accept: {label: "Yes, Delete", onClick: () => {
				dispatch(deleteQurban(id))
			}}, reject: {label: "No, Keep it"},
		})
  }
  const fixedArrayValueChange = (e, i) => {
    formState.dispatch({ type: 'change', target: { name: e.target.name, value: { value: e.target.value, index: i }, type: 'custom' } })
  }
  return (
    <>
      <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
        <div className="">
          <div className="w-full border-b border-neutral-300 pb-3.5">
            <h5 className="text-heading-7 md:text-heading-5">Campaign Settings</h5>
          </div>
          <div className="mt-6 md:mt-10">
            <div className="flex flex-col gap-5 sm:gap-6">
              <SettingsGroup label="General">
                <SettingsField
                  label="General Donation Amounts"
                  error={formState.touched.generalAmounts && formState.errors.generalAmounts}
                  value={<>
                    <AmountInput
                      onChange={(e) => fixedArrayValueChange(e, 0)}
                      value={formState.values.generalAmounts[0]}
                      name="generalAmounts"
                    />
                    <AmountInput
                      onChange={(e) => fixedArrayValueChange(e, 1)}
                      value={formState.values.generalAmounts[1]}
                      name="generalAmounts"
                    />
                    <AmountInput
                      onChange={(e) => fixedArrayValueChange(e, 2)}
                      value={formState.values.generalAmounts[2]}
                      name="generalAmounts"
                    />
                  </>}
                />
              </SettingsGroup>
              <SettingsGroup label="Fedyah/Kaffarah">
                <SettingsField
                  label="General Donation Amounts"
                  error={formState.touched.fedyahAmounts && formState.errors.fedyahAmounts}
                  value={<>
                    <AmountInput
                      onChange={(e) => fixedArrayValueChange(e, 0)}
                      value={formState.values.fedyahAmounts[0]}
                      name="fedyahAmounts"
                    />
                    <AmountInput
                      onChange={(e) => fixedArrayValueChange(e, 1)}
                      value={formState.values.fedyahAmounts[1]}
                      name="fedyahAmounts"
                    />
                    <AmountInput
                      onChange={(e) => fixedArrayValueChange(e, 2)}
                      value={formState.values.fedyahAmounts[2]}
                      name="fedyahAmounts"
                    />
                    <AmountInput
                      onChange={(e) => fixedArrayValueChange(e, 3)}
                      value={formState.values.fedyahAmounts[3]}
                      name="fedyahAmounts"
                    />
                  </>}
                />
                <SettingsField
                  label="Feed a Person"
                  error={formState.touched.feedPrice && formState.errors.feedPrice}
                  value={<AmountInput
                    onChange={formState.dispatch}
                    value={formState.values.feedPrice}
                    name="feedPrice"
                  />}
                />
                <SettingsField
                  label="Clothe a Person"
                  error={formState.touched.clothePrice && formState.errors.clothePrice}
                  value={<AmountInput
                    onChange={formState.dispatch}
                    value={formState.values.clothePrice}
                    name="clothePrice"
                  />}
                />
              </SettingsGroup>
              <SettingsGroup label="Aqeeqah Adahi">
                <SettingsField
                  label="Aqeeqah Adahi"
                  error={formState.touched.aqeeqahAdahiPrice && formState.errors.aqeeqahAdahiPrice}
                  value={<AmountInput
                    onChange={formState.dispatch}
                    value={formState.values.aqeeqahAdahiPrice}
                    name="aqeeqahAdahiPrice"
                  />}
                />
              </SettingsGroup>
              <SettingsGroup label="Adeeqah & General Sacrifice">
                <SettingsField
                  label="Goat/Sheep"
                  error={formState.touched.goatPrice && formState.errors.goatPrice}
                  value={<AmountInput
                    onChange={formState.dispatch}
                    value={formState.values.goatPrice}
                    name="goatPrice"
                  />}
                />
                <SettingsField
                  label="Cow"
                  error={formState.touched.cowPrice && formState.errors.cowPrice}
                  value={<AmountInput
                    onChange={formState.dispatch}
                    value={formState.values.cowPrice}
                    name="cowPrice"
                  />}
                />
                <SettingsField
                  label="Rice (1 KG)"
                  error={formState.touched.ricePrice && formState.errors.ricePrice}
                  value={<AmountInput
                    onChange={formState.dispatch}
                    value={formState.values.ricePrice}
                    name="ricePrice"
                  />}
                />
              </SettingsGroup>
              <SettingsGroup label="Waterwell">
                <SettingsField
                  label="Shallow Waterwell"
                  error={formState.touched.shallowWaterPrice && formState.errors.shallowWaterPrice}
                  value={<AmountInput
                    onChange={formState.dispatch}
                    value={formState.values.shallowWaterPrice}
                    name="shallowWaterPrice"
                  />}
                />
                <SettingsField
                  label="Shallow Waterwell Countries"
                  error={formState.touched.shallowWaterCountries && formState.errors.shallowWaterCountries}
                  value={
										<CountriesSelector
											isInline
											onChange={formState.dispatch}
											array={formState.values.shallowWaterCountries}
											name="shallowWaterCountries"
										/>
									}
                />
                <SettingsField
                  label="Deep Waterwell"
                  error={formState.touched.deepWaterPrice && formState.errors.deepWaterPrice}
                  value={<AmountInput
                    onChange={formState.dispatch}
                    value={formState.values.deepWaterPrice}
                    name="deepWaterPrice"
                  />}
                />
                <SettingsField
                  label="Deep Waterwell Countries"
                  error={formState.touched.deepWaterPrice && formState.errors.deepWaterPrice}
                  value={
										<CountriesSelector
											isInline
											onChange={formState.dispatch}
											array={formState.values.deepWaterCountries}
											name="deepWaterCountries"
										/>
									}
                />
                <SettingsField
                  label="Deep Water Station"
                  error={formState.touched.deepWaterStationPrice && formState.errors.deepWaterStationPrice}
                  value={<AmountInput
                    onChange={formState.dispatch}
                    value={formState.values.deepWaterStationPrice}
                    name="deepWaterStationPrice"
                  />}
                />
                <SettingsField
                  label="Deep Water Station Countries"
                  error={formState.touched.deepWaterStationCountries && formState.errors.deepWaterStationCountries}
                  value={
										<CountriesSelector
											isInline
											onChange={formState.dispatch}
											array={formState.values.deepWaterStationCountries}
											name="deepWaterStationCountries"
										/>
									}
                />
              </SettingsGroup>
              <SettingsGroup label="Ramadan Campaigns">
                <SettingsField
                  label="Ramadan Start Date"
                  error={formState.touched.ramadanStartDate && formState.errors.ramadanStartDate}
                  value={<input
                    className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem]"
                    onChange={formState.dispatch}
                    type="date"
                    value={formState.values.ramadanStartDate}
                    // value="2024-01-23"
                    name="ramadanStartDate"
                  />}
                />
                <SettingsField
                  label="Ramadan End Date"
                  error={formState.touched.ramadanEndDate && formState.errors.ramadanEndDate}
                  value={<input
                    className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem]"
                    onChange={formState.dispatch}
                    type="date"
                    value={formState.values.ramadanEndDate}
                    name="ramadanEndDate"
                  />}
                />
              </SettingsGroup>
              <div className="flex flex-wrap justify-end gap-2">
                <Button
                  className="btn text-button-md md:text-button-lg"
                  variant="secondaryOutline"
                  type="submit"
                  label="Reset"
                  disabled={!edited || settingsLoader}
                  onClick={resetState}
                />
                <Button
                  className="btn text-button-md md:text-button-lg"
                  variant="primary"
                  type="submit"
                  label="Save Changes"
                  disabled={!edited || settingsLoader}
                  onClick={() => formState.submit()}
                />
              </div>
              <SettingsGroup label="Qurban" onAdd={onAddQurban}>
                <div className='grid mt-5 md:mt-7'>
                <div className='relative overflow-x-auto '>
                  <table class="table-auto w-full text-start">
                    <thead className="rounded bg-neutral-200">
                      <tr className="">
                        <th className="p-4 min-w-[10rem] max-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                          Group Name
                        </th>
                        <th className="p-4 min-w-[10rem] max-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                          Donation Amount
                        </th>

                        <th className="p-4 min-w-[10rem] max-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                          Distributed In
                        </th>
                        <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {qurbanValues.map((i, j) => (
                        <tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100" key={i.id}>
                          <td className="p-4 text-button-md font-Montserrat text-neutral-700">
                            {i.group}
                          </td>
                          <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                            {currencyConfig.label}{i.amount}
                          </td>
                          <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                            <div className="flex flex-wrap gap-3">
                              {i.country.map(j => (
                                <div className="flex gap-2 p-1 pr-2 rounded w-fit bg-neutral-200" key={j}>
                                  <img
                                    src={`${import.meta.env.VITE_APP_COUNTRY_URL}${j}.svg`}
                                    className={'w-[1.375rem] h-auto'}
                                    alt="flag"
                                  />
                                  <p className="text-sm text-neutral-800 line-clamp-1">{countriesList.find(c => c.code === j)?.name}</p>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                            <ActionButtonBgWithIcon
                              handleEdit={() => setQurbanAdder(j)}
                              handleRemove={() => onDeleteQurban(i.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                </div>
                <AddQurbanModal
                  state={qurbanAdder}
                  onClose={() => setQurbanAdder(null)}
                />
              </SettingsGroup>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
