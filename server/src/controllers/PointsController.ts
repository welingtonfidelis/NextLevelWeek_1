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
            image: req.file.filename
        };

        const trx = await knex.transaction();

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const point_items = items
            .split(',')
            .map((el: string) => Number(el.trim()))
            .map((el: number) => {
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

    async index(req: Request, res: Response) {
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

        const serializedPoints = points.map(el => {
            return {
                ...el,
                image_url: `http://192.168.4.101:3001/uploads/profile/${el.image}`
            }
        });

        return res.json(serializedPoints);
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Not Found' });
        }

        const serializedPoint = {
            ...point,
            image_url: `http://192.168.4.101:3001/uploads/profile/${point.image}`
        };

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');

        return res.json({ point: serializedPoint, items });
    }
}

export default PointsController;