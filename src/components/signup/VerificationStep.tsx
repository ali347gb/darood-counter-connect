
import { useFormContext } from "react-hook-form";
import { Check } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SignupFormValues } from "@/schemas/signup-schema";

interface VerificationStepProps {
  onSubmit: () => void;
  loading: boolean;
}

const VerificationStep = ({ onSubmit, loading }: VerificationStepProps) => {
  const { control, watch } = useFormContext<SignupFormValues>();
  
  const verificationMethod = watch("verificationMethod");
  const verificationCode = watch("verificationCode");
  const email = watch("email");
  const whatsappNumber = watch("whatsappNumber");

  return (
    <div className="grid gap-4">
      <FormField
        control={control}
        name="verificationMethod"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Verification Method</FormLabel>
            <Select
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select verification method" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {verificationCode ? (
        <FormField
          control={control}
          name="verificationCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <div className="flex items-center space-x-2">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="123456"
                    maxLength={6}
                    className="focus:border-emerald-500 focus:ring-emerald-500"
                    {...field}
                  />
                </FormControl>
                {verificationCode.length === 6 && (
                  <Check className="w-5 h-5 text-green-500" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                A verification code has been sent to your {verificationMethod === "email" ? "email" : "WhatsApp"}
              </p>
              <p className="text-xs font-medium text-emerald-600 mt-1">
                For this demo, use code: 123456
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : (
        <Button
          className="bg-emerald-600 hover:bg-emerald-700"
          disabled={loading || (verificationMethod === "email" && !email) || (verificationMethod === "whatsapp" && !whatsappNumber)}
          type="button"
          onClick={onSubmit}
        >
          {loading ? "Sending..." : "Send Verification Code"}
        </Button>
      )}
      
      {!verificationCode && (
        <p className="text-sm text-muted-foreground text-center">
          For this demo, use verification code: <strong>123456</strong>
        </p>
      )}
    </div>
  );
};

export default VerificationStep;
