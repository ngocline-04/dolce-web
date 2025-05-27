import Link from "next/link";
export interface BreadcrumbTypes {
    children?: React.ReactNode,
    href?: any
}
const BreadcrumbItem = (props: BreadcrumbTypes) => {
    const { children, href } = props
    return (
        <li {...props} className='text-14 font-normal leading-20'>
            <Link href={href} passHref style={{color: 'rgb(var(--color-700)'}}>
                {children}
            </Link>
        </li>
    );
};

export default BreadcrumbItem;
