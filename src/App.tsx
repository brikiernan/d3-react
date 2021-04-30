import { Fragment, useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { json } from 'd3';

import ChartWrapper from './components/ChartWrapper';
import Table from './components/Table';
// import GenderDropdown from './components/GenderDropdown';
// import { Gender } from './components/GenderDropdown';

const ENDPOINT = 'https://udemy-react-d3.firebaseio.com/children.json';

export interface Student {
  age: string;
  height: string;
  name: string;
}

function App() {
  // const [gender, setGender] = useState<Gender>('men');

  const [data, setData] = useState<Student[]>();
  const [activeName, setActiveName] = useState<string>('');

  useEffect(() => {
    json<Student[]>(ENDPOINT)
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // const genderSelected = (gender: Gender) => setGender(gender);

  const updateName = (activeName: string) => setActiveName(activeName);
  const updateData = (data: Student[]) => setData(data);

  return (
    <Fragment>
      <Navbar bg='light'>
        <Navbar.Brand>Scatter Plot</Navbar.Brand>
      </Navbar>
      <Container>
        {data && (
          <Row>
            <Col md={6} xs={12}>
              <ChartWrapper data={data} updateName={updateName} />
            </Col>
            <Col md={6} xs={12}>
              <Table
                data={data}
                updateData={updateData}
                activeName={activeName}
              />
            </Col>
          </Row>
        )}
      </Container>
      {/* <Container> // from gender chart
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
      </Container> */}
    </Fragment>
  );
}

export default App;
