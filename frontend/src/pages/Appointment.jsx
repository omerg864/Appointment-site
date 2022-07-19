import Calendar from 'react-calendar';
import '../Calendar.css';
import { useState } from 'react';
import AppointmentButton from '../components/AppointmentButton';
import Modal from '../components/Modal';

function Appointment() {

    const [date, setDate] = useState(new Date());

    const [timeSelected, setTimeSelected] = useState('');

    const [isOpen, setIsOpen] = useState(false);


    const appointments = [
        "10:00","11:00","12:00","13:00","14:00"
    ];

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    

    const disableTile = data => {
        var today = new Date();
        today = today.addDays(-1);
        var month = today.addDays(31);
        if (today > data.date || month < data.date) {
            return true;
        } else {
            return false;
        }
    }

    const bookAppointment = () => {
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const onSubmit = (time) => {
        setIsOpen(true);
        setTimeSelected(time);
    }

    return (
        <>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={bookAppointment} title="Book Appointment" message={"Are you sure you want to book appointment?"}
        children={ <div>
            <a>{`${formatDate(date)}`} {`${days[date.getDay()]}`} at {`${timeSelected}`}</a>
        </div>} submitText="Book" cancelText={"Cancel"}/>
        <div className="login-container">
            <h1 style={{ marginBottom: '30px' }}>Book an Appointment</h1>
            <Calendar calendarType="Hebrew" onChange={setDate}  tileDisabled={data => disableTile(data)}/>
            <h4 style={{marginTop: '20px'}}>{formatDate(date)}</h4>
                <div className='appointments-container'>
                    {appointments.map((appointment, index) => {
                        return <AppointmentButton onClick={onSubmit} time={appointment} key={index}/>
                    })}
                </div>
        </div>
        </>
    )
}

export default Appointment;