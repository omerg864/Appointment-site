import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ScheduleDay from '../components/ScheduleDay';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getManagerSettings, reset as settingsReset, updateSettings } from '../features/settings/settingsSlice';

function Schedule() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const settings = useSelector(state => state.settings);


    const [schedule, setSchedule] = useState([]);

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
        dispatch(updateSettings({site_description: settings.settings.site_description, register_code: settings.settings.register_code, schedule: schedule})).then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
                toast.success('Settings updated');
            }
            dispatch(settingsReset());
        });
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

    if (settings.isLoading) {
        return <Spinner />;
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