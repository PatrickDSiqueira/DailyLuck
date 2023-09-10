import NotFoundImage from "../assets/images/not_found_image.avif"
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";

export default function NotFound() {

    const navigate = useNavigate();

    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    };

    return (
        <div style={containerStyle}>
            <img src={NotFoundImage} style={{maxWidth: "100%"}} alt="Page not found"/>
            <Button label="Home" onClick={() => navigate('/')}/>
        </div>
    )
}