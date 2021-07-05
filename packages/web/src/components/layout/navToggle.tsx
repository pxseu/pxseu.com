import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

interface IMenuToggle {
	toggle: () => void;
	isOpen: boolean;
}

const MenuToggle: FC<IMenuToggle> = ({ toggle, isOpen }) => (
	<Box display={{ base: "flex", md: "none" }} justifyContent="center" alignItems="center" onClick={toggle} zIndex="2">
		{isOpen ? (
			<AiOutlineClose color="gray.600" fontSize="30px" />
		) : (
			<AiOutlineMenu color="gray.600" fontSize="30px" />
		)}
	</Box>
);

export default MenuToggle;
