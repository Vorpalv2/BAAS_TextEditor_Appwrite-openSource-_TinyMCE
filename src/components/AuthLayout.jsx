/*eslint-disable */
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);

  const authStatus = useSelector((state) => state.auth.status);
  console.log(authStatus);

  useEffect(() => {
    if (authStatus && authentication !== authStatus) {
      navigate("/");
    } else if (!authStatus && authentication !== authStatus) {
      navigate("/login");
    }
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h2>Loading....</h2> : <>{children}</>;
};

export default Protected;
