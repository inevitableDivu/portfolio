import React from "react";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	id: string;
	label?: string;
	onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ id, label, name, placeholder, type, value, onChange }) => {
	return (
		<div className="flex flex-col w-full">
			{label && (
				<label htmlFor={id} className="text-sm font-semibold text-gray-600">
					{label}
				</label>
			)}
			<input
				id={id}
				name={name}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={(event) => onChange(event.target.value)}
				className="px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-transparent"
				style={{ fontSize: "14px", outline: "none" }}
			/>
		</div>
	);
};

export default Input;
