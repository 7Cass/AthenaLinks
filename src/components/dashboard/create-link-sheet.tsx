"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, LoaderIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { Calendar } from "../ui/calendar";
import {
  checkSlugAvailability,
  createLink,
  deleteLink,
} from "@/app/actions/link";
import { toast } from "sonner";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

interface CreateSheetProps {
  children: ReactNode;
}

const createLinkSchema = z.object({
  originalUrl: z.string().url({ message: "Invalid URL." }),
  slug: z.string(),
  expiresAt: z.date({ message: "Invalid date." }).optional(),
});

export function CreateLinkSheet({ children }: CreateSheetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isCheckingSlug, setIsCheckingSlug] = useState(false);

  const form = useForm<z.infer<typeof createLinkSchema>>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      originalUrl: "",
      slug: "",
    },
  });

  const handleCheckSlugAvailability = useCallback(async (slug: string) => {
    if (!slug) return;

    setIsCheckingSlug(true);
    form.clearErrors("slug");

    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay

    const { success, message } = await checkSlugAvailability(slug);

    if (!success) {
      form.setError("slug", { message });
    }

    setIsCheckingSlug(false);
  }, []);

  // Debounce verification function (memoized to prevent recriation)
  const debouncedCheckSlug = useMemo(
    () => debounce(handleCheckSlugAvailability, 500),
    [checkSlugAvailability]
  );

  // Clear debounce when component unmount
  useEffect(() => {
    return () => debouncedCheckSlug.cancel();
  }, [debouncedCheckSlug]);

  // Call debounce when slug changes
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.slug) {
        debouncedCheckSlug(value.slug);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, debouncedCheckSlug]);

  const onSubmit = async (data: z.infer<typeof createLinkSchema>) => {
    const { success, message } = await createLink({
      ...data,
      expiresAt: data.expiresAt ?? null,
    });

    router.refresh();
    ref.current?.click();

    success ? toast.success(message) : toast.error(message);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div ref={ref}>{children}</div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>New Shortened Link</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="originalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url Original</FormLabel>
                  <FormControl>
                    <Input placeholder="https://google.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiresAt"
              render={({ field }) => (
                <FormItem className="flex flex-col pt-4">
                  <FormLabel>Expires At</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0 pointer-events-auto"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value ?? addDays(new Date(), 1)}
                        onSelect={(date: Date | undefined) =>
                          field.onChange(date ?? null)
                        }
                        disabled={(date) => {
                          return date < new Date();
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                  {isCheckingSlug && (
                    <p className="text-xs text-muted-foreground">
                      Checking availability...
                    </p>
                  )}
                  <FormDescription>
                    A slug is what comes after the slash. Ex: https://plu.tus/
                    <span className="font-bold underline">referrer</span>
                  </FormDescription>
                </FormItem>
              )}
            />
            <Separator />
            <Button
              disabled={!form.formState.isValid || isCheckingSlug}
              className="w-full"
              type="submit"
            >
              {isCheckingSlug ? (
                <LoaderIcon className="animate-spin" />
              ) : (
                "Criar Link"
              )}
            </Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
