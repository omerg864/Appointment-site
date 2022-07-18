import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector(state => state.auth);

    const gotoLogin = () => {
        navigate('/login');
    }

    const gotoRegister = () => {
        navigate('/register');
    }

    const gotoManagement = () => {
        navigate('/manage');
    }

    const gotoProfile = () => {
        navigate('/profile');
    }

    const logoutUser = () => {
        dispatch(logout()).then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
                navigate('/');
            } else {
                toast.error("Logout failed");
            }
            dispatch(reset());
        });
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark header">
  <div className="container-fluid">
    <a className="navbar-brand" style={{color: '#A68B6A'}} href="/">Appointments App</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      </ul>
      {!user ? (
            <ul className="navbar-nav nav-buttons">          
                <li className='nav-item'>
            <button className="btn btn-outline-light left-btn" id="button-outline-header" onClick={gotoLogin}> Login</button>
            </li>
            <li className='nav-item'>
            <button className="btn btn-outline-light" id="button-outline-header" onClick={gotoRegister}>Register</button>
            </li>
            </ul>
            ) : (
                <ul className="navbar-nav nav-buttons">
                {user.staff && (
                    <li className='nav-item'>
                        <button className="btn btn-outline-light left-btn" id="button-outline-header" onClick={gotoManagement}>Manage</button>
                    </li>
                )}
                <li className='nav-item'>
                    <button className="btn btn-outline-light left-btn" id="button-outline-header" onClick={gotoProfile}>Profile</button>
                </li>
                <li className='nav-item'>
                <button className="btn btn-outline-light" id="button-outline-header" onClick={logoutUser}> Logout</button>
                </li>
                </ul>
            )}
    </div>
  </div>
  </nav>
  );
}

export default Header;