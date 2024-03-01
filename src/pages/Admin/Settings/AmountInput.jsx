import {
    Edit3Icon,
} from "../../../theme/svg-icons";

export default function AmountInput ({ placeholder, value, onChange, name }) {
	// const [editing, setEditing] = useState(true);
  return (
    <div className="relative overflow-hidden form-group">
      <div className="absolute justify-center overflow-hidden inset-y-0 w-8 h-full bg-neutral-200 start-0 flex items-center pointer-events-none border border-neutral-300 rounded-md rounded-tr-none rounded-br-none">
        {/* <Edit3Icon iconSize={18} /> */}
				$
      </div>
      <input type="text" id="input-group-1" className="!pl-9 border form-control border-neutral-300 min-w-[5.75rem] max-w-[5.75rem]" placeholder={placeholder} value={value} onChange={onChange} name={name} />
    </div>
  )
}
