import { Link } from "react-router-dom"

function BvB() {

    localStorage.setItem('currentdifficulty',"Easy")

    return(
        <div className="h-screen w-screen items-center justify-center flex">
         <div className="name items-center justify-center">
        <p className="text-white text-9xl">404 NOT FOUND </p>
        
        <Link to='/' className="  border-4 p-4 flex h-50 w-100 items-center justify-center hover:scale-105  text-white text-4xl" >Under Development! Click me! </Link>
        </div>
        </div>
    )
}
export default BvB