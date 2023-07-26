import React, { useState } from "react";
import axios from "axios";
import "../Styles/Signup.css";
import { Link } from "react-router-dom";
import { useFormik } from 'formik'

function Signup({ url }) {

  const [registered, setRegistered] = useState(false);
  const [success, setSuccess] = useState(false);

  const HandleSignup = async (name, email, password) => {
    try {
      axios.post(`${url}/createuser`, { name, email, password })
      setRegistered(false);
      setSuccess(true)
    }
    catch (err) {
      console.log(err)
      setRegistered(true);
      setSuccess(false)
    }

  }

  const validate = values => {
    const errors = {};
    if (!values.name) {
      errors.name = "*Required"
    }
    if (!values.email) {
      errors.email = "*Required"
    }
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
      name: "",
      email: "",
      password: "",
      repassword: ""
    },
    validate,
    onSubmit: values => {
      HandleSignup(Formik.values.name, Formik.values.email, Formik.values.password)
      Formik.values.name = "";
      Formik.values.email = "";
      Formik.values.password = "";
      Formik.values.repassword = "";
    }
  })

  return (
    <div className="vh-100 signup">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body ">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>
                    <form onSubmit={Formik.handleSubmit} className="mx-1 mx-md-4" >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Enter your name"
                            value={Formik.values.name}
                            onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                          />
                          {Formik.touched.name && Formik.errors.name ? <span className='fw-bold' style={{ color: "red" }}>{Formik.errors.name}</span> : null}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={Formik.values.email}
                            onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                          />
                          {Formik.touched.email && Formik.errors.email ? <span className='fw-bold' style={{ color: "red" }}>{Formik.errors.email}</span> : null}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="New Password"
                            value={Formik.values.password}
                            onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                          />
                          {Formik.touched.password && Formik.errors.password ? <span className='fw-bold' style={{ color: "red" }}>{Formik.errors.password}</span> : null}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="repassword"
                            className="form-control"
                            placeholder="Repeat password"
                            value={Formik.values.repassword}
                            onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                          />
                          {Formik.touched.repassword && Formik.errors.repassword ? <span className='fw-bold' style={{ color: "red" }}>{Formik.errors.repassword}</span> : null}
                        </div>
                      </div>
                      <div className="form-outline text-center mb-1">
                        <span className="text-danger fw-bold">{registered ? "User exist,Try with new mail id" : null}</span> <br />
                        <span className="text-primary fw-bold">{success ? "Registration success, Click Login Page" : null}</span>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-1 row">
                        <div className="col-lg-5 col-md-12  m-1 ">
                          <button
                            type="submit"
                            className="btn btn-outline-danger me-4"
                          >
                            Register
                          </button>
                        </div>
                        <div className="col-lg-6 col-md-12 m-1">
                          <Link to="/">
                            <button
                              className="btn btn-outline-danger"
                            >
                              Login page
                            </button>
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="SampleImage"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
