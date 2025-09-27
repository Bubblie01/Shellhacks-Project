import Navbar from '../Componets/navbar';
import ProfileInfo from '../Componets/ProfileInfo';
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {

  return (
    <div className="bg-[#0A014F]">
        <Navbar />
        <div className="h-screen w-screen">
          <ProfileInfo />
        </div>
    </div>
  );
}
