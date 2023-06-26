import express from "express";
import { getAllWeather,storeWeather } from "../controllers/weather.js";

const router = express.Router()

router.get('/all', getAllWeather)
router.post('/store', storeWeather)

export default router