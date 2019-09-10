import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NotesIcon from '@material-ui/icons/Notes';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import data from '../data/dictList.json'

import './DictList.scss';

function DictList() {
  const [list, setList] = useState(data.dataList);

  return (
    <>
      <div className="dict-actions">
        <TextField
          id="outlined-name"
          label="Search"
          variant="outlined"
          className="search-field"
          onChange={(e) => {
            setList(data.dataList.filter((el) => el.title.toLowerCase().includes(e.target.value)))
          }}
        />
        <Button variant="outlined">
          Add new
        </Button>
      </div>
      <Grid container className="dict-grid">
          <Grid item xs={12} className="dict-row">
            { list.map(({title, description, date}, id) => (<Paper key={`dictList-${id}`}>
                <span className="title"><NotesIcon /><span>{title} - {description}</span></span>
                <span className="date">{date}</span>
              </Paper>))
            }
          </Grid>
      </Grid>
    </>
  );
}

export default DictList;