import clsx from "clsx";
import CustomLink from "./CustomLink/CustomLink";
import classes from "./IconLink.module.css"

type PropsType = {
	href: string;
	src: string;
	alt: string;
};

const IconLink = ({ href, src, alt }: PropsType) => {
	return (
		<CustomLink href={href}>
			<img src={src} alt={alt} className={clsx(classes.image, "rounded-circle")} />
		</CustomLink>
	);
};

export default IconLink;
