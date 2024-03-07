import React, { Suspense, lazy, useContext, useEffect } from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import LaYOut from './LayOut/LayOut';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Protector from './Components/Protector/Protector';
import { UserContext } from './Context/UserContext';
import { reactLocalStorage } from 'reactjs-localstorage';
import BrandsLayOut from './Pages/Brands/BrandsLayOut';
import WishListProvider from './Context/WishListContext';
import Loading from './Components/Loading/Loading';
import axios from 'axios';
import { Carts } from './Context/CartContext';


const Details = lazy(() => import('./Pages/Details/Details'));
const Cart = lazy(() => import('./Pages/Cart/Cart'));
const WishList = lazy(() => import('./Pages/Wishlist/WishList'));
const Shipping = lazy(() => import('./Pages/ShippingAddress/Shipping'));
const Orders = lazy(() => import('./Pages/Orders/Orders'));
const Brands = lazy(() => import('./Pages/Brands/Brands'));

function App() {
  const routers = createHashRouter([
    {
      path: '', element: <LaYOut />, children: [
        { index: true, element: <Home /> },
        { path: "SignUp", element: <Register /> },
        { path: "Login", element: <Login /> },
        { path: '/:id', element: <Suspense fallback={<Loading />}><Protector><Details /></Protector></Suspense> },
        { path: "Cart", element: <Suspense fallback={<Loading />}><Protector><Cart /></Protector></Suspense> },
        { path: "WishList", element: <Suspense fallback={<Loading />}><Protector><WishList /></Protector></Suspense> },
        { path: "Shipping/:CartId", element: <Suspense fallback={<Loading />}><Protector><Shipping /></Protector></Suspense> },
        { path: "allorders", element: <Suspense fallback={<Loading />}> <Protector><Orders /></Protector></Suspense> },
        {
          path: 'Brands', element: <BrandsLayOut />, children: [
            { index: true, element: <Suspense fallback={<Loading />}><Brands /></Suspense> }]
        },
      ]
    }
  ])


  let { setUserToken, UserToken } = useContext(UserContext);
  let { setCartNumber } = useContext(Carts)


  useEffect(() => {
    if (reactLocalStorage.get("Token")) {
      setUserToken(reactLocalStorage.get('Token'));
    }
  }, [setUserToken]);



  useEffect(() => {
    axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: UserToken
      }
    })
      .then((res) => setCartNumber(res.data.numOfCartItems))
      .catch(() => setCartNumber(0));
  }, [UserToken, setCartNumber]);
  return (
    <WishListProvider>
      <RouterProvider router={routers}>
      </RouterProvider>
    </WishListProvider>
  );
}

export default App;
