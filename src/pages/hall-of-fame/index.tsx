import DefaultLayout from "../../components/DefaultLayout";

const HallOfFame = () => (
	<>
		<DefaultLayout title={"Hall of fame"}>
			<p>
				<a href='https://julie420.github.io/' target='about:blank'>
					Peitho | was there when I needed her
				</a>
			</p>
			<p>
				<a href='https://www.vektrix.com' target='about:blank'>
					Vek | told me about security.txt
				</a>
			</p>
			<p>
				<a href='https://twitter.com/milkeusz' target='about:blank'>
					Milki | nothing tbh
				</a>
			</p>
			<p>
				<a href='https://twitter.com/Amuq16' target='about:blank'>
					Amuq | DDOS'ed my website
				</a>
			</p>
			<p>
				<a href='https://jelnislaw.ml/' target='about:blank'>
					JelNiSław | menel
				</a>
			</p>
			<p>
				<a href='https://twitter.com/crash7_' target='about:blank'>
					crash | przekonał mnie
				</a>
			</p>
			<p>
				<a href='https://RedBird16.com' target='about:blank'>
					Red_Prez16 | RedBird16.com
				</a>
			</p>
			<p className='comment'>
				<i>psst these are links!</i>
			</p>
		</DefaultLayout>
		<style jsx>{`
			.comment {
				text-decoration: underline #ffa9ff;
			}
		`}</style>
	</>
);

export default HallOfFame;
