import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingGIF from "../../images/loading.gif";

export default function Loading() {
  //state
  const [count, setCount] = useState(300);

  //hooks
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //redirect khi count = 0
    count === 0 && navigate("/login");
    //Cleanup
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <img src={LoadingGIF} alt="Loading" />
    </div>
  );
}
