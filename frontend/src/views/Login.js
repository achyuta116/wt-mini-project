import { useState } from "react";
import { useHistory } from "react-router";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const history = useHistory();
    const handleLogin = (e) => {
        e.preventDefault()
        setEmailError('');
        setPasswordError('');

        fetch('http://localhost:8000/login', {
            method: 'POST',
            body: JSON.stringify({
                email, password
            }),
            credentials: 'include',
            headers: new Headers({'content-type': 'application/json'})
        }).then(result => {
            return result.json()
        }).then(data => {
            console.log(data)
            if(!data.user){
                setEmailError(data.errors.email)
                setPasswordError(data.errors.password)
            } else {
                console.log(data.user)
                history.push('/');
            }
        })
        .catch(errors => {
            console.log(errors);
        })
    }
    return (
        <form>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={ e => setEmail(e.target.value)}/>
            <p className="error">{emailError}</p>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            <p className="error">{passwordError}</p>
            <div onClick={handleLogin} className="btn">Login</div>
        </form>
    );
}
 
export default Login;