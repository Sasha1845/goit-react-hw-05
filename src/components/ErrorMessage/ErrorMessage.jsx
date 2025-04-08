import "./ErrorMessage.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-message">
      <p>{message || "Something went wrong. Please try again."}</p>
    </div>
  );
};

export default ErrorMessage;
