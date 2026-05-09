import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ShieldCheck } from 'lucide-react';
import { motion } from "motion/react";
import axios from 'axios';
import { serverUrl } from '../App';
import toast from 'react-hot-toast';

function DemoPayment() {
    const [searchParams] = useSearchParams();
    const planType = searchParams.get('planType');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleConfirmPayment = async () => {
        setLoading(true);
        try {
            await axios.post(`${serverUrl}/api/billing/demo-confirm`, { planType }, { withCredentials: true });
            toast.success("Payment Successful!");
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            toast.error("Payment failed. Please try again.");
            setLoading(false);
        }
    };

    if (!planType) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <p>Invalid plan selected.</p>
            </div>
        );
    }

    return (
        <div className='relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 py-24 flex items-center justify-center'>
            {/* Background elements */}
            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute -top-40 -left-40 w-[500px] h-[500px] bg-orange-600/20 rounded-full blur-[120px]' />
                <div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-600/20 rounded-full blur-[120px]' />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-md p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl text-center"
            >
                <div className="flex justify-center mb-6">
                    <div className="p-4 bg-green-500/20 rounded-full">
                        <ShieldCheck className="w-12 h-12 text-green-400" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold mb-2">Demo Payment</h1>
                <p className="text-zinc-400 mb-6">
                    You are simulating a payment for the <span className="font-semibold text-white capitalize">{planType}</span> plan.
                </p>

                <div className="space-y-4 text-left bg-black/30 p-4 rounded-xl border border-white/5 mb-8">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-400">Status</span>
                        <span className="flex items-center text-green-400 gap-1"><CheckCircle size={14} /> Always Success</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-400">Plan</span>
                        <span className="text-white capitalize font-medium">{planType}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={handleConfirmPayment}
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-xl font-semibold bg-orange-500 hover:bg-orange-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Processing..." : "Confirm Payment (Demo)"}
                    </button>
                    
                    <button
                        onClick={() => navigate("/pricing")}
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-xl font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 transition"
                    >
                        Cancel
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default DemoPayment;
