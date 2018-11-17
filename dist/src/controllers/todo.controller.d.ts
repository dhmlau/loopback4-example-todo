import { Filter } from '@loopback/repository';
import { Todo } from '../models';
import { TodoRepository } from '../repositories';
import { GeocoderService } from '../services';
export declare class TodoController {
    protected todoRepo: TodoRepository;
    protected geoService: GeocoderService;
    constructor(todoRepo: TodoRepository, geoService: GeocoderService);
    createTodo(todo: Todo): Promise<Todo>;
    findTodoById(id: string, items?: boolean): Promise<Todo>;
    findTodos(filter?: Filter): Promise<Todo[]>;
    replaceTodo(id: string, todo: Todo): Promise<void>;
    updateTodo(id: string, todo: Todo): Promise<void>;
    deleteTodo(id: string): Promise<void>;
}
