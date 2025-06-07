import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../store/userSlice';
import { TRootState } from '../store/store';
import "../styles/login.css"
import { TextInput } from 'flowbite-react';
import { IoIosSearch } from "react-icons/io";
import  {searchActions} from "../store/searchSlice"

const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: TRootState) => state.user.user);
 
  return (
    <Navbar expand="lg" variant="dark" fixed="top" className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-md py-2">
      <Container className="flex flex-col items-center justify-center">
        <Navbar.Brand
          as={Link}
          to="/"
          className="text-3xl font-extrabold text-white tracking-wide font-mono mb-2 hover:text-sky-400 transition-colors duration-300"
        >
          This Is My Web
        </Navbar.Brand>

    <Navbar.Brand>

    <TextInput 
  rightIcon={IoIosSearch}
  onChange={(e) => dispatch(searchActions.setSearchWord(e.target.value.toLocaleLowerCase()))}
/>

    </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-center">
          <Nav className="flex flex-row space-x-10 mt-2">
        
        <Nav.Link
        as={Link}
        to="/about"
        className="text-white text-lg font-light tracking-widest hover:text-sky-400 transition-all duration-200"
        >
        About
        </Nav.Link>


            <Nav.Link
              as={Link}
              to="/"
              className="text-white text-lg font-light tracking-widest hover:text-sky-400 transition-all duration-200"
            >
              Home
            </Nav.Link>

            {user && (
              <Nav.Link
                as={Link}
                to="/profile"
                className="text-white text-lg font-light tracking-widest hover:text-sky-400 transition-all duration-200"
              >
                Profile
              </Nav.Link>
            )}

   
 

            {user && (
              <Nav.Link
                as={Link}
                to="/favourites"
                className="text-white text-lg font-light tracking-widest hover:text-sky-400 transition-all duration-200"
              >
                fevorit
              </Nav.Link>
            )}    

            {!user && (
              <Nav.Link
                as={Link}
                to="/login"
                className="text-white text-lg font-light tracking-widest hover:text-sky-400 transition-all duration-200"
              >
                LogIn
              </Nav.Link>
            )}

            {user && (
              <Nav.Link
                as={Link}
                to="/"
                className="text-white text-lg font-light tracking-widest hover:text-sky-400 transition-all duration-200"
                onClick={() => dispatch(userActions.logout(),
                localStorage.removeItem("token")
                )}
              >
                LogOut
              </Nav.Link>
            )}

            {!user && (
              <Nav.Link
                as={Link}
                to="/register"
                className="text-white text-lg font-light tracking-widest hover:text-sky-400 transition-all duration-200"
              >
                Register
              </Nav.Link>
            )}


            {user && (
              <Nav.Link
                as={Link}
                to="/userCards"
                className="text-white text-lg font-light tracking-widest hover:text-sky-400 transition-all duration-200"
              >
                myCards
              </Nav.Link>
            )}
  {user && (
          <>    
          <div id="userNameLogin">
          <img src={user.image.url} alt="User profile" />
          {user.name.first} {user.name.last}
          </div>
      
     
      </>
      )}

      {user && user.isAdmin && (
        <Nav.Link
          as={Link}
          to="/admin"
          className="text-white text-lg font-light tracking-widest hover:text-sky-400 transition-all duration-200"
        >
          Admin
        </Nav.Link>
      )}
  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  
  );
};

export default Header;
