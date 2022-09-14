import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { User } from "../interfaces/User";
import { findUser } from "../services/usersServices";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().min(8).required(),
    }),
    onSubmit: (values: User) => {
      findUser(values)
        .then((result) => {
          if (!result.data[0] || result.data[0].password != values.password)
            alert("Wrong login info");
          else navigate("/home");
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <form className="container my-5 w-25" onSubmit={formik.handleSubmit}>
      <h1 className="display-1">Login</h1>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          name="email"
        />
        <label htmlFor="floatingInput">Email address</label>
        {formik.errors.email && formik.touched.email ? (
          <p className="text-danger">{formik.errors.email}</p>
        ) : null}
      </div>
      <div className="form-floating">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="."
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          name="password"
        />
        <label htmlFor="floatingPassword">Password</label>
        {formik.errors.password && formik.touched.password ? (
          <p className="text-danger">{formik.errors.password}</p>
        ) : null}
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-3 py-3">
        Submit Login
      </button>
      <Link to={"/register"} className="btn btn-secondary w-100 my-1 py-3">
        New Here? Register
      </Link>
    </form>
  );
};

export default Login;
