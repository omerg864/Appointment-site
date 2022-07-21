import Calendar from 'react-calendar';
import '../Calendar.css';
import { useState, useEffect } from 'react';
import AppointmentButton from '../components/AppointmentButton';
import Modal from '../components/Modal';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getFreeDayAppointments, bookAppointment, reset } from '../features/day/daySlice';
import { formatUrlDate, formatDate } from '../functions/dateFunctions';

function Appointment() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [date, setDate] = useState(new Date());

    const [timeSelected, setTimeSelected] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    const { day, isLoading, isError, message, isSuccess } = useSelector(state => state.day);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);

    useEffect(() => {
        dispatch(getFreeDayAppointments(formatUrlDate(date))).then(() => {
            dispatch(reset());
        });
    },[date]);

    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
    

    const disableTile = data => {
        var today = new Date();
        today = today.addDays(-1);
        var month = today.addDays(10);
        if (today > data.date || month < data.date) {
            return true;
        } else {
            return false;
        }
    }

    const toBookAppointment = () => {
        dispatch(bookAppointment({date: formatUrlDate(date), time: timeSelected})).then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
                dispatch(reset());
                toast.success('Appointment booked successfully');
                navigate('/');
            }
        });
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const onSubmit = (time) => {
        setIsOpen(true);
        setTimeSelected(time);
    }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={toBookAppointment} title="Book Appointment" message={"Are you sure you want to book appointment?"}
        children={ <div>
            <h4>{`${formatDate(date)}`} {`${days[date.getDay()]}`} at {`${timeSelected}`}</h4>
        </div>} submitText="Book" cancelText={"Cancel"}/>
        <div className="login-container">
            <h1 style={{ marginBottom: '30px' }}>Book an Appointment</h1>
            <Calendar calendarType="Hebrew" onChange={setDate} defaultValue={date}  tileDisabled={data => disableTile(data)}/>
            <h4 style={{marginTop: '20px'}}>{formatDate(date)}</h4>
            {day.appointments.length === 0 && <h4>No appointments available</h4>}
                    {day.appointments.length > 0 && <h4>Appointments</h4>}
                <div className='appointments-container'>
                    {day.appointments.length > 0 && (day.appointments.map((appointment, index) => {
                        return <AppointmentButton onClick={onSubmit} time={appointment} key={index}/>
                    }))}
                </div>
        </div>
        </>
    )
}

export default Appointment;