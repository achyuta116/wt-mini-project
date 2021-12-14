import { useState } from "react";
import { useHistory } from "react-router";
const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const history = useHistory();
    const handleSignup = (e) => {
        e.preventDefault()
        setEmailError('');
        setPasswordError('');
        console.log(`email: ${email}, password: ${password}`);
        fetch('http://localhost:8000/signup', {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({
                email, password
            }),
            headers: new Headers({'content-type': 'application/json'}),
        }).then(result => {
            return result.json()
        }).then(data => {
            console.log(data)
            if(!data.user){
                setEmailError(data.errors.email)
                setPasswordError(data.errors.password)
            } else {
                console.log(data.user)
                history.push('/')
            }
        })
        .catch(errors => {
            console.log(errors);
        })
    }
    return (
        <form>
            <h2>Sign Up</h2>
            <input type="email" placeholder="Email" value={email} onChange={ e => setEmail(e.target.value)}/>
            <p className="error">{emailError}</p>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
            <p className="error">{passwordError}</p>
            <div onClick={handleSignup} className="btn">Sign Up</div>
        </form>
    );
}
 
export default Signup;