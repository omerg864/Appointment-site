import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getUsers, reset as userReset, updateUser, deleteUser, authenticateStaff, updateUserPassword } from '../features/auth/authSlice';
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

    const [selectedUser, setSelectedUser] = useState({
        _id: '',
        f_name: '',
        l_name: '',
        email: '',
        phone: '',
    });

    const [deleteOpen, setDeleteOpen] = useState(false);

    const [passwordOpen, setPasswordOpen] = useState(false);

    const [passwordForm, setPasswordForm] = useState({
        password: '',
        confirmPassword: '',
    });

    const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phone_regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
    const password_regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

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

    
    const savePassword = () => {
        let valid = true;
        if (passwordForm.password === '') {
            toast.error('Please enter your password');
            valid = false;
        }
        if (passwordForm.confirmPassword === '') {
            toast.error('Please enter your password again');
            valid = false;
        }
        if (!password_regex.test(passwordForm.password)) {
            toast.error('Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter');
            valid = false;
        }
        if (passwordForm.password !== passwordForm.confirmPassword) {
            toast.error('Passwords do not match');
            valid = false;
        }
        if (valid) {
        dispatch(updateUserPassword({password: passwordForm.password, user_id: selectedUser._id})).then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
                toast.success('Password updated successfully');
                closePasswordModal();
            }
            dispatch(userReset());
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
        setSelectedUser({
            _id: '',
            f_name: '',
            l_name: '',
            email: '',
            phone: '',
        });
        setSearch('');
    };

    const closeDeleteModal = () => {
        setSelectedUser({
            _id: '',
            f_name: '',
            l_name: '',
            email: '',
            phone: '',
        });
        setSearch('');
        setDeleteOpen(false);
    };

    const closePasswordModal = () => {
        setSelectedUser({
            _id: '',
            f_name: '',
            l_name: '',
            email: '',
            phone: '',
        });
        setSearch('');
        setPasswordOpen(false);
    };

    const openDeleteModal = () => {
        setIsOpen(false);
        setDeleteOpen(true);
    };

    const openModal = (user) => {
        setIsOpen(true);
        setSelectedUser(user);
    };

    const openPasswordModal = () => {
        setIsOpen(false);
        setPasswordOpen(true);
    };

    const modalChildren = (
        <div className='users-container'>
            <button className="btn btn-outline-light" onClick={openPasswordModal} id="button-outline" style={{marginBottom: '20px'}}>Reset Password</button>
        <UserInfo user={selectedUser} staff={true} setUser={setSelectedUser}/>
        </div>
    );

    const PasswordModalChildren = (
        <div>
        <FloatingLabelInput label={"New Password"} value={passwordForm.password} setValue={setPasswordForm} obj={passwordForm} props={{required: true, type: "password", name: "password"}} containerStyle={{marginBottom: '20px'}}/>
        <FloatingLabelInput label={"Confirm Password"} value={passwordForm.confirmPassword} setValue={setPasswordForm} obj={passwordForm} props={{required: true, type: "password", name: "confirmPassword"}} containerStyle={{marginBottom: '20px'}}/>
        </div>
    )

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
        <Modal isOpen={passwordOpen} onClose={closePasswordModal} onSubmit={savePassword} title="Change User Password" message={`${selectedUser.f_name} ${selectedUser.l_name}`}
        children={PasswordModalChildren} submitText="Save Password" cancelText={"Cancel"} />
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