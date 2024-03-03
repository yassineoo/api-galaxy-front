import { SetStateAction } from "react"
import Button from "../button/button"
const Modal = ({closeModal}:{
    closeModal:(value: SetStateAction<boolean>) => void
}) => {
  return (
<div id="popup-modal" className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full md:inset-0 max-h-full overlay">
    <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            
            <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">A email confirmation has been sent !</h3>
                <Button submit={()=>closeModal(false)} style={"text-white bg-mainColor focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"} title="OK" />
                 
            </div>
        </div>
    </div>
</div>

  )
}

export default Modal
