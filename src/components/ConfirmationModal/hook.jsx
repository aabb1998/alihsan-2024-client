import { useContext } from "react"
import { ConfirmationModalContext } from "./Provider"

const useConfirmationModal = () => {
	return useContext(ConfirmationModalContext);
}

export default useConfirmationModal;