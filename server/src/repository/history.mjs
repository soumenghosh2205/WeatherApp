import db from "../db/conn.mjs";

export const getSearchedCities = async (username) => {
    return await db.collection('SearchedCities').find({ username: username }).toArray()
}

export const getSearchedCity = async (username, lat, long) => {
    return await db.collection('SearchedCities').findOne({username: username, lat: lat, long: long})
}

export const createSearchedCity = async (username, abbr, name, capital, lat, long) => {
    var savedDocument = await db.collection('SearchedCities').insertOne({ username, abbr, name, capital, lat, long, createdAt: new Date().toISOString() })
    return savedDocument
}