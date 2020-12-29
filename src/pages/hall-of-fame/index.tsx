import React from "react";
import DefaultLayout from "../../components/DefaultLayout";

const HallOfFame = (): JSX.Element => (
	<>
		<DefaultLayout title={"Hall of fame"}>
			<p>
				<a href="https://www.vektrix.cc" target="_blank" rel="noreferrer">
					Vek | told me about security.txt
				</a>
			</p>
			<p>
				<a href="https://twitter.com/milkeusz" target="_blank" rel="noreferrer">
					Milki | nothing tbh
				</a>
			</p>
			<p>
				<a href="https://twitter.com/rubinstagram" target="_blank" rel="noreferrer">
					Sylwia | gave her own opinion about this websites design
				</a>
			</p>
			<p>
				<a href="https://twitter.com/Amuq16" target="_blank" rel="noreferrer">
					Amuq | DDOS&rsquo;ed my website
				</a>
			</p>
			<p>
				<a href="https://twitter.com/Apxllooo" target="_blank" rel="noreferrer">
					Apx | sent minecraft mods
				</a>
			</p>
			<p>
				<a href="https://jelnislaw.ml/" target="_blank" rel="noreferrer">
					JelNiSław | menel
				</a>
			</p>
			<p>
				<a href="https://twitter.com/crash7_" target="_blank" rel="noreferrer">
					crash | przekonał mnie
				</a>
			</p>
			<p>
				<a href="https://mev.pxseu.com" target="_blank" rel="noreferrer">
					Mev | co-founder of @booble-site
				</a>
			</p>
			<p>
				<a href="https://RedBird16.com" target="_blank" rel="noreferrer">
					Red_Prez16 | coder @ RedBird16.com
				</a>
			</p>
			<p className="comment">
				<i>psst these are links!</i>
			</p>
		</DefaultLayout>
		<style jsx>{`
			.comment {
				color: #fff;
				text-decoration: underline #ffa9ff;
				transition-duration: 0.3s;
			}
			.comment:hover {
				color: #ffa9ff;
				text-decoration: underline #fff;
			}
		`}</style>
	</>
);

export default HallOfFame;
