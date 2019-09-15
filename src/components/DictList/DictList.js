import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NotesIcon from '@material-ui/icons/Notes';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Container } from '@material-ui/core'

import './DictList.scss';

function DictList() {
  const [list, setList] = useState(JSON.parse(localStorage.getItem('data')));
  const [open, setOpen] = useState(false);
  const [newDict, setNewDict] = useState({
    title: '',
    description: '',
    labels: ''
  });

  function handleOpen() {
      setOpen(true);
  };

  function handleClose() {
      setOpen(false);
  };

  function addDictionary() {
    setList([...list, {id: list.length, title: newDict.title, description: newDict.description, labels: newDict.labels.split(','), date: Date.now(), pairs: []}]);
    setOpen(false);
  }

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(list));
  }, [list]);

  return (
    <>
      <div className="dict-actions">
        <TextField
          id="outlined-name"
          label="Search"
          variant="outlined"
          className="search-field"
          onChange={(e) => {
            setList(list.filter((el) => el.title.toLowerCase().includes(e.target.value)))
          }}
        />
        <Button variant="outlined" onClick={handleOpen}>
          Add new
        </Button>
      </div>
      <Grid container className="dict-grid">
          <Grid item xs={12} className="dict-row">
            { list.map(({id, title, description, date, labels}, index) => (<Link to={`/dict/${id}`} key={`dictList-${id}`}><Paper>
                <span className="title"><NotesIcon /><span>{title} - {description}</span></span>
                <span className="date">
                  {labels.map((el, index) => <span className="label" key={`label-${index}`}>{el}</span>)}
                  <ReactTimeAgo date={date}/>
                </span>
              </Paper></Link>))
            }
          </Grid>
      </Grid>
      
      <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
          timeout: 500,
          }}
      >
          <Fade in={open}>
              <Container maxWidth="sm" className="modal">
                  <div className="modal-title">New dictionary</div>
                  <div className="initial">
                    <div className="form-container">
                      <TextField
                        id="outlined-add-name"
                        label="Name"
                        variant="outlined"
                        className="add-name"
                        onChange={(e) => {
                          setNewDict({...newDict, title: e.target.value})
                        }}
                      />
                      <TextField
                        id="outlined-add-description"
                        label="Description"
                        variant="outlined"
                        className="add-description"
                        multiline={true}
                        rows={2}
                        rowsMax={4}
                        onChange={(e) => {
                          setNewDict({...newDict, description: e.target.value})
                        }}
                      />
                      <TextField
                        id="outlined-add-labels"
                        variant="outlined"
                        placeholder="label1, label2, label3, etc"
                        className="add-labels"
                        onChange={(e) => {
                          setNewDict({...newDict, labels: e.target.value})
                        }}
                      />
                    </div>
                  </div>
                  <div className="modal-apply">
                      <Button className="apply" color="primary" onClick={addDictionary} variant="contained">
                          Add
                      </Button>
                  </div>
              </Container>
          </Fade>
      </Modal>
    </>
  );
}

export default DictList;