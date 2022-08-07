import {
	Box,
	Button,
	Checkbox,
	CheckboxGroup,
	Heading,
	Stack,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { constant, parseInt } from "lodash";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ErrorComponent } from "../components/ErrorComponent";
import { Loader } from "../components/Loader";
import { getAllCategories } from "../services/api/category";
import { addCategories } from "../services/api/user";

export function SetCategories() {
	const [buttonLoading, setButtonLoading] = useState(false);
	const { data, isLoading, error } = useQuery(
		"all-categories",
		getAllCategories
	);
	const [categories, setCategories] = useState<number[]>([]);
	const toast = useToast();
	const navigate = useNavigate();

	const onCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (
		e
	) => {
		if (e.target.checked) {
			setCategories([...categories, parseInt(e.target.value)]);
		} else {
			setCategories(
				categories.filter((cat) => cat !== parseInt(e.target.value))
			);
		}
	};

	const onContinueClick = async () => {
		setButtonLoading(true);
		if (categories.length < 3) {
			toast({
				title: "Insufficient Categories",
				status: "error",
				description: "Please select atleast 3 categories",
				isClosable: true,
				duration: 5000,
			});
		} else {
		try {
			const { data } = await addCategories(categories);
			navigate("/home");
		} catch (e: any) {
			toast({
				title: e.response.data.error,
				description: e.response.data.message,
				status: "error",
				duration: 5000,
				isClosable: true,
			});
		}
		}
		setButtonLoading(false);
	};

	if (isLoading) {
		return <Loader />;
	}

	if (!data) {
		return <ErrorComponent />;
	}

	return (
		<Box minH="92vh" bg="gray.50" pt={8}>
			<Box
				width={"lg"}
				rounded={"lg"}
				bg="white"
				boxShadow={"lg"}
				p={8}
				mx="auto"
			>
				<Stack spacing={6}>
					<Heading
						fontSize="lg"
						color="gray.700"
						letterSpacing="wide"
					>
						Select atleast 3 categories to continue
						<Text
							color="gray.500"
							as="span"
							fontFamily="Inter"
							fontWeight="medium"
						>
							{" "}
							({categories.length}/3)
						</Text>
					</Heading>
					<CheckboxGroup colorScheme="green">
						<Stack spacing={[1, 5]} direction={"column"} maxW="lg">
							{data.data.map((category) => (
								<Checkbox
									value={category.id.toString()}
									key={category.id}
									onChange={onCheckboxChange}
								>
									{category.name}
								</Checkbox>
							))}
						</Stack>
					</CheckboxGroup>
					<Button
						colorScheme="green"
						isLoading={buttonLoading}
						onClick={onContinueClick}
					>
						Continue
					</Button>
				</Stack>
			</Box>
		</Box>
	);
}
