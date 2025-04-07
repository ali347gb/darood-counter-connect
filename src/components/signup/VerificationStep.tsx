
import { useFormContext } from "react-hook-form";
import { Check, MessageCircle, Mail } from "lucide-react";
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
  const { control, watch, setValue } = useFormContext<SignupFormValues>();
  
  const verificationMethod = watch("verificationMethod");
  const verificationCode = watch("verificationCode");
  const email = watch("email");
  const whatsappNumber = watch("whatsappNumber");
  
  // Helper function to handle demo verification code
  const handleDemoCode = () => {
    setValue("verificationCode", "123456");
  };

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
              <SelectContent className="bg-white">
                <SelectItem value="email">
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </div>
                </SelectItem>
                <SelectItem value="whatsapp">
                  <div className="flex items-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </div>
                </SelectItem>
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
                A verification code would be sent to your {verificationMethod === "email" ? "email" : "WhatsApp"} in a real application
              </p>
              <div className="mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleDemoCode}
                  className="text-xs"
                >
                  Use Demo Code (123456)
                </Button>
              </div>
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
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm">
          <p className="font-medium text-amber-800">Demo Note:</p>
          <p className="text-amber-700">
            Since this is a demo application, no actual verification codes will be sent.
            After clicking "Send Verification Code", you'll be able to use code: <strong>123456</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default VerificationStep;
