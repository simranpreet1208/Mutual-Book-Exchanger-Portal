import {
	InputGroup,
	Input,
	InputRightAddon,
	Box,
	Stack,
	InputLeftElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useQuery } from "react-query";
import { useDebounce } from "use-debounce";
import { BookComponent } from "../components/BookComponent";
import { Loader } from "../components/Loader";
import { searchBook } from "../services/api/book";

export function Search() {
	const [searchString, setSearchString] = useState("");
	const [debouncedQuery, someFunction] = useDebounce(searchString, 500);

	const { data, isLoading, error } = useQuery(
		["search", debouncedQuery],
		() => searchBook(debouncedQuery),
		{ enabled: Boolean(debouncedQuery) }
	);

	return (
		<Box minH="92vh" bg="gray.50" pt="8">
			<InputGroup w="xl" mx="auto">
				<InputLeftElement
					pointerEvents="none"
					children={<BiSearch color="gray.300" />}
				/>
				<Input
					placeholder="Search..."
					py={5}
					onChange={(e) => setSearchString(e.target.value)}
				/>
			</InputGroup>
			{isLoading ? (
				<Loader />
			) : (
				<Stack spacing="4" width="xl" mx="auto" mt="6">
					{data?.data.map((book, id) => (
						<BookComponent
							book={book}
							key={id}
							requestButton
							refetch={() => null}
						/>
					))}
				</Stack>
			)}
		</Box>
	);
}
