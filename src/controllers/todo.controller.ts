import { Request, Response } from 'express';
import { Todo } from '../models/Todos'

export const all = async (req: Request, res: Response) => {
    const list = await Todo.findAll();
    res.json({ list });

}

export const add = async (req: Request, res: Response) => {
    if(req.body.title) {
        
        let newTodo = await Todo.create({
            title: req.body.title,
            done: req.body.done ? true: false 
        });
        res.status(201).json({item: newTodo});

    }

    res.json({ error: 'Dados não enviado.' });
}

export const update = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    
    let todo = await Todo.findByPk(id);

    if(todo) {
        if(req.body.title){
            todo.title = req.body.title;
        }
        if(req.body.done){
            switch (req.body.done.toLowerCase()){
                case 'true':
                case '1':
                    todo.done = true;
                break;

                case 'false':
                case '0':
                    todo.done = false;
            }
        }
        await todo.save();
        res.json({dados: todo});
    }

    res.json({error: 'Item não encontrados.'});
}

export const remove = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let todos = await Todo.findByPk(id);
    if(todos){
        todos.destroy();
    }
    res.json({});


}