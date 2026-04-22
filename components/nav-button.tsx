//Reusable buttons component in the nav bar
import { FontAwesome } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { ThemeText } from "./theme-text";

type FontAwesomeIconName = React.ComponentProps<typeof FontAwesome>["name"];

//To pass from parent view
type Props = {
  imageName?: FontAwesomeIconName;
  text?: string;
  route?: Href;
};
export default function NavButton({ imageName, text, route }: Props) {
  const navigator = useRouter();
  return (
    //If there is a route passed then navigate to the route, else just go back to previous page
    <Pressable
      style={text ? styles.textOnly : styles.header}
      onPress={() => (route ? navigator.push(route) : navigator.back())}
    >
      {imageName && (
        <FontAwesome
          name={imageName}
          size={28}
          color="white"
          style={styles.headerButton}
        />
      )}

      {text && (
        <ThemeText type="defaultSemiBold" style={styles.headerText}>
          {text}
        </ThemeText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  textOnly: {
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
  },
  header: {
    alignItems: "center",
    marginRight: 10,
    flexDirection: "row",
  },
  headerText: {
    color: "white",
  },
  headerButton: {
    alignItems: "center",
    marginLeft: 10,
    flexDirection: "row",
  },
});
