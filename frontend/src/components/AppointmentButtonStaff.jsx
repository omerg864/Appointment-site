import { MdEdit } from 'react-icons/md';


function AppointmentButtonStaff({ appointment, onClick }) {
  return (
    <div className={`btn-container ${appointment.type === 'free' && 'free-btn'} ${appointment.type === 'break' && 'break-btn'} ${appointment.type === 'appointment' && 'taken-btn'} `}>
        {appointment.type === 'free' ? <span style={{fontSize: '20px', marginBottom: '6px'}}>{appointment.time}</span> :<span className="time-title">{appointment.time}</span>}
        {appointment.user && (
            <div className='user-title-div'>
        <a className="user-title">{appointment.user.f_name} {appointment.user.l_name}</a>
        <div className='user-container'>
            <span style={{fontSize: '20px'}}>{appointment.user.f_name} {appointment.user.l_name}</span>
            <p style={{margin: 0}}>{appointment.user.phone}</p>
            <p style={{margin: 0}}>{appointment.user.email}</p>
        </div>
        </div>
        )}
        {appointment.type === 'break' && (
        <p className="break-title">{appointment.type}</p>
        )}
        <button className="btn" onClick={() => onClick(appointment)} id="btn-icon"><MdEdit color='grey'/></button>
    </div>
  )
}

export default AppointmentButtonStaff;