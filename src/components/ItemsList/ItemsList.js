import React from 'react'
import { Box, Divider, Typography } from '@material-ui/core';

import { TodoCard } from '../TodoCard/TodoCard';

const ItemsList = ({ items, onDelete, onEdit, onToggleDone, title }) => {
  return (
    <Box mt={ 2 } mb={ 2 }>
      { title && (<>
        <Typography variant="h4">{ title }</Typography>
        <Divider />
      </>) }
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