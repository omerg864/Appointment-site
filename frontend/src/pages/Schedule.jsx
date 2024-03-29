import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ScheduleDay from '../components/ScheduleDay';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getManagerSettings, reset as settingsReset, updateSettings } from '../features/settings/settingsSlice';
import { authenticateStaff, reset as userReset } from '../features/auth/authSlice';
import Page403 from './Page403';

function Schedule() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const settings = useSelector(state => state.settings);

    const auth = useSelector(state => state.auth);


    const [schedule, setSchedule] = useState([]);

    const time_regex = /^([0-1]+[0-9]|2[0-3]):[0-5][0-9]$/;

    const interval_regex = /^[1-9]?[0-9]{1}[mh]{1}$/i;

    const [authenticatedStaff, setAuthenticatedStaff] = useState(false);

    useEffect(() => {
        dispatch(authenticateStaff()).then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
                setAuthenticatedStaff(true);
            } else {
                setAuthenticatedStaff(false);
            }
            dispatch(userReset());
        });
    }, []);

    useEffect(() => {
        if (settings.isError) {
            toast.error(settings.message);
        }
    }, [settings.isError, settings.message]);

    useEffect(() => {
        dispatch(getManagerSettings()).then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
                setSchedule(response.payload.settings.schedule);
            }
            dispatch(settingsReset());
        });
    }, []);

    const saveScheduleChange = () => {
        let valid = true;
        for (let i = 0; i < schedule.length; i++) {
            if (!time_regex.test(schedule[i].start_time)) {
                toast.error(`Time ${schedule[i].start_time} is invalid`);
                valid = false;
            }
            if (!time_regex.test(schedule[i].end_time)) {
                toast.error(`Time ${schedule[i].end_time} is invalid`);
                valid = false;
            }
            for (let j = 0; j < schedule[i].breaks.length; j++) {
                if (!time_regex.test(schedule[i].breaks[j])) {
                    toast.error(`Time ${schedule[i].breaks[j]} is invalid`);
                    valid = false;
                }
            }
            if (!interval_regex.test(schedule[i].interval)) {
                toast.error(`Interval ${schedule[i].interval} is invalid`);
                valid = false;
            }
        }
        if (valid){
            dispatch(updateSettings({site_description: settings.settings.site_description, register_code: settings.settings.register_code, schedule: schedule})).then((response) => {
                if (response.meta.requestStatus === 'fulfilled') {
                    toast.success('Settings updated');
                }
                dispatch(settingsReset());
            });
        }
    }

    const scheduleChange = (name, value, index, add, pop) => {
        let tempSchedule = {...schedule[index]};
        if (name === 'breaks') {
            let breaks = [...tempSchedule["breaks"]];
            if (add) {
                breaks.push(value);
            } else {
                if (pop) {
                    breaks.pop();
                } else {
                    breaks = breaks.filter(b => b !== value);
                }
            }
            tempSchedule[name] = breaks;
        } else {
            tempSchedule[name] = value;
        }
        let newSchedule = [...schedule];
        newSchedule[index] = tempSchedule;
        setSchedule(newSchedule);
    };

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (settings.isLoading || auth.isLoading) {
        return <Spinner />;
    }

    if (!authenticatedStaff) {
        return <Page403 />;
    }

    return (
        <div className="management-container">
            <h1 style={{marginBottom: '20px'}}>Schedule</h1>
            {schedule.map((schedule1, index) => {
                return <ScheduleDay key={index} title={days[index]} index={index} data={schedule1} setData={scheduleChange} containerStyles={{marginBottom: '20px'}}/>
            })}
            <div className='save-container'>
                <button className='btn btn-light' id="btn-sub" onClick={saveScheduleChange}>Save Changes</button>
            </div>
        </div>
    )
}

export default Schedule;