import Navbar from '../Componets/navbar';


export default function Home() {
  return (
    <div className="h-screen w-screen bg-linear-to-bl from-[#0a014fc3] to-[#3251c3]">
        <Navbar />
      <div className="mx-[8%] my-[8%] bg-[#00000062] h-[84%] w-[84%] rounded-3xl shadow-2xl">
        <div className="px-[5%] py-[5%]">
          <h4>Rohan sux</h4>
        </div>
      </div>
    </div>
  );
}
