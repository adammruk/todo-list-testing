import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import React from 'react'
import Box from '@material-ui/core/Box';
import { TodoCard } from '../TodoCard/TodoCard';

const ItemsList = ({ items, onDelete, onEdit, onToggleDone, title }) => {
  return (
    <Box mt={ 2 } mb={ 2 }>
      { title && (<>
        <Typography variant='h4'>{ title }</Typography>
        <Divider />
      </> )}
      <Box mt={ 2 } mb={ 2 }>
        { items.map((item) => (
          <TodoCard
            key={ item.id }
            item={ item }
            onDelete={ onDelete }
            onEdit={ onEdit }
            onToggleDone={ onToggleDone }
          />
        )) }
      </Box>
    </Box>
  );
};

export default ItemsList;