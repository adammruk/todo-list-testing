import { Box, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import { grey, red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { compareAsc, format, isSameDay } from 'date-fns'
import React from 'react'

const useStyles = makeStyles(({ spacing }) => ({
  paper: ({ isDone }) => ({
    padding: spacing(1, 2),
    opacity: isDone ? 0.5 : 1
  }),
  name: ({ isDone }) => ({
    textDecoration: isDone ? 'line-through' : 'none'
  }),
  dueDate: ({ isOverdue }) => ({
    color: isOverdue ? red['500'] : grey['500']
  })
}));

export const TodoCard = ({ item, onToggleDone, onDelete, onEdit }) => {
  const { name, dueDate, isDone } = item;
  const isOverdue = compareAsc(dueDate, new Date()) === -1 && !isSameDay(dueDate, new Date()) && !isDone;
  const classes = useStyles({ isDone, isOverdue });

  return (
    <Box mb={ 2 }>
      <Paper className={ classes.paper }>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item xs={ 8 }>
            <Typography variant="body1" className={ classes.name }>
              { name }
            </Typography>
            <Typography variant="subtitle2" className={ classes.dueDate }>
              { format(dueDate, 'dd-MM-yyyy') } { isOverdue ? ' - Overdue!' : '' }
            </Typography>
          </Grid>

          <Grid item>
            <IconButton onClick={ () => onEdit(item) }>
              <EditIcon />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton onClick={ () => onToggleDone(item) }>
              { isDone ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon /> }
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton onClick={ () => onDelete(item) }>
              <DeleteIcon />
            </IconButton>
          </Grid>

        </Grid>
      </Paper>
    </Box>
  )
};