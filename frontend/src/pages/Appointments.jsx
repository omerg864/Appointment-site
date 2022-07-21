import Calendar from 'react-calendar';
import '../Calendar.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FloatingLabelInput from '../components/FloatingLabelInput';
import ScheduleDay from '../components/ScheduleDay';
import AppointmentButtonStaff from '../components/AppointmentButtonStaff';
import FloatingLabelTextArea from '../components/FloatingLabelTextArea';
import UserInfo from '../components/UserInfo';
import Modal from '../components/Modal';
import $ from 'jquery';
import UserDisplay from '../components/UserDisplay';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getDayAppointments, reset } from '../features/day/daySlice';
import { getUsers, reset as userReset } from '../features/auth/authSlice';
import { formatDate, formatUrlDate, toDate } from '../functions/dateFunctions';
import { getManagerSettings, reset as settingsReset, updateSettings } from '../features/settings/settingsSlice';

function Appointments() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { day, isLoading, isError, message, isSuccess } = useSelector(state => state.day);

    const auth = useSelector(state => state.auth);

    const [date, setDate] = useState(new Date());

    const [appointmentEdit, setAppointmentEdit] = useState({
        type:'',
        user: {
            f_name: '',
            l_name: '',
            phone: '',
            email: '',
            staff: '',
            id: '',
        },
        time: '',
        date: '2020-01-01T00:00:00.000Z',
    })

    const [isOpen, setIsOpen] = useState(false);

    const [radioValue, setRadioValue] = useState('');

    const [search, setSearch] = useState('');

    const [userSelected, setUserSelected] = useState({
        f_name: '',
        l_name: '',
        phone: '',
        email: '',
        staff: '',
        _id: '',
    });

    useEffect(() => {
        dispatch(getDayAppointments(formatUrlDate(date))).then(() => {
            dispatch(reset());
        });
    }, [date]);

    useEffect(() => {
        if (isError){
            toast.error(message);
        }
    }, [isError, message]);

    useEffect(() => {
        dispatch(getUsers()).then(() => {
            dispatch(userReset());
        });
    }, []);


    const openModal = (appointment) => {
        setIsOpen(true);
        setAppointmentEdit(appointment);
        setUserSelected(appointment.user);
    }

    const editAppointment = () => {

    }

    const radioChange = (e) => {
        var filterDay = $('#radio-group input:radio:checked').val()
        setRadioValue(filterDay);
    }

    const checkClick = (user) => {
        const oldUser = userSelected;
        if (oldUser.id !== "") {
            if (oldUser.id !== user.id) {
                const oldButton = $(`button[name="button-icon-${oldUser.id}"]`)[0];
                oldButton.classList.remove('active-btn-icon');
            }
        }
        setUserSelected(user);
        const button = $(`button[name="button-icon-${user.id}"]`)[0];
        button.classList.add('active-btn-icon');
    }

    const closeModal = () => {
        setIsOpen(false);
        setRadioValue('');
        setUserSelected({
            f_name: '',
            l_name: '',
            phone: '',
            email: '',
            staff: false,
            _id: '',
        });
        setSearch('');
    };

    const modalChildren = (
        <div style={{display: 'flex', marginBottom: '20px'}}>
        <div id="radio-group" style={{flex: 1, textAlign: 'start'}}>
            <div className="form-check">
            <input className="form-check-input" type="radio" onChange={radioChange} name="exampleRadios" id="exampleRadios1" value="option1" />
            <label className="form-check-label" htmlFor="exampleRadios1">
                Switch User
            </label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="radio" onChange={radioChange} name="exampleRadios" id="exampleRadios2" value="option2" />
            <label className="form-check-label" htmlFor="exampleRadios2">
                Break
            </label>
            </div>
            <div className="form-check">
            <input className="form-check-input" type="radio" onChange={radioChange} name="exampleRadios" id="exampleRadios3" value="option3" />
            <label className="form-check-label" htmlFor="exampleRadios3">
                Delete
            </label>
            </div>
        </div>
        <div style={{flex: 2}}>
            {radioValue === 'option1' && (
            <div>
            <FloatingLabelInput label="Search" value={search} setValue={setSearch} containerStyle={{marginBottom: '20px'}} />
            <div className='user-display'>
                {auth.users.filter(user => {
                    if (user.f_name.toLowerCase().includes(search.toLowerCase()) || user.l_name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) || user.phone.toLowerCase().includes(search.toLowerCase())) {
                        return user;
                    }
                }).map((user) => {
                    return <UserDisplay user={user} onClick={checkClick} selectedUser={userSelected}/>
                })}
            </div>
            </div>)}
            {radioValue === 'option2' &&
            <p>The appointment will be deleted and replaced with a break</p>}
            {radioValue === 'option3' &&
            <p>The appointment will be deleted and will be free</p>}
        </div>
            </div>
    );

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (isLoading || auth.isLoading) {
        return <Spinner />;
    }

    return (
        <>
        <Modal isOpen={isOpen} onClose={closeModal} onSubmit={editAppointment} title="Edit Appointment" message={`${formatDate(toDate(appointmentEdit.date))} ${days[toDate(appointmentEdit.date).getDay()]} at ${appointmentEdit.time} `}
        children={modalChildren} submitText="Save Changes" cancelText={"Cancel"}/>
            <div className="management-container">
            <h1 style={{marginBottom: '20px'}}>Appointments</h1>
                <Calendar calendarType="Hebrew" onChange={setDate} defaultValue={date}/>
                <h4 style={{marginTop: '20px'}}>{formatDate(date)}</h4>
                <div className='appointments-container'>
                    {day.appointments.map((appointment, index) => {
                        return <AppointmentButtonStaff key={index} appointment={appointment} onClick={openModal}/>;
                    })}
                </div>
            </div>
        </>
    )
}

export default Appointments;