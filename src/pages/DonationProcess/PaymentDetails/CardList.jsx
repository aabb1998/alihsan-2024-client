import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {
  deletePaymentMethod,
  getPaymentMethods,
} from "../../../features/paymentDetails/paymentDetailsSlice";
import { CirclePlusIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import { SnackMessages } from "../../../components/Toast";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { CardItem } from "./CardItem";
const { showSuccessMessage, showErrorMessage } = SnackMessages();

const CardList = ({ handleAddCard, handleDonationProcess, loading }) => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [cardSelected, setCardSelection] = useState("");

  const dispatch = useDispatch();

  const { list } = useSelector((state) => state.paymentDetails.paymentMethods);
  const handleDelete = (id) => {
    setConfirmModal(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    const response = await dispatch(deletePaymentMethod(deleteId));
    if (response?.payload?.success) {
      showSuccessMessage(response?.payload?.message);
    } else {
      showErrorMessage(response?.message);
    }
    setConfirmModal(false);
    setDeleteId("");
  };

  useEffect(() => {
    if (!deleteId) dispatch(getPaymentMethods());
  }, [deleteId]);

  return (
    <div className=" bg-neutral-200 rounded-2xl">
      <div className="flex flex-col gap-4">
        <div
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center flex-grow p-4 border-2 border-dashed cursor-pointer rounded-2xl border-neutral-300"
        >
          <div
            className="flex flex-col items-center justify-center gap-1 sm:gap-2 text-neutral-700"
            onClick={handleAddCard}
          >
            <CirclePlusIcon iconSize={20} />
            <p className="text-center text-button-md sm:text-button-lg text-neutral-700 lg:whitespace-nowrap">
              Add payment method
            </p>
          </div>
        </div>
        {list.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            setCardSelection={setCardSelection}
            cardSelected={cardSelected}
            handleDelete={handleDelete}
          />
        ))}
        <Button
          variant="primaryFull"
          label="Complete Donation"
          disabled={!cardSelected || loading}
          onClick={() => handleDonationProcess(cardSelected)}
        />
      </div>
      {confirmModal && <DeleteConfirmation setConfirmModal={setConfirmModal} confirmDelete={confirmDelete}/>}
    </div>
  );
};

CardList.propTypes = {
  handleAddCard: PropTypes.func.isRequired,
  handleDonationProcess: PropTypes.func.isRequired,
};

export default CardList;
