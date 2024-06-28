import { configureStore } from "@reduxjs/toolkit";
import user from "./slices/User";
import product from "./slices/Product";
import cart from "./slices/Cart";
import categorie from "./slices/Categorie";
import orders from "./slices/Orders";
export default configureStore({
    reducer: {
        user,
        product,
        cart,
        categorie,
        orders,
    }
})