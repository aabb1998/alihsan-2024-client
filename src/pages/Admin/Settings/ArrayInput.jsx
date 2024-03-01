import { useState } from 'react'
import { Button } from '../../../components';
import {
  CloseIcon,
  PlusIcon,
} from "../../../theme/svg-icons";


export default function ArrayInput ({ array, onChange, inputItem: InputItem, arrayItem: ArrayItem, name, isInline }) {
  const [ newVisible, setNewVisible ] = useState(false)
  const [ value, setValue ] = useState('');
  const add = (value) => {
    onChange({type: 'change', target: { array: [...array, value], tagName: 'ARRAYINPUT', name }})
  }
  const remove = (index) => {
    onChange({ type: 'change', target: { array: array.filter((_,i) => i!==index), tagName: 'ARRAYINPUT', name } })
  }
  return (
    <div className={"flex flex-row flex-wrap items-center w-full gap-4 "+(isInline?/*"justify-end"*/"":"")}>
      {array.map((i,j) => (
        <ArrayItem value={i} onClose={() => remove(j)} key={j} />
      ))}
      {newVisible?(
        <div className={"flex flex-wrap items-center gap-2 "+(isInline?"":"w-full")}>
          <InputItem onChange={e => {e.target.value && add(e.target.value); setNewVisible(false)}} value={value} className="!w-full" />
          {/* <Button type="submit" label="save" onClick={() => {add(value); setNewVisible(false);}} className={'grow'} /> */}
          <span className='text-red-300 cursor-pointer'>
						<CloseIcon onClick={() => setNewVisible(false)} />
					</span>
        </div>
      ):(
				<Button
					variant="primary"
					className={(isInline?"":"w-full ")+"text-button-md"}
					label={<span>Add Country</span>}
					onClick={() => setNewVisible(true)}
				/>
			)}
    </div>
  )
}
