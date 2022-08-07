import "@fontsource/merriweather";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { checkLoggedIn } from "./services/utils/localStorageUtils";
import { Navbar } from "./components/Navbar";
import { Register } from "./pages/Register";
import { SetCategories } from "./pages/SetCategory";
import { AddBook } from "./pages/AddBook";
import { Search } from "./pages/Search";
import { History } from "./pages/History";
import { Profile } from "./pages/Profile";
import { Admin } from "./pages/Admin";

const theme = extendTheme({
	fonts: {
		heading: "Merriweather",
		body: "Inter",
	},
});

function App() {
	const [isLoggedIn, setLoggedIn] = useState(true);

	useEffect(() => {
		const loggedIn = checkLoggedIn();
		setLoggedIn(loggedIn);
	}, []);

	return (
		<ChakraProvider theme={theme}>
			{isLoggedIn ? (
				<BrowserRouter>
					<Navbar loggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
					<Routes>
						<Route
							path="/home"
							element={<Home setLoggedIn={setLoggedIn} />}
						/>
						<Route
							path="/set-categories"
							element={<SetCategories />}
						/>
						<Route path="/add-book" element={<AddBook />} />
						<Route path="/search" element={<Search />} />
						<Route path="/history" element={<History />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/admin" element={<Admin />} />
						<Route
							path="/*"
							element={<Navigate to="/home" replace />}
						/>
					</Routes>
				</BrowserRouter>
			) : (
				<BrowserRouter>
					<Navbar loggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
					<Routes>
						<Route
							path="/login"
							element={<Login setLoggedIn={setLoggedIn} />}
						/>
						<Route path="/register" element={<Register />} />
						<Route
							path="/set-categories"
							element={<SetCategories />}
						/>
						<Route
							path="*"
							element={<Navigate to="/login" replace />}
						/>
					</Routes>
				</BrowserRouter>
			)}
		</ChakraProvider>
	);
}

export default App;
