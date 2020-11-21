import DefaultLayout from "../../components/DefaultLayout";

const HallOfFame = () => (
	<>
		<DefaultLayout title={"Hall of fame"}>
			<p>
				<a href='' target='_blank'>
					curly | she's cute with her curly hair {"<"}3
				</a>
			</p>
			<p>
				<a href='https://julie420.github.io/' target='_blank'>
					Peitho | wasn't there when I needed her but oh well
				</a>
			</p>
			<p>
				<a href='' target='_blank'></a>
			</p>
			<p>
				<a href='https://www.vektrix.com' target='_blank'>
					Vek | told me about security.txt
				</a>
			</p>
			<p>
				<a href='https://twitter.com/milkeusz' target='_blank'>
					Milki | nothing tbh
				</a>
			</p>
			<p>
				<a href='https://twitter.com/Amuq16' target='_blank'>
					Amuq | DDOS'ed my website
				</a>
			</p>
			<p>
				<a href='https://jelnislaw.ml/' target='_blank'>
					JelNiSław | menel
				</a>
			</p>
			<p>
				<a href='https://twitter.com/crash7_' target='_blank'>
					crash | przekonał mnie
				</a>
			</p>
			<p>
				<a href='https://RedBird16.com' target='_blank'>
					Red_Prez16 | life coach @ RedBird16.com
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
