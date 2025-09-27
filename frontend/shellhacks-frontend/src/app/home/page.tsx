import Navbar from '../Componets/navbar';
import '../globals.css';

export default function Home() {
  return (
    <div className="">
       
        <div className=''>
          <div className='sticky top-0'>
            <Navbar />
          </div>
            
            <iframe className='h-screen w-screen flex'
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCGlFIC2YyWVZEEGYJbLQMdBujLkLgWkUg
                    &q=United+States">
                      
            </iframe>
            
        </div>
        <h1>Home Page</h1>
    </div>
  );
};
