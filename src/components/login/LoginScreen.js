import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types';



export const LoginScreen = ({history}) => {
    
    const {dispatch} = useContext(AuthContext);


    const handleLoggin = () => {

        const lastPath = localStorage.getItem('lastPath') || '/';

        dispatch({
            type: types.login,
            payload: {
                name: 'Ariel'
            }
        })
        
        history.replace( lastPath ); //el slash en este momento es la pag de marvel
    }

    return (
        <div className="container mt-5">
            <h1> Login screen </h1>
            <hr/>

            <button
                className="btn btn-primary"
                onClick={handleLoggin}
            >
                Login
            </button>
        </div>
    )
}
