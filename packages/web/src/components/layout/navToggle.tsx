import React, { FC } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

interface IMenuToggle {
	toggle: () => void;
	isOpen: boolean;
}

const MenuToggle: FC<IMenuToggle> = ({ toggle, isOpen }) => (
	<Box display={{ base: "flex", md: "none" }} justifyContent="center" alignItems="center" onClick={toggle}>
		<IconButton
			variant="ghost"
			as="button"
			aria-label="Discord"
			icon={
				isOpen ? (
					<AiOutlineClose color="gray.600" fontSize="25px" />
				) : (
					<IconButton
						variant="ghost"
						as="button"
						aria-label="Discord"
						icon={<AiOutlineMenu color="gray.600" fontSize="25px" />}
					/>
				)
			}
		/>
		{}
	</Box>
);

export default MenuToggle;