import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Loader } from "../components/Loader";
import { RequestedByYou } from "../components/RequestedByYou";
import { RequestedFromYou } from "../components/RequestedFromYou";
import {
	getRequests,
	getTransactionForUser,
} from "../services/api/transaction";

export function History() {
	const transactions = useQuery("user-transaction", getTransactionForUser);
	const requests = useQuery("user-request", getRequests);

	if (transactions.isLoading || requests.isLoading) {
		return <Loader />;
	}

	return (
		<Box minH="92vh" bg="gray.50" pt={8}>
			<Tabs width="80%" mx="auto" isFitted>
				<TabList>
					<Tab>Requested</Tab>
					<Tab>Borrowed</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						{requests.data?.data.map((request, id) => (
							<RequestedFromYou key={id} transaction={request} refetch={requests.refetch}/>
						))}
					</TabPanel>
					<TabPanel>
						{transactions.data?.data.map((transaction, id) => (
							<RequestedByYou key={id} transaction={transaction} refetch={transactions.refetch}/>
						))}
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
}
