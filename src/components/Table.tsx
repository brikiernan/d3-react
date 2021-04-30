import { Fragment, MouseEvent, ChangeEvent, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { Student } from '../App';

interface Props {
  data: Student[];
  updateData: (data: Student[]) => void;
  activeName: any;
}

const initialState = {
  name: '',
  height: '',
  age: '',
};

const Table: React.FC<Props> = ({ data, updateData, activeName }) => {
  const [student, setStudent] = useState<Student>(initialState);

  const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
    const newData = data.filter(d => d.name !== event.currentTarget.name);
    updateData(newData);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  const handleAdd = () => {
    updateData([...data, student]);
    setStudent(initialState);
  };

  return (
    <Fragment>
      <Row>
        <Col xs={3}>
          <Form.Control
            placeholder='Name'
            name='name'
            value={student.name}
            onChange={handleChange}
          />
        </Col>
        <Col xs={3}>
          <Form.Control
            placeholder='Height'
            name='height'
            value={student.height}
            onChange={handleChange}
          />
        </Col>
        <Col xs={3}>
          <Form.Control
            placeholder='Age'
            name='age'
            value={student.age}
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Button
            variant='primary'
            type='button'
            style={{ width: '100%' }}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Col>
      </Row>

      {data.map(student => {
        // console.log(student.name);
        // console.log(activeName);
        const color = student.name === activeName ? 'grey' : 'white';

        return (
          <Row
            key={student.name}
            style={{ marginTop: 10, backgroundColor: color }}
          >
            <Col xs={3}>{student.name}</Col>
            <Col xs={3}>{student.height}</Col>
            <Col xs={3}>{student.age}</Col>
            <Col xs={3}>
              <Button
                variant='danger'
                type='button'
                name={student.name}
                style={{ width: '100%' }}
                onClick={handleRemove}
              >
                Remove
              </Button>
            </Col>
          </Row>
        );
      })}
    </Fragment>
  );
};

export default Table;
