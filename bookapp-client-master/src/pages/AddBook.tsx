import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Select,
	Stack,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { trace } from "console";
import { useState } from "react";
import { useQuery } from "react-query";
import { ErrorComponent } from "../components/ErrorComponent";
import { Loader } from "../components/Loader";
import { getAllAuthors } from "../services/api/author";
import { addBook } from "../services/api/book";
import { getAllCategories } from "../services/api/category";
import { AddBookDto } from "../types/book";

export function AddBook() {
	const initialState: AddBookDto = {
		name: "",
		categoryId: 0,
		year: 0,
		authorId: 0,
		isbn: "",
	};
	const [book, setBook] = useState(initialState);
	const [buttonLoading, setButtonLoading] = useState(false);

	const authors = useQuery("all-authors", getAllAuthors);
	const categories = useQuery("all-categories", getAllCategories);
	const toast = useToast();

	const onBookChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
		if (e.target.name === "authorId" || e.target.name === "categoryId") {
			setBook({ ...book, [e.target.name]: parseInt(e.target.value) });
		} else {
			setBook({ ...book, [e.target.name]: e.target.value });
		}
		console.log(book);
	};

	const onButtonClick = async () => {
		setButtonLoading(true);
		if (
			!book.name ||
			book.categoryId === 0 ||
			book.authorId === 0 ||
			book.year === 0 ||
			!book.isbn
		) {
			toast({
				title: "Invalid book",
				description: "All fields are required",
				isClosable: true,
				duration: 5000,
				status: "error",
			});
		} else {
			await addBook(book);
			toast({
				description: "Book added successfully",
				isClosable: true,
				duration: 5000,
				status: "success",
			});
			setBook(initialState);
		}
		setButtonLoading(false);
	};

	if (authors.isLoading || categories.isLoading) {
		return <Loader />;
	}

	if (!authors.data || !categories.data) {
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
				<Stack spacing={4}>
					<Heading
						fontSize="xl"
						color="gray.700"
						letterSpacing="wide"
						mb={3}
						textAlign="center"
					>
						Add Book
					</Heading>
					<FormControl id="name">
						<FormLabel color="gray.700">Name</FormLabel>
						<Input
							type="text"
							name="name"
							onChange={onBookChange}
							color="gray.700"
							value={book.name}
						/>
					</FormControl>
					<FormControl id="isbn">
						<FormLabel color="gray.700">isbn</FormLabel>
						<Input
							type="text"
							name="isbn"
							onChange={onBookChange}
							color="gray.700"
							value={book.isbn}
						/>
					</FormControl>
					<FormControl id="year">
						<FormLabel color="gray.700">Year</FormLabel>
						<Input
							type="number"
							name="year"
							onChange={onBookChange}
							color="gray.700"
							value={book.year}
							maxLength={4}
						/>
					</FormControl>
					<FormControl>
						<FormLabel color="gray.700">Author</FormLabel>
						<Select name="authorId" onChange={onBookChange} value={book.authorId}>
							<option value="0"></option>
							{authors.data.data.map((author) => (
								<option value={author.id.toString()}>
									{author.name}
								</option>
							))}
						</Select>
					</FormControl>
					<FormControl>
						<FormLabel color="gray.700">Category</FormLabel>
						<Select name="categoryId" onChange={onBookChange} value={book.categoryId}>
							<option value="0"></option>
							{categories.data.data.map((category) => (
								<option value={category.id.toString()}>
									{category.name}
								</option>
							))}
						</Select>
					</FormControl>
					<Stack spacing={8}>
						<Button
							colorScheme="green"
							onClick={onButtonClick}
							isLoading={buttonLoading}
						>
							Add
						</Button>
					</Stack>
				</Stack>
			</Box>
		</Box>
	);
}
