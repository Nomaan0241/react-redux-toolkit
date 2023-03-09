import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { store } from "./store.js";
import { Provider } from "react-redux";

const container = document.getElementById("root");
const root = createRoot(container);

//You need to wrap entire APP componant inside Provider
// so that whole app can access the store.
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
