import dayjs from 'dayjs';
import Item from './item.js';

async function createItem(item) {
    const dbItem = new Item(item);
    await dbItem.save();
    return dbItem;
}

async function retrieveItemList() {
    return await Item.find();
}

async function retrieveItem(id) {
    return await Item.findById(id);
}

async function updateItem(item) {

    const dbItem = await Item.findById(item._id);
    if (dbItem) {
        dbItem.description = item.description;
        dbItem.completedStatus = item.completedStatus;
        dbItem.dueDate = dayjs(item.dueDate).toDate();
        await dbItem.save();
        return true;
    }

    return false;
}

async function deleteItem(id) {
    await Item.deleteOne({ _id: id });
}

export {
    createItem,
    retrieveItem,
    retrieveItemList,
    updateItem,
    deleteItem
}
