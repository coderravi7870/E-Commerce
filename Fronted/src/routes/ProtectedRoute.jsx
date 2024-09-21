import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom"
// import Loader from "../components/Layout/Loader";
// import { useEffect } from "react";
// import { loadUser } from "../redux/actions/user";


const ProtectedRoute = ({children})=>{
    const {loading,isAuthenticated } = useSelector((state) => state.user);

    
    if (loading === false) {
        if (!isAuthenticated) {
          return <Navigate to="/login" replace />;
        }
        return children;
      }
    
}



export default ProtectedRoute