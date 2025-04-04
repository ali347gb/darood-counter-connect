
import { useState } from "react";
import { useCounter } from "@/contexts/CounterContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  count: z.string()
    .min(1, "Please enter a number")
    .refine((val) => !isNaN(parseInt(val)), { message: "Please enter a valid number" })
    .refine((val) => parseInt(val) > 0, { message: "Number must be positive" })
});

const ManualCountForm: React.FC = () => {
  const { addManualCount, isLoading } = useCounter();
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      count: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please login to add Darood recitations",
        variant: "default"
      });
      return;
    }

    const count = parseInt(values.count);
    
    try {
      await addManualCount(count);
      form.reset();
      setShowForm(false);
    } catch (error) {
      console.error("Error adding manual count:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {!showForm ? (
        <Button 
          variant="outline" 
          className="w-full bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800"
          onClick={() => setShowForm(true)}
          disabled={isLoading || !currentUser}
        >
          Manually Add Count
        </Button>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-emerald-800">Enter number of recitations</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input 
                        placeholder="Enter count" 
                        type="number" 
                        min="1"
                        className="border-emerald-200 focus-visible:ring-emerald-500" 
                        {...field} 
                      />
                    </FormControl>
                    <Button 
                      type="submit" 
                      variant="default"
                      className="bg-emerald-600 hover:bg-emerald-700"
                      disabled={isLoading}
                    >
                      Add
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="sm" 
              className="w-full text-emerald-700"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ManualCountForm;
