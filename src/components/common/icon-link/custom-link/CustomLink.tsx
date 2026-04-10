import { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}

export const CustomLink = ({ href, children }: Props) => {
  return (
    <a href={href} target={href === "" ? "_self" : "_blank"} rel="noreferrer noopener">
      {children}
    </a>
  );
};
