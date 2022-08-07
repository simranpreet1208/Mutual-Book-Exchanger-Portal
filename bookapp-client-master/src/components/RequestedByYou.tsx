import {
	Box,
	Heading,
	Text,
	Stack,
	useColorModeValue,
	HStack,
	Flex,
	Button,
	useToast,
} from "@chakra-ui/react";
import { changeTransactionStatus } from "../services/api/transaction";
import { toNameCase } from "../services/utils/stringUtils";
import { Transaction, TransactionStatus } from "../types/transaction";

export function RequestedByYou({
	transaction,
	refetch,
}: {
	transaction: Transaction;
	refetch: Function;
}) {
	const statusStuff = {
		REQUESTED: "red.500",
		BORROWED: "orange.500",
		RETURNED: "green.500",
	};
	const toast = useToast();

	const onStatusClick = (status: TransactionStatus) => {
		try {
			changeTransactionStatus(status, transaction.id);
		} catch (e: any) {
			toast({
				description: "Something went wrong",
				status: "error",
				duration: 3000,
				isClosable: true,
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
			<Flex justify="space-between">
				<Stack direction={"column"} spacing={0} fontSize={"sm"}>
					<Text fontWeight={600} letterSpacing="wide">
						<span
							style={{ fontWeight: "300", fontStyle: "italic" }}
						>
							{transaction.transactionStatus.toLowerCase()} from{" "}
						</span>
						{transaction.book.owner.name}
					</Text>
					<Text color={"gray.700"} fontWeight="600">
						<span
							style={{ fontWeight: "300", fontStyle: "italic" }}
						>
							on
						</span>{" "}
						{transaction.requestedDate}
					</Text>
				</Stack>
				{transaction.transactionStatus ===
					TransactionStatus.BORROWED && (
					<Stack
						direction={"column"}
						spacing={0}
						fontSize={"sm"}
						textAlign="end"
					>
						<Text fontWeight={600} letterSpacing="wide">
							Return Date
						</Text>
						<Text color={"gray.700"} fontWeight="600">
							{transaction.expReturnDate}
						</Text>
					</Stack>
				)}
			</Flex>
			<Stack mt={6}>
				<Text
					color={"green.500"}
					textTransform={"uppercase"}
					fontWeight={800}
					fontSize={"xs"}
					letterSpacing={1.1}
				>
					{transaction.book.category.name}
				</Text>
				<HStack>
					<Heading
						color={useColorModeValue("gray.700", "white")}
						fontSize={"lg"}
						letterSpacing="wide"
					>
						{transaction.book.name}
					</Heading>
					<Text
						color="gray.500"
						fontWeight="medium"
						fontStyle="italic"
						letterSpacing="wide"
					>
						({transaction.book.year})
					</Text>
				</HStack>
				<Text
					color="gray.700"
					fontWeight="medium"
					letterSpacing="wide"
					fontSize="sm"
					fontStyle="italic"
				>
					by {toNameCase(transaction.book.author.name)}
				</Text>
			</Stack>

			<Flex justify="space-between" mt={6} alignItems="center">
				<Text
					color={
						statusStuff[
							transaction.transactionStatus.valueOf() as keyof typeof statusStuff
						]
					}
					fontFamily="heading"
				>
					{transaction.transactionStatus.toLowerCase()}
				</Text>
				<HStack spacing="4">
					<Text
						color={"gray.700"}
						fontWeight={600}
						letterSpacing={1.1}
						fontFamily="heading"
					>
						{transaction.book.price} creds
					</Text>
					{transaction.transactionStatus ==
						TransactionStatus.REQUESTED && (
						<Button
							colorScheme="red"
							onClick={() => {
								onStatusClick(TransactionStatus.CANCELED);
								refetch();
							}}
						>
							Cancel
						</Button>
					)}
				</HStack>
			</Flex>
		</Box>
	);
}
