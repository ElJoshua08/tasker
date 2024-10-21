"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(7),
});

export default function LoginPage() {
  const [passwordHidden, setPasswordHidden] = useState(true);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <>
      <Card className="w-96 p-4 bg-background/30 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-3xl text-center tracking-[0.3em] pb-4">
            REGISTER
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent className="py-1">
          <Form {...form}>
            <form className="flex flex-col gap-4">
               <FormField
                name="username"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-light">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="h-10"
                        placeholder="John Doe"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-light">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="h-10"
                        placeholder="john.doe@example.com"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-light">
                      Password
                    </FormLabel>
                    <div className="relative w-full h-10 flex items-center justify-end px-4">
                      <FormControl>
                        <Input
                          type={passwordHidden ? "password" : "text"}
                          placeholder="·······"
                          {...field}
                          className="absolute top-0 left-0 w-full h-10"
                        />
                      </FormControl>
                      <div
                        className="z-10 cursor-pointer"
                        onClick={() => setPasswordHidden((prev) => !prev)}
                      >
                        {passwordHidden ? <EyeIcon /> : <EyeOffIcon />}
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex w-full items-end justify-end mt-6">
          <Button>Register</Button>
        </CardFooter>
      </Card>
      <Link href="/register">
        <Button
          variant="link"
          className="p-0 flex items-end transition-all duration-100 text-foreground/75 hover:text-foreground"
        >
          already have an account?
        </Button>
      </Link>
    </>
  );
}
