import { ReactNode } from "react"

type PropsType = {
    href: string;
    children: ReactNode
}

const CustomLink = ({href, children}: PropsType) => {
    return (
        <a
            href={href}
            target={href === "" ? "_self" : "_blank"}
            rel="noreferrer noopener"
        >
            {children}
        </a>
    )
}

export default CustomLink