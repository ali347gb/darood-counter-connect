
import { useFormContext } from "react-hook-form";
import { Check, Mail } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SignupFormValues } from "@/schemas/signup-schema";

interface VerificationStepProps {
  onSubmit: () => void;
  loading: boolean;
}

const VerificationStep = ({ onSubmit, loading }: VerificationStepProps) => {
  const { control, watch, setValue } = useFormContext<SignupFormValues>();
  
  const verificationCode = watch("verificationCode");
  const email = watch("email");
  
  // Helper function to handle demo verification code
  const handleDemoCode = () => {
    setValue("verificationCode", "123456");
  };

  return (
    <div className="grid gap-4">
      <p className="text-sm text-emerald-700">
        We'll send a verification code to your email address.
      </p>
      
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
                A verification code would be sent to your email in a real application
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
        <>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={loading || !email}
            type="button"
            onClick={() => onSubmit()}
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </Button>
        </>
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
