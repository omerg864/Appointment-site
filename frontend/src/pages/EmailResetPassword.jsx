import { useState, useEffect } from 'react';
import FloatingLabelInput from '../components/FloatingLabelInput';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { sendResetEmail, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';



function EmailResetPassword() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const auth = useSelector(state => state.auth);

    const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    useEffect(() => {
        if (auth.isError) {
            toast.error(auth.message);
        }
      }, [auth.isError, auth.message]);

    const sendEmail = () => {
      let valid = true;
      if (email === '') {
        valid = false;
        toast.error('Email is required');
      }
      if (!email_regex.test(email)) {
        valid = false;
        toast.error('Email is invalid');
      }
      if (valid) {
        dispatch(sendResetEmail({email: email})).then((response) => {
          if (response.meta.requestStatus === "fulfilled") {
            toast.success('Email sent successfully');
            navigate('/');
          }
          dispatch(reset());
        });
      }
    }

    if (auth.isLoading) {
      return <Spinner />;
    }

  return (
    <div className='login-container'>
        <h1>Reset Password</h1>
        <FloatingLabelInput label={"Email"} value={email} setValue={setEmail} props={{required: true, type: "email", name: "email"}} containerStyle={{marginBottom: '20px'}}/>
        <div className='save-container'>
            <button className='btn btn-light' id="btn-sub" onClick={sendEmail}>Send Reset Email</button>
        </div>
    </div>
  )
}

export default EmailResetPassword