import { FunctionComponent, useState } from "react";
import AddBook from "./AddBook";
import BooksTable from "./BooksTable";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [isChanged, setIsChanged] = useState<boolean>(false);
  return (
    <>
      <div className="bg-dark text-white p-5">
        <div className="container text-center">
          <h1>Book Collection</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-5 ">
          <AddBook setIsChanged={setIsChanged} />
        </div>
        <div className="col-6">
          <BooksTable changed={isChanged} />
        </div>
      </div>
    </>
  );
};

export default Home;
