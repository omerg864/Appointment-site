import Calendar from 'react-calendar';
import '../Calendar.css';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FloatingLabelInput from '../components/FloatingLabelInput';
import ScheduleDay from '../components/ScheduleDay';
import AppointmentButtonStaff from '../components/AppointmentButtonStaff';
import FloatingLabelTextArea from '../components/FloatingLabelTextArea';
import UserInfo from '../components/UserInfo';

function Management() {

    const [date, setDate] = useState(new Date());

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
        },
        {
            time: "11:30",
            type: "break",
        },
        {
            time: "12:00",
            type: "free",
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

    return (
        <>
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
                        return <AppointmentButtonStaff key={index} user={appointment.user} time={appointment.time} type={appointment.type}/>;
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
                <FloatingLabelInput label={"Site Header"} props={{required: true, type: "text", name: "site_header"}} containerStyle={{marginBottom: '20px'}}/>
                <FloatingLabelInput label={"Site Title"} props={{required: true, type: "text", name: "site_title"}} containerStyle={{marginBottom: '20px'}}/>
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