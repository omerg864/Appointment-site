import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSiteSettings, reset } from '../features/settings/settingsSlice';
import Spinner from '../components/Spinner';
import { useEffect, useState } from 'react';
import { reset as userReset, authenticate } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Page403 from './Page403';



function Home() {

  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { settings, isLoading, isError, message, isSuccess } = useSelector(state => state.settings);

  useEffect(() => {
    dispatch(getSiteSettings()).then(() => {
      dispatch(reset());
    });
  }, []);

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
        dispatch(userReset());
    });
}, [auth.user]);

  const gotoAppointment = () => {
    navigate('/appointment');
  }

  if (isLoading || auth.isLoading) {
    return <Spinner />;
  }


  return (
    <div className='home-container'>
      <h1 className="title">{process.env.REACT_APP_SITE_TITLE}</h1>
      <div className="description">
        {!authenticated ? 
        <p>
          Welcome please sign in or register to book your appointment.
        </p>
        : (<div>
        <p>
          Welcome {auth.user && auth.user.f_name}
          </p>
          <button className="btn btn-light" style={{width: '100%', height: '50px', marginBottom: '10px'}} onClick={gotoAppointment} id="btn-sub" >Book Appointment</button>
          </div>)}
      </div>
      {authenticated && settings.site_description.length > 0 && 
      <div className="message">
        <p className='site_description'>
          {settings.site_description}
        </p>
      </div>}
      <div className="images">
        <img className="long-pic" src="https://res.cloudinary.com/omerg/image/upload/v1658002860/Lior_Yair_Kashri_on_Instagram__%D7%A9%D7%91%D7%95%D7%A2_%D7%9E%D7%91%D7%95%D7%A8%D7%9A_%D7%9E%D7%9C%D7%90_%D7%91%D7%A2%D7%A9%D7%99%D7%99%D7%94_%EF%B8%8F_-_Google_Chrome_16_07_2022_23_06_36_b8xpmr.png" alt="pic1" />
        <div className="pics2">
        <img className="short-pic" src="https://res.cloudinary.com/omerg/image/upload/v1658002861/Lior_Yair_Kashri_on_Instagram__%D7%A9%D7%91%D7%95%D7%A2_%D7%9E%D7%91%D7%95%D7%A8%D7%9A_%D7%9E%D7%9C%D7%90_%D7%91%D7%A2%D7%A9%D7%99%D7%99%D7%94_%EF%B8%8F_-_Google_Chrome_16_07_2022_23_07_05_riu6um.png" alt="pic1" />
        <img className="short-pic" src="https://res.cloudinary.com/omerg/image/upload/v1658002861/Lior_Yair_Kashri_on_Instagram__%D7%A9%D7%91%D7%95%D7%A2_%D7%9E%D7%91%D7%95%D7%A8%D7%9A_%D7%9E%D7%9C%D7%90_%D7%91%D7%A2%D7%A9%D7%99%D7%99%D7%94_%EF%B8%8F_-_Google_Chrome_16_07_2022_23_06_55_bontod.png" alt="pic1" />
        </div>
      </div>
    </div>
  );
}

export default Home;