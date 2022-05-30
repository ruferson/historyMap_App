import { useLocation } from "wouter";

function Footer (props) {
    
    const [location, setLocation] = useLocation();
    

    return (
        <div className="footer mt-5">
            <h4 className="pt-4 text-center">Footer</h4>
        </div>
    );

   }

   export default Footer;