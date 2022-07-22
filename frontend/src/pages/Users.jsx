import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getUsers, reset as userReset, updateUser, deleteUser } from '../features/auth/authSlice';
import UserDisplay from '../components/UserDisplay';
import FloatingLabelInput from '../components/FloatingLabelInput';
import Modal from '../components/Modal';
import UserInfo from '../components/UserInfo';

function Users() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector(state => state.auth);

    const [search, setSearch] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);


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
        dispatch(updateUser(selectedUser)).then((res) => {
            if (res.meta.requestStatus === 'fulfilled') {
                toast.success('User updated');
            }
            dispatch(userReset());
            closeModal();
        });
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