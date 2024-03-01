import React from "react";
import { CloseIcon } from "../../theme/svg-icons";
import ProjectDetailsContent from "./ProjectDetailsContent";
const ProjectDetailsModal = ({ onClose, mydonation }) => {
  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
          <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
            <div className="relative w-full overflow-hidden text-left transition-all transform bg-white rounded-2.5xl sm:rounded-3xl sm:my-8 sm:max-w-38.75 rounded-b-none">
              <div className="relative p-4 pt-6 bg-white sm:p-6">
                <div className="flex flex-col">
                  <div className="flex justify-end">
                    <button
                      className="absolute text-neutral-1000"
                      style={{zIndex:999999}}
                      onClick={() => onClose(false)}
                    >
                      <CloseIcon iconSize={24} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-4 sm:gap-5">
                    <ProjectDetailsContent mydonation={mydonation} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};
export default ProjectDetailsModal;
