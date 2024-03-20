import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
const formSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string()
})
import "./pagestyles/grid.css"
import { Codesandbox, Loader } from "lucide-react"
import { HandleErrors } from "@/utils/HandleErrors"
import { toast } from "sonner"
import { useState } from "react"
import { useSignupMutation } from "@/redux/api"
const Signup = () => {
    const [signup] = useSignupMutation();
    const [loading, setLoading] = useState<boolean>(false)
    const navigator = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    })
    async function handleSignup(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            const res = await signup(values).unwrap();
            if (res) {
                toast("Sign Up Successfull");
                setTimeout(() => {
                    setLoading(false)
                    navigator('/login');
                }, 2000);
            }
            

        } catch (error) {
            setLoading(false)
            HandleErrors(error);
        }
    }

    return (
        <div className='__login grid-bg w-full h-[calc(100vh-60px)] flex flex-col justify-center items-center gap-2'>
            <div className="background_container w-[40%] h-[80%] rounded-xl  backdrop-blur-[10px] border-[1px] p-7 flex flex-col gap-5">

                <div className=" flex flex-col gap-2">
                    <h1 className="text-4xl font-bold text-black">Sign up</h1>
                    <p className="flex justify-center font-medium items-center gap-2 text-2xl text-black">Create your new Account... <Codesandbox /></p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-8 p-10 h-[90%] rounded-sm bg-black gap-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>

                                    <FormControl>
                                        <Input placeholder="Enter username..." {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>

                                    <FormControl>
                                        <Input placeholder="Enter email..." {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>

                                    <FormControl>
                                        <Input placeholder="Enter password..." {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className={`w-full mt-20 font-bold ${loading ? `cursor-not-allowed` : <></>} `} type="submit">{loading ? <Loader className="animate-spin mr-1" /> : <></>}Create Account</Button>
                        <small className="text-white flex justify-end text-xl">Already have an account?<Link className=" flex justify-center ml-2 items-center text-xl font-semibold bg-white text-black px-2 py-1 rounded-full" to="/login">Login</Link></small>
                    </form>
                </Form>

            </div>
        </div>
    )
}

export default Signup