import { Box, Text } from "@chakra-ui/react";

export function ErrorComponent() {
	return (
		<Box w="80%" mx="auto">
			<Text size="lg" color="red.500">
				Something went wrong. Please reload
			</Text>
		</Box>
	);
}
