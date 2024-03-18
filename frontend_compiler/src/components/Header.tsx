
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Codesandbox } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { useLogoutMutation } from '@/redux/api'
import { updateCurrentUser, updateIsLoggedIn } from '@/redux/slices/appSlice'
import { HandleErrors } from '@/utils/HandleErrors'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Header = () => {
    const navigator = useNavigate();
    const [logout] = useLogoutMutation();
    const isLoggedIn = useSelector((state: RootState) => state.appSlice.isLoggedIn)
    const currUser = useSelector((state: RootState) => state.appSlice.currentUser)
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            const res = await logout().unwrap();
            toast("logged out successfully!");
            navigator('/');
            dispatch(updateIsLoggedIn(false));
            dispatch(updateCurrentUser({}))
        } catch (error) {

            HandleErrors(error);
        }
    }
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
                    <Link to="/all-codes">

                        <Button variant="secondary">
                            All Codes
                        </Button>
                    </Link>
                </li>
                {
                    isLoggedIn ? (<div className='flex gap-2'>
                        <Link to="/my-codes">

                            <Button variant="secondary">
                                My Codes
                            </Button>
                        </Link>
                        <Button onClick={handleLogout} variant="destructive">
                            Logout
                        </Button>
                        <Avatar>
                            <AvatarImage src={currUser.picture} />
                            <AvatarFallback className='capitalize'>{currUser.username?.slice(0, 1)}</AvatarFallback>
                        </Avatar>

                    </div>) : (
                        <>
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
                        </>

                    )
                }

            </ul>
        </nav>
    )
}

export default Header