import { observer } from "mobx-react-lite"
import { FC } from "react"
import { ViewStyle, View } from "react-native"
import { Screen, Text } from "@/components"
import { TourTabScreenProps } from "@/navigators/TourNavigator"
import { spacing } from "@/theme"
import { useHeader } from "@/utils/useHeader"

interface MapScreenProps extends TourTabScreenProps<"Map"> {}

export const MapScreen: FC<MapScreenProps> = observer(function MapScreen(_props) {
  useHeader({
    title: "地图",
    titleMode: "center",
  })

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <View style={$mapPlaceholder}>
        <Text preset="heading" text="地图功能即将上线" style={$placeholderText} />
        <Text preset="default" text="我们正在集成地图服务，敬请期待" style={$placeholderSubText} />
      </View>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
}

const $mapPlaceholder: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: spacing.lg,
}

const $placeholderText: ViewStyle = {
  marginBottom: spacing.sm,
  textAlign: "center",
}

const $placeholderSubText: ViewStyle = {
  textAlign: "center",
  opacity: 0.7,
}