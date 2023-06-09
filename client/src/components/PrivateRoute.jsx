import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const {loading,error,isLoggedIn} = useSelector(store=>store.auth);
    if(!isLoggedIn){
        return <Navigate to="/login" />
    };

    return children

}

export default PrivateRoute