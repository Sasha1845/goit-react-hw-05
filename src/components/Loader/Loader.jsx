import { ClipLoader } from "react-spinners";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <ClipLoader color="#01b4e4" size={50} />
    </div>
  );
};

export default Loader;
