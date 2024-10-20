'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Task } from '@/interfaces';
import { LucideLoaderCircle } from 'lucide-react';
import { nanoid } from 'nanoid';

export const CreateTask = ({
  onCreate,
}: {
  onCreate: (task: Task) => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full rounded-lg" onClick={() => setOpen(true)}>
          Create New Task
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Create New Task</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {/* Dialog content */}
        <TaskForm
          onSubmit={async (task) => {
            await onCreate(task);
            setOpen(false);
          }}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

const formSchema = z.object({
  title: z
    .string()
    .min(3, 'The title must be at least 3 character long')
    .max(40, "The title can't be longer than 40 characters"),
  description: z.string(),
});

const TaskForm = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: (task: Task) => Promise<void>;
  onCancel: () => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    },
    mode: 'onSubmit',
  });

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    await new Promise((res) => setTimeout(res, 1500));
    await onSubmit({
      id: nanoid(20),
      ...values,
    });
  };

  return (
    <>
      <Form {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Make boring stuff..."
                  type="string"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-destructive" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Description{' '}
                <span className="text-foreground/75">(optional)</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="I don't like to do boring stuff :("
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-row gap-4 justify-end mt-4">
          <Button variant="outline" onClick={onCancel} type="reset">
            Cancel
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            variant="default"
            onClick={form.handleSubmit(onFormSubmit)}
            className="flex items-center gap-2"
          >
            {form.formState.isSubmitting ? (
              <>
                Tasking... <LucideLoaderCircle className="animate-spin" />
              </>
            ) : (
              'Task It'
            )}
          </Button>
        </div>
      </Form>
    </>
  );
};
