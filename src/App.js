import Navbar from "./componants/Navbar";
import CartContainer from "./componants/CartContainer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { calculateTotal } from "./features/cart/cartSlice";
import { getCartItems } from "./features/cart/cartSlice";
import Model from "./componants/Model";
function App() {
	const { cartItems, isLoading } = useSelector((store) => store.cart);
	const { isOpen } = useSelector((store) => store.modal);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(calculateTotal());
	}, [cartItems]);

	useEffect(() => {
		dispatch(getCartItems());
	}, []);

	return (
		<main>
			{isOpen && <Model />}
			<Navbar />
			{isLoading && (
				<div className="loading">
					<h1>Loading...</h1>
				</div>
			)}
			{!isLoading && <CartContainer />}
		</main>
	);
}
export default App;
