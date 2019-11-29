import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { object } from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { apiClient } from 'api/api';
import { DeleteTodoDialog } from 'components/DeleteTodoDialog/DeleteTodoDialog';
import { EditTodoDialog } from 'components/EditTodoDialog/EditTodoDialog';
import ItemsList from 'components/ItemsList/ItemsList';
import { NewTodo } from 'components/NewTodo/NewTodo';
import { useSnackbar } from 'utils/useSnackbar/useSnackbar';

const propTypes = {
  api: object
};

const defaultProps = {
  api: apiClient
};

export const TodoList = ({ api }) => {
  const { showSuccessSnackbar, showErrorSnackbar } = useSnackbar();
  const [todos, setTodos] = useState([]);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [todoToEdit, setTodoToEdit] = useState(null);

  const getTodos = useCallback(async () => {
    const response = await api.getTodos();
    setTodos(response);
  }, [setTodos, api]);

  const addTodo = useCallback(async (values, actions) => {
    await api.addTodo(values);
    actions.resetForm();
    getTodos();
    showSuccessSnackbar('Todo added!');
  }, [getTodos, showSuccessSnackbar, api]);

  const deleteTodo = useCallback(async () => {
    try {
      await api.deleteTodo(todoToDelete.id);
      getTodos();
      showSuccessSnackbar('Todo deleted!');
    } catch (error) {
      if (error.code === 404) {
        showErrorSnackbar('Cannot find todo.')
      } else {
        showErrorSnackbar('Unexpected error. Try again later.');
      }
    } finally {
      setTodoToDelete(null);
    }
  }, [showErrorSnackbar, showSuccessSnackbar, todoToDelete, api, getTodos]);

  const editTodo = useCallback(async (values, actions) => {
    try {
      await api.editTodo({ ...todoToEdit, ...values });
      getTodos();
      showSuccessSnackbar('Todo updated!');
    } catch (error) {
      if (error.code === 404) {
        showErrorSnackbar('Cannot find todo.')
      } else {
        showErrorSnackbar('Unexpected error. Try again later.');
      }
    } finally {
      setTodoToEdit(null);
      actions.resetForm();
    }
  }, [todoToEdit, getTodos, showErrorSnackbar, showSuccessSnackbar, api]);

  const toggleDoneTodo = useCallback(async (todo) => {
    try {
      await api.editTodo({ ...todo, isDone: !todo.isDone });
      getTodos();
    } catch (error) {
      if (error.code === 404) {
        showErrorSnackbar('Cannot find todo.')
      } else {
        showErrorSnackbar('Unexpected error. Try again later.');
      }
    }
  }, [getTodos, showErrorSnackbar, api]);

  const todo = todos.filter(item => !item.isDone);
  const finished = todos.filter(item => item.isDone);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <>
      <NewTodo addTodo={ addTodo } />

      <ItemsList
        items={ todo }
        onDelete={ setTodoToDelete }
        onEdit={ setTodoToEdit }
        onToggleDone={ toggleDoneTodo }
      />

      <ItemsList
        title='Finished'
        items={ finished }
        onDelete={ setTodoToDelete }
        onEdit={ setTodoToEdit }
        onToggleDone={ toggleDoneTodo }
      />

      <DeleteTodoDialog
        todo={ todoToDelete }
        onDelete={ deleteTodo }
        onCancel={ () => setTodoToDelete(null) }
      />

      <EditTodoDialog
        todo={ todoToEdit }
        onCancel={ () => setTodoToEdit(null) }
        onSave={ editTodo }
      />
    </>
  )
};

TodoList.propTypes = propTypes;
TodoList.defaultProps = defaultProps;