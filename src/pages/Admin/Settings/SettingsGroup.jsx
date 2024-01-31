import { Button } from '../../../components'
import {
    PlusIcon,
} from "../../../theme/svg-icons";
export default function SettingsGroup ({ label, children, onAdd }) {
  return (
    <div className="p-5 border sm:p-6 rounded-2xl border-neutral-300">
      <div className="w-full border-b border-neutral-300 pb-3.5 flex items-center justify-between">
        <h5 className="text-lg !font-medium text-neutral-1000 "> Campaign:<span className="text-heading-7 ms-4 text-neutral-600">{label}</span></h5>
        {onAdd ? (
          <Button
            variant="primary"
            className="text-button-md md:text-button-lg"
            label={
              <>
                <span className="sm:hidden">
                    <PlusIcon />
                </span>{" "}
                <span className="hidden sm:flex">Add New Group</span>{" "}
              </>
            }
            onClick={onAdd}
            />
        ) : null}
      </div>
      <div className="flex flex-col gap-3 mt-5">
        {children}
      </div>
    </div>
  )
}
