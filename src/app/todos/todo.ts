export class Todo {
    id: number;
    title = '';
    due_date: Date;
    complete = false;
    parent: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
