import "./ErrorPage.css";
import error from "../assets/images/error.jpg";

export default function ErrorPage() {
  return (
    <div className="ErrorPage">
      <img className="ErrorImage" src={error} />
    </div>
  );
}
