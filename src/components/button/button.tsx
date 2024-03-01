"use client"
import React from 'react'

const Button = ({
    submit,
    title,
    style
}:{
    title:string
    submit:any
    style:string
}) => {
  return (
    <button className={style} onClick={submit}>
      {title}
    </button>
  )
}

export default Button
