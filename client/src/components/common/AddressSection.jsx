import { MapPin, Home, Building, Map, Globe, Navigation, DoorOpen } from "lucide-react";
import InputField from "./InputField";

const AddressSection = ({ formData, handleInputChange, isEditing, error }) => (
  <>
    <div className="flex items-center mb-6">
      <MapPin className="w-6 h-6 mr-2 text-violet-600" />
      <h2 className="text-2xl font-semibold text-violet-900">
        Address Details
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <InputField
          label="house/door no."
          icon={<DoorOpen className="w-5 h-5 text-violet-600 mr-2" />}
          value={formData?.address?.house_number}
          onChange={(e) =>
            handleInputChange("address", {
              ...formData?.address,
              house_number: e.target.value,
            })
          }
          disabled={!isEditing}
        />

        <InputField
          label="Street Address *"
          icon={<Home className="w-5 h-5 text-violet-600 mr-2" />}
          value={formData?.address?.street}
          onChange={(e) =>
            handleInputChange("address", {
              ...formData?.address,
              street: e.target.value,
            })
          }
          disabled={!isEditing}
          error={error?.street}
        />

        <InputField
          label="City *"
          icon={<Building className="w-5 h-5 text-violet-600 mr-2" />}
          value={formData?.address?.city}
          onChange={(e) =>
            handleInputChange("address", {
              ...formData?.address,
              city: e.target.value,
            })
          }
          disabled={!isEditing}
          error={error?.city}
        />
      </div>

      <div className="space-y-4">
        <InputField
          label="State/Province *"
          icon={<Map className="w-5 h-5 text-violet-600 mr-2" />}
          value={formData?.address?.state}
          onChange={(e) =>
            handleInputChange("address", {
              ...formData?.address,
              state: e.target.value,
            })
          }
          disabled={!isEditing}
          error={error?.state}
        />

        <InputField
          label="Country *"
          icon={<Globe className="w-5 h-5 text-violet-600 mr-2" />}
          value={formData?.address?.country}
          onChange={(e) =>
            handleInputChange("address", {
              ...formData?.address,
              country: e.target.value,
            })
          }
          disabled={!isEditing}
          error={error?.country}
        />

        <InputField
          label="Postal Code *"
          icon={<Navigation className="w-5 h-5 text-violet-600 mr-2" />}
          value={formData?.address?.postal_code}
          onChange={(e) =>
            handleInputChange("address", {
              ...formData?.address,
              postal_code: e.target.value,
            })
          }
          disabled={!isEditing}
          error={error?.postal_code}
        />
      </div>
    </div>
  </>
);

export default AddressSection;
