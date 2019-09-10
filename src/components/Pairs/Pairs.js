import React, {useState, useEffect} from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import './Pairs.scss';

function Pairs(props) {
  const [pairs, setPairs] = useState([]);

  function addPair() {
      setPairs([...pairs, {"source":"", "target": ""}])
  }

  useEffect(() => {
      setPairs(props.pairs)
  }, [props.pairs]);

  return (
    <>
        <div className="pairs-header">
            <span className="source">Source</span>
            <span className="target">Target</span>
        </div>
        <div className="pairs">
            { pairs.map((pair, index) => 
                <div className="pair" key={`pair-${index}`}>
                    <input type="text" value={pair.source} onChange={() => {}} placeholder="source" />
                    <ArrowForwardIcon className="arrow"/>
                    <input type="text" value={pair.target} onChange={() => {}} placeholder="target" />
                </div>
            )
            }
        </div>
        <button onClick={addPair}>Add</button>
    </>
  );
}

export default Pairs;
