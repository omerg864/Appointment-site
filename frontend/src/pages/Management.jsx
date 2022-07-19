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

function Management() {

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
        date: new Date(),
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
        id: '',
    });

    const saveUserChange = () => {
        console.log("saveUserChange");
    }

    const saveSiteChange = () => {
        console.log("saveSiteChange");
    }

    const saveScheduleChange = () => {
        console.log("saveScheduleChange");
    }

    useEffect(() => {
        console.log(date);
    }, [date]);

    const appointments = [
        {
            user: {
            id: 1,
            f_name: "John",
            l_name: "Doe",
            email: "Doe@example.com",
            phone: "1234567890",
            staff: false,
        },
        time: "10:00",
        date: new Date()
        },
        {
            user: {
            id: 2,
            f_name: "Jane",
            l_name: "Doe",
            email: "Doe@example.com",
            phone: "1234567890",
            staff: false,
            },
            time: "11:00",
            date: new Date()
        },
        {
            time: "11:30",
            type: "break",
            date: new Date()
        },
        {
            time: "12:00",
            type: "free",
            date: new Date()
        }
    ];

    const users = [
        {
            id: 1,
            f_name: "John",
            l_name: "Doe",
            email: "d@example.com",
            phone: "1234567890",
            staff: true
        },
        {
            id: 2,
            f_name: "Jane",
            l_name: "Doe",
            email: "dd@example.com",
            phone: "1234567890",
            staff: false
        }
    ];

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

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

    const modalChildren = (
        <div style={{display: 'flex', marginBottom: '20px'}}>
        <div id="radio-group" style={{flex: 1, textAlign: 'start'}}>
            <div class="form-check">
            <input class="form-check-input" type="radio" onChange={radioChange} name="exampleRadios" id="exampleRadios1" value="option1" />
            <label class="form-check-label" htmlFor="exampleRadios1">
                Switch User
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" onChange={radioChange} name="exampleRadios" id="exampleRadios2" value="option2" />
            <label class="form-check-label" htmlFor="exampleRadios2">
                Break
            </label>
            </div>
            <div class="form-check">
            <input class="form-check-input" type="radio" onChange={radioChange} name="exampleRadios" id="exampleRadios3" value="option3" />
            <label class="form-check-label" htmlFor="exampleRadios3">
                Delete
            </label>
            </div>
        </div>
        <div style={{flex: 2}}>
            {radioValue === 'option1' && (
            <div>
            <FloatingLabelInput label="Search" value={search} setValue={setSearch} containerStyle={{marginBottom: '20px'}} />
            <div className='user-display'>
                {users.filter(user => {
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

    return (
        <>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={editAppointment} title="Edit Appointment" message={`${formatDate(appointmentEdit.date)} ${days[appointmentEdit.date.getDay()]} at ${appointmentEdit.time} `}
        children={modalChildren} submitText="Save Changes" cancelText={"Cancel"}/>
            <div className="management-container">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" style={{color: '#A68B6A'}} id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Appointments</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="profile-tab" style={{color: '#A68B6A'}} data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Schedule</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="users-tab" style={{color: '#A68B6A'}} data-bs-toggle="tab" data-bs-target="#users-tab-pane" type="button" role="tab" aria-controls="users-tab-pane" aria-selected="false">Users</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="contact-tab" style={{color: '#A68B6A'}} data-bs-toggle="tab" data-bs-target="#contact-tab-pane" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Settings</button>
            </li>
            </ul>
            <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                <h1 style={{marginBottom: '20px'}}>Appointments</h1>
                <Calendar calendarType="Hebrew" onChange={setDate}/>
                <h4 style={{marginTop: '20px'}}>{formatDate(date)}</h4>
                <div className='appointments-container'>
                    {appointments.map((appointment, index) => {
                        return <AppointmentButtonStaff key={index} appointment={appointment} onClick={openModal}/>;
                    })}
                </div>
            </div>
            <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                <h1 style={{marginBottom: '20px'}}>Schedule</h1>
                <ScheduleDay title={"Sunday"} containerStyles={{marginBottom: '20px'}}/>
                <ScheduleDay title={"Monday"} containerStyles={{marginBottom: '20px'}}/>
                <ScheduleDay title={"Tuesday"} containerStyles={{marginBottom: '20px'}}/>
                <ScheduleDay title={"Wednesday"} containerStyles={{marginBottom: '20px'}}/>
                <ScheduleDay title={"Thursday"} containerStyles={{marginBottom: '20px'}}/>
                <ScheduleDay title={"Friday"} containerStyles={{marginBottom: '20px'}}/>
                <ScheduleDay title={"Saturday"} containerStyles={{marginBottom: '20px'}}/>
                <div className='save-container'>
                    <button className='btn btn-light' id="btn-sub" onClick={saveScheduleChange}>Save Changes</button>
                </div>
            </div>
            <div className="tab-pane fade" id="contact-tab-pane" role="tabpanel" aria-labelledby="contact-tab" tabIndex="0">
                <h1 style={{marginBottom: '20px'}}>Settings</h1>
                <FloatingLabelInput label={"Register Code"} props={{required: true, type: "text", name: "register_code", maxLength: '6'}} containerStyle={{marginBottom: '20px'}}/>
                <FloatingLabelTextArea label={"Site Description"} props={{ name: "site_description"}} containerStyle={{marginBottom: '20px'}}/>
                <div className='save-container'>
                    <button className='btn btn-light' id="btn-sub" onClick={saveSiteChange}>Save Changes</button>
                </div>
            </div>
            <div className="tab-pane fade" id="users-tab-pane" role="tabpanel" aria-labelledby="users-tab" tabIndex="0">
                <h1>Users</h1>
                <div className='users-container'>
                    {users.map((user, index) => {
                        return <UserInfo key={index} user={user} index={index} staff={true}/>;
                    })}
                    <div className='save-container'>
                    <button className='btn btn-light' id="btn-sub" onClick={saveUserChange}>Save Changes</button>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </>
    )
}

export default Management;