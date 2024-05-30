import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const ImageFormInput = ({
  form,
  imageInputHandler,
  name,
  className,
  label,
  reference,
  register,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className="dark:text-white">{label} </FormLabel>
          <FormControl>
            {reference ? (
              <Input
                type="file"
                id="image"
                accept="image/*"
                {...register("image", {
                  onChange: (e) => {
                    imageInputHandler(e.target.files[0]);
                  },
                })}
                ref={reference}
              />
            ) : (
              <Input
                type="file"
                id="image"
                accept="image/*"
                {...register("image", {
                  onChange: (e) => {
                    
                    imageInputHandler(e.target.files[0]);
                  },
                })}
              />
            )}
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default ImageFormInput;
