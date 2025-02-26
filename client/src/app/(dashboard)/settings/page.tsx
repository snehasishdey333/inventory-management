'use client';
import StaffUpdateForm from "@/components/forms/StaffUpdateForm";
import { apiUrl } from "@/utils/api";
import apiClient from "@/utils/apiService";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";

const SettingsPage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const [userDetails, setUserDetails] = useState<{
    id: string;
    name: string;
    username: string;
    cognitoId: string;
    email: string;
    address: string;
    phone: string;
    sex: string;
  } | null>(null); // Set initial state to null instead of undefined

  useEffect(() => {
    const fetchStaff = async ({ data }: { data: { cognitoId: string } }) => {
      try {
        const response = await apiClient.get(apiUrl + `/staffs/${data.cognitoId}`);
        setUserDetails(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching staff:", error);
        throw new Error("Failed to fetch staff");
      }
    };
    if (user?.userId) {
      fetchStaff({ data: { cognitoId: user.userId } });
    }
  }, [user]);

  // Render loading state until user details are fetched
  if (!userDetails) {
    return <div>Loading...</div>; // You can customize this to show a loading spinner or message
  }

  return (
    <StaffUpdateForm data={userDetails} />
  );
};

export default SettingsPage;
