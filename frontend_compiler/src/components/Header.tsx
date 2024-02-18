
import { Link } from 'react-router-dom'
import { Button } from './ui/button'

const Header = () => {
    return (
        <nav className='w-full h-[80px] bg-gray-900 text-white p-6 flex justify-between items-center'>
            <Link to="/">
                <h2 className='font-bold select-none text-[25px]'>
                    Frontend Compiler
                </h2>
            </Link>
            <ul className='flex gap-2'>
                <li>
                    <Link to="/compile">

                        <Button variant="secondary">
                            Compiler
                        </Button>
                    </Link>

                </li>
            </ul>
        </nav>
    )
}

export default Header