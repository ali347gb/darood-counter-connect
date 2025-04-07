
import { useFormContext } from "react-hook-form";
import { User, Mail, MessageCircle } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupFormValues } from "@/schemas/signup-schema";

const PersonalInfoStep = () => {
  const { control } = useFormContext<SignupFormValues>();

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <User className="w-4 h-4 inline mr-1" />
                First Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="John"
                  className="focus:border-emerald-500 focus:ring-emerald-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Doe"
                  className="focus:border-emerald-500 focus:ring-emerald-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <Mail className="w-4 h-4 inline mr-1" />
              Email
            </FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="user@example.com"
                className="focus:border-emerald-500 focus:ring-emerald-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="whatsappNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <MessageCircle className="w-4 h-4 inline mr-1" />
              WhatsApp Number
            </FormLabel>
            <FormControl>
              <Input
                type="tel"
                placeholder="+921234567890"
                className="focus:border-emerald-500 focus:ring-emerald-500"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PersonalInfoStep;
