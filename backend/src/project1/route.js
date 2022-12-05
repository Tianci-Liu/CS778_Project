import express from 'express';
import {
    createItem,
    retrieveItem,
    retrieveItemList,
    updateItem,
    deleteItem
} from './item-dao.js';

// const HTTP_OK = 200; // Not really needed; this is the default if you don't set something else.
const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

router.get('/', async (req, res) => {
    const item = await retrieveItemList();
    res.json(item)
})
router.get('/:id', async (req, res) => {
    const {id} = req.params
    const item = await retrieveItem(id);
    if (item) {
        res.json(item);
    }
    else {
        res.sendStatus(HTTP_NOT_FOUND);
    }
})
router.post('/', async (req, res) => {
    var {body} = req;
    const item = await createItem(body);
    res.status(HTTP_CREATED)
        .header('Location', `/api/todos/${item._id}`)
        .json(item);
})
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const item = req.body;
    item._id = id;
    const success = await updateItem(item);
    res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
})
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await deleteItem({_id: id});
    res.sendStatus(HTTP_NO_CONTENT);
})

export default router ;
