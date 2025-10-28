import Product from "./Product";
import { useSelector, useDispatch } from "react-redux";
import { clear } from "../store/cartSlice";

function ProductsList({ products }) {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  return (
    <div className="card-container">
      <div className="card-container__header">
        <p className="card-container__title">Product List: </p>
        <div>
          <span className="card-container__price">
            Total Price: ${totalPrice}
          </span>
          <button
            onClick={() => dispatch(clear())}
            className="btn card-container__btn"
          >
            Clear
          </button>
        </div>
      </div>
      {products.map((product) => {
        return <Product key={product.id} product={product} />;
      })}
    </div>
  );
}

export default ProductsList;