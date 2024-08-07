import React from 'react';
import { useAuth } from '../provider/authProvider';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Formik, Form, Field } from 'formik';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import axios from 'axios';

function Login() {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    YupPassword(Yup)
        const errorMessagesSchema = Yup.object().shape({
            email: Yup.string()
                .email('Invalid email')
                .required('This field is required'),
            password: Yup.string()
                .password()
                .required()
                .min(8),
        });

    const handleLogin = async(values) =>{
        try {
            const response = await axios.post('/login', {
                email: values.email,
                password: values.password,
            });

            // Extracting the token from the response
            // console.log(response.data.data.token);
            
            const { token } = response.data.data;
            

            setToken(token);

            navigate('/products', { replace: true});

            enqueueSnackbar('Logged In Successfully', { variant: 'success'});
        } catch(error){
            enqueueSnackbar('Login failed. Please check your credentials and try again.', {variant: 'error'})
        }
    }

  return (
    <div className='flex flex-col justify-center items-center my-auto'>
        <div className=''>
            <h1 className='text-2xl font-bold py-10'>Welcome to the ChartApp</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}

                validationSchema={errorMessagesSchema}
                onSubmit={handleLogin}
            >
                {({ errors, touched }) => (
                    <Form className='flex flex-col '>
                        <label htmlFor='email' className='font-bold'>Email Address</label>
                        <Field type='text' name='email' id='email' className='border-2 rounded-sm my-2 p-1' />
                        { touched.email && errors.email && <div className='text-red-500 text-xs mb-2'>{errors.email}</div>}

                        <label htmlFor='password' className='font-bold'>Password</label>
                        <Field type='password' name='password' id='password' className='border-2 rounded-sm my-2 p-1'/>
                        { touched.password && errors.password && <div className='text-red-500 text-xs mb-2'>{errors.password}</div> }

                        <button type='submit' className='border-2 border-black rounded-lg w-1/2 mx-auto bg-black text-white py-1 hover:bg-white hover:text-black hover:delay-100'>Log In</button>
                    </Form>
                )}
            </Formik>
            <div className='flex flex-col items-center my-3'>
                <p>Don't have an account?</p>
                <button className='transform hover:delay-100 hover:scale-110 hover:underline' onClick={() => navigate('/register')}>Register here</button>
            </div>
            
        </div>
        
    </div>
  )
}

export default Login