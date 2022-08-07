import { Avatar, Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { BookComponent } from "../components/BookComponent";
import { ErrorComponent } from "../components/ErrorComponent";
import { Loader } from "../components/Loader";
import { getUserBooks } from "../services/api/user";
import { getUserProfile } from "../services/api/user";

export function Profile() {
	const profile = useQuery("profile", getUserProfile);
	const books = useQuery("user-books", getUserBooks);

	if (profile.isLoading || books.isLoading) {
		return <Loader />;
	}

	if (profile.isError || !profile.data || !books.data) {
		return <ErrorComponent />;
	}

	return (
		<Box minH="92vh" bg="gray.50" pt={8}>
			<Box
				width={"md"}
				rounded={"lg"}
				bg="white"
				boxShadow={"lg"}
				p={8}
				mx="auto"
				textAlign="center"
			>
				<Avatar mx="auto" size="lg" name={profile.data.data.name} />
				<Heading size="md" mt={8} color="gray.700">
					{profile.data?.data.name}
				</Heading>
				<Text mt="2">{profile.data.data.email}</Text>
				<Text mt="2">{profile.data.data.wallet} creds</Text>
				<Link to="/set-categories">
					<Text fontSize="sm" color="green" mt="4">
						Edit Categories
					</Text>
				</Link>
			</Box>
			<Stack w="lg" spacing="2" mx="auto" mt="8">
				<Text
					color="gray.500"
					fontWeight="semibold"
					fontSize="sm"
					mb="1"
				>
					Your Books
				</Text>
				{books.data.data.map((book, id) => (
					<BookComponent
						book={book}
						key={id}
						requestButton={false}
						refetch={books.refetch}
					/>
				))}
			</Stack>
		</Box>
	);
}
