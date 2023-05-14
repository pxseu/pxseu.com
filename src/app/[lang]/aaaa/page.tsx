import { styled } from "@/../stitches.config";
import { useTranslation } from "@/app/i18n";

const StyledDiv = styled("div", {
	justifySelf: "center",
	alignSelf: "center",
	fontSize: "2rem",
	color: "white",
});

export async function generateMetadata({ params: { lang } }: { params: { lang: string } }) {
	const { t } = await useTranslation(lang, "aaaa");

	return {
		title: t("title"),
	};
}

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
	const { t } = await useTranslation(lang, "aaaa");

	return (
		<>
			<StyledDiv>{t("title")}</StyledDiv>
			<StyledDiv>Language: {lang}</StyledDiv>
			<StyledDiv>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi debitis molestiae nam repudiandae saepe?
				Tempore ducimus odit vitae veritatis voluptatibus dolor hic aliquid ratione provident! Maiores modi
				facilis quidem alias adipisci dolor sapiente voluptate distinctio nulla nobis, dicta placeat quo eos
				facere itaque reiciendis ducimus id sint ipsam nisi molestiae nostrum! Maiores ut eos amet esse fugit.
				Doloribus aliquam et esse facilis voluptatibus dignissimos. Esse, maxime perspiciatis labore eum natus
				eveniet et officiis enim quisquam nobis fugit suscipit. Totam velit consequuntur alias! Atque cum
				molestias odit quia, numquam ad saepe dicta ut quam sed nisi labore assumenda illum accusantium esse non
				eius a enim expedita consectetur doloribus blanditiis? Minima rem magni cupiditate perferendis
				laudantium beatae quis veritatis? Est rerum minus aliquid corporis, impedit maiores ab beatae excepturi
				repellat natus in sapiente temporibus tempora ratione tenetur optio eius architecto, aut maxime quasi
				fuga recusandae illo. Similique molestias odio recusandae iusto quis error enim laudantium repudiandae
				blanditiis, natus maxime ipsam et aut nobis distinctio ipsum aliquam ad officia eaque mollitia repellat
				pariatur non consectetur! Architecto, temporibus sed doloribus earum, libero dolorum delectus possimus
				rerum et exercitationem, nulla cupiditate accusamus dolores porro natus? Repellendus, sequi incidunt.
				Maxime minus deleniti odio, excepturi adipisci, eaque numquam dolor totam ea ab fugiat perferendis error
				aut dignissimos assumenda quidem perspiciatis impedit architecto, delectus repellendus deserunt dolorem!
				Debitis consequatur animi deserunt, quam dicta dolore minus facilis dignissimos laudantium, nobis natus
				architecto iure reiciendis. Velit consectetur, voluptas eaque placeat quis labore accusantium debitis
				vel nam sint sequi eos voluptatem, quidem quod illo suscipit provident magnam quisquam adipisci error
				alias eum saepe facere? Harum ratione, hic molestiae alias, praesentium sapiente ea magnam commodi sint
				animi architecto nesciunt. Iusto, enim. Aut ab esse, cum odio repudiandae labore aspernatur sapiente rem
				quibusdam voluptate expedita blanditiis dignissimos! Vitae adipisci itaque atque mollitia facere
				temporibus assumenda ducimus facilis voluptatem sapiente cum tempore excepturi minima vero natus, eos
				non veniam. Porro alias fugiat, suscipit repellendus, inventore explicabo temporibus in officiis nulla
				earum tempore et assumenda laboriosam molestiae laudantium modi cum numquam a unde, ab perspiciatis! Eum
				voluptas repellat ipsum eligendi commodi officia doloremque molestias aliquid cupiditate! Dolorum
				aperiam eius nostrum dolores inventore ex in earum, eos amet repellendus veritatis, corporis quos
				adipisci saepe a odio minus accusamus necessitatibus eveniet obcaecati. Illo aspernatur distinctio
				dolores repellendus sunt dignissimos porro adipisci quo in quae soluta, quasi numquam ipsa suscipit
				libero maiores iusto nulla quia amet nostrum, expedita reiciendis iure officiis similique. Asperiores
				accusantium voluptatem quo alias blanditiis reiciendis! Illum animi labore reprehenderit distinctio
				consequuntur officiis. Magnam voluptates necessitatibus praesentium? Voluptatum consequatur ex
				praesentium numquam recusandae ipsam soluta nesciunt minus corrupti aliquam error repellendus in eos
				officia incidunt nostrum delectus, veritatis deleniti quam quo voluptas beatae a architecto optio! Porro
				natus ab illo, reprehenderit velit perferendis sequi placeat asperiores pariatur possimus impedit
				voluptates voluptate reiciendis. Culpa sed adipisci repellendus consectetur optio. Necessitatibus labore
				vel aspernatur at eaque. Nisi officia nostrum, modi laboriosam, hic amet voluptas quae ea quam similique
				consequatur debitis quibusdam earum adipisci ex recusandae. Quod, repellendus.
			</StyledDiv>
		</>
	);
}
