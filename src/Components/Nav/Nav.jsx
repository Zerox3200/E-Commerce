import React from 'react';
import { Link, useLocation } from 'react-router-dom'
import Logo from './../../Assets/Images/freshcart-logo.svg'
import { FaShoppingCart } from "react-icons/fa";
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { reactLocalStorage } from 'reactjs-localstorage';
import { Carts } from '../../Context/CartContext';
import './Nav.scss'

export default function Nav() {
    const { UserToken, setUserToken } = useContext(UserContext);
    const { CartNumber } = useContext(Carts);
    const { pathname } = useLocation();

    const LogOutHandler = async () => {
        reactLocalStorage.clear();
        setUserToken(null)
    }

    return (
        <nav className={pathname === '/' ? "navbar navbar-expand-lg bg-light p-3 Fixed" : "navbar navbar-expand-lg bg-light p-3"}>
            <div className="container-fluid">
                <Link className="navbar-brand" ><img src={Logo} alt='Logo' /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className={pathname === '/' ? "nav-link active" : "nav-link"} aria-current="page" to=''>Products</Link>
                        <Link className={pathname === '/Cart' ? "nav-link active" : "nav-link"} to='Cart'>Cart</Link>
                        <Link className={pathname === '/Brands' ? "nav-link active" : "nav-link"} to='Brands'>Brands</Link>
                        <Link className={pathname === '/WishList' ? "nav-link active" : "nav-link"} to='WishList'>WishList</Link>
                        <Link className={pathname === '/allorders' ? "nav-link active" : "nav-link"} to='allorders'>Orders</Link>
                    </div>
                    <div className="navbar-nav">
                        <Link className="nav-link active mx-2" aria-current="page" to='Cart'><FaShoppingCart /></Link>
                        {UserToken ?
                            CartNumber === 0 ? null : <span className='CartNumber'>{CartNumber}</span>
                            :
                            null}
                        {UserToken != null ? <Link className="nav-link" to='Login' onClick={() => LogOutHandler()}>Logout</Link>
                            : <>
                                <Link className="nav-link" to='Login' >Login</Link>
                                <Link className="nav-link" to='SignUp'>Register</Link>
                            </>
                        }

                    </div>
                </div>

            </div>
        </nav>
    )
}
