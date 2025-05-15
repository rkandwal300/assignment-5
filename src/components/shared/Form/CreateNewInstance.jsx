import { Button, buttonVariants } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { instanceSchema } from "@/lib/schemas/instance.schema";
import { STATUS, ZONE } from "@/lib/schemas/instance.enum";
import { DialogClose, DialogTitle } from "@/components/ui/dialog";
import { Check, X } from "lucide-react";

const CreateNewInstance = ({setData}) => {
  const form = useForm({
    resolver: zodResolver(instanceSchema),
    defaultValues: {
      cspProvider: "AWS",
    },
  });
  const onSubmit = (values) => {
    setData((prev) => [
      {
        id: prev.length,
        data: {
          currentPlatform: values,
          recommendations: [],
        },
      },
      ...prev,
    ]);
    console.log("Submitted:", values);
  };

  console.log({ form: form.watch(), errors: form.formState.errors });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <header className="px-4 py-2 w-full flex justify-between items-center border-b ">
          <DialogTitle>Create New Instance</DialogTitle>
          <div className=" flex justify-between gap-2 items-center">
            <DialogClose
              className={buttonVariants({
                variant: "outline",
                className: "text-primary",
              })}
            >
              <X size={16} />
            </DialogClose>
            <Button type="submit">
              <Check size={16} />
            </Button>
          </div>
        </header>

        <div className="flex flex-col gap-4 px-4">
          <FormField
            control={form.control}
            name="instanceType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. t2.micro"
                    className={"max-w-70"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between items-start">
            <FormField
              control={form.control}
              name="zone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zone</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={"w-50"}>
                        <SelectValue placeholder="Select a zone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Zones</SelectLabel>
                        {Object.values(ZONE).map((zone) => (
                          <SelectItem key={zone} value={zone}>
                            {zone}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfInstances"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Instances</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      className={"max-w-70"}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between items-start">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className={"w-50"}>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        {Object.values(STATUS).map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vCPU"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>vCPU</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0"
                      className={"max-w-70"}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between items-start">
            <FormField
              control={form.control}
              name="monthlyCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monthly Cost</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      className={"max-w-70"}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="annualCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Annual Cost</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      className={"max-w-70"}
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between items-start">
            <FormField
              control={form.control}
              name="cspProvider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cloud Provider</FormLabel>
                  <FormControl>
                    <Input className={"max-w-70"} readOnly {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pricingModel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pricing Model</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Reserved"
                      className={"max-w-70"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};
export default CreateNewInstance;
