import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function Home() {

  const user = useSelector(state => state.auth.user);

  const navigate = useNavigate();


  const gotoAppointment = () => {
    navigate('/appointment');
  }


  return (
    <>
      <h1 className="title">{process.env.REACT_APP_SITE_TITLE}</h1>
      <div className="description">
        {!user ? 
        <p>
          Welcome please sign in or register to book your appointment.
        </p>
        : (<div>
        <p>
          Welcome {user.f_name}
          </p>
          <button className="btn btn-light" style={{width: '60%', height: '50px', marginBottom: '10px'}} onClick={gotoAppointment} id="btn-sub" >Book Appointment</button>
          </div>)}
      </div>
      <div className="message">
        <p>
          Attention<br/>
          from 24.7 to 1.8 the barber shop will be closed.
        </p>
      </div>
      <div className="images">
        <img className="long-pic" src="https://res.cloudinary.com/omerg/image/upload/v1658002860/Lior_Yair_Kashri_on_Instagram__%D7%A9%D7%91%D7%95%D7%A2_%D7%9E%D7%91%D7%95%D7%A8%D7%9A_%D7%9E%D7%9C%D7%90_%D7%91%D7%A2%D7%A9%D7%99%D7%99%D7%94_%EF%B8%8F_-_Google_Chrome_16_07_2022_23_06_36_b8xpmr.png" alt="pic1" />
        <div className="pics2">
        <img className="short-pic" src="https://res.cloudinary.com/omerg/image/upload/v1658002861/Lior_Yair_Kashri_on_Instagram__%D7%A9%D7%91%D7%95%D7%A2_%D7%9E%D7%91%D7%95%D7%A8%D7%9A_%D7%9E%D7%9C%D7%90_%D7%91%D7%A2%D7%A9%D7%99%D7%99%D7%94_%EF%B8%8F_-_Google_Chrome_16_07_2022_23_07_05_riu6um.png" alt="pic1" />
        <img className="short-pic" src="https://res.cloudinary.com/omerg/image/upload/v1658002861/Lior_Yair_Kashri_on_Instagram__%D7%A9%D7%91%D7%95%D7%A2_%D7%9E%D7%91%D7%95%D7%A8%D7%9A_%D7%9E%D7%9C%D7%90_%D7%91%D7%A2%D7%A9%D7%99%D7%99%D7%94_%EF%B8%8F_-_Google_Chrome_16_07_2022_23_06_55_bontod.png" alt="pic1" />
        </div>
      </div>
    </>
  );
}

export default Home;