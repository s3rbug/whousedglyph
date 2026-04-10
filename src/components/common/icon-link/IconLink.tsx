import { cn } from "@/lib/utils";
import { CustomLink } from "./custom-link/CustomLink";

interface Props {
  href: string;
  src: string;
  alt: string;
  className?: string;
}

export const IconLink = ({ href, src, alt, className }: Props) => {
  return (
    <CustomLink href={href}>
      <img
        src={src}
        alt={alt}
        className={cn(
          "rounded-full transition-transform duration-200 ease-in-out hover:scale-110",
          className,
        )}
      />
    </CustomLink>
  );
};
