import { useState } from 'react'
import { Button } from '../../../components';
import {
  CloseIcon,
  PlusIcon,
} from "../../../theme/svg-icons";


export default function ArrayInput ({ array, onChange, inputItem: InputItem, arrayItem: ArrayItem }) {
  const [ newVisible, setNewVisible ] = useState(false)
  const [ value, setValue ] = useState('');
  const add = (value) => {
    onChange({type: 'change', target: { array: [...array, value], tagName: 'ARRAYINPUT', name: 'country' }})
  }
  const remove = (index) => {
    onChange({ type: 'change', target: { array: array.filter((_,i) => i!==index), tagName: 'ARRAYINPUT', name: 'country' } })
  }
  return (
    <div className="flex flex-row flex-wrap items-center w-full gap-4">
      {array.map((i,j) => (
        <ArrayItem value={i} onClose={() => remove(j)} key={j} />
      ))}
      {newVisible?(
        <div className="flex items-center w-full gap-2">
          <InputItem onChange={e => setValue(e.target.value)} value={value} className="w-full" />
          <Button type="submit" label="save" onClick={() => {add(value); setNewVisible(false);}} />
          <span className='text-red-300 cursor-pointer'>
          <CloseIcon onClick={() => setNewVisible(false)}  /></span>
        </div>
      ):<Button variant="primary" className="w-full text-button-md" label={
        <>
          <span className="">Add Country</span>{" "}
          {/* <span className="sm:hidden">
              <PlusIcon />
          </span> */}
        </>
      } onClick={() => setNewVisible(true)} />}
    </div>
  )
}
