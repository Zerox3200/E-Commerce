import React from 'react';
import { Navigate } from 'react-router-dom'
import { reactLocalStorage } from 'reactjs-localstorage'

export default function Protector(props) {
    if (reactLocalStorage.get('Token')) {
        return props.children
    } else {
        return <Navigate to={"/Login"} />
    }
}
