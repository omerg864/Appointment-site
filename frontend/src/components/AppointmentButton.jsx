


function AppointmentButton({ time }) {
  return (
    <button className={`btn`} id="appointment-button">
        <span style={{fontSize: '20px', marginBottom: '6px'}}>{time}</span>
    </button>
  )
}

export default AppointmentButton;