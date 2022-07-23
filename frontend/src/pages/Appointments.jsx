import Calendar from 'react-calendar';
import '../Calendar.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FloatingLabelInput from '../components/FloatingLabelInput';
import AppointmentButtonStaff from '../components/AppointmentButtonStaff';
import Modal from '../components/Modal';
import $ from 'jquery';
import UserDisplay from '../components/UserDisplay';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getDayAppointments, reset, deleteAppointmentStaff, addBreak, updateAppointment, bookAppointment, deleteBreak, updateDay } from '../features/day/daySlice';
import { getUsers, reset as userReset } from '../features/auth/authSlice';
import { formatDate, formatUrlDate, toDate } from '../functions/dateFunctions';
import { MdModeEdit } from 'react-icons/md';
import ScheduleDay from '../components/ScheduleDay';


function Appointments() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { day, isLoading, isError, message, isSuccess } = useSelector(state => state.day);

    const auth = useSelector(state => state.auth);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

    const [editOpen, setEditOpen] = useState(false);

    const [daySelected, setDaySelected] = useState({
        date: '',
        start_time: '',
        end_time: '',
        breaks: [],
        _id: '',
        interval: ""
    });

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

    const time_regex = /^([0-1]+[0-9]|2[0-3]):[0-5][0-9]$/;

    const interval_regex = /^[1-9]?[0-9]{1}[mh]{1}$/i;

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

    const openDayModal = () => {
        setDaySelected({
            date: day.date,
            start_time: day.start_time,
            end_time: day.end_time,
            breaks: day.breaks,
            interval: day.interval
        });
        setEditOpen(true);
    }

    const editAppointment = () => {
        console.log(radioValue);
        if(radioValue === 'option1'){
            if (appointmentEdit.type === 'appointment'){
                dispatch(updateAppointment({date: formatUrlDate(toDate(appointmentEdit.date)), time: appointmentEdit.time, user: appointmentEdit.user._id, 
                newDate: formatUrlDate(toDate(appointmentEdit.date)), newTime: appointmentEdit.time, newUser: userSelected._id})).then(res => {
                    if (res.meta.requestStatus === 'fulfilled'){
                        dispatch(reset());
                        toast.success('Appointment updated successfully');
                    }
                })
            } else if(appointmentEdit.type === 'free') {
                dispatch(bookAppointment({date: formatUrlDate(toDate(appointmentEdit.date)), time: appointmentEdit.time, staff: true, user_id: userSelected._id})).then(res => {
                    if (res.meta.requestStatus === 'fulfilled'){
                        dispatch(reset());
                        toast.success('Appointment booked successfully');
                    }
                });
            } else {
                dispatch(deleteBreak({date: formatUrlDate(toDate(appointmentEdit.date)), time: appointmentEdit.time})).then(res => {
                    if (res.meta.requestStatus === 'fulfilled'){
                        dispatch(reset());
                        dispatch(bookAppointment({date: formatUrlDate(toDate(appointmentEdit.date)), time: appointmentEdit.time, staff: true, user_id: userSelected._id})).then(res => {
                            if (res.meta.requestStatus === 'fulfilled'){
                                dispatch(reset());
                                toast.success('Appointment booked successfully');
                            }
                        });
                    }
                });
            }
        }else if(radioValue === 'option2'){
            if (appointmentEdit.type === 'appointment'){
                dispatch(deleteAppointmentStaff({date: formatUrlDate(toDate(appointmentEdit.date)), time: appointmentEdit.time, staff: true})).then(res => {
                    if (res.meta.requestStatus === 'fulfilled'){
                        dispatch(reset());
                        dispatch(addBreak({date: formatUrlDate(toDate(appointmentEdit.date)), time: appointmentEdit.time})).then(response => {
                            if (response.meta.requestStatus === 'fulfilled'){
                                dispatch(reset());
                                toast.success('Appointment deleted and break added');
                            }
                        });
                    }
                })
            } else if(appointmentEdit.type === 'free'){
                dispatch(addBreak({date: formatUrlDate(toDate(appointmentEdit.date)), time: appointmentEdit.time})).then(response => {
                    if (response.meta.requestStatus === 'fulfilled'){
                        dispatch(reset());
                        toast.success("Break added");
                    }
                });
            }else {
                toast.info("already a break")
            }
        }else if (radioValue === 'option3'){
            if (appointmentEdit.type === 'appointment'){
                dispatch(deleteAppointmentStaff({date: formatUrlDate(toDate(appointmentEdit.date)), time: appointmentEdit.time, staff: true})).then(res => {
                    if (res.meta.requestStatus === 'fulfilled'){
                        dispatch(reset());
                        toast.success('Appointment deleted');
                    }
                })
            } else if (appointmentEdit.type === 'free'){
                toast.info("already free");
            } else {
                dispatch(deleteBreak({date: formatUrlDate(toDate(appointmentEdit.date)), time: appointmentEdit.time})).then(res => {
                    if (res.meta.requestStatus === 'fulfilled'){
                        dispatch(reset());
                        toast.success("Break deleted");
                    }
                });
            }
        }
        closeModal();
    }

    const saveDay = () => {
        let valid = true;
        if (daySelected.start_time === ''){
            toast.error("Please enter a start time");
            valid = false;
        }
        if (daySelected.end_time === ''){
            toast.error("Please enter an end time");
            valid = false;
        }
        if (daySelected.interval === ''){
            toast.error("Please enter an interval");
            valid = false;
        }
        if (!interval_regex.test(daySelected.interval)){
            toast.error("Please enter a valid interval");
            valid = false;
        }
        if (!time_regex.test(daySelected.start_time)){
            toast.error("Please enter a valid start time");
            valid = false;
        }
        if (!time_regex.test(daySelected.end_time)){
            toast.error("Please enter a valid end time");
            valid = false;
        }
        for (let i = 0; i < daySelected.breaks.length; i++){
            if (!time_regex.test(daySelected.breaks[i])){
                toast.error(`Interval ${daySelected.breaks[i]} is invalid`);
                valid = false;
            }
        }
        if (valid){
            dispatch(updateDay(daySelected)).then((res) => {
                if (res.meta.requestStatus === 'fulfilled'){
                    dispatch(reset());
                }
            });
            closeDayModal();
        }
    };

    const radioChange = (e) => {
        var filterDay = $('#radio-group input:radio:checked').val()
        setRadioValue(filterDay);
    }

    const checkClick = (user) => {
        const oldUser = userSelected;
        if (oldUser && oldUser._id !== "") {
            if (oldUser._id !== user._id) {
                const oldButton = $(`button[name="button-icon-${oldUser._id}"]`)[0];
                oldButton.classList.remove('active-btn-icon');
            }
        }
        setUserSelected(user);
        const button = $(`button[name="button-icon-${user._id}"]`)[0];
        button.classList.add('active-btn-icon');
    }

    const closeModal = () => {
        setIsOpen(false);
        setRadioValue('');
        setUserSelected({
            date: '',
            start_time: '',
            end_time: '',
            breaks: [],
            _id: '',
            interval: ""
        });
        setSearch('');
    };

    const closeDayModal = () => {
        setEditOpen(false);
        setDaySelected({
            date: '',
            breaks: [],
            _id: '',
            interval: ""

        });
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
                }).map((user, index) => {
                    if (index < 10) {
                        return <UserDisplay user={user} onClick={checkClick} selectedUser={userSelected}/>
                    }
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

    const dayChange = (name, value, add, pop) => {
        let tempDay = {...daySelected}
        if (name === 'breaks') {
            let breaks = [...daySelected["breaks"]];
            if (add) {
                breaks.push(value);
            } else {
                if (pop) {
                    breaks.pop();
                } else {
                    breaks = breaks.filter(b => b !== value);
                }
            }
            tempDay[name] = breaks;
        } else {
            tempDay[name] = value;
        }
        setDaySelected(tempDay);
    };

    const editModalChildren = (
        <ScheduleDay title={`${formatDate(toDate(daySelected.date))} ${days[toDate(daySelected.date).getDay()]}`} unique={true} data={daySelected} setData={dayChange} containerStyles={{marginBottom: '20px'}}/>
    )

    if (isLoading || auth.isLoading) {
        return <Spinner />;
    }

    return (
        <>
        <Modal isOpen={isOpen} onClose={closeModal} onSubmit={editAppointment} title="Edit Appointment" message={`${formatDate(toDate(appointmentEdit.date))} ${days[toDate(appointmentEdit.date).getDay()]} at ${appointmentEdit.time} `}
        children={modalChildren} submitText="Save Changes" cancelText={"Cancel"}/>
        <Modal isOpen={editOpen} onClose={closeDayModal} onSubmit={saveDay} title="Edit Day"
        children={editModalChildren} submitText="Save Changes" cancelText={"Cancel"}/>
            <div className="management-container">
            <h1 style={{marginBottom: '20px'}}>Appointments</h1>
                <Calendar calendarType="Hebrew" onChange={setDate} defaultValue={date}/>
                <div  className='relative-container'>
                <h4 style={{marginTop: '20px'}}>{formatDate(date)}</h4>
                <button className={`btn-icon2 top-left2`} onClick={openDayModal} style={{height: '45px', width: '50px'}} name={`button-icon`}><MdModeEdit color='grey' size={'24px'}/></button>
                </div>
                <div className='appointments-container relative-container'>
                    {day.appointments.map((appointment, index) => {
                        return <AppointmentButtonStaff key={index} appointment={appointment} onClick={openModal}/>;
                    })}
                </div>
            </div>
        </>
    )
}

export default Appointments;