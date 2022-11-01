import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Jumbotron from "../../components/cards/jumbotron";
import { useAuth } from "../../context/auth";

export default function Register() {
  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //hooks
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/register`,
        {
          name,
          email,
          password,
        }
      );

      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Đăng ký thành công");
      }
    } catch (error) {
      toast.error("Đăng ký thất bại, hãy thử lại");
    }
  };

  return (
    <div>
      <Jumbotron title="Đăng ký tài khoản"></Jumbotron>

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
                type="text"
                className="form-control mb-4 p-2 "
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="password"
                className="form-control mb-4 p-2 "
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
