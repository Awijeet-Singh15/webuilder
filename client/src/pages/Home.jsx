import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import LoginModal from '../components/LoginModal'
import { useDispatch, useSelector } from 'react-redux'
import { Coins } from "lucide-react"
import { serverUrl } from '../App'
import axios from 'axios'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
function Home() {

    const highlights = [
        "AI Generated Code",
        "Fully Responsive Layouts",
        "Production Ready Output",
    ]

    const [openLogin, setOpenLogin] = useState(false)
    const { userData } = useSelector(state => state.user)
    const [openProfile, setOpenProfile] = useState(false)
    const [websites, setWebsites] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogOut = async () => {
        console.log("logout click")
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            dispatch(setUserData(null))
            setOpenProfile(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!userData) return;
        const handleGetAllWebsites = async () => {

            try {

                const result = await axios.get(`${serverUrl}/api/website/get-all`, { withCredentials: true })
                setWebsites(result.data || [])

            } catch (error) {
                console.log(error)

            }
        }
        handleGetAllWebsites()
    }, [userData])
    return (
        <div className='relative min-h-screen bg-[#040404] text-white overflow-hidden'>
            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute top-20 left-0 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px]' />
                <div className='absolute bottom-40 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px]' />
                <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
            </div>
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10'
            >
                <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
                    <div className='text-lg font-semibold'>
                        Webuilder
                    </div>
                    <div className='flex items-center gap-5'>
                        <div className='hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer' onClick={() => navigate("/pricing")}>
                            Pricing
                        </div>
                        {userData && <div className='hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition' onClick={() => navigate("/pricing")}>
                            <Coins size={14} className='text-yellow-400' />
                            <span className='text-zinc-300'>Credits</span>
                            <span>{userData.credits}</span>
                            <span className='font-semibold'>+</span>
                        </div>}


                        {!userData ? <button className='px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm'
                            onClick={() => setOpenLogin(true)}
                        >

                            

                            Get Started
                        </button>
                            :
                            <div className='relative'>
                                <button className='flex items-center' onClick={() => setOpenProfile(!openProfile)}>
                                    <img src={userData?.avatar || `https://ui-avatars.com/api/?name=${userData.name}`} alt="" referrerPolicy='no-referrer' className='w-9 h-9 rounded-full border border-white/20 object-cover' />
                                </button>
                                <AnimatePresence>
                                    {openProfile && (
                                        <>
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden"
                                            >
                                                <div className='px-4 py-3 border-b border-white/10'>
                                                    <p className='text-sm font-medium truncate'>{userData.name}</p>
                                                    <p className='text-xs text-zinc-500 truncate'>{userData.email}</p>
                                                </div>

                                                <button className='md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5'>
                                                    <Coins size={14} className='text-yellow-400' />
                                                    <span className='text-zinc-300'>Credits</span>
                                                    <span>{userData.credits}</span>
                                                    <span className='font-semibold'>+</span>
                                                </button>

                                                <button className='w-full px-4 py-3 text-left text-sm hover:bg-white/5' onClick={() => navigate("/dashboard")}>Dashboard</button>
                                                <button className='w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5' onClick={handleLogOut}>Logout</button>

                                            </motion.div>
                                        </>

                                    )}

                                </AnimatePresence>

                            </div>

                        }

                    </div>
                </div>
            </motion.div>

            <section className='pt-44 pb-32 px-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto'>
                <div className='md:w-1/2 text-left relative z-10'>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm mb-6'
                    >
                        <span className='w-2 h-2 rounded-full bg-orange-500 animate-pulse'></span>
                        Webuilder 2.0 is live
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight"
                    >
                        Build Stunning Websites <br />
                        <span className='bg-linear-to-r from-orange-400 via-red-500 to-orange-500 bg-clip-text text-transparent bg-300% animate-gradient'>with AI</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='mt-8 text-zinc-400 text-lg max-w-xl font-light leading-relaxed'
                    >
                        Describe your idea and let AI generate a modern,
                        responsive, production-ready website.
                    </motion.p>


                    <button className="px-10 py-4 rounded-xl bg-linear-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)] text-white font-semibold hover:scale-105 hover:-translate-y-1 transition-all mt-12 relative overflow-hidden group" onClick={() =>userData? navigate("/dashboard"):setOpenLogin(true)}>
                        <div className='absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] skew-x-12'></div>
                        {userData ? "Go to dashboard" : "Get Started"}
                    </button>
                </div>
                <div className='md:w-1/2 mt-16 md:mt-0 w-full perspective-[2000px] relative z-10'>
                    <motion.div
                        initial={{ opacity: 0, rotateY: 15, rotateX: 10, y: 40 }}
                        animate={{ opacity: 1, rotateY: -10, rotateX: 5, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
                        className="w-full aspect-video rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(249,115,22,0.3)] backdrop-blur-xl group cursor-pointer transition-all duration-500"
                    >
                        <div className='absolute inset-0 bg-linear-to-tr from-orange-500/20 via-transparent to-transparent pointer-events-none group-hover:opacity-70 transition-opacity' />
                        <div className='absolute inset-0 opacity-20 bg-[url("https://www.transparenttextures.com/patterns/cubes.png")] mix-blend-overlay pointer-events-none'></div>
                        <div className='flex flex-col items-center opacity-70 group-hover:opacity-100 transition-opacity transform group-hover:-translate-y-2 duration-500'>
                             <div className='w-20 h-20 rounded-2xl bg-gradient-to-tr from-orange-500/20 to-red-500/20 border border-orange-500/30 flex items-center justify-center mb-4 shadow-[0_0_30px_-5px_rgba(249,115,22,0.4)]'>
                                <span className='text-orange-400 font-extrabold text-3xl'>W</span>
                             </div>
                             <span className='text-zinc-300 font-semibold tracking-widest uppercase text-sm drop-shadow-md'>Webuilder Preview</span>
                        </div>
                    </motion.div>
                </div>
            </section>
            {!userData && <section className='max-w-7xl mx-auto px-6 pb-32 relative z-10'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]'>
                    {highlights.map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`rounded-3xl bg-white/5 border border-white/10 p-8 flex flex-col justify-end overflow-hidden relative group hover:bg-white/10 transition-colors ${i === 0 ? 'md:col-span-2' : i === 2 ? 'md:col-span-2' : 'md:col-span-2'}`}
                        >
                            <div className='absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full transition-transform group-hover:scale-110' />
                            <h1 className='text-2xl font-bold mb-3 text-white z-10'>{h}</h1>
                            <p className='text-sm text-zinc-400 z-10 max-w-sm'>
                                Webuilder builds real websites — clean code,
                                animations, responsiveness and scalable structure.
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>}

            {/* Website Detail Section */}
            {!userData && <section className='max-w-7xl mx-auto px-6 pb-32 relative z-10'>
                <div className="text-center mb-16">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        Every detail, perfected.
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-lg max-w-2xl mx-auto"
                    >
                        Webuilder doesn't just generate layouts. It crafts fully-functional, responsive, and beautiful websites down to the last pixel.
                    </motion.p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24'>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-2xl font-semibold mb-4 text-orange-400">Production-Ready Architecture</h3>
                        <p className="text-zinc-400 leading-relaxed mb-6">
                            Say goodbye to messy, bloated AI code. Every website generated uses semantic HTML5 and clean CSS structure. Built to scale, easy to read, and fully compatible with modern web standards.
                        </p>
                        <ul className="space-y-3 text-sm text-zinc-300">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Semantic Elements</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> Modular CSS Variables</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div> No External Dependencies</li>
                        </ul>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-bl-full blur-3xl"></div>
                        <pre className="text-xs text-zinc-400 font-mono leading-loose overflow-x-auto">
                            <span className="text-blue-400">&lt;section</span> <span className="text-sky-300">className</span>=<span className="text-orange-300">"hero"</span><span className="text-blue-400">&gt;</span><br/>
                            {'  '}<span className="text-blue-400">&lt;div</span> <span className="text-sky-300">className</span>=<span className="text-orange-300">"container"</span><span className="text-blue-400">&gt;</span><br/>
                            {'    '}<span className="text-blue-400">&lt;h1&gt;</span>Built for Scale<span className="text-blue-400">&lt;/h1&gt;</span><br/>
                            {'    '}<span className="text-blue-400">&lt;p&gt;</span>Optimized performance.<span className="text-blue-400">&lt;/p&gt;</span><br/>
                            {'  '}<span className="text-blue-400">&lt;/div&gt;</span><br/>
                            <span className="text-blue-400">&lt;/section&gt;</span>
                        </pre>
                    </motion.div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-2 md:order-1 bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden flex items-center justify-center min-h-[300px]"
                    >
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 rounded-tr-full blur-3xl"></div>
                        <div className="flex gap-4 items-end">
                            <div className="w-16 h-32 bg-[#121212] rounded-lg border border-white/10 relative shadow-xl"><div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-white/20"></div></div>
                            <div className="w-24 h-48 bg-[#121212] rounded-xl border border-white/10 shadow-xl"></div>
                            <div className="w-40 h-64 bg-[#121212] rounded-2xl border border-white/10 shadow-xl flex flex-col overflow-hidden"><div className="h-4 border-b border-white/10 flex items-center px-2 gap-1 bg-white/5"><div className="w-1.5 h-1.5 rounded-full bg-red-400/80"></div><div className="w-1.5 h-1.5 rounded-full bg-yellow-400/80"></div><div className="w-1.5 h-1.5 rounded-full bg-green-400/80"></div></div></div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-1 md:order-2"
                    >
                        <h3 className="text-2xl font-semibold mb-4 text-red-400">Flawless Responsiveness</h3>
                        <p className="text-zinc-400 leading-relaxed mb-6">
                            Every design adapts perfectly to mobile, tablet, and desktop screens. We use modern Flexbox and Grid layouts to ensure your users get the best experience, no matter their device.
                        </p>
                        <ul className="space-y-3 text-sm text-zinc-300">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Mobile-First Approach</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Fluid Typography</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> Touch-Friendly Targets</li>
                        </ul>
                    </motion.div>
                </div>
            </section>}


            {userData && websites?.length > 0 && (
                <section className='max-w-7xl mx-auto px-6 pb-32'>
                    <h3 className='text-2xl font-semibold mb-6'>Your Websites</h3>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {websites.slice(0, 3).map((w, i) => (
                            <motion.div
                                key={w._id}
                                whileHover={{ y: -6 }}
                                onClick={() => navigate(`/editor/${w._id}`)}
                                className="cursor-pointer rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
                            >
                                <div className='h-40 bg-black'>
                                    <iframe
                                        srcDoc={w.latestCode}
                                        className='w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white'
                                    />
                                </div>
                                <div className='p-4'>
                                    <h3 className='text-base font-semibold line-clamp-2'>{w.title}</h3>
                                    <p className='text-xs text-zinc-400'>Last Updated {""}
                                        {new Date(w.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>


                            </motion.div>
                        ))}

                    </div>
                </section>

            )}



            <footer className='border-t border-white/10 py-10 text-center text-sm text-zinc-500'>
                &copy; {new Date().getFullYear()} Webuilder by Awijeet
            </footer>

            {openLogin && <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />}

        </div>
    )
}

export default Home
