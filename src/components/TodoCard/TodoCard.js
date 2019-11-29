import React from 'react'
import Box from '@material-ui/core/Box';
import { grey, red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { compareAsc, format, isSameDay } from 'date-fns'

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