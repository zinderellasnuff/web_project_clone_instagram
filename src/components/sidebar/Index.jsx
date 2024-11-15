import Suggestions from "./Suggestions";
import useUser from "../../hooks/useUser.js"

const Index = () => {
    const { user } = useUser();
    console.log(user);
    if (!user) {
        return <div>Loading user data...</div>; // Mostrar estado de carga mientras no haya datos
    }

    const { fullName, username, userId } = user;

    return (
        <div className="p-4">
            <User username={username} fullName={fullName} />
            <Suggestions userId={userId} />
        </div>
    );
};

export default Index;