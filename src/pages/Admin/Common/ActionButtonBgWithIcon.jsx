import React from "react";
import PropTypes from "prop-types";
import { Menu } from "@headlessui/react";
import {
  DownloadIcon,
  EditIcon,
  EyeIcon,
  MoreverticalIcon,
  Trash2Icon,
} from "../../../theme/svg-icons";
import { Button } from "../../../components";

export default function ActionButtonBgWithIcon({
  handleRemove,
  handleEdit,
  handleView,
  handleStatus,
  handleDownload,
}) {
  return (
    <div className="">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="w-full p-2 rounded bg-neutral-200">
            <MoreverticalIcon />
          </Menu.Button>
        </div>
        <Menu.Items className="absolute right-0 z-10 mt-2 bg-white border rounded-md shadow-lg w-fit min-w-35 border-neutral-200">
          <div className="p-2.5">
            {handleStatus && (
              <Menu.Item>
                <Button
                  className="flex w-full gap-2 px-3 py-2 text-sm font-medium rounded text-start text-neutral-1000 font-Montserrat hover:bg-primary-200"
                  onClick={handleStatus}
                  leftIcon={<EditIcon iconSize={16} />}
                  variant={"none"}
                  label={"Status"}
                />
              </Menu.Item>
            )}
            {handleEdit && (
              <Menu.Item>
                <Button
                  className="flex w-full gap-2 px-3 py-2 text-sm font-medium rounded text-start text-neutral-1000 font-Montserrat hover:bg-primary-200"
                  onClick={handleEdit}
                  leftIcon={<EditIcon iconSize={16} />}
                  variant={"none"}
                  label={"Edit"}
                />
              </Menu.Item>
            )}
            {handleView && (
              <Menu.Item>
                <Button
                  className="flex w-full gap-2 px-3 py-2 text-sm font-medium rounded text-start text-neutral-1000 font-Montserrat hover:bg-primary-200"
                  onClick={handleView}
                  leftIcon={<EyeIcon iconSize={16} />}
                  variant={"none"}
                  label={"View"}
                />
              </Menu.Item>
            )}
            {handleDownload && (
              <Menu.Item>
                <Button
                  className="flex w-full gap-2 px-3 py-2 text-sm font-medium rounded text-start text-neutral-1000 font-Montserrat hover:bg-primary-200"
                  onClick={handleDownload}
                  leftIcon={<DownloadIcon iconSize={16} />}
                  variant={"none"}
                  label={"Download"}
                />
              </Menu.Item>
            )}
            {handleRemove && (
              <Menu.Item>
                <Button
                  className="flex w-full gap-2 px-3 py-2 text-sm font-medium rounded text-start text-neutral-1000 font-Montserrat hover:bg-primary-200"
                  onClick={handleRemove}
                  leftIcon={<Trash2Icon iconSize={16} />}
                  variant={"none"}
                  label={"Delete"}
                />
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
}

ActionButtonBgWithIcon.propTypes = {
  handleRemove: PropTypes.func,
  handleEdit: PropTypes.func,
  handleView: PropTypes.func,
  handleStatus: PropTypes.func,
};
