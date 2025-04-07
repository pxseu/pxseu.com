import React, { JSX } from "react";

type TitleProps = {
	children: React.ReactNode;
	title: string;
	id: string;
};

// 1) Define the component’s props
export default function Container({ children, title, id }: TitleProps): JSX.Element {
	return (
		<div
			id={id}
			className="border-[0.5px] border-t-0 first:border-t-[0.5px] border-solid  p-8 flex flex-col w-full border-border-100"
		>
			<a href={`#${id}`}>
				<h1 className="text-3xl mb-3 font-bold">{title}</h1>
			</a>
			{children}
		</div>
	);
}
