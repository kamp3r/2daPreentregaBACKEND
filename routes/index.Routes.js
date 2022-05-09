import CartRoute from "./cart.Routes.js";
import errorRoutes from "./error.Routes.js";
import ProductRoute from "./products.Routes.js";

const routerApi = (app)=>{
    app.use('/api/cart', CartRoute);
    app.use('/api/products', ProductRoute);
    app.use('*', errorRoutes)
}

export default routerApi