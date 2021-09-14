import {makeAutoObservable} from "mobx";
import {v4} from "uuid"

class TodoStore {
    todos = [{name:"lav kode", id:"1"}]

    constructor(props) {
        makeAutoObservable(this,{},{autoBind:true});
    }
    addTodo(todo){
        todo.id=this.todos.length+1;
        this.todos.push(todo)
    }
}
export const Todos = new TodoStore();