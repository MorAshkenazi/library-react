import { useFormik } from "formik";
import { FunctionComponent } from "react";
import * as yup from "yup";
import { Book } from "../interfaces/Book";
import { addBook } from "../services/booksService";

interface AddBookProps {
  setIsChanged: Function;
}

const AddBook: FunctionComponent<AddBookProps> = ({ setIsChanged }) => {
  const formik = useFormik({
    initialValues: { name: "", author: "", genre: "Action", price: 0 },
    validationSchema: yup.object({
      name: yup.string().min(2).required(),
      author: yup.string().required().min(2),
      genre: yup.string().required(),
      price: yup.number().required().min(0),
    }),
    onSubmit: (values: Book, { resetForm }) => {
      addBook(values)
        .then((result) => {
          alert("Book was added!");
          setIsChanged(true);
          resetForm();
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <form className="container my-5 w-50" onSubmit={formik.handleSubmit}>
      <h4 className="display-5 fs-3">Add new book record</h4>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingNameInput"
          placeholder="."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          name="name"
        />
        <label htmlFor="floatingNameInput">Name</label>
        {formik.errors.name && formik.touched.name ? (
          <p className="text-danger">{formik.errors.name}</p>
        ) : null}
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.author}
          name="author"
        />
        <label htmlFor="floatingInput">Author</label>
        {formik.errors.author && formik.touched.author ? (
          <p className="text-danger">{formik.errors.author}</p>
        ) : null}
      </div>
      <div className="mb-3">
        <select
          className="w-100 py-3 form-select"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="Action">Action</option>
          <option value="Biography">Biography</option>
          <option value="Novel">Novel</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Non-Fiction">Non Fiction</option>
        </select>
      </div>

      <div className="form-floating">
        <input
          type="number"
          className="form-control"
          id="floatingPassword"
          placeholder="."
          onChange={formik.handleChange}
          value={formik.values.price}
          onBlur={formik.handleBlur}
          name="price"
        />
        <label htmlFor="floatingPassword">Price</label>
        {formik.errors.price && formik.touched.price ? (
          <p className="text-danger">{formik.errors.price}</p>
        ) : null}
      </div>
      <button type="submit" className="btn btn-primary w-100 mt-3 py-3">
        Add book
      </button>
    </form>
  );
};

export default AddBook;
