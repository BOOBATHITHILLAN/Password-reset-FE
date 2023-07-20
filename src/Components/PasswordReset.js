import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import '../Styles/PasswordReset.css'
import { useFormik } from 'formik'


function PasswordReset({url }) {

    
    const [emailavailable, setEmailavailable] = useState(false);
    const [mail,setMail]=useState(false)


    const HandleEmailSend = async (email) => {
        try {
            const DB = await axios.get(`${url}/users`);
            const data = DB.data;
            const Email = email.trim();
            const Data = data.find(user => user.email === email);
            if (Data) {
                axios.put(`${url}/forgotpassword`, { email: Email })
                setEmailavailable(false)
                setMail(true)
                
            } else {
                setEmailavailable(true)
                setMail(false)
            }
        }
        catch (err) { console.error(err) }

    }
    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = "*Required"
        }
        return errors
    }

    const Formik = useFormik({
        initialValues: {
            email: ""
        },
        validate,
        onSubmit: values => {
            HandleEmailSend(Formik.values.email)
            Formik.values.email = "";
        }
    })


    return (
        <div className='d-flex justify-content-center align-items-center  passwordreset vh-100 '>
            <div className="card" style={{ width: "80vw" }}>
                <div className="card-header h5 text-white bg-primary">Password Reset</div>
                <div className="card-body px-5">
                    <form onSubmit={Formik.handleSubmit}>
                        <p className="card-text py-2">
                            Enter your email address and we'll send you an email with instructions to reset your password.
                        </p>
                        <div className="form-outline">
                            <input type="email" id="email" className="form-control my-3"
                                placeholder='Enter registered email address'
                                value={Formik.values.email}
                                onChange={Formik.handleChange}
                                onBlur={Formik.handleBlur}
                            />
                            {Formik.touched.email && Formik.errors.email ? <span className='fw-bold' style={{ color: "red" }}>{Formik.errors.email}</span> : null}
                        </div>
                        <div className="form-outline text-center mb-1">
                        <span className="text-danger">{emailavailable ? "User not found,Wrong mail id" :null }</span> <br />
                        <span className="text-primary">{mail ? "Password reset link send to your mail id, Successfully" : null}</span>
                      </div>
                        <div className='text-center'>
                            <button type="submit" className="btn btn-outline-primary w-40" >Reset Password</button>
                        </div>
                        <div className="d-flex justify-content-center mt-4">
                            <Link to="/">
                                <button
                                    className="btn btn-outline-danger mb-3 me-5"
                                >
                                    Log in
                                </button>
                            </Link>
                            <Link to="/Signup">
                                <button
                                    type="button"
                                    className="btn btn-outline-danger mb-3 me-5"
                                >
                                    Register
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PasswordReset