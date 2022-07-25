import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getUsers, reset as userReset, updateUser, deleteUser, authenticateStaff } from '../features/auth/authSlice';
import UserDisplay from '../components/UserDisplay';
import FloatingLabelInput from '../components/FloatingLabelInput';
import Modal from '../components/Modal';
import UserInfo from '../components/UserInfo';
import Page403 from './Page403';

function Users() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector(state => state.auth);

    const [search, setSearch] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);

    const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phone_regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;

    const [authenticatedStaff, setAuthenticatedStaff] = useState(false);

    useEffect(() => {
        dispatch(authenticateStaff()).then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
                setAuthenticatedStaff(true);
            } else {
                setAuthenticatedStaff(false);
            }
            dispatch(userReset());
        });
    }, []);

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
        let valid = true;
        if (selectedUser.f_name === '') {
            valid = false;
            toast.error('First name is required');
        }
        if (selectedUser.l_name === '') {
            valid = false;
            toast.error('Last name is required');
        }
        if (selectedUser.email === '') {
            valid = false;
            toast.error('Email is required');
        }
        if (!email_regex.test(selectedUser.email)) {
            valid = false;
            toast.error('Email is invalid');
        }
        if (selectedUser.phone === '') {
            valid = false;
            toast.error('Phone is required');
        }
        if (!phone_regex.test(selectedUser.phone)) {
            valid = false;
            toast.error('Phone is invalid');
        }
        if (valid) {
            dispatch(updateUser(selectedUser)).then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                    toast.success('User updated');
                }
                dispatch(userReset());
                closeModal();
            });
        }
    }

    const performDeleteUser = () => {
        dispatch(deleteUser(selectedUser._id)).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                toast.success('User deleted');
            }
            dispatch(userReset());
            closeModal();
        });
    };

    const closeModal = () => {
        setIsOpen(false);
        setSelectedUser(null);
        setSearch('');
    };

    const closeDeleteModal = () => {
        setSelectedUser(null);
        setSearch('');
        setDeleteOpen(false);
    };

    const openDeleteModal = () => {
        setIsOpen(false);
        setDeleteOpen(true);
    };

    const openModal = (user) => {
        setIsOpen(true);
        setSelectedUser(user);
    };

    const modalChildren = (
        <div className='users-container'>
        <UserInfo user={selectedUser} staff={true} setUser={setSelectedUser}/>
        </div>
    );

    if (auth.isLoading) {
        return <Spinner />;
    }

    if (!authenticatedStaff) {
        return <Page403 />;
    }

    return (
        <>
        <Modal isOpen={isOpen} onClose={closeModal} onSubmit={saveUserChange} title="Edit User" message={``}
        children={modalChildren} submitText="Save Changes" cancelText={"Cancel"} deleteButton={true} onDelete={openDeleteModal} />
        <Modal isOpen={deleteOpen} onClose={closeDeleteModal} onSubmit={performDeleteUser} title="Delete User" message="Are you sure you want to delete this user?" submitText="Delete User" cancelText={"Cancel"} />
        <div className="management-container">
        <h1>Users</h1>
        <FloatingLabelInput label="Search" value={search} setValue={setSearch} containerStyle={{marginBottom: '20px'}} />
            <div className='users-container'>
                {auth.users.filter(user => {
                    if (user.f_name.toLowerCase().includes(search.toLowerCase()) || user.l_name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) || user.phone.toLowerCase().includes(search.toLowerCase())) {
                        return user;
                    }
                }).map((user, index) => {
                    if (index < 10) {
                        return <UserDisplay key={index} user={user} edit={true} editSubmit={openModal}/>;
                    }
                })}
            </div>
        </div>
        </>
    )
}

export default Users;