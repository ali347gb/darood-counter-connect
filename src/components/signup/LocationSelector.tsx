
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flag, MapPin } from "lucide-react";
import { countries, states, cities } from "@/utils/locationData";

interface LocationSelectorProps {
  selectedCountry: string;
  selectedState: string;
  selectedCity: string;
  onCountryChange: (value: string) => void;
  onStateChange: (value: string) => void;
  onCityChange: (value: string) => void;
}

const LocationSelector = ({
  selectedCountry,
  selectedState,
  selectedCity,
  onCountryChange,
  onStateChange,
  onCityChange
}: LocationSelectorProps) => {
  // Reset state when country changes
  useEffect(() => {
    if (selectedState) {
      onStateChange("");
    }
  }, [selectedCountry, onStateChange, selectedState]);

  // Reset city when state changes
  useEffect(() => {
    if (selectedCity) {
      onCityChange("");
    }
  }, [selectedState, onCityChange, selectedCity]);

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="country">
          <Flag className="w-4 h-4 inline mr-1" />
          Country
        </Label>
        <Select value={selectedCountry} onValueChange={onCountryChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select country" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            {countries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCountry && (
        <div className="grid gap-2">
          <Label htmlFor="state">
            <MapPin className="w-4 h-4 inline mr-1" />
            State/Province
          </Label>
          <Select value={selectedState} onValueChange={onStateChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select state/province" />
            </SelectTrigger>
            <SelectContent>
              {states[selectedCountry as keyof typeof states]?.map((state) => (
                <SelectItem key={state.code} value={state.code}>
                  {state.name}
                </SelectItem>
              )) || (
                <SelectItem value="other">Other</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      )}

      {selectedState && (
        <div className="grid gap-2">
          <Label htmlFor="city">
            <MapPin className="w-4 h-4 inline mr-1" />
            City
          </Label>
          <Select value={selectedCity} onValueChange={onCityChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cities[selectedState as keyof typeof cities]?.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              )) || (
                <SelectItem value="other">Other</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;
