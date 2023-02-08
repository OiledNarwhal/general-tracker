import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function LoginPage(props)
{
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function emailChangeHandler(e) {
        setEmail(e.target.value);
    }

    function passwordChangeHandler(e) {
        setPassword(e.target.value);
    }

    function loginHandler(e) {
        e.preventDefault();

        console.log({email: email, password: password});
        props.signInHandler(true);
    }

    return (
        <div>
            <Form className="ps-3 pe-3">
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder="Enter Email" onChange={emailChangeHandler}/>
                    <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder="Enter Password" onChange={passwordChangeHandler}/>
                </Form.Group>
                <Button variant="primary" type='submit' onClick={loginHandler}>Log In</Button>
            </Form>
        </div>
    );
}

export default LoginPage;