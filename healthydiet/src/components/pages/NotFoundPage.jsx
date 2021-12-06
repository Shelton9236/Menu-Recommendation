import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

const NotFoundPage = () => {
    return (
        <Jumbotron fluid>
            <Container>
                <h1>Page Not Found</h1>
                <p>This page is not found</p>
            </Container>
        </Jumbotron>
    );
}

export default NotFoundPage;