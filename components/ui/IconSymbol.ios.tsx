import { SymbolView, SymbolViewProps, SymbolWeight } from "expo-symbols";
import { StyleProp, ViewStyle } from "react-native";

/**
 * A convenience component for rendering SF Symbols on iOS.
 *
 * @param name The name of the symbol to render.
 * @param size The size of the symbol. Defaults to 24.
 * @param color The tint color of the symbol.
 * @param style Additional styles to apply to the symbol.
 * @param weight The weight of the symbol to render. Defaults to 'regular'.
 * @returns A `SymbolView` component with the specified properties.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = "regular",
}: {
  name: SymbolViewProps["name"];
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
