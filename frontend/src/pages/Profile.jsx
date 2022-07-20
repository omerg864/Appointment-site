import UserInfo from "../components/UserInfo";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentView from "../components/AppointmentView";
import Modal from "../components/Modal";
import { getUserAppointments, reset, deleteAppointment } from '../features/day/daySlice';
import { updateUser, reset as userReset } from '../features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from "../components/Spinner";
import { toast } from 'react-toastify';



function Profile() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);

  const { appointments, isLoading, isError, message, isSuccess } = useSelector(state => state.day);

  const [formData, setFormData] = useState({
    f_name: auth.user.f_name,
    l_name: auth.user.l_name,
    email: auth.user.email,
    phone: auth.user.phone,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [appointmentSelected, setAppointmentSelected] = useState({
    date: "2020-01-01T00:00:00.000Z",
    time: "",
    id: "",
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (auth.isError){
      toast.error(auth.message);
    }
  }, [isError, message, auth.isError, auth.message]);

  useEffect(() => {
    dispatch(getUserAppointments()).then(() => {
      dispatch(reset());
    });
  }, []);

  const gotoResetPassword = () => {
    navigate("/resetPassword");
  }

  const saveProfile = () => {
    dispatch(updateUser(formData)).then((response) => {
      dispatch(userReset());
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success("Profile updated successfully");
      }
    });
  }

  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

  const cancelAppointmentModal = (appointment) => {
    setIsOpen(true);
    setAppointmentSelected(appointment);
  }

  const cancelAppointment = () => {
    dispatch(deleteAppointment({date: formatUrlDate(toDate(appointmentSelected.date)), time: appointmentSelected.time})).then(() => {
      dispatch(reset());
      setIsOpen(false);
    });
  }

  
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const formatUrlDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

  const toDate = (date) => {
    var dateSplit = date.split("T")[0].split("-");
    var formattedDate = new Date(parseInt(dateSplit[0]), parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]));
    return formattedDate;
}

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  if (isLoading || auth.isLoading) {
    return <Spinner />;
  }

  return (
    <>
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={cancelAppointment} title="Cancel Appointment" message={"Are you sure you want to cancel this appointment?"}
        children={ <div>
            <a>{`${formatDate(toDate(appointmentSelected.date))}`} {`${days[toDate(appointmentSelected.date).getDay()]}`} at {`${appointmentSelected.time}`}</a>
        </div>} submitText="Cancel Appointment" cancelText={"Close"}/>
    <div className="management-container">
      <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" style={{color: '#A68B6A'}} id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Appointments</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="profile-tab" style={{color: '#A68B6A'}} data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Profile</button>
            </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
        <h1>Appointments</h1>
        <div className="appointments-container">
            {appointments.map((appointment, index) => {
              return (
                <AppointmentView key={index} data={appointment} onClick={cancelAppointmentModal} />
              );
            })}
            </div>
        </div>
        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
        <h1>Profile</h1>
          <UserInfo user={formData} setUser={setFormData} staff={false}/>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn btn-light" id="button-outline" onClick={gotoResetPassword}>Reset Password</button>
          <button className="btn btn-light" id="btn-sub" onClick={saveProfile}>Save Changes</button>
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default Profile