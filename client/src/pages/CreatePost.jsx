import FormInput from "@/components/FormInput";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import ImageFormInput from "@/components/ImageFormInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";

//form schema
const formSchema = z.object({
  title: z.string().trim().min(6, "Title must be at least 6 characters long"),
  category: z
    .string()
    .trim()
    .min(1, "Category must be at least 6 characters long"),
  image: z.any(),

  content: z.string(),
});

const CreatePostPage = () => {
  //use form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { register, handleSubmit, getValues } = form;
  console.log(form);
  //on submit on update
  async function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className=" min-h-screen mx-auto mt-20  max-w-4xl w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            type="text"
            form={form}
            placeholder="title"
            name="title"
            label="Title"
          />
          <FormInput
            type="text"
            form={form}
            placeholder="#category"
            name="category"
            label="Category"
          />
          <ImageFormInput
            // className="hidden"
            type="file"
            form={form}
            name="image"
            label="Image"
            register={register}
            // reference={filePickerRef}
            // imageInputHandler={imageInputHandler}
          />
          <ReactQuill
            {...register("content")}
            name="content"
            theme="snow"
            placeholder="Write something..."
          />
          <Button className="w-full">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default CreatePostPage;
