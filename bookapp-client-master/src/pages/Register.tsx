import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link,
	Stack,
	Image,
	Text,
	Box,
	useToast,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/react";
import illustration from "../images/illustration.svg";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { setLocalStorage } from "../services/utils/localStorageUtils";
import { registerUser } from "../services/api/user";

export function Register() {
	const intitialState = {
		email: "",
		password: "",
		rollNumber: "",
		name: "",
	};
	const [registerInfo, setRegisterInfo] = useState(intitialState);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [passShow, setPassShow] = useState(false);
	const navigate = useNavigate();
	const toast = useToast();

	const onRegisterValueChange: React.ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
	};

	const onRegister = async () => {
		setButtonLoading(true);
		if (
			!registerInfo.rollNumber &&
			!registerInfo.name &&
			!registerInfo.email &&
			!registerInfo.password
		) {
			toast({
				title: "Empty Feild",
				description: "All fields are required",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
		}
		if (registerInfo.password.length < 6) {
			toast({
				title: "Invalid Password",
				description: "Password must be of length 6 or more",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
		}
		if (registerInfo.rollNumber.length !== 9) {
			toast({
				title: "Invalid id number",
				description: "id number must be of format f20yyxxxx",
				status: "error",
				duration: 5000,
				isClosable: true,
			});
			return;
		}
		try {
			const { data } = await registerUser(registerInfo);
			setLocalStorage(data.token);
			navigate("/set-categories");
		} catch (e: any) {
			toast({
				title: e.response.data.error,
				description: e.response.data.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
		setButtonLoading(false);
	};

	return (
		<Stack direction={{ base: "column", md: "row" }}>
			<Flex p={8} flex={1} justify={"center"} mt={6}>
				<Stack spacing={16} minW="xl">
					<Box>
						<Heading
							fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
						>
							Book{" "}
							<Text color={"green.400"} as="span">
								Exchange
							</Text>{" "}
						</Heading>
						<Text
							fontSize={{ base: "md", lg: "lg" }}
							color={"gray.500"}
							maxW="xl"
							mt={8}
						>
							A Book exchange website to help connect book owners
							who are interested in trading their used books with
							others.
						</Text>
					</Box>

					<Stack spacing={6} w={"full"} maxW={"md"}>
						<Heading size="md" letterSpacing="wide">
							Discover & read more
						</Heading>
						<FormControl id="name">
							<FormLabel>Name</FormLabel>
							<Input
								type="text"
								name="name"
								onChange={onRegisterValueChange}
							/>
						</FormControl>
						<FormControl id="id">
							<FormLabel>Id Number</FormLabel>
							<Input
								type="text"
								placeholder="f20190999"
								name="rollNumber"
								onChange={onRegisterValueChange}
							/>
						</FormControl>
						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input
								type="email"
								name="email"
								onChange={onRegisterValueChange}
							/>
						</FormControl>
						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={passShow ? "text" : "password"}
									name="password"
									onChange={onRegisterValueChange}
								/>
								<InputRightElement width="4.5rem">
									<Button
										h="1.75rem"
										size="sm"
										onClick={() => setPassShow(!passShow)}
									>
										{passShow ? "Hide" : "Show"}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={2}>
							<Button
								colorScheme={"green"}
								variant={"solid"}
								isLoading={buttonLoading}
								onClick={onRegister}
							>
								Register
							</Button>
							<Text textAlign="center">
								Already member?{" "}
								<Link
									as={RouterLink}
									color="green.400"
									to="/login"
								>
									Login
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Stack>
			</Flex>
			<Flex flex={1} minH="90vh" align="center">
				<Image
					alt={"Login Image"}
					objectFit={"fill"}
					src={illustration}
				/>
			</Flex>
		</Stack>
	);
}
