import express from "express"

import isAuth from "../middlewares/isAuth.js"
import { billing, confirmDemoPayment } from "../controllers/billing.controller.js"


const billingRouter=express.Router()

billingRouter.post("/",isAuth,billing)
billingRouter.post("/demo-confirm",isAuth,confirmDemoPayment)


export default billingRouter