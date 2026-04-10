import coffeeSvg from "./images/coffee.svg";

export const BuyMeCoffee = () => {
  return (
    <a href="https://www.buymeacoffee.com/whousedglyph" target="_blank" rel="noreferrer noopener">
      <img
        src={coffeeSvg}
        alt="Buy Me A Coffee"
        className="transition-transform duration-150 ease-in hover:scale-110"
      />
    </a>
  );
};
