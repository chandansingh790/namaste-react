import { useRouteError } from "react-router-dom";
import error from '/image/error.jpg';

const Error = () => {
    const errorMsg = useRouteError();
    console.log(errorMsg);
    return (
			<div className="error-page">
				<span className="error-msg">{errorMsg.data}</span>
				<img className="error-img" src={error} />
			</div>
		);
}
export default Error;