import { useState, useRef, createContext } from 'react'
import ConfirmationModal from './ConfirmationModal';

export const ConfirmationModalContext = createContext();

export default function ConfirmationModalProvider({children}) {
	const [ state, setState ] = useState(null)
	const actions = useRef({});

	const close = () => {
		setState(null);
		actions.current = {};
	}

	const askConfirmation = ({
		title, text,
		accept: { label: acceptLabel, onClick: onAccept },
		reject: { label: rejectLabel, onClick: onReject },
	}) => {
		setState({ title, text, acceptLabel, rejectLabel })
		actions.current = {
			onAccept: () => {
				close();
				onAccept && onAccept();
			},
			onReject: () => {
				close();
				onReject && onReject();
			}
		}
	}

	return (
		<ConfirmationModalContext.Provider value={askConfirmation}>
			{children}
			<ConfirmationModal
				visible={state?true:false}
				title={state?.title || ''}
				text={state?.text || ''}
				acceptLabel={state?.acceptLabel || ''}
				rejectLabel={state?.rejectLabel || ''}
				onAccept={() => actions.current.onAccept && actions.current.onAccept()}
				onReject={() => actions.current.onReject && actions.current.onReject()}
			/>
		</ConfirmationModalContext.Provider>
	);
}