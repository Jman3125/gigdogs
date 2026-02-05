import { BandDisplay } from "@/components/band-display";
import { ThemeText } from "@/components/theme-text";

export function AccountMain() {
  return (
    <>
      <ThemeText type="title">Welcome, Band Name</ThemeText>
      <BandDisplay
        id="null"
        name="The Rockers"
        genre="Rock"
        minPrice={500}
        picture="/assets/images/band1.jpg"
        isUser={true}
      />
    </>
  );
}
