import React from 'react';
import { useAuth } from '../provider/authProvider';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Formik, Form, Field } from 'formik';
import YupPassword from 'yup-password';
import * as Yup from 'yup';
import axios from 'axios';

function Register() {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    YupPassword(Yup);
        const errorMessagesSchema = Yup.object().shape({
            name: Yup.string()
                .required()
                .min(4),
            email: Yup.string()
                .email('Invalid email')
                .required('This field is required'),
            password: Yup.string()
                .password()
                .min(8),
            confirm_password: Yup.string()
                .required('Please retype your password')
                .oneOf([Yup.ref('password')], 'Passwords do not match!')
        });

         const handleRegister = async(values) => {
            try{
                const response = await axios.post('/register', {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    confirm_password: values.confirm_password,
                });

                const { token } = response.data.data;

                setToken(token);

                navigate('/products', { replace: true });

                enqueueSnackbar('Account created successfully', {variant: 'success'});
                
            } catch(error){
                enqueueSnackbar('Account creation failed. Please try again.', {variant: 'error'});
            }        
        }

  return (
    <div className='flex flex-col justify-center items-center my-auto'>
        <div className=''>
            <h1 className='text-2xl font-bold py-10'>Welcome to the ChartApp</h1>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    confirm_password: '',
                }}

                validationSchema={errorMessagesSchema}
                onSubmit={handleRegister}
            >
                {({ errors, touched }) => (
                    <Form className='flex flex-col '>
                        <label htmlFor='name' className='font-bold'>Name</label>
                        <Field type='text' name='name' id='name' className='border-2 rounded-sm my-2 p-1' />
                        { touched.name && errors.name && <div className='text-red-500 text-xs mb-2'>{errors.name}</div>}

                        <label htmlFor='email' className='font-bold'>Email Address</label>
                        <Field type='text' name='email' id='email' className='border-2 rounded-sm my-2 p-1' />
                        { touched.email && errors.email && <div className='text-red-500 text-xs mb-2'>{errors.email}</div>}

                        <label htmlFor='password' className='font-bold'>Password</label>
                        <Field type='password' name='password' id='password' className='border-2 rounded-sm my-2 p-1'/>
                        { touched.password && errors.password && <div className='text-red-500 text-xs mb-2'>{errors.password}</div> }

                        <label htmlFor='confirm_password' className='font-bold'>Confirm Password</label>
                        <Field type='password' name='confirm_password' id='confirm_password' className='border-2 rounded-sm my-2 p-1'/>
                        { touched.confirm_password && errors.confirm_password && <div className='text-red-500 text-xs mb-2'>{errors.password}</div> }

                        <button type='submit' className='border-2 border-black rounded-lg w-1/2 mx-auto bg-black text-white py-1 hover:bg-white hover:text-black hover:delay-100'>Sign Up</button>
                    </Form>
                )}
            </Formik>
            <div className='flex flex-col items-center my-3'>
                <p>Already have an account?</p>
                <button className='transform hover:delay-100 hover:scale-110 hover:underline' onClick={() => navigate('/login')}>Log in here</button>
            </div>
            
        </div>
        
    </div>
  )
}

export default Register