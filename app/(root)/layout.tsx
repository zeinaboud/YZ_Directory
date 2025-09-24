import {ReactNode} from 'react'
import "../globals.css";
import Navbar from '@/components/Navbar';
const ReactLayout = ({ children }:
    Readonly<{ children: ReactNode }>) => {
    return (
        <div>
            {children}
            
        </div>
    )
}

export default ReactLayout