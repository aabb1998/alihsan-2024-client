import { CloseIcon } from "../../theme/svg-icons";

export const FilterValues = ({
    selectedFilters,
    projects,
    resetFilters,
    categories,
    countries,
  }) => {
    return (
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        {selectedFilters.category ? (
          <button
            className="flex items-center gap-1 p-2 text-sm rounded-md bg-neutral-200 hover:bg-neutral-300 whitespace-nowrap"
            onClick={() => resetFilters(["category"])}
          >
            {
              categories.find((l) => l.id === parseInt(selectedFilters.category))
                ?.name
            }
  
            <span className="cursor-pointer text-neutral-1100">
              <CloseIcon iconSize={16} />
            </span>
          </button>
        ) : (
          ""
        )}
        {selectedFilters?.country ? (
          <button
            className="flex items-center gap-1 p-2 text-sm rounded-md bg-neutral-200 hover:bg-neutral-300 whitespace-nowrap"
            onClick={() => resetFilters(["country"])}
          >
            {selectedFilters.country &&
              countries.find((l) => l.code == selectedFilters.country)?.name}
            <span className="cursor-pointer text-neutral-1100">
              <CloseIcon iconSize={16} />
            </span>
          </button>
        ) : (
          ""
        )}
  
        {selectedFilters.category || selectedFilters?.country ? (
          <button
            className="items-center hidden gap-1 p-2 text-sm rounded-md md:flex bg-neutral-200 hover:bg-neutral-300"
            onClick={() => resetFilters(["category", "country"])}
          >
            Clear{" "}
            <span className="hidden cursor-pointer text-neutral-1100 md:block">
              <CloseIcon iconSize={16} />
            </span>
          </button>
        ) : (
          ""
        )}
      </div>
    );
  };