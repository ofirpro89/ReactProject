import {  Routes, Route } from "react-router-dom";
import Header from "./headers/Headers";
import HomePage from "./pages/HomePage";
import Log from "./pages/Login";
import ProfilePage from "./pages/Profile";
import RegisterPage from "./pages/Register";
import Favorits from "./cards/favorits";
import UserCards from "./pages/userCards";
import CrateuserCard from "./pages/crateuserCard";
import About from "./pages/abouts";
import Erorr from "./pages/Erorr";
import AdminEria from "./pages/AdminEria";
import AllusersArea from "./pages/AllusersArea";



const App = () => {

return (
   <>
        <Header />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Login" element={<Log />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/Register" element={<RegisterPage />} />
            <Route path="/favourites"element={<Favorits />} />
            <Route path="/userCards"element={<UserCards />} />
            <Route path="/crateuserCard"element={<CrateuserCard />} />
            <Route path="/about"element={<About />} />
            <Route path="*" element={<Erorr />} /> 
            <Route path="/admin" element={<AdminEria />} />
            <Route path="/allusers" element={<AllusersArea />} />


           
        </Routes>
 
  </>

)
}
export default App;