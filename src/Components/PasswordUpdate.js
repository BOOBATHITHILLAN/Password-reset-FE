import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';
import '../Styles/PasswordReset.css'
import { useFormik } from 'formik'

function PasswordUpdate({ url }) {

  const { id } = useParams();
  const [update, setUpdate] = useState(false)


  const HandlePasswordReset = async (password) => {

    const DB = await axios.get(`${url}/users`)
    const data = DB.data
    const Data = data.find(user => user.resettoken === id);
    if (Data) {
      axios
        .put(`${url}/passwordreset/${id}`, { ...Data, "password": password })
        .then(() => {
          setUpdate(true)
        })
        .catch((err) => console.error(err));

    } else {
      setUpdate(false)
    }
  }

  const validate = values => {
    const errors = {};
    if (!values.password) {
      errors.password = "*Required"
    }
    if (!values.repassword) {
      errors.repassword = "*Required"
    }
    if (!(values.repassword === values.password)) {
      errors.repassword = "*Password Mismatch"
    }
    return errors
  }
  const Formik = useFormik({
    initialValues: {
      password: "",
      repassword: ""
    },
    validate,
    onSubmit: values => {
      HandlePasswordReset(Formik.values.password)
      Formik.values.password = ""
      Formik.values.repassword = ""
    }
  })

  return (
    <div className='d-flex justify-content-center align-items-center  passwordreset vh-100 '>
      <div className="card" style={{ width: "80vw" }}>
        <div className="card-header h5 text-white bg-primary">Password Reset</div>
        <div className="card-body px-5">
          <form onSubmit={Formik.handleSubmit}>
            <p className="card-text py-2">
              Set new password
            </p>
            <div className="form-outline mt-1">
              <input type="password" className="form-control my-3"
                id="password"
                placeholder='Reset password'
                value={Formik.values.password}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.password && Formik.errors.password ? <span className='fw-bold' style={{ color: "red" }}>{Formik.errors.password}</span> : null}
            </div>
            <div className="form-outline mt-1">
              <input type="password"
                className="form-control my-3"
                id="repassword"
                placeholder='confirm password'
                value={Formik.values.repassword}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
              />
              {Formik.touched.repassword && Formik.errors.repassword ? <span className='fw-bold' style={{ color: "red" }}>{Formik.errors.repassword}</span> : null}
            </div>
            <div className="form-outline text-center mb-1">
              <span className="text-primary">{update ? "Password Updated Successfully, Login to check password" : null}</span>
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

export default PasswordUpdate