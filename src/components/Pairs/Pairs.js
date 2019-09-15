import React, {useState, useEffect} from 'react';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AddIcon from '@material-ui/icons/Add';

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
        <button onClick={addPair} className="add"><AddIcon /></button>
    </>
  );
}

export default Pairs;
