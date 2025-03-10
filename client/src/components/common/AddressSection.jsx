import {
  MapPin,
  Home,
  Building,
  Map,
  Globe,
  Navigation,
  DoorOpen,
} from "lucide-react";
import InputField from "./InputField";

const AddressSection = ({
  address,
  handleInputChange,
  isEditing = true,
  error,
  className = "",
}) => (
  <div className={className}>
    <div className="grid grid-cols-1 ml-4 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <InputField
          label="house/door no."
          icon={<DoorOpen className="w-5 h-5 text-violet-600 mr-2" />}
          value={address?.house_number}
          onChange={(e) =>
            handleInputChange("address", {
              ...address,
              house_number: e.target.value,
            })
          }
          disabled={!isEditing}
        />

        <InputField
          label="Address Street/Locality*"
          icon={<Home className="w-5 h-5 text-violet-600 mr-2" />}
          value={address?.street}
          onChange={(e) =>
            handleInputChange("address", {
              ...address,
              street: e.target.value,
            })
          }
          disabled={!isEditing}
          error={error?.street}
        />

        <InputField
          label="City *"
          icon={<Building className="w-5 h-5 text-violet-600 mr-2" />}
          value={address?.city}
          onChange={(e) =>
            handleInputChange("address", {
              ...address,
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
          value={address?.state}
          onChange={(e) =>
            handleInputChange("address", {
              ...address,
              state: e.target.value,
            })
          }
          disabled={!isEditing}
          error={error?.state}
        />

        <InputField
          label="Country *"
          icon={<Globe className="w-5 h-5 text-violet-600 mr-2" />}
          value={address?.country}
          onChange={(e) =>
            handleInputChange("address", {
              ...address,
              country: e.target.value,
            })
          }
          disabled={!isEditing}
          error={error?.country}
        />

        <InputField
          label="Postal Code *"
          icon={<Navigation className="w-5 h-5 text-violet-600 mr-2" />}
          value={address?.postal_code}
          onChange={(e) =>
            handleInputChange("address", {
              ...address,
              postal_code: e.target.value,
            })
          }
          disabled={!isEditing}
          error={error?.postal_code}
        />
      </div>
    </div>
  </div>
);

export default AddressSection;
