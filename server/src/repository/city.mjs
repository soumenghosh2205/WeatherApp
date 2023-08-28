import db from "../db/conn.mjs";

export const getAllCities = async () => {
    return await db.collection("Cities").find().toArray()
}