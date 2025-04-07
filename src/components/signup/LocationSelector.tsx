
import { useFormContext } from "react-hook-form";
import { Flag, MapPin } from "lucide-react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countries, states, cities } from "@/utils/locationData";
import { SignupFormValues } from "@/schemas/signup-schema";
import { useEffect } from "react";

const LocationSelector = () => {
  const { control, watch, setValue, trigger } = useFormContext<SignupFormValues>();
  
  const selectedCountry = watch("country");
  const selectedState = watch("state");
  
  // Reset state when country changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      setValue("state", "");
      setValue("city", "");
      trigger(["state", "city"]);
    }
  }, [selectedCountry, setValue, selectedState, trigger]);

  // Reset city when state changes
  useEffect(() => {
    if (selectedState && watch("city")) {
      setValue("city", "");
      trigger("city");
    }
  }, [selectedState, setValue, watch, trigger]);

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <Flag className="w-4 h-4 inline mr-1" />
              Country
            </FormLabel>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                setValue("state", "");
                setValue("city", "");
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[300px] bg-white">
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedCountry && (
        <FormField
          control={control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <MapPin className="w-4 h-4 inline mr-1" />
                State/Province
              </FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  setValue("city", "");
                }}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select state/province" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px] bg-white">
                  {states[selectedCountry] ? (
                    states[selectedCountry].map((state) => (
                      <SelectItem key={state.code} value={state.code}>
                        {state.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="other">Other</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {selectedState && (
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <MapPin className="w-4 h-4 inline mr-1" />
                City
              </FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px] bg-white">
                  {cities[selectedState] ? (
                    cities[selectedState].map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="other">Other</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default LocationSelector;
