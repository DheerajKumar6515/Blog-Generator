import { useEffect, useState } from 'react'
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown'
import {  HashLoader } from "react-spinners";

function App() {
  const [nextpage, setNextpage] = useState(false);
  const [text,setText]=useState('')
  const [generatedtext,setGeneratedtext]=useState('')
  const [loading,setLoading]=useState(true)
  const [open,setOpen]=useState(false)

  const ai = new GoogleGenAI({ apiKey:`${import.meta.env.VITE_API_KEY}` });

async function generateblog() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Write a detailed and engaging blog post about ${text}. Start with an engaging introduction that explains the topic and why its important. Then, in the main body, break it down into sections with clear subheadings. In one section, explain in a few words how AI works: AI works by using algorithms to find patterns in data, learn from it, and make predictions or decisions without explicit programming. Provide useful information, examples, and any relevant data to support your points. End with a strong conclusion that summarizes the topic and includes a call to action or closing remark. Make the blog easy to read, SEO-friendly, and around 800-1200 words in length.`,
  });
     setGeneratedtext(response.text);
     setLoading(false)
}


  return (
    <>
      {nextpage ?
      <div className='w-full h-auto bg-gray-900'>
         <nav className='w-full border-b border-gray-500 bg-black/70 h-12 fixed top-0 z-50 flex items-center justify-between px-5 md:h-16 lg:h-20 xl:h-12 cursor-pointer'>
           <div onClick={()=>{setNextpage(false)}} className='font-medium font-serif text-xl text-white lg:text-2xl xl:text-lg'>Blog Generator</div>
           <div onClick={()=>{setNextpage(false)}} className='border  px-2 py-0.3 rounded cursor-pointer text-white/50 lg:text-xl xl:text-[15px]'>Logout</div>
        </nav>

        <h1 className='text-white pt-15 font-bold pl-10'>Output 👉</h1>

         <div className='w-full min-h-screen mt-3 relative'>
          {loading ?
           <div className='absolute left-[50%] top-[40%]'>
           <HashLoader color={'#00bfff'}/> </div>:
            <div className='px-10 pt-1 text-white'>
            <Markdown >
              {generatedtext}
            </Markdown>
            </div>
      }
         </div>

      </div>
      :
      <div className='w-full h-screen bg-gray-900 flex items-center justify-center relative px-3'>

        <nav className='w-full border-b border-gray-900 bg-black/70 h-12 fixed top-0 z-50 flex items-center justify-between px-5 md:h-16 lg:h-20 xl:h-12'>
           <div className='font-medium font-serif text-xl text-white lg:text-2xl xl:text-lg' >
            Blog Generator
            </div>
           <div className='border px-2 py-0.3 rounded cursor-pointer text-white/50 hover:text-white lg:text-xl xl:text-[15px]'>Logout</div>
        </nav>

        <div className={`${open ?"w-40":"w-10" } bg-gray-800 h-[93%] mt-12 fixed left-0 z-50  overflow-hidden transition-all duration-300 ease-in-out`}>
            <p onClick={()=>setOpen(!open)} className='text-white w-full py-0.5 px-3 flex items-center justify-end text-xl cursor-pointer'>&#9776;</p>
           <div className={`${open ? 'block':'hidden'} border-b border-gray-500 px-1 py-2 flex items-center justify-between`}>
             {/* <p className='text-white/40 text-sm'>{JSON.parse(localStorage.getItem('searchItem'))}</p> */}
             <p className='text-white/40 text-sm px-3 capitalize'>{localStorage.getItem('searchItem')}</p>
           </div>

        </div>

          <div className='-mt-24'>
              <p className='text-white/50 text-sm text-center font-sans lowercase md:text-lg lg:text-2xl xl:text-base'>Hi 👋</p>
              <h3 className='text-white/50 text-xl text-center font-sans md:text-3xl lg:text-4xl xl:text-[28px]'>I'm AI Blog Generator</h3>
              <h2 className='text-white/50 text-center font-sans md:text-lg lg:text-2xl xl:text-xl'>How can I help you ✌️</h2>
          </div>

        <div className='absolute  bottom-5 flex flex-col'>
            <textarea onChange={(e)=>setText(e.target.value)} className='border border-gray-500 text-white/60 w-80 h-28 rounded-sm p-3 text-sm outline-0 md:w-[39rem] md:h-[10rem] md:text-xl lg:w-[55rem] lg:h-[15rem] lg:text-3xl xl:h-32 xl:text-[15px] xl:rounded-xl' placeholder='Explain your blog topic....'></textarea>

            <div className='w-full xl:inline-flex xl:justify-end'>
                  <button onClick={()=>{
                    generateblog(),
                    localStorage.setItem('searchItem',text);
                    setNextpage(true)
                    setText('')
                    }} className=' mt-2 w-full md:mt-4 md:py-3 rounded-lg py-1 capitalize bg-green-600 text-white hover:bg-green-500 cursor-pointer lg:py-6 lg:text-2xl xl:py-[8px] xl:text-[18px] xl:w-24 xl:h-8 xl:mt-[5px] flex justify-center items-center'>
                      <img className='w-7 ' src="/paper-plane.png" alt="paper-plan img" />
                    </button>
            </div>


        </div>

      </div>}
    </>
  )
}

export default App
