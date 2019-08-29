import XHRRequest from './xhr-request';
/**
 * /columns
 * [GET]
 * Get columns
 */
export const fetchColumns = async () => {
    try {

        const response = await fetch("http://localhost:3000/columns");
        return await response.json();

    } catch (err) {

        console.error(err);
        throw err;

    }
}
/**
 * /cards
 * [GET]
 * Get all cards
 */
export const fetchCards = async () => {
    try {

        const response = await fetch("http://localhost:3000/cards");
        return await response.json();

    } catch (err) {

        console.error(err);
        throw err;

    }
}
/**
 * /columns/:columnId/cards
 * [GET]
 * Get all card according to its column
 */
export const fetchCardsByColumn = async columnId => {
    try {

        const response = await fetch(`http://localhost:3000/columns/${columnId}/cards`);
        return await response.json();

    } catch (err) {

        console.error(err);
        throw err;

    }
}
/**
 * /columns
 * [POST]
 * Add a new column
 */
export const addColumn = async (column) => {
    try {

        const url = `http://localhost:3000/columns`
        return await XHRRequest.post({
            url,
            data: column
        });

    } catch (err) {

        console.error(err);
        throw err;

    }
}
/**
 * /columns/:columnId/cards
 * [POST]
 * Add a card to a column
 */
export const addCard = async ({ columnId, card }) => {
    try {

        const url = `http://localhost:3000/columns/${columnId}/cards`
        return await XHRRequest.post({
            url,
            data: card
        });


    } catch (err) {

        console.error(err);
        throw err;

    }
}
/**
 * /columns/:id
 * [DELETE]
 * Delete an entire column
 */
export const deleteColumn = async (columnId) => {
    try {

        const url = `http://localhost:3000/columns/${columnId}`
        return await XHRRequest.delete(url);

    } catch (err) {

        console.error(err);
        throw err;

    }
}
/**
 * /cards/:id
 * [DELETE]
 * Remove a Card
 */
export const deleteCard = async (cardId) => {
    try {

        const url = `http://localhost:3000/cards/${cardId}`
        return await XHRRequest.delete(url);

    } catch (err) {

        console.error(err);
        throw err;

    }
}