import axios from "axios";
import { createContext, useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";


export let Carts = createContext();

export function CartContextProvider(props) {
    const [Message, setMessage] = useState();
    const [Status, setStatus] = useState(true);
    const [CartNumber, setCartNumber] = useState();

    const AddToCart = async (productId) => {
        await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId },
            {
                headers: {
                    token: reactLocalStorage.get("Token")
                }
            }
        ).then((res) => {
            setMessage(res.data.message);
            setStatus(true);
            setCartNumber(res.data.numOfCartItems)
        }
        ).catch((err) => {
            setMessage(err.data.Message);
            setStatus(false);
        })
    }

    const UpdateQuantatiy = async (id, count) => {
        await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            count
        }, {
            headers: {
                token: reactLocalStorage.get("Token")
            }
        }).catch((err) => console.log(err))
    }

    const DeletCart = async (id) => {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            {
                headers: {
                    token: reactLocalStorage.get("Token")

                }
            }).catch((err) => console.log(err))
    }

    const ClearCarts = async () => {
        await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers: {
                    token: reactLocalStorage.get("Token")

                }
            }).catch((err) => console.log(err))
    }


    return <Carts.Provider value={{
        AddToCart, UpdateQuantatiy, Message, Status,
        DeletCart, ClearCarts, setCartNumber, CartNumber
    }}>
        {props.children}
    </Carts.Provider>
}