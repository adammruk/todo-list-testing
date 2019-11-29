import Cookies from 'universal-cookie';
import uuidv1 from 'uuid/v1'

const delay = ms => new Promise(res => setTimeout(res, ms));
const TODOS_COOKIE = 'todos';

class ApiClient {
  constructor() {
    this.cookies = new Cookies();
  }

  get cookiesTodos() {
    const todos = this.cookies.get(TODOS_COOKIE) || [];
    console.log(todos);
    return todos.map(({ dueDate, ...todo }) => {
      return {
        ...todo,
        dueDate: new Date(dueDate)
      }
    })
  }

  async login({ email, password }) {
    await delay(500);
    if (email === 'todo@test.com' && password === 'password') {
      return Promise.resolve()
    }
    return Promise.reject({ code: 401 });
  }

  async getTodos() {
    return Promise.resolve(this.cookiesTodos);
  }

  async addTodo(todo) {
    const todos = this.cookiesTodos;
    todos.push({ ...todo, id: uuidv1() });
    this.cookies.set(TODOS_COOKIE, todos);
  }

  async editTodo(newTodo) {
    const todos = this.cookiesTodos;
    const index = todos.findIndex(todo => todo.id === newTodo.id);
    if (index === -1) {
      return Promise.reject({ code: 404 })
    } else {
      todos[index] = newTodo;
      this.cookies.set(TODOS_COOKIE, todos);
      return Promise.resolve(newTodo);
    }
  }

  async deleteTodo(id) {
    const todos = this.cookiesTodos;
    const index = todos.findIndex(todo => todo.id === id);
    if (index === -1) {
      return Promise.reject({ code: 404 })
    } else {
      todos.splice(index, 1);
      this.cookies.set(TODOS_COOKIE, todos);
      return Promise.resolve(id);
    }
  }
}

export const apiClient = new ApiClient();
