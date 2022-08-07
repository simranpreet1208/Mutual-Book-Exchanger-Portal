import { Box, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { BookComponent } from "../components/BookComponent";
import { ErrorComponent } from "../components/ErrorComponent";
import { Loader } from "../components/Loader";
import { getFeed } from "../services/api/user";
import { AxiosError } from "axios";
import { Dispatch, SetStateAction } from "react";
import {
	getRequests,
	getTransactionForUser,
} from "../services/api/transaction";
import { RequestedByYou } from "../components/RequestedByYou";
import { RequestedFromYou } from "../components/RequestedFromYou";
import { TransactionStatus } from "../types/transaction";

export function Home({
	setLoggedIn,
}: {
	setLoggedIn: Dispatch<SetStateAction<boolean>>;
}) {
	const { data, isLoading, error } = useQuery("feed", getFeed);
	const transactions = useQuery("user-transaction", getTransactionForUser);
	const requests = useQuery("user-request", getRequests);

	if (isLoading || transactions.isLoading) {
		return <Loader />;
	}

	if (!data || error) {
		if (error) {
			const err = error as AxiosError;
			if (err.response?.status === 403) {
				setLoggedIn(false);
			}
		}
		return <ErrorComponent />;
	}

	return (
		<Box minH="92vh" bg="gray.50" pt="8">
			<Flex width="80%" mx="auto" align="start">
				<Box>
					<Text
						color="gray.500"
						fontWeight="semibold"
						fontSize="sm"
						mb="1"
					>
						BORROWINGS
					</Text>
					<Stack w="md" spacing="4">
						{transactions.data?.data.length === 0 ? (
							<Text fontStyle="italic" color="gray.500">
								You have no borrowings...
							</Text>
						) : (
							transactions.data?.data.map((transaction, id) => {
								if (
									transaction.transactionStatus ===
										TransactionStatus.CANCELED ||
									transaction.transactionStatus ===
										TransactionStatus.RETURNED
								) {
									return;
								}
								return (
									<RequestedByYou
										key={id}
										transaction={transaction}
										refetch={transactions.refetch}
									/>
								);
							})
						)}
					</Stack>
				</Box>
				<Spacer />
				<Box>
					<Text
						color="gray.500"
						fontWeight="semibold"
						fontSize="sm"
						mb="1"
					>
						UPDATES
					</Text>
					<Stack w="md" spacing="4">
						{data.data.map((book, id) => (
							<BookComponent
								key={id}
								book={book}
								requestButton
								refetch={() => null}
							/>
						))}
					</Stack>
				</Box>
				<Spacer />
				<Box>
					<Text
						color="gray.500"
						fontWeight="semibold"
						fontSize="sm"
						mb="1"
					>
						REQUESTS
					</Text>
					<Stack w="md" spacing="4">
						{requests.data?.data.length === 0 ? (
							<Text fontStyle="italic" color="gray.500">
								You have no requests...
							</Text>
						) : (
							requests.data?.data.map((request, id) => {
								if (
									request.transactionStatus ===
										TransactionStatus.CANCELED ||
									request.transactionStatus ===
										TransactionStatus.RETURNED
								) {
									return;
								}
								return (
									<RequestedFromYou
										key={id}
										transaction={request}
										refetch={requests.refetch}
									/>
								);
							})
						)}
					</Stack>
				</Box>
			</Flex>
		</Box>
	);
}
