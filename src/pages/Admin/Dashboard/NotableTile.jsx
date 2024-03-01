import { Tooltip } from "react-tooltip";
import { formatPrice } from "../../../utils/helper";
import { ChevronDownIcon, ChevronUpIcon } from "../../../theme/svg-icons";

export function NotableTile({ total, percentage, title, value, id }) {
    return (
      <>
        <h6 className="mb-3 md:mb-5 text-base !font-medium md:text-lg font-Montserrat text-neutral-600">
          {" "}
          {title}
        </h6>
        <div className="flex items-center justify-between gap-2">
          <h2
            className="uppercase text-heading-5 md:text-heading-2"
            data-tooltip-id={id}
          >
            {total}
          </h2>
          <Tooltip
            id={id}
            className="tooltip opacity-100"
            style={{ color: "#000" }}
          >
            {formatPrice(value)}
          </Tooltip>
  
          <h6
            className={`flex items-center ${
              parseInt(percentage) > 0 ? "text-green-300" : "text-red-300"
            } gap-x-1 text-base !font-medium md:text-lg font-Montserrat`}
          >
            {" "}
            {parseInt(percentage) > 0 ? <ChevronUpIcon /> : <ChevronDownIcon />}
            {Math.abs(parseFloat(percentage))}%
          </h6>
        </div>
      </>
    );
  }