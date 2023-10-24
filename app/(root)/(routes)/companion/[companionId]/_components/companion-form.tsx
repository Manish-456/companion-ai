"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { Category, Companion } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { ImageUpload } from "@/components/image-upload";

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  instructions: z.string().min(200, {
    message: "Instructions required atleast 200 characters",
  }),
  seed: z.string().min(200, {
    message: "Seed required atleast 200 characters",
  }),
  src: z.string().min(1, {
    message: "Image is required",
  }),
  categoryId: z.string().min(1, {
    message: "Category required",
  }),
});

export default function CompanionForm({
  initialData,
  categories,
}: CompanionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      instructions: "",
      seed: "",
      src: "",
      categoryId: undefined,
    },
  });
  const { isLoading } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
    <Form {...form}>
      <form className="space-y-8 pb-10" onSubmit={form.handleSubmit(onSubmit)}>
         <div className="space-y-2 w-full ">
          <div>
          <div className="text-lg font-medium">
            <h3>General Information</h3>
             <p className="text-muted-foreground text-sm">General Information about your companion.</p>
           </div>
           <Separator className="bg-primary/10" />
          </div>
         </div>
         <FormField name="src" render={({field}) => (
          <FormItem className="flex flex-col items-center justify-center space-y-4 ">
              <FormControl>
              <ImageUpload value={field.value} onChange={field.onChange} disabled={isLoading} />
              </FormControl>
              <FormMessage />
          </FormItem>
         )}  />
      </form>
    </Form>
  </div>;
}
