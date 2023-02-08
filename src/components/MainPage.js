import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import LoginPage from './LoginPage/LoginPage';
import TrackerPage from './TrackerPage/TrackerPage';

function MainPage () {

    const [signedIn, setSignedIn] = useState(false);

    function signInHandler(bool) {
        setSignedIn(bool);
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href='#home'>General Tracker</Navbar.Brand>
                </Container>
            </Navbar>
            {!signedIn && <LoginPage signInHandler={signInHandler}/>}
            {signedIn && <TrackerPage/>}
        </div>
    );

}


export default MainPage;