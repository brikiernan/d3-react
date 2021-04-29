import Dropdown from 'react-bootstrap/Dropdown';

export type Gender = 'men' | 'women';

interface Props {
  genderSelected: (gender: Gender) => void;
}

const GenderDropdown: React.FC<Props> = ({ genderSelected }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant='primary' id='dropdown-basic'>
        Please select gender
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onSelect={() => genderSelected('men')}>
          Men
        </Dropdown.Item>
        <Dropdown.Item onSelect={() => genderSelected('women')}>
          Women
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default GenderDropdown;
