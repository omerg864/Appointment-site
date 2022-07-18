import { MdEdit } from 'react-icons/md';


function AppointmentButtonStaff({ user, time, type }) {
  return (
    <div className={`btn-container ${type === 'free' && 'free-btn'} ${type === 'break' && 'break-btn'} ${!type && 'taken-btn'} `}>
        {type === 'free' ? <span style={{fontSize: '20px', marginBottom: '6px'}}>{time}</span> :<span className="time-title">{time}</span>}
        {user && (
            <div className='user-title-div'>
        <a className="user-title">{user.f_name} {user.l_name}</a>
        <div className='user-container'>
            <span style={{fontSize: '20px'}}>{user.f_name} {user.l_name}</span>
            <p style={{margin: 0}}>{user.phone}</p>
            <p style={{margin: 0}}>{user.email}</p>
        </div>
        </div>
        )}
        {type === 'break' && (
        <p className="break-title">{type}</p>
        )}
        <button className="btn" id="btn-icon"><MdEdit color='grey'/></button>
    </div>
  )
}

export default AppointmentButtonStaff;