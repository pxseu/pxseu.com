import React, { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useTimePassed } from "@/hooks/useTimePassed";

const AboutComp: FC = () => {
	const age = useTimePassed(1090022400000);
	const codingFor = useTimePassed(1535760000000);

	return (
		<Flex backgroundColor="blackAlpha.400" p={4} mt={2} borderRadius={10} boxShadow="md" maxWidth="510px">
			<Text fontSize="xl">
				As you should alerady know I am a {Math.floor(age)} year old software developer from Poland with over{" "}
				{Math.floor(codingFor)} years of experience. I love open source and free software but like most of us I
				use a huge amount of proprietary software. In my free time I like to listen to &quot;emo/sad&quot; songs
				or watch anime thought recently I hardly find time for it now.
			</Text>
		</Flex>
	);
};

export default AboutComp;
