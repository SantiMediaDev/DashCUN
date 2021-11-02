import React, { useState, useContext } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core';
import { DashCunContext } from '../../../../context/context';
import {v4 as uuidv4} from 'uuid';

import formatDate from '../../../../utils/formatDate';
import useStyles from './styles';
import {catedraCategories, plantaCategories} from '../../../../constants/categories';
import CustomizedSnackbar from '../../../Snackbar/Snakcbar';

const initialState = {
    amount: '',
    category: '',
    type: '',
    date: formatDate (new Date()),
}

const Form = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState(initialState);
    const { addSubject } = useContext(DashCunContext);
    const [open, setOpen] = useState(false);

    const createSubject = () => {
        if(Number.isNaN(Number(formData.amount)) || !formData.date.includes('-')) return;
        const subject = { ... formData, amount: Number(formData.amount), id: uuidv4()};

        setOpen(true);
        addSubject(subject);
        setFormData(initialState);
    }

    const selectedCategories = formData.type === 'Catedra' ? catedraCategories : plantaCategories;

    console.log(formData);

    return (
       <Grid container spacing={2}>
           <CustomizedSnackbar open={open} setOpen={setOpen} />
           <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                  ...
                </Typography>
           </Grid>
           <Grid item xs={6}>
               <FormControl fullWidth>
                   <InputLabel>Tipo</InputLabel>
                   <Select value={formData.type} onChange={(e) => setFormData({ ... formData, type: e.target.value})  }>
                        <MenuItem value="Catedra">Catedra</MenuItem>
                        <MenuItem value="Planta">Planta</MenuItem>
                   </Select>
               </FormControl>
           </Grid> 
           <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Materia</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData ({ ... formData, category: e.target.value}) }>
                    {selectedCategories.map((c) => <MenuItem key={c.type} value={c.type}> {c.type} </MenuItem>)}
                    </Select>
                </FormControl>
           </Grid>
           <Grid item xs={6}>
               <TextField type="number" label="Horas" fullWidth value={formData.amount} onChange={(e) => setFormData({ ... formData, amount: e.target.value })} />
           </Grid>
           <Grid item xs={6}>
               <TextField type="date" label="Fecha" fullWidth value={formData.date} onChange={(e) => setFormData({ ... formData, date: formatDate (e.target.value) })} />
           </Grid>
           <Button className={classes.button} variant="outlined" color="green" fullWidth onClick={createSubject} >Crear</Button>

       </Grid>
    )
}

export default Form
