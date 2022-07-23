import { useState } from 'react';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUserPassword } from '../features/auth/authSlice';




function ResetPassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: '',
    })

    
    const password_regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;

    const savePassword = () => {
        let valid = true;
        if (formData.password === '') {
            toast.error('Please enter your password');
            valid = false;
        }
        if (formData.confirmPassword === '') {
            toast.error('Please enter your password again');
            valid = false;
        }
        if (!password_regex.test(formData.password)) {
            toast.error('Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter');
            valid = false;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            valid = false;
        }
        if (valid) {
        dispatch(updateUserPassword({password: formData.password})).then((response) => {
            if (response.meta.requestStatus === "fulfilled") {
                navigate('/');
                toast.success('Password updated successfully');
            }
        });
        }
    }

  return (
    <div className="login-container">
        <h1>Reset Password</h1>
        <FloatingLabelInput label={"New Password"} value={formData.password} setValue={setFormData} obj={formData} props={{required: true, type: "password", name: "password"}} containerStyle={{marginBottom: '20px'}}/>
        <FloatingLabelInput label={"Confirm Password"} value={formData.confirmPassword} setValue={setFormData} obj={formData} props={{required: true, type: "password", name: "confirmPassword"}} containerStyle={{marginBottom: '20px'}}/>
        <div className='save-container'>
            <button className='btn btn-light' id="btn-sub" onClick={savePassword}>Change Password</button>
        </div>
    </div>
  )
}

export default ResetPassword