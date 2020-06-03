import { Request, Response, response } from 'express';
import knex from '../database/connection';

class PointsController {
    async create(req: Request, res: Response) {
        const {
            name, email, whatsapp, latitude, longitude, city, uf, items
        } = req.body;

        const point = { 
            name, 
            email, 
            whatsapp, 
            latitude, 
            longitude, 
            city, 
            uf, 
            image: 'https://images.unsplash.com/photo-1519378677857-bcaadd0a274e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60' 
        };

        const trx = await knex.transaction();

        const insertedIds = await trx('points').insert( point );

        const point_id = insertedIds[0];

        const point_items = items.map((el: number) => {
            return {
                item_id: el,
                point_id
            };
        });

        await trx('point_items').insert(point_items);

        await trx.commit();

        return res.json({ 
            id: point_id,
            ...point,
         });
    }

    async index(req: Request, res: Response){
        const { city, uf, items } = req.query;

        const parsedItems = String(items)
        .split(',')
        .map(el => Number(el.trim()));

        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id')
        .whereIn('point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');

        return res.json(points);
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();

        if(!point) {
            return response.status(400).json({ message: 'Not Found'});
        }
        
        const items = await knex('items')
        .join('point_items', 'items.id', '=', 'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title');

        return res.json({ point, items });
    }
}

export default PointsController;