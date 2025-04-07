
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface VerificationStepProps {
  email: string;
  whatsappNumber: string;
  verificationMethod: "email" | "whatsapp";
  verificationCode: string;
  onVerificationMethodChange: (value: "email" | "whatsapp") => void;
  onVerificationCodeChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const VerificationStep = ({
  email,
  whatsappNumber,
  verificationMethod,
  verificationCode,
  onVerificationMethodChange,
  onVerificationCodeChange,
  onSubmit,
  loading
}: VerificationStepProps) => {
  const { toast } = useToast();
  
  const handleSendVerification = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (verificationMethod === "email" && !email) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive"
      });
      return;
    }
    
    if (verificationMethod === "whatsapp" && !whatsappNumber) {
      toast({
        title: "Error",
        description: "Please enter a WhatsApp number",
        variant: "destructive"
      });
      return;
    }

    onSubmit(e);
    
    toast({
      title: "Verification Code Sent",
      description: verificationMethod === "email" 
        ? `A verification code has been sent to ${email}` 
        : `A verification code has been sent to your WhatsApp (${whatsappNumber})`,
    });
    
    toast({
      title: "Demo Note",
      description: "For this demo, please use '123456' as the verification code",
    });
  };

  return (
    <form onSubmit={handleSendVerification}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="verificationMethod">Verification Method</Label>
          <Select 
            value={verificationMethod} 
            onValueChange={(value) => onVerificationMethodChange(value as "email" | "whatsapp")}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select verification method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {verificationCode ? (
          <div className="grid gap-2">
            <Label htmlFor="verification">Verification Code</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="verification"
                type="text"
                placeholder="123456"
                value={verificationCode}
                onChange={(e) => onVerificationCodeChange(e.target.value)}
                required
                maxLength={6}
                className="focus:border-emerald-500 focus:ring-emerald-500"
              />
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
          </div>
        ) : (
          <Button
            className="bg-emerald-600 hover:bg-emerald-700"
            disabled={loading || (verificationMethod === "email" && !email) || (verificationMethod === "whatsapp" && !whatsappNumber)}
            type="submit"
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
    </form>
  );
};

export default VerificationStep;
