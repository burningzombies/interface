import React from "react";
import { Spinner } from "../spinner";

type Props = {
	name?: string;
	controlId: string;
	label: React.ReactNode | string;
	options: Array<{ id: number; title: string }>;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	buttonVal?: string;
	loading: boolean;
};

export const MultipleSelectForm: React.FC<Props> = ({ ...args }) => {
	const divId = `${args.controlId}_${Math.random()}`;

	return (
		<form name={args.name} onSubmit={args.onSubmit}>
			<div className="mb-3">
				<label htmlFor={divId} className="text-light text-shadow mb-2">
					{args.label}
				</label>
				<select
					className="form-select form-select-dark"
					multiple={true}
					id={divId}
					name={args.controlId}
					size={10}
					required={true}
				>
					<option disabled>- Available Tokens ({args.options.length}) -</option>
					{args.options.map((x) => (
						<option key={x.id} value={x.id}>
							{x.title}
						</option>
					))}
				</select>
			</div>
			<button role="submit" className="btn btn-danger w-100 btn-sm">
				{args.loading ? <Spinner color="text-light" /> : args.buttonVal}
			</button>
		</form>
	);
};
