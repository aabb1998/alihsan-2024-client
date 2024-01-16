
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import "./index.scss";

export const SnackMessages = () => {

    const showToastMessage = ((message) => toast(message))

    const showSuccessMessage = (message) => toast.success(message)

    const showErrorMessage = (message) => toast.error(message);

    const showInfoMessage = (message) => toast.info(message);

    const showWarnMessage = (message) => toast.warn(message);

    const showCustomMessage = ({ message, backgroundColor, color }) =>
        toast(message, {
            backgroundColor: backgroundColor,
            color: color
        });

    return {
        showToastMessage,
        showSuccessMessage,
        showErrorMessage,
        showInfoMessage,
        showWarnMessage,
        showCustomMessage
    };
};
