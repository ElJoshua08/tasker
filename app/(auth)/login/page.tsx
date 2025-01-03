'use client';

import { GithubIcon } from '@/components/icons/github';
import { GoogleIcon } from '@/components/icons/google';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { signUpWithGithub, signUpWithGoogle } from '@/lib/server/oauth';
import { login } from '@/services/auth.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon, LoaderCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const loginFormSchema = z.object({
  email: z.string().email("Email doesn't look valid"),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async ({
    email,
    password,
  }: z.infer<typeof loginFormSchema>) => {
    const [error, _] = await login(email, password);

    if (error) {
      toast.error(error);
      form.reset();
      return;
    }

    router.push('/user');
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-medium text-2xl uppercase tracking-widest">
            Login
          </CardTitle>
          <Separator />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6">
              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        id="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            id="password"
                            placeholder="Enter your password"
                            {...field}
                          />
                        </FormControl>
                        {showPassword ? (
                          <EyeIcon
                            className="absolute right-4  top-1/2 -translate-y-1/2 text-foreground/60 cursor-pointer"
                            size={20}
                            onClick={() => setShowPassword(false)}
                          />
                        ) : (
                          <EyeOffIcon
                            className="absolute right-4  top-1/2 -translate-y-1/2 text-foreground/60 cursor-pointer"
                            size={20}
                            onClick={() => setShowPassword(true)}
                          />
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex items-end justify-between w-full gap-16">
          <Link href="/forgot-password">
            <Button
              variant="link"
              className="flex items-end p-0"
            >
              {'Forgot password?'}
            </Button>
          </Link>
          <Button
            disabled={form.formState.isSubmitting}
            className="flex items-center gap-x-2"
            onClick={form.handleSubmit(onSubmit)}
          >
            Login
            {form.formState.isSubmitting && (
              <LoaderCircleIcon className="animate-spin" />
            )}
          </Button>
        </CardFooter>
      </Card>

      <div className="w-full flex flex-row gap-2 items-center grow text-xl">
        <Separator className="shrink" />
        OR
        <Separator className="shrink" />
      </div>

      <Button
        variant="outline"
        className="flex items-center justify-start gap-4 w-full px-4 text-base font-normal
        "
        size="lg"
        onClick={() => signUpWithGoogle()}
      >
        <GoogleIcon
          className="text-foreground"
          size={20}
        />{' '}
        Continue with Google
      </Button>

      <Button
        variant="outline"
        className="flex items-center justify-start gap-4 w-full px-4 text-base font-normal
        "
        size="lg"
        onClick={() => signUpWithGithub()}
      >
        <GithubIcon
          className="text-foreground"
          size={20}
        />{' '}
        Continue with Github
      </Button>

      <Link href="/register">
        <Button
          variant="link"
          className="flex items-end p-0 h-auto"
        >
          {"Doesn't have an account yet?"}
        </Button>
      </Link>
    </section>
  );
}
