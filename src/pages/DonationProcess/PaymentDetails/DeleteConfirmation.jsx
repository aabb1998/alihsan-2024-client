import { Button } from "../../../components";
import { CloseIcon } from "../../../theme/svg-icons";

export const DeleteConfirmation = ({ setConfirmModal, confirmDelete }) => (
  <div
    className="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
        <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
          <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-t rounded-bl-none rounded-br-none rounded-tl-3xl rounded-tr-3xl sm:rounded-3xl sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-7.5 py-10">
              <div className="flex-col sm:flex">
                <div className="flex justify-between">
                  <div className="mb-2 font-bold heading-7">Confirm?</div>
                  <div className="cursor-pointer">
                    <CloseIcon onClick={() => setConfirmModal(false)} />
                  </div>
                </div>
                <div className="mb-7.5 text-neutral-600 sm:mb-10">
                  Are you sure you want to remove this Payment Details?
                </div>
                <div className="flex gap-5">
                  <Button
                    onClick={() => setConfirmModal(false)}
                    variant={"neutralFull"}
                    label="No, Keep it"
                  ></Button>
                  <Button
                    variant={"primaryFull"}
                    label="Yes, Delete"
                    onClick={confirmDelete}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
