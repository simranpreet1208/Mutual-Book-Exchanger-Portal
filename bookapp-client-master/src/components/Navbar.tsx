import React, { ReactNode, SetStateAction, useState } from "react";
import {
	Box,
	Flex,
	Avatar,
	Link,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useDisclosure,
	HStack,
	IconButton,
	Stack,
	Text,
	Spinner,
	MenuDivider,
} from "@chakra-ui/react";
import {
	Link as ReactRouterLink,
	useLocation,
	useNavigate,
} from "react-router-dom";
import { MdOutlineClose, MdMenu } from "react-icons/md";
import { ImBook } from "react-icons/im";
import { clearLocalStorage } from "../services/utils/localStorageUtils";
import { useQuery } from "react-query";
import { getUserProfile } from "../services/api/user";
import { BiSearch } from "react-icons/bi";
import { Role } from "../types/user";

const NavLink = ({
	children,
	href,
	active,
}: {
	children: ReactNode;
	href: string;
	active: boolean;
}) => (
	<Link
		as={ReactRouterLink}
		to={href}
		px={2}
		py={1}
		fontWeight={active ? "semibold" : "medium"}
		fontSize="lg"
		rounded={"md"}
		_hover={{
			textDecoration: "none",
			color: "green.500",
		}}
		_active={{
			color: "green.500",
		}}
		color={active ? "green.500" : "gray.500"}
	>
		{children}
	</Link>
);

export const Navbar = ({
	loggedIn,
	setLoggedIn,
}: {
	loggedIn: boolean;
	setLoggedIn: React.Dispatch<SetStateAction<boolean>>;
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	let links = loggedIn
		? [
				{ name: "Home", href: "/home" },
				{ name: "Add", href: "/add-book" },
				{ name: "Search", href: "/search" },
				{ name: "History", href: "/history" },
		  ]
		: [];

	const location = useLocation();
	const navigate = useNavigate();
	const { data, isLoading, isError } = useQuery("profile", getUserProfile, {
		enabled: loggedIn,
	});

	const logOut = () => {
		clearLocalStorage();
		setLoggedIn(false);
		navigate("/login");
	};

	return (
		<Box bg="white" borderBottom="2px" borderColor="gray.200">
			<Flex
				h="8vh"
				alignItems={"center"}
				justifyContent={"space-between"}
				width="80%"
				mx="auto"
			>
				<IconButton
					colorScheme="gray"
					size={"sm"}
					icon={isOpen ? <MdOutlineClose /> : <MdMenu />}
					aria-label={"Open Menu"}
					display={{ md: "none" }}
					onClick={isOpen ? onClose : onOpen}
				/>
				<HStack
					spacing={2}
					alignItems={"center"}
					color="gray.700"
					fontSize="3xl"
				>
					<Text>
						<ImBook />
					</Text>
					<Text fontWeight="medium">
						<Link href="/">
							book
							<span
								style={{
									fontWeight: "200",
									fontStyle: "italic",
								}}
							>
								exchange
							</span>
						</Link>
					</Text>
				</HStack>
				<Flex alignItems={"center"}>
					<HStack
						as={"nav"}
						spacing={2}
						display={{ base: "none", md: "flex" }}
					>
						{links.map((link) => (
							<NavLink
								key={link.name}
								href={link.href}
								active={link.href === location.pathname}
							>
								{link.name}
							</NavLink>
						))}
					</HStack>
					{loggedIn && (
						<Menu>
							<MenuButton
								as={Button}
								rounded={"full"}
								variant={"link"}
								cursor={"pointer"}
								background="gray.700"
								minW={0}
								ms={4}
								disabled={isError}
							>
								<Avatar
									size="sm"
									src={undefined}
									name={data?.data.name}
									background="gray.700"
									color="white"
								/>
							</MenuButton>
							<MenuList>
								<MenuItem onClick={() => navigate("/profile")}>
									Profile
								</MenuItem>
								{data?.data.role == Role.ADMIN && (
									<MenuItem
										onClick={() => navigate("/admin")}
									>
										Admin
									</MenuItem>
								)}
								<MenuDivider />
								<MenuItem onClick={logOut}>Log out</MenuItem>
							</MenuList>
						</Menu>
					)}
				</Flex>
			</Flex>

			{isOpen ? (
				<Box pb={4} display={{ md: "none" }} px="6">
					<Stack as={"nav"} spacing={3}>
						{links.map((link) => (
							<NavLink
								key={link.name}
								href={link.href}
								active={link.href === location.pathname}
							>
								{link.name}
							</NavLink>
						))}
					</Stack>
				</Box>
			) : null}
		</Box>
	);
};
