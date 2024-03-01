import { ChevronsUpIcon, ChevronUpIcon } from "../../theme/svg-icons";

export default function TableSortTitle ({ value, label, sort, order, setOrder }) {
	return (
		<div className="cursor-pointer flex gap-1.5 items-center" onClick={() => setOrder({sort: value, order: sort===value? order==='asc'?'desc':'asc' : 'asc'})}>
			{label}
			<span className="cursor-pointer">
				{sort===value?(
					<span className={`w-6 h-6 transition-all duration-50 ease-in shrink-0 flex items-center justify-center ${order==='asc' || "rotate-180 transform "}`}>
						<ChevronUpIcon iconSize={14} />
					</span>
				):(
					<span className="flex items-center justify-center w-6 h-6 shrink-0">
						<ChevronsUpIcon iconSize={14} />
					</span>
				)}
			</span>
		</div>
	)
}