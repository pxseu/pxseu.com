import React, { JSX } from "react";

type TitleProps = {
	children: React.ReactNode;
	title: string;
	id: string;
};

export default function Container({ children, title }: TitleProps): JSX.Element {
	return (
		<div className="border-[0.5px] border-t-0 first:border-t-[0.5px] border-solid p-8 flex flex-col w-full border-border-100">
			<h1 className="text-3xl mb-5 font-bold text-zinc-300">{title}</h1>

			{children}
		</div>
	);
}
