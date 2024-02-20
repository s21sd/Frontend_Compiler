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
const formSchema = z.object({
    username: z.string().email(),
    password: z.string()
})
import "./pagestyles/grid.css"
import { Codesandbox } from "lucide-react"
const Login = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })
    function handleLogin(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    return (
        <div className='__login grid-bg w-full h-[calc(100vh-60px)] flex flex-col justify-center items-center gap-2'>
            <div className="background_container w-[40%] h-[70%]  backdrop-blur-[10px] border-[1px] p-7 flex flex-col gap-5">

                <div className=" flex flex-col gap-2">
                    <h1 className="text-4xl font-bold text-black">Login</h1>
                    <p className="flex justify-center font-medium items-center gap-2 text-2xl text-black">Welcome back fellow coder... <Codesandbox /></p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8 p-10 h-[90%] rounded-sm bg-black gap-4">
                        <FormField
                            control={form.control}
                            name="username"
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
                        <Button className='w-full mt-20' type="submit">Login</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Login