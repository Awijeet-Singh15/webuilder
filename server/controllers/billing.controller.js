import { PLANS } from "../config/plan.js"
import User from "../models/user.model.js"

export const billing=async (req,res)=>{
try {
    const {planType}=req.body
    const plan=PLANS[planType]
    if(!plan || plan.price==0){
        return res.status(400).json({message:"invalid paid plan"})
    }

    return res.status(200).json({
        sessionUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/demo-payment?planType=${planType}`
    })

} catch (error) {
    console.log(error)
    return res.status(500).json({message:`billing error: ${error}`})
}
}

export const confirmDemoPayment = async (req, res) => {
    try {
        const { planType } = req.body;
        const userId = req.user._id;
        const plan = PLANS[planType];
        
        if(!plan || plan.price==0){
            return res.status(400).json({message:"invalid paid plan"})
        }

        await User.findByIdAndUpdate(userId, {
            $inc: { credits: plan.credits },
            plan: plan.plan
        });

        return res.status(200).json({ message: "Payment successful" });
    } catch (error) {
        return res.status(500).json({message: `billing error: ${error}`});
    }
}