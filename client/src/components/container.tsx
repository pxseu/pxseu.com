import React, { JSX } from "react";

type TitleProps = {
	children: React.ReactNode;
	title: string;
	id: string;
};

export default function Container({ children, title, id }: TitleProps): JSX.Element {
	return (
		<div
			id={id}
			className="border-[0.5px] border-t-0 first:border-t-[0.5px] border-solid p-8 flex flex-col w-full border-border-100"
		>
			<a href={`#${id}`}>
				<h1 className="text-3xl mb-5 font-bold">{title}</h1>
			</a>
			{children}
		</div>
	);
}
