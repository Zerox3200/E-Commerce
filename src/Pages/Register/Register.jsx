import React from 'react';
import { useFormik } from 'formik';
import './Register.scss';
import * as Yup from 'yup';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';

export default function Register() {
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState(null);
    const navigate = useNavigate();

    const Validation = Yup.object({
        name: Yup.string().min(5, 'Min Length 5').max(15, 'Max Length 15').required('Name is required'),
        email: Yup.string().email('Email Ex(FreshCart123@mail.com').required("Email is requiered"),
        password: Yup.string().min(9).required("Password is requierd"),
        rePassword: Yup.string().oneOf([Yup.ref("password")], 'Password should be matched').required('rePassword is required'),
        phone: Yup.string().matches(/^01[0125][0-9]{8}/, "Add Egyption number please").required("Phone is required")
    })

    const HandleSubmit = async (values) => {
        setLoading(true);
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch((error) => {
            setLoading(false);
            setError(error.response.data.message);
        });
        if (data.message === 'success') {
            setLoading(false);
            setError(false);
            reactLocalStorage.set("Token", data.token)
            navigate('/Login');
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        }, validationSchema: Validation,
        onSubmit: HandleSubmit
    });
    return (
        <form className='Register container' onSubmit={formik.handleSubmit}>
            {Error ? <span className='alert alert-danger'>{Error}</span> : null}
            <h1 className='h2'>Register Now:</h1>
            <label htmlFor="name" className='form-label'>Name:</label>
            <input type="text" className='form-control' id='name' name='name'
                onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.name && formik.touched.name ? <span className='alert alert-danger'>{formik.errors.name}</span> : null}

            <label htmlFor="Email" className='form-label'>Email:</label>
            <input type="text" className='form-control' id='Email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.email && formik.touched.email ? <span className='alert alert-danger'>{formik.errors.email}</span> : null}

            <label htmlFor="Password" className='form-label'>Password:</label>
            <input type="password" className='form-control' id='Password' name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.password && formik.touched.password ? <span className='alert alert-danger'>{formik.errors.password}</span> : null}

            <label htmlFor="rePassword" className='form-label'>rePassword:</label>
            <input type="password" className='form-control' id='rePassword' name='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.rePassword && formik.touched.rePassword ? <span className='alert alert-danger'>{formik.errors.rePassword}</span> : null}

            <label htmlFor="Phone" className='form-label'>Phone:</label>
            <input type="text" className='form-control' id='Phone' name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.errors.phone && formik.touched.phone ? <span className='alert alert-danger'>{formik.errors.phone}</span> : null}
            {Loading ? <button type='button' className='btn'>
                <FaSpinner icon="spinner" className="spinner" />
            </button> : <button
                disabled={!(formik.dirty && formik.isValid)}
                type='submit'
                className='btn'>
                Register
            </button>}
        </form>
    )
}
