import { useRef, useState, useEffect } from 'react';
import D3Chart from '../d3s/D3Chart';
import { Gender } from './GenderDropdown';

interface Props {
  gender: Gender;
}

const ChartWrapper: React.FC<Props> = ({ gender }) => {
  const chartArea = useRef(null);
  const [chart, setChart] = useState<D3Chart>();

  useEffect(() => {
    if (!chart) {
      setChart(new D3Chart(chartArea.current));
    }
    // skip the loading state, when data is still a pending promise
    else if (chart.menData) {
      chart.update(gender);
    }
  }, [chart, gender]);

  return <div ref={chartArea}></div>;
};

export default ChartWrapper;
