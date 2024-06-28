import React from 'react'
const styleCategories = "border rounded-[22px] px-[18px] border-[#1DBE60] text-[#b2b4bc] font-medium py-[8px]"
const Categories = () => {
  return (
    <div className='Categories'>
        <h3 className='py-4 text-[#1DBE60] font-bold text-3xl'>Categories</h3>
        <nav>
            <ul className='flex  pb-5 gap-[10px] overflow-x-scroll'>
                <li><button className={styleCategories}> lorem </button></li>
                <li><button className={styleCategories}> lorem </button></li>
                <li><button className={styleCategories}> lorem </button></li>
                <li><button className={styleCategories}> lorem </button></li>
                <li><button className={styleCategories}> lorem </button></li>
                <li><button className={styleCategories}> lorem </button></li>
                <li><button className={styleCategories}> lorem </button></li>
                <li><button className={styleCategories}> lorem </button></li>
                <li><button className={styleCategories}> lorem </button></li>
                <li><button className={styleCategories}> lorem </button></li>
                <li><button className={styleCategories}> lorem </button></li>
            </ul>
       </nav>
    </div>
  )
}

export default Categories