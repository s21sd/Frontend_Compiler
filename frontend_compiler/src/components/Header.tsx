
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Codesandbox } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { HandleErrors } from '@/utils/HandleErrors'

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const checkForLogin = async () => {
        try {
            const res = await fetch('http://localhost:4000/auth/checklogin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
    
            console.log(res);
        } catch (error) {
            console.log("Error in check Login ", error);
        }
    }
    
    // useEffect(() => {
    //     checkForLogin();
    // }, []);

    return (
        <nav className='w-full h-[80px] bg-gray-900 text-white p-6 flex justify-between items-center'>
            <Link to="/">
                <h2 className='flex justify-center items-center gap-4 font-bold select-none text-[25px]'>
                    <Codesandbox size={32} />
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
                <li>
                    <Link to="/login">

                        <Button variant="default">
                            Login
                        </Button>
                    </Link>
                </li>
                <li>
                    <Link to="/signup">

                        <Button variant="default">
                            Signup
                        </Button>
                    </Link>
                </li>
                <Button onClick={checkForLogin}>CheckLogin</Button>
            </ul>
        </nav>
    )
}

export default Header