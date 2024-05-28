
import Router from "./Routes/Router";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import './App.css';
import "./AppStyles.css";
import './AdminStyle.css';
import { Context } from "./Hooks/Context/Context";
import { SnackbarProvider } from 'notistack';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import  ConfigRoute from './Routes/Router'
import { styled } from "@mui/material";
import './Mediaquery.css';
function App() {
  const StyledSnackbarProvider = styled(SnackbarProvider)`
  &.SnackbarItem-contentRoot {
    width: 500px ;
    height : 60px ;
   
  }
  & .SnackbarItem-message {
    font-size : 20px
  }
`;
const router = createBrowserRouter(ConfigRoute);
  return (
    <>
      <StyledSnackbarProvider maxSnack={3} autoHideDuration={3000} >
          {/* <Router></Router> */}
          <RouterProvider router={router} />
      </StyledSnackbarProvider>
    </>
  );
}

export default App;
