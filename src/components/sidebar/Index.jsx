import Suggestions from "./Suggestions.jsx";
import { useUser } from "../../hooks/useUser";
import User from "./User";

const Index = () => {
  const { user, userData } = useUser();
  if (!user || !userData) {
    return <p>Loading...</p>; // Mostramos un mensaje de carga
  }

  return (
    <div className="p-4">
      <User
        username={userData?.username || "defaultUsername"}
        fullName={userData?.fullName || "defaultFullName"}
      />
      <Suggestions
        userId={userData?.userId || "defaultUserId"}
        following={userData.following || "defaultFollowing"}
        loggedInDocId={userData.docId || "defaultDocId"}
      />
    </div>
  );
};

export default Index;
