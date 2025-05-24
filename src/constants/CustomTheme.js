import { DefaultTheme } from "@react-navigation/native";
import colors from "./colors";

const CustomTheme = {
    ...DefaultTheme,
    colors:{
        ...DefaultTheme.colors,
        background: colors.darkbackgroubd,
        text: colors.lligthletter
    }
}

export default CustomTheme;