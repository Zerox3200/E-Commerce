import axios from "axios";
import { createContext, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";


export const WishListContext = createContext();

export default function WishListProvider({ children }) {
    const [WishList, setWishList] = useState([]);

    const AddToWishList = async (productId) => {
        return await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
            productId
        }, {
            headers: {
                token: reactLocalStorage.get("Token")
            }
        }).catch((err) => console.log(err))
    }

    const RemoveWishProduct = async (id) => {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers: {
                token: reactLocalStorage.get("Token")
            }
        }).catch((err) => console.log(err))
    }

    const GetAllWishList = async () => {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: {
                token: reactLocalStorage.get("Token")
            }
        }).then((res) => {
            setWishList(res.data.data);
        }).catch((err) => console.log(err))
    }

    const CheckOut = async (id, shippingAddress) => {
        return await
            axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, {
                shippingAddress
            }, {
                headers: {
                    token: reactLocalStorage.get("Token")
                }
            })
    }

    return <WishListContext.Provider value={{ AddToWishList, WishList, GetAllWishList, RemoveWishProduct, CheckOut }}>
        {children}
    </WishListContext.Provider>
}