import Navbar from '../Componets/navbar';
import '../globals.css';

export default function Home() {
  return (
    <div className="">
        <Navbar />
        <div className='mx-auto w-1/2'>

            <iframe id = "map"
                width="600"
                height="450"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCGlFIC2YyWVZEEGYJbLQMdBujLkLgWkUg
                    &q=Space+Needle,Seattle+WA">
            </iframe>
            
        </div>
        <h1>Home Page</h1>
    </div>
  );
};
