import { useState, createContext, useContext } from "react";
import QuickDonation from "./QuickDonation";
import QuickDonationContext, { useQuickDonation } from "./context";

function QuickDonationProvider({ children }) {
  const [showState, setShowState] = useState({ visible: false, project: null });
  const showQuickDonation = (defaultProject) => {
    setShowState({ project: defaultProject || null, visible: true });
  };
  return (
    <QuickDonationContext.Provider value={showQuickDonation}>
      {children}
      <QuickDonation
        onClose={() =>
          setShowState((ss) => ({ visible: false, project: ss.project }))
        }
        isOpen={showState.visible}
        project={showState.project}
      />
    </QuickDonationContext.Provider>
  );
}

export { useQuickDonation, QuickDonationProvider };
