import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
    async index(req: Request, res: Response) {
        const items = await knex('items').select('*');
    
        const serializedItems = items.map(el => {
            return {
                id: el.id,
                title: el.title,
                image_url: `http://192.168.4.101:3001/uploads/${el.image}`,
            };
        });
    
        return res.json({ message: serializedItems });
    }
}

export default ItemsController;