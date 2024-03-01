import React from "react";

export const StoryTab = ({ handleClick, activeTab, count }) => {
  return (
    <div className="mb-5 text-sm font-medium text-center border-b text-neutral-800 border-neutral-300">
      <ul className="flex justify-between sm:justify-start flex-wrap sm:gap-7.5 -mb-px">
        <li className="cursor-pointer" onClick={() => handleClick("tab1")}>
          <div
            className={`${`inline-block px-2 py-3 font-bold border-b-2 ${
              activeTab !== "tab1"
								? "border-transparent hover:border-neutral-300 text-neutral-600"
								: "border-primary-300 text-primary-300"
            } text-button-lg w-[108px]`}`}
          >
            Story
          </div>
        </li>
        {count > 0 && (
          <li className="cursor-pointer" onClick={() => handleClick("tab2")}>
            <div
              className={`${`flex gap-1 px-2 py-3 font-bold border-b-2 ${
								activeTab !== "tab2"
									? "border-transparent hover:border-neutral-300 text-neutral-600"
									: "border-primary-300 text-primary-300"
							} text-button-lg w-[108px]`}`}
            >
              Updates
              <div className="w-5 h-5 p-1 shrink-0 rounded-full flex justify-center text-xs bg-neutral-600 items-center gap-2.5 text-white">
                <span>{count}</span>
              </div>
            </div>
          </li>
        )}
        {/* <li className="cursor-pointer">
          <div
            className={`${`inline-block px-2 py-3 font-bold border-b-2 border-transparent hover:border-neutral-300 text-button-lg w-[108px] text-neutral-600 select-none ${
              activeTab !== "tab3" && "border-transparent"
            }`}`}
          >
            More-info
          </div>
        </li> */}
      </ul>
    </div>
  );
};
