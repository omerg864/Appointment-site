import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserInfo from '../components/UserInfo';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getUsers, reset as userReset } from '../features/auth/authSlice';

function Users() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector(state => state.auth);


    useEffect(() => {
        if (auth.isError) {
            toast.error(auth.message);
        }
    }, [auth.isError, auth.message]);

    useEffect(() => {
        dispatch(getUsers()).then(() => {
            dispatch(userReset());
        });
    }, []);

    const saveUserChange = () => {
        console.log("saveUserChange");
    }

    if (auth.isLoading) {
        return <Spinner />;
    }

    return (
        <div className="management-container">
        <h1>Users</h1>
            <div className='users-container'>
                {auth.users.map((user, index) => {
                    return <UserInfo key={index} user={user} index={index} staff={true}/>;
                })}
                <div className='save-container'>
                <button className='btn btn-light' id="btn-sub" onClick={saveUserChange}>Save Changes</button>
                </div>
            </div>
        </div>
    )
}

export default Users;