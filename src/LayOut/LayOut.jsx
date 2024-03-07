import React from 'react'
import { Outlet } from 'react-router-dom'
import Nav from '../Components/Nav/Nav'
import { Toaster } from 'react-hot-toast'
import Footer from '../Components/Footer/Footer'

export default function LaYOut() {
    return (
        <>
            <Nav />
            <Toaster />
            <Outlet></Outlet>
            <Footer />
        </>
    )
}
