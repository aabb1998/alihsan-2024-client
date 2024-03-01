import { AdeeqahDonation } from "../projectDetails/AdeeqahDonation";
import { AqeeqaDonation } from "../projectDetails/AqeeqaDonation";
import { CommonDonation } from "../projectDetails/CommonDonation";
import { FedyahDonation } from "../projectDetails/FedyahDonation";
import { QurbanDonation } from "../projectDetails/QurbanDonation";
import RamadanComboPack from "../projectDetails/RamadanComboPack";
import RamadanEidGifts from "../projectDetails/RamadanEidGifts";
import RamadanFoodPackDonation from "../projectDetails/RamadanFoodPackDonation";
import RamadanHotMeals from "../projectDetails/RamadanHotMeals";
import RamadanZakatAlFitr from "../projectDetails/RamadanZakatAlFitr";
import { WaterDonation } from "../projectDetails/WaterDonation";
import { ZaqatDonation } from "../projectDetails/ZaqatDonation";

export const GetDonation = ({ project, onClose, checkout }) => {
  switch (checkout) {
    case "COMMON":
      return (
        <CommonDonation
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
    case "FEDYAH":
      return (
        <FedyahDonation
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
    case "KURBAN":
      return (
        <QurbanDonation
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
    case "WATER_CAMPAIGN":
      return (
        <WaterDonation
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
    case "AQEEQAH_ADAHI":
      return (
        <AqeeqaDonation
          campaign={project}
          handleClose={onClose}
          isModal={true}
        />
      );
    case "ADEEQAH_GENERAL_SACRIFICE":
      return (
        <AdeeqahDonation
          handleClose={onClose}
          isModal={true}
          campaign={project}
        />
      );
    case "ZAQAT":
      return (
        <ZaqatDonation
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
    case "RAMADAN_FOOD_PACK":
      return (
        <RamadanFoodPackDonation
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
    case "RAMADAN_HOT_MEALS":
      return (
        <RamadanHotMeals
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
    case "RAMADAN_ZAKAT_AL_FITR":
      return (
        <RamadanZakatAlFitr
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
    case "RAMADAN_EID_GIFTS":
      return (
        <RamadanEidGifts
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
    case "RAMADAN_COMBO_PACK":
      return (
        <RamadanComboPack
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
    default:
      return (
        <CommonDonation
          campaign={project?.campaign}
          handleClose={onClose}
          isModal={true}
        />
      );
  }
};
