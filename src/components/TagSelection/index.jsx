import React, { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";
import { ChevronDownIcon, CloseIcon } from "../../theme/svg-icons";
import Button from "../Button";

const TagSelection = ({ tags, onTagSelection, selectionTags }) => {
  const [dropdown, setDropdown] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedItems, setSelected] = useState([]);
  const wrapperRef = useRef(null);

  const toogleDropdown = () => {
    setDropdown(!dropdown);
  };

  const addTag = (item) => {
    const idToCheck = item.id;
    const itemExists = selectionTags.find((item) => item.id === idToCheck);
    const updatedItems = itemExists
      ? selectionTags.filter((item) => item.id !== itemExists.id)
      : [...selectionTags, item];
    onTagSelection(updatedItems);
    setDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  const removeTag = (item) => {
    const filtered = selectionTags.filter((e) => e?.id !== item?.id);
    onTagSelection(filtered);

    setSelected(filtered);
  };
  useEffect(() => {
    setItems(tags);
    if (selectionTags?.length) {
      setSelected(selectionTags);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="autcomplete-wrapper" ref={wrapperRef}>
      <div className="autcomplete">
        <div className="flex flex-col items-center w-full mx-auto">
          <div className="w-full">
            <div className="relative flex flex-col items-center">
              <div className="w-full ">
                <div className="flex bg-white border rounded-lg border-neutral-300 h-11 ">
                  <div className="flex flex-wrap flex-auto w-full mx-1 overflow-y-auto line-clamp-1">
                    {selectionTags?.map((tag, index) => {
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-2 py-1.5 px-3 rounded bg-accent-300 my-2 mx-1 "
                          style={{ backgroundColor: tag?.color }}
                        >
                          <div className="text-xs font-semibold capitalize font-Montserrat text-neutral-1000">
                            {tag?.text}
                          </div>
                          <div className="flex flex-row-reverse flex-auto">
                            <div
                              className="cursor-pointer"
                              onClick={() => removeTag(tag)}
                            >
                              <CloseIcon iconSize={"14"} />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div className="flex-1">
                      <input
                        placeholder=""
                        className="w-full h-full text-gray-800 bg-transparent border-none outline-none appearance-none focus:shadow-none focus:ring-0 focus:outline-none"
                        onClick={() => setDropdown(true)}
                      />
                    </div>
                  </div>
                  <div
                    className="flex items-center w-8 py-1 pl-2 pr-1 text-gray-300"
                    onClick={toogleDropdown}
                  >
                    <Button
                      className="w-6 h-6 text-gray-600 outline-none cursor-pointer focus:outline-none"
                      type="button"
                      leftIcon={<ChevronDownIcon />}
                      variant="none"
                    />
                  </div>
                </div>
              </div>
              {dropdown ? (
                <Dropdown list={tags} addItem={addTag}></Dropdown>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagSelection;
