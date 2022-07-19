


function AppointmentButton({ time, onClick }) {
  return (
    <button className={`btn`} onClick={() => onClick(time)} id="appointment-button">
        <span style={{fontSize: '20px', marginBottom: '6px'}}>{time}</span>
    </button>
  )
}

export default AppointmentButton;