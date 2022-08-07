import {
	Box,
	Heading,
	Text,
	Stack,
	Avatar,
	useColorModeValue,
	HStack,
	Button,
	Flex,
	useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { toNameCase } from "../services/utils/stringUtils";
import { FeedBook } from "../types/book";
import { createTransaction } from "../services/api/transaction";
import { deleteBook } from "../services/api/book";

export function BookComponent({
	book,
	requestButton,
	refetch
}: {
	book: FeedBook;
	requestButton: boolean;
	refetch: Function;
}) {
	const [buttonLoading, setButtonLoading] = useState(false);
	const toast = useToast();

	const onRequest = async () => {
		try {
			setButtonLoading(true);
			await createTransaction(book.id);
			toast({
				description: "Book Requested",
				status: "success",
				duration: 5000,
			});
			setButtonLoading(false);
		} catch (e: any) {
			toast({
				description: e.response.data.message,
				status: "error",
				duration: 5000,
			});
		}
	};

	const onDelete = async () => {
		try {
			await deleteBook(book.id);
			toast({
				description: "Book Requested",
				status: "success",
				duration: 5000,
			});
			refetch()
		} catch (e: any) {
			toast({
				description: e.response.data.message,
				status: "error",
				duration: 5000,
			});
		}
	};

	return (
		<Box
			w={"full"}
			bg="white"
			boxShadow="sm"
			borderWidth="1px"
			borderStyle="solid"
			borderColor="gray.300"
			rounded={"md"}
			p={6}
			overflow={"hidden"}
		>
			<Stack direction={"row"} spacing={4} align={"center"}>
				<Avatar name={book.owner.name} size="sm" />
				<Stack direction={"column"} spacing={0} fontSize={"sm"}>
					<Text fontWeight={600}>{book.owner.name}</Text>
					<Text color={"gray.500"}>{book.createdDate}</Text>
				</Stack>
			</Stack>
			<Stack mt={6}>
				<Text
					color={"green.500"}
					textTransform={"uppercase"}
					fontWeight={800}
					fontSize={"xs"}
					letterSpacing={1.1}
				>
					{book.category.name}
				</Text>
				<HStack>
					<Heading
						color={useColorModeValue("gray.700", "white")}
						fontSize={"lg"}
						letterSpacing="wide"
					>
						{book.name}
					</Heading>
					<Text
						color="gray.500"
						fontWeight="medium"
						fontStyle="italic"
						letterSpacing="wide"
					>
						({book.year})
					</Text>
				</HStack>
				<Text
					color="gray.700"
					fontWeight="medium"
					letterSpacing="wide"
					fontSize="sm"
					fontStyle="italic"
				>
					by {toNameCase(book.author.name)}
				</Text>
			</Stack>

			<Flex justify="space-between" mt={6} alignItems="center">
				<Button
					colorScheme={requestButton ? "green" : "red"}
					variant="solid"
					isLoading={buttonLoading}
					onClick={onRequest}
				>
					{requestButton ? "Request" : "Delete"}
				</Button>
				<Text
					color={"gray.700"}
					fontWeight={600}
					letterSpacing={1.1}
					fontFamily="heading"
					onClick={onDelete}
				>
					{book.price} creds
				</Text>
			</Flex>
		</Box>
	);
}
