import React from 'react';
import { useFormik } from 'formik';
import './Login.scss';
import * as Yup from 'yup';
import axios from 'axios';
import { useContext, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import { UserContext } from '../../Context/UserContext';

export default function Login() {
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState(null);
    const navigate = useNavigate();
    const { setUserToken } = useContext(UserContext);

    const Login = async (values) => {
        setLoading(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch((err) => {
            setLoading(false);
            setError(err.response.data.message);
            console.log(err);
        });
        console.log(data);
        if (data.message === 'success') {
            setLoading(false);
            setError(false);
            reactLocalStorage.set('Token', data.token);
            setUserToken(data.token)
            navigate('/');
        }
    }

    const Validation = Yup.object({
        email: Yup.string().email('Email Ex(FreshCart123@mail.com').required("Email is requiered"),
        password: Yup.string().min(9).required("Password is requierd")
    })
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        }, validationSchema: Validation,
        onSubmit: Login
    });
    return (
        <form className='Login container' onSubmit={formik.handleSubmit}>
            {Error ? <span className='alert alert-danger'>{Error}</span> : null}

            <h1 className='h2'>Sign In:</h1>
            <label htmlFor="Email" className='form-label'>Email:</label>
            <input type="text" className='form-control' id='Email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.email && formik.touched.email ?
                <span className='alert alert-danger'>{formik.errors.email}</span> : null}

            <label htmlFor="Password" className='form-label'>Password:</label>
            <input type="password" className='form-control' id='Password' name='password' onChange={formik.handleChange}
                onBlur={formik.handleBlur} />
            {formik.errors.password && formik.touched.password ?
                <span className='alert alert-danger'>{formik.errors.password}</span> : null}

            {Loading ? <button type='button' className='btn'>
                <FaSpinner icon="spinner" className="spinner" />
            </button> : <button
                disabled={!(formik.dirty && formik.isValid)}
                type='submit'
                className='btn'>
                Login
            </button>}
        </form>
    )
}
