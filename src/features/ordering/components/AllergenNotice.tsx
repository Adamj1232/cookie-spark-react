import { Link } from "react-router-dom";

export const AllergenNotice = () => {
  return (
    <p className="text-xs text-foreground/70">
      Made in a kitchen that handles common allergens. Review full details in our{" "}
      <Link className="text-primary underline underline-offset-2" to="/allergen-policy">
        allergen policy
      </Link>
      .
    </p>
  );
};
