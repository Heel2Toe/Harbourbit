import toast from "react-hot-toast";
import { handleJwt } from "./handle-jwt";

interface UserProps {
  accessToken: string;
}

const handleError = async (
  error: any,
  logoutUser: () => void,
  updateUser: (user: UserProps) => void,
  navigate: (path: string) => void,
  refreshToken: string
) => {
  try {
    if (!error.response) {
      toast.error("Unable to connect to the server.");
      return;
    }

    switch (error.response.data) {
      case "Token Expired":
        const result = await handleJwt(refreshToken);
        if (result) {
          updateUser({ accessToken: result });
        } else {
          logoutUser();
          navigate("/");
        }
        break;
      case "Invalid Token":
        logoutUser();
        navigate("/");
        toast.error("Unauthorized");
        break;
      default:
        toast.error("Internal server error");
        console.error("Error:", error);
    }
  } catch (error) {
    console.error("Error at handle-error.tsx:", error);
  }
};

export default handleError;
