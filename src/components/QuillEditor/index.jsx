import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function QuillEditor ({ onChange, value, name }) {
	return (
		<ReactQuill
			theme="snow"
			value={value}
			onChange={(v,d,s,e) => onChange({type: 'change', target: { name, type: 'custom', value: e.getHTML() }})}
		/>
	)
}