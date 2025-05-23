import { cn } from "./clsx.ts";

const IconSparkleLoader = ({ className, isBlack = false }) => {
  return (
    <img
      src="/sparkle.svg"
      alt="loader"
      className={cn(isBlack ? "filter invert" : "", className)}
    />
  );
};

export default IconSparkleLoader;
