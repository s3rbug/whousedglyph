import { useUrlMatchId } from "@/hooks/useUrlMatchId";
import { useGlyphs } from "@/hooks/useGlyphs";
import { CenteredSpinner } from "../common/centered-spinner/CenteredSpinner";
import { CenteredAlert } from "../common/centered-alert/CenteredAlert";
import { GlyphItem } from "./GlyphItem";

export const GlyphList = () => {
  const { urlMatchId } = useUrlMatchId();
  const { glyphs, isLoading, error, warning } = useGlyphs(urlMatchId);

  if (isLoading) {
    return <CenteredSpinner />;
  }

  if (error) {
    return <CenteredAlert variant="destructive" info={error} />;
  }

  if (warning) {
    return <CenteredAlert variant="warning" info={warning} />;
  }

  if (urlMatchId) {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-7.5 px-4 pb-4">
        {glyphs.map((glyph, glyphIndex) => (
          <GlyphItem key={`glyph-key-${glyphIndex}`} glyph={glyph} />
        ))}
      </div>
    );
  }

  return null;
};
