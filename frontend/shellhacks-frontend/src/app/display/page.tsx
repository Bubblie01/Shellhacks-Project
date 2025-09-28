import Navbar from '../Componets/navbar';
import ProfileInfo from '../Componets/ProfileInfo';

export default function Home() {
  return (
    <div className="h-screen w-screen bg-[#0a014fc3]">
        <Navbar />
      <div className="fade-in2 mx-[8%] my-[8%] bg-[#3B60E4] h-[75%] w-[84%] rounded-3xl shadow-2xl">
        <div className="px-[5%] py-[5%]">
          <h4 className="font-bold text-4xl">Your Intinerary:</h4>
        </div>
      </div>
    </div>
  );
}
