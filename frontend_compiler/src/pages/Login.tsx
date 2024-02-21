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

import "./pagestyles/grid.css"
import { Codesandbox, Loader } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { HandleErrors } from "@/utils/HandleErrors"
import { useState } from "react"
const formSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const navigator = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function handleLogin(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            fetch("http://localhost:4000/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
                .then(res => {
                    if (!res.ok) {
                        toast('Failed to login');
                        setLoading(false);
                    }
                    return res.json();
                })
                .then(data => {
                    toast("Login Successfull");
                    setLoading(true);
                    setTimeout(() => {
                        navigator('/compile');
                    }, 2000);
                })
                .catch(error => {
                    toast(error);
                });
        } catch (error) {
            HandleErrors(error);
        }
        console.log(values)
    }
    return (
        <div className='__login grid-bg w-full h-[calc(100vh-60px)] flex flex-col justify-center items-center gap-2'>
            <div className="background_container w-[40%] h-[70%] rounded-xl backdrop-blur-[10px] border-[1px] p-7 flex flex-col gap-5">

                <div className=" flex flex-col gap-2">
                    <h1 className="text-4xl font-bold text-black">Login</h1>
                    <p className="flex justify-center font-medium items-center gap-2 text-2xl text-black">Welcome back fellow coder... <Codesandbox /></p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8 p-10 h-[90%] rounded-sm bg-black gap-4">
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
                        <Button className={`w-full mt-20 font-bold ${loading ? `cursor-not-allowed` : <></>} `} type="submit">{loading ? <Loader className="animate-spin mr-1 " /> : <></>} Login</Button>
                    </form>
                </Form>
            </div>
        </div >
    )
}

export default Login