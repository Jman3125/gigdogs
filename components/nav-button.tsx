//Reusable buttons component in the nav bar
import { FontAwesome } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { ThemeText } from "./theme-text";

type FontAwesomeIconName = React.ComponentProps<typeof FontAwesome>["name"];

//To pass from parent view
type Props = {
  imageName: FontAwesomeIconName;
  text?: string;
  route?: Href;
};
export default function NavButton({ imageName, text, route }: Props) {
  const navigator = useRouter();
  return (
    //If there is a route passed then navigate to the route, else just go back to previous page
    <Pressable
      style={styles.headerButton}
      onPress={() => (route ? navigator.push(route) : navigator.back())}
    >
      <FontAwesome name={imageName} size={24} color="white" />

      {text && (
        <ThemeText type="defaultSemiBold" style={styles.headerText}>
          {text}
        </ThemeText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerButton: {
    alignItems: "center",
    marginRight: 10,
    flexDirection: "row",
  },
  headerText: {
    color: "white",
  },
  headerButtonRight: {
    alignItems: "center",
    marginLeft: 10,

    flexDirection: "row",
  },
});
