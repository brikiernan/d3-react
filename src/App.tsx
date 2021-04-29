import { Fragment, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import GenderDropdown from './components/GenderDropdown';
import ChartWrapper from './components/ChartWrapper';
import { Gender } from './components/GenderDropdown';

function App() {
  const [gender, setGender] = useState<Gender>('men');

  const genderSelected = (gender: Gender) => setGender(gender);

  return (
    <Fragment>
      <Navbar bg='light'>
        <Navbar.Brand>Barcharts</Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12}>
            <GenderDropdown genderSelected={genderSelected} />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ChartWrapper gender={gender} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default App;
