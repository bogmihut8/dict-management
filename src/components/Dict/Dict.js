import React, {useState, useEffect} from 'react';
import Pairs from '../Pairs/Pairs'
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import JSONInput from 'react-json-editor-ajrm';
import locale    from 'react-json-editor-ajrm/locale/en';
import TextField from '@material-ui/core/TextField';
import ReactTimeAgo from 'react-time-ago'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import './Dict.scss';

function Dict({match}) {
    const [id] = useState(match.params.id)
    const [dict, setDict] = useState({
        title: '',
        description: '',
        date: null,
        pairs: [],
        labels: []
    });
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const [sourceJson, setSourceJson] = useState([]);

    function handleOpen() {
        setOpen(true);
    };

    function handleClose() {
        setOpen(false);
    };

    useEffect(() => {
        const lsData = JSON.parse(localStorage.getItem('data'));
        const filteredDict = lsData.find((el) => el.id === Number(id));
        if(!filteredDict) {
            setError('No dictionary found with this id :(')
        }
        else {
            setDict(filteredDict)
        }
        
    }, [id]);

    /*  For we can map the pairs and for each source  
        we test if the pairs.filter result > 1 (when filtering for sources; 
        if the result is bigger, there is a chance of DUPLICATES or FORKS) or if
        result > 0 (when filtering for targets; if the result is bigger, there is 
        a chance of CYCLES or CHAINS)
    */

    return (
        <Container maxWidth="md">
            {error ? (<h3>{error}</h3>) : (
                <>
                    <header>
                    <h2>Dictionary #id {match.params.id}</h2>
                        <p>
                            This is the place for adding your key/value pairs for this dictionary. 
                            The changes are automatically saved so no need to worry about this.
                            By selecting the 'Apply' feature, you can load your data and apply the current
                            dictionary to it. It will be validated and the result will be underneath.
                        </p>
                    </header>
                    <div className='dict'>
                        <div className="info">
                            <TextField
                                id="outlined-name"
                                label="Title"
                                variant="outlined"
                                value={dict.title}
                                className="title-field"
                                onChange={(e) => {
                                    setDict({...dict, title: e.target.value})
                                }}
                            />
                            <div className="right">
                                <div className="labels">
                                    {dict.labels.map((el, id) => <span className="label" key={`label-${id}`}>{el}</span>)}
                                </div>
                                { dict.date && <p className="date">Added <ReactTimeAgo date={dict.date}/></p>}
                            </div>
                        </div>
                        <div className="description">
                            <p>"{dict.description}"</p>
                        </div>
                        <Pairs pairs={dict.pairs}></Pairs>
                        <div className="actions">
                            <Button className="apply" onClick={handleOpen} variant="contained">
                                Apply
                            </Button>
                            <Button className="validate" onClick={() => {}} variant="contained">
                                Validate
                            </Button>
                            <Button className="download" onClick={() => {}} variant="contained">
                                Download csv
                            </Button>
                        </div>
                    </div>
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
                            <Container maxWidth="md" className="modal">
                                <div className="modal-title">Apply on dataset</div>
                                <div className="initial">
                                    <div className="json-editor">
                                        <JSONInput
                                            id          = 'json-editor'
                                            placeholder = { sourceJson }
                                            locale      = { locale }
                                            height      = '350px'
                                            width       = '100%'
                                            onChange    = {(e) => {console.log(e);setSourceJson(e.jsObject)}}
                                        />
                                    </div>
                                    <div className="result">
                                        {sourceJson && sourceJson.length > 0 && 
                                        <Table>
                                            <TableHead>
                                            <TableRow>
                                                {Object.keys(sourceJson[0]).map((key, id) => (
                                                <TableCell className="alignLeft" key={`source-header-cell-${id}`} align="right">{key.toUpperCase()}</TableCell>
                                                ))}
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {sourceJson.map((row, id) => (
                                                <TableRow key={`source-row-${id}`}>
                                                    {Object.values(row).map((value, id) => (
                                                        <TableCell className="alignLeft" key={`source-row-cell-${id}`} align="right">{value}</TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                            </TableBody>
                                        </Table>
                                        }
                                        
                                    </div>
                                </div>
                                <div className="modal-apply">
                                    <Button className="apply" color="primary" onClick={handleOpen} variant="contained">
                                        Apply
                                    </Button>
                                </div>
                            </Container>
                        </Fade>
                    </Modal>
                </>)
            }
            
        </Container>
    );
}

export default Dict;
