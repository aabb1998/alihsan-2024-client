import { useContext, createContext } from 'react'

const QuickDonationContext = createContext();
export default QuickDonationContext;

export function useQuickDonation() {
  return useContext(QuickDonationContext)
}
