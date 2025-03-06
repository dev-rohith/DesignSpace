import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createMyProfileAssociate,
  getMyProfileAssociate,
  updateMyProfileAssociate,
} from "../../features/actions/associateActions";
import {
  Award,
  Bookmark,
  Edit2,
  FilePlus2,
  Layout,
  Loader,
  Save,
  User,
} from "lucide-react";
import Spinner from "../../components/common/Spinner";
import AssociateProfileBody from "../../components/ui/AssociateProfileBody";
import toast from "react-hot-toast";
import { ErrorState } from "../../components";
import { validateAssociateProfileData } from "../../utils/validation";

const initialFormState = {
  address: {
    street: "",
    house_number: "",
    city: "",
    state: "",
    country: "",
    postal_code: "",
  },
  bio: "",
  skills: [],
  availability: true,
};

const AssociateProfile = () => {
  const {
    profile,
    isLoading,
    isProfileEmpty,
    profileErrors,
    isProfileUpdating,
  } = useSelector((store) => store.associate);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState(initialFormState);

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const actionResult = await dispatch(getMyProfileAssociate());
      if (getMyProfileAssociate.rejected.match(actionResult)) {
        toast.error(actionResult.payload);
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    if (isProfileEmpty) {
      setIsEditing(true);
    } else if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleCreateProfile = async () => {
    const errors = validateAssociateProfileData(formData);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      console.log(errors);
      return;
    }
    console.log(formData);
    const actionResult = await dispatch(createMyProfileAssociate(formData));
    if (createMyProfileAssociate.fulfilled.match(actionResult)) {
      setIsEditing(false);
      toast.success(
        "Your designer profile created seucessfully now others can see you"
      );
    } else if (createMyProfileAssociate.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  const handleSave = async () => {
    const errors = validateAssociateProfileData(formData);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      console.log(errors);
      return;
    }
    const actionResult = await dispatch(updateMyProfileAssociate(formData));
    if (updateMyProfileAssociate.fulfilled.match(actionResult)) {
      toast.success(actionResult.payload.message);
      setIsEditing(false);
    } else if (updateMyProfileAssociate.rejected.match(actionResult)) {
      toast.error(actionResult.payload.message);
    }
  };

  const handleAddSkill = useCallback((field, skill) => {
    if (!skill.trim()) return;
    setFormData((prev) => ({
      ...prev,
      [field]: [...new Set([...(prev[field] || []), skill.trim()])],
    }));
  }, []);

  const handleRemoveSkill = useCallback((field, skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((skill) => skill !== skillToRemove),
    }));
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading) return <Spinner />;

  if (!profile) return <ErrorState error="Failed to Load Data" />;

  return (
    <div className="min-h-screen overflow-y-auto w-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      <div className="bg-gradient-to-r  from-violet-600 via-purple-600 to-pink-600 h-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Layout className="w-full h-full" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8 relative">
          <h3 className="text-4xl font-bold text-white flex items-center">
            <User className="w-8 h-8 mr-3" />
            Associate Profile
          </h3>
          <p className="text-violet-100 mt-2 flex items-center">
            <Award className="w-4 h-4 mr-2" />
            Manage your work presence
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-20">
        <div className="space-y-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-violet-100">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Bookmark className="w-6 h-6 mr-2 text-violet-600" />
                <h2 className="text-2xl font-semibold text-violet-900">
                  Profile Details
                </h2>
              </div>
              {!isProfileEmpty && (
                <button
                  onClick={() =>
                    isEditing ? handleSave() : setIsEditing(true)
                  }
                  className="flex items-center px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors cursor-pointer"
                >
                  {isEditing ? (
                    <>
                      {isProfileUpdating ? (
                        <span className="flex gap-2 items-center">
                          <Loader className="w-4 h-4 animate-spin" /> Adding....
                        </span>
                      ) : (
                        <span className="flex gap-2 items-center">
                          <Save className="w-4 h-4 mr-2" />
                          Save Change
                        </span>
                      )}
                    </>
                  ) : (
                    <>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </button>
              )}
              {isProfileEmpty && (
                <button
                  onClick={handleCreateProfile}
                  disabled={isProfileUpdating}
                  className="bg-green-400 px-4 py-2 rounded-lg flex gap-2 items-center text-white cursor-pointer hover:bg-green-700"
                >
                  {isProfileUpdating ? (
                    <span className="flex items-center gap-2">
                      <Loader className="w-4 h-4 animate-spin" /> Adding
                    </span>
                  ) : (
                    "Create Profile "
                  )}
                  <FilePlus2 className="w-5 h-5 mr-1" />
                </button>
              )}
            </div>
            {profileErrors && (
              <div className="p-4 rounded-lg m-4 bg-red-50 border border-red-400 shadow-md">
                <h3 className="text-red-700 font-semibold text-lg mb-2">
                  Profile Errors:
                </h3>
                <ul className="list-disc list-inside text-red-600 space-y-1">
                  {profileErrors.map((error, index) => (
                    <li key={index} className="flex items-center">
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                      {error}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <AssociateProfileBody
              errors={errors}
              formData={formData}
              isEditing={isEditing}
              handleRemoveSkill={handleRemoveSkill}
              handleAddSkill={handleAddSkill}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssociateProfile;
