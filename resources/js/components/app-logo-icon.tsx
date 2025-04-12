import logo from '@/images/logo.svg';
import { ImgHTMLAttributes } from 'react';
export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return <img {...props} src={logo} width={52} height={52} alt="Logo" />;
}
