import React from "react";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";
import { openModal, closeModal } from "../features/model/modelSlice";

function CartContainer() {
	const dispatch = useDispatch();
	const { cartItems, total, amount } = useSelector((store) => store.cart);
	const { isOpen } = useSelector((store) => store.modal);
	if (amount < 1) {
		return (
			<section className="cart">
				<header>
					<h2>Your bag</h2>
					<h4 className="empty-cart">is currently empty</h4>
				</header>
			</section>
		);
	}

	return (
		<section className="cart">
			<header>
				<h2>Your bag</h2>
			</header>
			<div>
				{cartItems.map((item) => {
					return <CartItem key={item.id} {...item} />;
				})}
			</div>
			<footer>
				<div className="cart-total">
					<hr></hr>
					<h4>
						Total <span>${total.toFixed(2)}</span>
					</h4>
				</div>
				<button className="btn clear-btn" onClick={() => dispatch(openModal())}>
					Clear Cart
				</button>
			</footer>
		</section>
	);
}

export default CartContainer;
