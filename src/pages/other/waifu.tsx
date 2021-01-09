import React, { useState } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import styles from "../../styles/pages/Waifu.module.css";

const waifuNumber = () => Math.floor(Math.random() * 100000);

const LovesIndex = (): JSX.Element => {
	const [waifu, setWaifu] = useState(waifuNumber());

	return (
		<DefaultLayout
			title={"Grab a waifu!"}
			titleOnClick={() => {
				setWaifu(waifuNumber());
			}}>
			<div className={styles.imageDiv}>
				<img
					className={styles.waifuImage}
					src={`https://www.thiswaifudoesnotexist.net/example-${waifu}.jpg`}
					alt="Unable to load the immage image."
				/>
				<p>
					<a className="link" href="https://www.thiswaifudoesnotexist.net/">
						Provided by www.thiswaifudoesnotexist.net
					</a>
				</p>
			</div>
		</DefaultLayout>
	);
};

export default LovesIndex;
