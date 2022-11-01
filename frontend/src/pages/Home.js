import { useAuth } from "../context/auth";
import Jumbotron from "../components/cards/jumbotron";

export default function Home() {
  const [auth, setAuth] = useAuth();
  console.log(auth);
  console.log(setAuth);
  return (
    <div>
      <Jumbotron title="Hello world"></Jumbotron>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </div>
  );
}
