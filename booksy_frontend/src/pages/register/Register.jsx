import RegisterForm from '../../components/RegisterForm';
import './_Register.scss';

export default function Register() {
  return (
    <div className='register-page'>
      <div className='form-container '>
        <h2>Sign Up</h2>
        <RegisterForm />
      </div>
    </div>
  );
}
