import UserInfo from "../components/UserInfo";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentView from "../components/AppointmentView";
import Modal from "../components/Modal";



function Profile() {
  const navigate = useNavigate();

  const user = useSelector(state => state.auth.user);

  const [formData, setFormData] = useState({
    f_name: user.f_name,
    l_name: user.l_name,
    email: user.email,
    phone: user.phone,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [appointmentSelected, setAppointmentSelected] = useState({
    date: new Date(),
    time: "",
    id: "",
  });

  const gotoResetPassword = () => {
    navigate("/resetPassword");
  }

  const saveProfile = () => {
    console.log(formData);
  }

  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

  const tomorrow = new Date().addDays(1);

  const appointments = [
    {
      date: new Date(),
      time: "10:00",
      id: 1
    },
    {
      date: tomorrow,
      time: "10:00",
      id: 2
    }
  ];

  const cancelAppointmentModal = (appointment) => {
    console.log(appointment);
    setIsOpen(true);
    setAppointmentSelected(appointment);
  }

  const cancelAppointment = () => {
    console.log(appointmentSelected);
    setIsOpen(false);
  }

  
  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <>
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={cancelAppointment} title="Cancel Appointment" message={"Are you sure you want to cancel this appointment?"}
        children={ <div>
            <a>{`${formatDate(appointmentSelected.date)}`} {`${days[appointmentSelected.date.getDay()]}`} at {`${appointmentSelected.time}`}</a>
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