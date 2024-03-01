import { Tooltip } from "react-tooltip";
import { formatPrice } from "../../../utils/helper";

export function InfoTile({ value, title, realCount }) {
    const id = title.replace(/\s+/g, "-").toLowerCase();
  
    return (
      <div className="py-5 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 grow basis-0">
        <h6 className="mb-3 md:mb-5 text-base !font-medium md:text-lg font-Montserrat text-neutral-600">
          {" "}
          {title}
        </h6>
        <div className="flex items-center justify-between">
          <h2 className="text-heading-5 md:text-heading-2" data-tooltip-id={id}>
            {value}
          </h2>
          <Tooltip
            id={id}
            className="tooltip opacity-100"
            style={{ color: "#000" }}
          >
            {formatPrice(realCount)}
          </Tooltip>
        </div>
      </div>
    );
  }
  