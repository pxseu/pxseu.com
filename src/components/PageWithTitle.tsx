import React, { MouseEventHandler, ReactNode } from "react";
import DefaultLayout from "./DefaultLayout";

interface PageWithTitleProps {
	title: string;
	children: ReactNode;
	titleOnClick?: MouseEventHandler<HTMLHeadingElement>;
}

const PageWithTitle = ({ title, children, titleOnClick }: PageWithTitleProps): JSX.Element => {
	return (
		<DefaultLayout title={title}>
			<h1 onClick={titleOnClick} className="center">
				{title}
			</h1>
			<hr />
			<div className="pageWithTitleContent center">{children}</div>
		</DefaultLayout>
	);
};

export default PageWithTitle;
