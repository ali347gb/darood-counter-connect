
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { User, Mail, MessageCircle } from "lucide-react";

interface PersonalInfoStepProps {
  firstName: string;
  lastName: string;
  email: string;
  whatsappNumber: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onWhatsappNumberChange: (value: string) => void;
}

const PersonalInfoStep = ({
  firstName,
  lastName,
  email,
  whatsappNumber,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onWhatsappNumberChange
}: PersonalInfoStepProps) => {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="firstName">
            <User className="w-4 h-4 inline mr-1" />
            First Name
          </Label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
            required
            className="focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => onLastNameChange(e.target.value)}
            required
            className="focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="email">
          <Mail className="w-4 h-4 inline mr-1" />
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          className="focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="whatsapp">
          <MessageCircle className="w-4 h-4 inline mr-1" />
          WhatsApp Number
        </Label>
        <Input
          id="whatsapp"
          type="tel"
          placeholder="+921234567890"
          value={whatsappNumber}
          onChange={(e) => onWhatsappNumberChange(e.target.value)}
          required
          className="focus:border-emerald-500 focus:ring-emerald-500"
        />
      </div>
    </div>
  );
};

export default PersonalInfoStep;
