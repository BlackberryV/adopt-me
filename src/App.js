import ReactDOM from "react-dom"
import React from "react"
import SearchParams from "./SearchParams"
import { StrictMode, useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Details from "./Details"
import { Link } from "react-router-dom"
import ContextTheme from "./ContextTheme"

const App = () => {
	const theme = useState("darkblue")

	return (
		<ContextTheme.Provider value={theme}>
			<div>
				<Router>
					<header>
						<Link to={"/"}>
							<h1>Adopt Me!</h1>
						</Link>
					</header>
					<Switch>
						<Route path={"/details/:id"}>
							<Details theme={theme} />
						</Route>
						<Route path={"/"}>
							<SearchParams />
						</Route>
					</Switch>
				</Router>
			</div>
		</ContextTheme.Provider>
	)
}

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById("root")
)
