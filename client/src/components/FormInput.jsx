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

const FormInput = ({ form, placeholder, name, label, desc,type }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} </FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} />
          </FormControl>
          {/* <FormDescription classname={cn({ " hidden": desc === null })}>
            {desc}{" "}
          </FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default FormInput;
