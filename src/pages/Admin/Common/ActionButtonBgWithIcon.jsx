import React from "react";
import PropTypes from "prop-types";
import { Menu } from "@headlessui/react";
import {
  DownloadIcon,
  EditIcon,
  EyeIcon,
  MoreverticalIcon,
  ShieldIcon,
  ShieldOffIcon,
  Trash2Icon,
} from "../../../theme/svg-icons";
import { Button } from "../../../components";

export default function ActionButtonBgWithIcon({
  handleRemove,
  handleBlock,
  handleUnblock,
  handleEdit,
  handleView,
  handleStatus,
  handleDownload,
  handleSwitchStatus,
	handleResetPassword,
  item,
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
            {handleSwitchStatus && (
              <Menu.Item>
                <Button
                  className="flex w-full gap-2 px-3 py-2 text-sm font-medium rounded text-start text-neutral-1000 font-Montserrat hover:bg-primary-200"
                  onClick={handleSwitchStatus}
                  leftIcon={<span className="w-4 h-4"><EditIcon iconSize={16} /></span>}
                  variant={"none"}
                  label={item?.status === "Completed" ? "Active" : "Completed"}
                />
              </Menu.Item>
            )}
            {handleStatus && (
              <Menu.Item>
                <Button
                  className="flex w-full gap-2 px-3 py-2 text-sm font-medium rounded text-start text-neutral-1000 font-Montserrat hover:bg-primary-200"
                  onClick={handleStatus}
                  leftIcon={<span className="w-4 h-4"><EditIcon iconSize={16} /></span>}
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
                  leftIcon={<span className="w-4 h-4"><EditIcon iconSize={16} /></span>}
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
                  leftIcon={<span className="w-4 h-4"><EyeIcon iconSize={16} /></span>}
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
                  leftIcon={<span className="w-4 h-4"><DownloadIcon iconSize={16} /></span>}
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
                  leftIcon={<span className="w-4 h-4"><Trash2Icon iconSize={16} /></span>}
                  variant={"none"}
                  label={"Delete"}
                />
              </Menu.Item>
            )}
            {handleBlock && (
              <Menu.Item>
                <Button
                  className="flex w-full gap-2 px-3 py-2 text-sm font-medium rounded text-start text-neutral-1000 font-Montserrat hover:bg-primary-200"
                  onClick={handleBlock}
                  leftIcon={<span className="w-4 h-4"><ShieldIcon iconSize={16} /></span>}
                  variant={"none"}
                  label={"Block"}
                />
              </Menu.Item>
            )}
            {handleUnblock && (
              <Menu.Item>
                <Button
                  className="flex w-full gap-2 px-3 py-2 text-sm font-medium rounded text-start text-neutral-1000 font-Montserrat hover:bg-primary-200"
                  onClick={handleUnblock}
                  leftIcon={<span className="w-4 h-4"><ShieldOffIcon iconSize={16} /></span>}
                  variant={"none"}
                  label={"Unblock"}
                />
              </Menu.Item>
            )}
            {handleResetPassword && (
              <Menu.Item>
                <Button
                  className="flex w-full gap-2 px-3 py-2 text-sm font-medium rounded text-start text-neutral-1000 font-Montserrat hover:bg-primary-200"
                  onClick={handleResetPassword}
                  leftIcon={<span className="w-4 h-4"><EditIcon iconSize={16}/></span> }
                  variant={"none"}
                  label={"Reset Password"}
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
