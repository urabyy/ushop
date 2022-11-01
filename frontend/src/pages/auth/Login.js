import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Jumbotron from "../../components/cards/jumbotron";
import { useAuth } from "../../context/auth";

export default function Login() {
  //state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //hook
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/login`, {
        email,
        password,
      });

      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Đăng nhập thành công");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại, hãy thử lại");
    }
  };

  return (
    <div>
      <Jumbotron title="Đăng nhập"></Jumbotron>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="form-control mb-4 p-2 "
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-4 p-2 "
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
