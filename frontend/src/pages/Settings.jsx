import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FloatingLabelInput from '../components/FloatingLabelInput';
import FloatingLabelTextArea from '../components/FloatingLabelTextArea';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getManagerSettings, reset as settingsReset, updateSettings } from '../features/settings/settingsSlice';
import { authenticateStaff, reset as userReset } from '../features/auth/authSlice';
import Page403 from './Page403';


function Settings() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const settings = useSelector(state => state.settings);

    const auth = useSelector(state => state.auth);

    const [settingsData, setSettingsData] = useState({
        site_description: '',
        register_code: '',
    });

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
                setSettingsData({register_code: response.payload.settings.register_code, site_description: response.payload.settings.site_description});
            }
            dispatch(settingsReset());
        });
    }, []);

    const saveSiteChange = () => {
        dispatch(updateSettings({site_description: settingsData.site_description, register_code: settingsData.register_code, schedule: settings.settings.schedule})).then((response) => {
            if (response.meta.requestStatus === 'fulfilled') {
                toast.success('Settings updated');
            }
            dispatch(settingsReset());
        });
    }

    if (settings.isLoading || auth.isLoading) {
        return <Spinner />;
    }

    if (!authenticatedStaff) {
        return <Page403 />;
    }

    return (
        <div className="management-container">
        <h1 style={{marginBottom: '20px'}}>Settings</h1>
            <FloatingLabelInput label={"Register Code"} value={settingsData.register_code} setValue={setSettingsData} obj={settingsData} props={{required: true, type: "text", name: "register_code", maxLength: '6'}} containerStyle={{marginBottom: '20px'}}/>
            <FloatingLabelTextArea label={"Site Description"} value={settingsData.site_description} setValue={setSettingsData} obj={settingsData} props={{ name: "site_description"}} containerStyle={{marginBottom: '20px'}}/>
            <div className='save-container'>
                <button className='btn btn-light' id="btn-sub" onClick={saveSiteChange}>Save Changes</button>
            </div>
        </div>
    )
}

export default Settings;