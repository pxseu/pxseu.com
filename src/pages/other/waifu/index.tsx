import { useState } from "react";
import DefaultLayout from "../../../components/DefaultLayout";

const LovesIndex = () => {
	const [waifuClick, setWaifuClick] = useState(true);

	return (
		<>
			<DefaultLayout
				title={"Grab a waifu!"}
				titleOnClick={() => {
					setWaifuClick(false);
					setTimeout(() => setWaifuClick(true), 1);
				}}>
				<div className={waifuClick ? "imageDiv" : "hidden"}>
					<img
						className='waifuImage'
						src={`https://www.thiswaifudoesnotexist.net/example-${Math.floor(
							Math.random() * 100000,
						)}.jpg`}
						alt='Unable to fetch image.'
					/>
					<p>
						<a href='https://www.thiswaifudoesnotexist.net/'>
							Provided by www.thiswaifudoesnotexist.net
						</a>
					</p>
				</div>
			</DefaultLayout>
			<style jsx>{`
				.imageDiv {
					overflow: hidden;
				}
				.waifuImage {
					width: 40%;
					height: 40%;
					border-style: double;
					border-width: 1px;
					border-color: white;
					background-color: black;
				}
			`}</style>
		</>
	);
};

export default LovesIndex;
