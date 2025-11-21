import { useEffect,useState } from "react";
import API from "./api/axios";
import UrlShortner from "./components/UrlShortner";

function App() {
  const [msg,setMsg] = useState("");

  useEffect(()=>{
    API.get("/test").then((res)=>{
      setMsg(res.data.message);
    });
  },[]);

  return (
    <UrlShortner/>
  );
}

export default App;
