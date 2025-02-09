import { observer } from "mobx-react-lite"
import { FC } from "react"
import { ViewStyle, View, Image, ImageStyle, ScrollView } from "react-native"
import { Screen, Text, Button } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { spacing } from "@/theme"
import { useHeader } from "@/utils/useHeader"

export interface SpotDetailScreenProps extends AppStackScreenProps<"SpotDetail"> {}

export const SpotDetailScreen: FC<SpotDetailScreenProps> = observer(function SpotDetailScreen(props) {
  const { route } = props
  const { spot } = route.params

  useHeader({
    title: spot.name,
    titleMode: "center",
    leftIcon: "back",
    onLeftPress: () => props.navigation.goBack(),
  })

  return (
    <Screen preset="scroll" contentContainerStyle={$container}>
      <ScrollView style={$scrollView} contentContainerStyle={$contentContainer}>
        <Image source={{ uri: spot.image }} style={$image} />

        <View style={$infoContainer}>
          <Text preset="heading" text={spot.name} style={$name} />
          <Text preset="default" text={spot.description} style={$description} />
        </View>

        <View style={$actionContainer}>
          <Button
            tx="spotDetailScreen.startAITour"
            preset="reversed"
            style={$aiButton}
            onPress={() => props.navigation.navigate("AIChat", { spot })}
          />
        </View>
      </ScrollView>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
}

const $scrollView: ViewStyle = {
  flex: 1,
}

const $contentContainer: ViewStyle = {
  paddingBottom: spacing.lg,
}

const $image: ImageStyle = {
  width: "100%",
  height: 250,
  resizeMode: "cover",
}

const $infoContainer: ViewStyle = {
  padding: spacing.lg,
}

const $name: ViewStyle = {
  marginBottom: spacing.sm,
}

const $description: ViewStyle = {
  marginBottom: spacing.lg,
  lineHeight: 24,
}

const $actionContainer: ViewStyle = {
  paddingHorizontal: spacing.lg,
}

const $aiButton: ViewStyle = {
  minHeight: 48,
}