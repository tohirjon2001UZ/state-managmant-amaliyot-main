import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, deleteItem, increase, decrease } from "../store/cartSlice";

function Product({ product }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const itemInCart = cart.find((item) => item.id == product.id);
  return (
    <div className="card">
      <img className="card__image" src={product.image} alt="" width={50} />
      <div className="card__info">
        <h5 className="card__title">{product.title}</h5>
        <small className="card__price">Price: ${product.price}</small>
      </div>
      {!itemInCart && (
        <button
          onClick={() => dispatch(addToCart({ ...product, amount: 1 }))}
          className="btn card__btn"
        >
          <FaShoppingCart className="icon" /> Add
        </button>
      )}
      {itemInCart && (
        <div className="card-action-btns">
          <button
            onClick={() => {
              if (itemInCart.amount == 1) {
                dispatch(deleteItem(product.id));
              } else {
                dispatch(decrease(product.id));
              }
            }}
            className="btn card__btn__amount"
          >
            &#8722;
          </button>
          <span className="amount">{itemInCart.amount}</span>
          <button
            onClick={() => dispatch(increase(product.id))}
            className="btn card__btn__amount"
          >
            &#43;
          </button>
        </div>
      )}
    </div>
  );
}

export default Product;