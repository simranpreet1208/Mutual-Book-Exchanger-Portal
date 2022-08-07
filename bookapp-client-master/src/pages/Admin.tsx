import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Avatar,
	Box,
	Button,
	Flex,
	Input,
	InputGroup,
	InputLeftElement,
	Stack,
	Text,
	Spinner,
	useToast,
	Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { ErrorComponent } from "../components/ErrorComponent";
import { Loader } from "../components/Loader";
import { addAuthor } from "../services/api/author";
import { addCategory } from "../services/api/category";
import { deleteUser, getUserProfile, searchUser } from "../services/api/user";
import { Role, User } from "../types/user";

function UserCard(user: User) {
	return <Text>{user.name}</Text>;
}

export function Admin() {
	const profile = useQuery("profile", getUserProfile);
	const navigate = useNavigate();
	const [author, setAuthor] = useState("");
	const [category, setCategory] = useState("");
	const toast = useToast();
	const [searchString, setSearchString] = useState("");
	const [debouncedQuery, someFunction] = useDebounce(searchString, 500);

	const { data, isLoading, error } = useQuery(
		["search", debouncedQuery],
		() => searchUser(debouncedQuery),
		{ enabled: Boolean(debouncedQuery) }
	);

	if (profile.isLoading) {
		return <Loader />;
	}

	if (!profile.data) {
		return <ErrorComponent />;
	}

	if (profile.data.data.role !== Role.ADMIN) {
		navigate("/home");
		return null;
	}

	const onAddAuthor = () => {
		try {
			addAuthor(author);
			toast({
				description: "Added successfully",
				status: "success",
				duration: 5000,
			});
		} catch (e) {
			toast({
				description: "something went wrong",
				status: "error",
				duration: 5000,
			});
		}
	};

	const onAddCategory = () => {
		try {
			addCategory(category);
			toast({
				description: "Added successfully",
				status: "success",
				duration: 5000,
			});
		} catch (e) {
			toast({
				description: "Something went wrong",
				status: "error",
				duration: 5000,
			});
		}
	};

	const onDeleteUser = (id: number) => {
		try {
			deleteUser(id);
			toast({
				description: "Deleted successfully",
				status: "success",
				duration: 5000,
			});
		} catch (e) {
			toast({
				description: "Something went wrong",
				status: "error",
				duration: 5000,
			});
		}
	};

	return (
		<Box minH="92vh" bg="gray.50" pt={8}>
			<Accordion
				allowToggle
				w="60%"
				mx="auto"
				borderStyle="solid"
				borderColor="gray.200"
				borderRadius="lg"
				borderWidth="1px"
			>
				<AccordionItem borderTop="none" py="4">
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left" color="green">
								Add Category
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						<Flex align="center" justifyContent="start" mt={4}>
							<Input
								w="lg"
								type="text"
								name="category"
								color="gray.700"
								placeholder="Name"
								onChange={(e) => setCategory(e.target.value)}
							/>
							<Button
								colorScheme="green"
								ms="4"
								w="100px"
								onClick={onAddCategory}
							>
								Add
							</Button>
						</Flex>
					</AccordionPanel>
				</AccordionItem>
				<AccordionItem py="4" color="green">
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left">
								Add Author
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						<Flex align="center" justifyContent="start" mt={4}>
							<Input
								w="lg"
								type="text"
								name="author"
								color="gray.700"
								placeholder="Name"
								onChange={(e) => setAuthor(e.target.value)}
							/>
							<Button
								colorScheme="green"
								ms="4"
								w="100px"
								onClick={onAddAuthor}
							>
								Add
							</Button>
						</Flex>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem borderBottom="none" py="4">
					<h2>
						<AccordionButton>
							<Box flex="1" textAlign="left" color="red">
								Delete User
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel pb={4}>
						<InputGroup w="full" mx="auto" mt="4">
							<InputLeftElement
								pointerEvents="none"
								children={<BiSearch color="gray.300" />}
							/>
							<Input
								placeholder="Search..."
								py={5}
								onChange={(e) =>
									setSearchString(e.target.value)
								}
							/>
						</InputGroup>
						{isLoading ? (
							<Spinner size="xl" color="green.500" />
						) : (
							<Box pt="6">
								{data?.data.map((user, id) => (
									<Stack
										direction={"row"}
										spacing={4}
										align={"center"}
										key={id}
										p="4"
										borderRadius="lg"
										bg="gray.100"
									>
										<Avatar name={user.name} size="sm" />
										<Text fontWeight={600}>
											{user.name}
										</Text>
										<Spacer />
										<Button
											colorScheme="red"
											onClick={() => deleteUser(user.id)}
										>
											Delete
										</Button>
									</Stack>
								))}
							</Box>
						)}
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
		</Box>
	);
}
