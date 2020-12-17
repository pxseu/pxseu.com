import { useState } from "react";
import DefaultLayout from "../../../components/DefaultLayout";

const LovesIndex = () => {
	const [loveClick, setLoveClick] = useState(false);

	return (
		<>
			<DefaultLayout title={"I love you <333"} titleOnClick={() => setLoveClick(!loveClick)}>
				{loveClick && (
					<div className="imageDiv">
						<img src="https://cdn.pxseu.com/meAndHer.jpg?raw" />
					</div>
				)}
			</DefaultLayout>
			<style jsx>{`
				.imageDiv {
					overflow: hidden;
				}
			`}</style>
		</>
	);
};

export default LovesIndex;
