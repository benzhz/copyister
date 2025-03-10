import ReactDOM from 'react-dom';
import Content from './Content';


const contentRoot = document.createElement("div");
contentRoot.id = "CRX-contentRoot";
document.body.appendChild(contentRoot);
const root = ReactDOM.createRoot(contentRoot);
root.render(<Content />);
