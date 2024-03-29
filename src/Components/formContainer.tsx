import { ReactNode } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

interface Props {
    children: ReactNode;
}

function formContainer({ children }: Props) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    );
}

export default formContainer;
