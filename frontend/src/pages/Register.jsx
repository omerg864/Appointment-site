import FloatingLabelInput from "../components/FloatingLabelInput";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { register } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';



function Register() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    f_name: '',
    l_name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    register_code: ""
  });

  const password_regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
  const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const phone_regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;



  useEffect(() => {
    if (auth.isError){
      toast.error(auth.message);
    }
  }, [auth.isError, auth.message]);

  const performRegistration = () => {
    let clear = true;
    if (formData.f_name === '') {
      clear = false;
      toast.error('Please enter your first name');
    }
    if (formData.l_name === '') {
      toast.error('Please enter your last name');
      clear = false;
    }
    if (formData.phone === '') {
      toast.error('Please enter your phone number');
      clear = false;
    }
    if (formData.email === '') {
      toast.error('Please enter your email');
      clear = false;
    }
    if (formData.password === '') {
      toast.error('Please enter your password');
      clear = false;
    }
    if (formData.confirmPassword === '') {
      toast.error('Please confirm your password');
      clear = false;
    }
    if (formData.register_code === '') {
      toast.error('Please enter your register code');
      clear = false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      clear = false;
    }
    if (!password_regex.test(formData.password)) {
      toast.error('Password must be at least 8 characters long and contain at least one number, one lowercase and one uppercase letter');
      clear = false;
    }
    if (!email_regex.test(formData.email)) {
      toast.error('Please enter a valid email');
      clear = false;
    }
    if (!phone_regex.test(formData.phone)) {
      toast.error('Please enter a valid phone number');
      clear = false;
    }
    if (clear) {
      dispatch(register(formData)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled'){
          toast.success('Registration successful');
          navigate('/login');
        }
      });
    }
  }

  if(auth.isLoading){
    return <Spinner />;
  }

  return (
    <div className="login-container">
        <div className="login-header">
            <h1>Register</h1>
        </div>
            <FloatingLabelInput label="First Name" value={formData.f_name} setValue={setFormData} obj={formData} props={{required: true, type: "text", name: 'f_name'}} containerStyle={{marginTop: '10px'}}/>
            <FloatingLabelInput label="Last Name" value={formData.l_name} setValue={setFormData} obj={formData} props={{required: true, type: "text", name: 'l_name'}} containerStyle={{marginTop: '10px'}}/>
            <FloatingLabelInput label="Email" value={formData.email} setValue={setFormData} obj={formData} props={{required: true, type: "email" , name: 'email'}} containerStyle={{marginTop: '10px'}}/>
            <FloatingLabelInput label="Phone Number" value={formData.phone} setValue={setFormData} obj={formData} props={{required: true, type: "text", maxLength: '10', name: 'phone'}} containerStyle={{marginTop: '10px'}}/>
            <FloatingLabelInput label="Password" value={formData.password} setValue={setFormData} obj={formData} props={{required: true, type: "password", name: 'password'}} containerStyle={{marginTop: '10px'}}/>
            <FloatingLabelInput label="Repeat Password" value={formData.confirmPassword} setValue={setFormData} obj={formData} props={{required: true, type: "password", name: 'confirmPassword'}} containerStyle={{marginTop: '10px'}}/>
            <FloatingLabelInput label="Registration Code" value={formData.register_code} setValue={setFormData} obj={formData} props={{required: true, type: "text", maxlength :"6", name: 'register_code'}} containerStyle={{marginTop: '10px'}}/>
            <div className="d-grid gap-2">
            <button style={{marginTop: '10px'}} type="submit" onClick={performRegistration} className="btn btn-primary btn-block" id="btn-sub">Register</button>
            </div>
        </div>
  );
}

export default Register;