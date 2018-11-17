import { DefaultCrudRepository, juggler } from '@loopback/repository';
import { Todo } from '../models';
export declare class TodoRepository extends DefaultCrudRepository<Todo, typeof Todo.prototype.id> {
    constructor(dataSource: juggler.DataSource);
}
