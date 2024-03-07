import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import './Loading.scss';

export default function Loading() {
    return <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="Loading_Spinner"
    />
}
