import React from 'react'

export default function CardStats({title,stat,children}) {
  return (

<article className="flex items-end justify-between rounded-lg border shadow-lg border-gray-300 bg-white p-6 w-1/5">
  <div className="flex items-center gap-4">
    <span className="hidden rounded-full bg-gray-100 p-2 text-gray-600 sm:block">
   {children}
    </span>

    <div>
      <p className="text-xl font-bold text-gray-500">{title}</p>

      <p className="text-2xl font-medium text-gray-900">{stat}</p>
    </div>
  </div>

</article>


  )
}
