import React from 'react'
import { GiAlgae } from 'react-icons/gi'

function Header({title}) {
  return (
    <div className="flex justify-between px-8 items-center gap-16">
        <div className="header-logo flex items-center text-3xl p-4 gap-4 bo rounded-2xl
                        border border-lime-100
                        cursor-pointer hover:bg-teal-700">
            <GiAlgae className='text-lime-300' size="36"/>
            Phycofinder
        </div>
        <h2 className='text-3xl'>{title}</h2>
    </div>
  )
}

export default Header