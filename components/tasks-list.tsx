"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateTask } from "./create-task";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Task } from "@/interfaces";
import { toast } from "sonner";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import {
  EllipsisVerticalIcon,
  TrashIcon,
  PencilIcon,
  LoaderCircleIcon
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "./ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";

export const TasksList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const updateTask = (id: string, data: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...data } : task))
    );
  };

  return (
    <Card className="flex flex-col items-stretch justify-start grow w-full sm:w-auto">
      <CardHeader>
        <CardTitle className="text-4xl text-primary font-bold">
          Tasker
        </CardTitle>
        <h2 className="text-foreground/75 !m-0 pt-0 text-pretty">
          manage all your tasks with ease from only one site
        </h2>
      </CardHeader>
      <CardContent className="grow flex items-center justify-center flex-col">
        {tasks.length === 0 ? (
          // No tasks created
          <>
            <h1 className="text-lg text-foreground/75 font-normal text-center">
              Hm, it seems like you don't have any task
            </h1>
            <p className="text-center text-2xl font-bold mt-2 leading-tight">
              Click the button below <br /> to create a new task!
            </p>
          </>
        ) : (
          // Tasks created
          <ScrollArea className="w-full grow">
            <ul className="flex items-start py-2 px-1 jusitify-start grow w-full">
              {tasks.map((task, index) => {
                return (
                  <li
                    key={task.id}
                    className="flex items-center justify-between border border-border rounded-md w-full px-4 py-2"
                  >
                    <span className="inline-flex flex-col items-start justify-center leading-[0.5]">
                      <p className="text-2xl font-semibold">{task.title}</p>
                      <p className="text-sm font-light text-foreground/75">
                        {task.description}
                      </p>
                    </span>

                    {/* Action buttons: edit and delete */}
                    <Popover>
                      <PopoverTrigger>
                        <EllipsisVerticalIcon className="text-foreground/75" />
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col items-center justify-stretch w-24 p-2">
                      <EditTask
                        task={task}
                        onEdit={async (editedTask) =>
                          updateTask(task.id, editedTask)
                        }
                      />
                      <Separator />
                      <DeleteTask
                        onDelete={async () => deleteTask(task.id)} />

                        </PopoverContent>
                    </Popover>
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter>
        <CreateTask
          onCreate={async (task) => {
            setTasks((prev) => [...prev, task]);
            toast.success("Task created successfully!");
          }}
        />
      </CardFooter>
    </Card>
  );
};

const formSchema = z.object({
  title: z
    .string()
    .min(3, "The title must be at least 3 character long")
    .max(40, "The title can't be longer than 40 characters"),
  description: z.string(),
});

const DeleteTask = ({ onDelete }: { onDelete: () => Promise<void> }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => setDeleteOpen(true)}
          variant="ghost"
          className="w-full flex items-center justify-start text-sm"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this task?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <p>This action is irreversible</p>
        <AlertDialogFooter>
          <Button variant="outline" onClick={() => setDeleteOpen(false)}>
            Cancel
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              Delete
            </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const EditTask = ({
  task,
  onEdit,
}: {
  task: Partial<Task>;
  onEdit: (task: Partial<Task>) => Promise<void>;
}) => {
  const [editOpen, setEditOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
    },
    mode: "onSubmit",
  });

  const onFormSubmit = async (values: z.infer<typeof formSchema>) => {
    await new Promise((res) => setTimeout(res, 2500));
    await onEdit(values);
    setEditOpen(false);
  };

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setEditOpen(true)}
          variant="ghost"
          className="w-full flex items-center justify-start gap-2 text-sm"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit your task</DialogTitle>
          <DialogDescription />
        </DialogHeader>
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
                  Description{" "}
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
        </Form>
        <DialogFooter className="flex flex-row gap-4 justify-end mt-4">
          <Button
            variant="outline"
            onClick={() => setEditOpen(false)}
            type="reset"
          >
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
                Editing <LoaderCircleIcon className="animate-spin" />
              </>
            ) : (
              "Edit"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
