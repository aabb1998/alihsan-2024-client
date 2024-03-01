import { countriesList } from '../../utils/countries'
import ArrayInput from '../../pages/Admin/Settings/ArrayInput'
import { CloseIcon } from '../../theme/svg-icons'

export default function CountriesSelector ({array, onChange, name, isInline}) {
	return (
		<ArrayInput
			array={array}
			onChange={onChange}
			name={name}
			inputItem={({ onChange, value }) => (
				<select className="text-sm !text-neutral-800 border-neutral-300 form-control grow" value={value} onChange={onChange}>
					<option value="" className="text-neutral-800 ">Select Country</option>
					{countriesList.filter(i => array.indexOf(i.code) < 0).map(i => (
						<option value={i.code} key={i.code} className="text-neutral-800">{i.name}</option>
					))}
				</select>
			)}
			isInline={isInline}
			arrayItem={({ value, onClose }) => (
				<div className="flex gap-2 p-1 pr-2 rounded w-fit bg-neutral-200">
					<img
						src={`${import.meta.env.VITE_APP_COUNTRY_URL}${value}.svg`}
						className={'w-[1.375rem] h-auto'}
						alt="flag"
					/>
					<p className="text-sm text-neutral-800 line-clamp-1">{countriesList.find(c => c.code === value)?.name}</p>
					<span className="text-red-300 cursor-pointer"><CloseIcon onClick={onClose} /></span>
				</div>
			)}
		/>
	)
}