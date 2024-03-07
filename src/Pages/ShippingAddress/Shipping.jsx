import React from 'react';
import { useFormik } from 'formik';
import './Shipping.scss';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { WishListContext } from '../../Context/WishListContext';
import { FaSpinner } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

export default function Shipping() {
    let { CartId } = useParams();
    const [Loading, setLoading] = useState(false);
    let { CheckOut } = useContext(WishListContext);

    const Validation = Yup.object({
        details: Yup.string().min(5, 'Min Length 5').max(15, 'Max Length 15').required('Details is required'),
        phone: Yup.string().matches(/^01[0125][0-9]{8}/, "Add Egyption number please").required("Phone is required"),
        city: Yup.string().min(3, 'Min Length 3').max(15, 'Max Length 15').required('City is required'),
    })

    const MakeOrder = async (values) => {
        setLoading(true)
        let { data } = await CheckOut(CartId, values);
        setLoading(false);
        window.location.href = data.session.url;
    }

    const Formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        }, validationSchema: Validation,
        onSubmit: MakeOrder
    });

    return (
        <div className='Shipping container mt-4 d-flex flex-column align-items-start'>
            <form onSubmit={Formik.handleSubmit} className='w-100'>
                <label htmlFor="details">Details:</label>
                <input type="text" name="details" id="details" className='form-control mb-4' onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur} />
                {Formik.errors.details && Formik.touched.details ?
                    <span className='alert alert-danger'>{Formik.errors.details}</span> : null}

                <label htmlFor="phone">Phone:</label>
                <input type="tel" name="phone" id="phone" className='form-control mb-4' onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur} />
                {Formik.errors.phone && Formik.touched.phone ?
                    <span className='alert alert-danger'>{Formik.errors.phone}</span> : null}

                <label htmlFor="city">City:</label>
                <input type="text" name="city" id="city" className='form-control mb-4' onChange={Formik.handleChange}
                    onBlur={Formik.handleBlur} />
                {Formik.errors.city && Formik.touched.city ?
                    <span className='alert alert-danger'>{Formik.errors.city}</span> : null}

                {Loading ? <button type='button' className='btn'>
                    <FaSpinner icon="spinner" className="spinner" />
                </button> : <button
                    disabled={!(Formik.dirty && Formik.isValid)}
                    type='submit'
                    className='btn'>
                    Make Order
                </button>}
            </form>
        </div>
    )
}
