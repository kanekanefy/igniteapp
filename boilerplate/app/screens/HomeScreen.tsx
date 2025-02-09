import { observer } from "mobx-react-lite"
import { FC } from "react"
import { ViewStyle, View, ScrollView } from "react-native"
import { Screen, Text, Button } from "@/components"
import { TourTabScreenProps } from "@/navigators/TourNavigator"
import { spacing } from "@/theme"
import { useHeader } from "@/utils/useHeader"

interface HomeScreenProps extends TourTabScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen(_props) {
  useHeader({
    title: "AI 导游",
    titleMode: "center",
  })

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <ScrollView style={$scrollView} contentContainerStyle={$contentContainer}>
        <View style={$welcomeSection}>
          <Text preset="heading" tx="homeScreen.welcome" style={$welcomeText} />
          <Text preset="subheading" tx="homeScreen.subtitle" style={$subtitleText} />
        </View>

        <View style={$featuresSection}>
          <Text preset="heading" tx="homeScreen.features" style={$sectionTitle} />
          <View style={$featureButtons}>
            <Button
              tx="homeScreen.startTour"
              style={$featureButton}
              onPress={() => _props.navigation.navigate("Spots")}
            />
            <Button
              tx="homeScreen.viewMap"
              style={$featureButton}
              onPress={() => _props.navigation.navigate("Map")}
            />
            <Button
              tx="homeScreen.aiChat"
              style={$featureButton}
              preset="reversed"
            />
          </View>
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
  padding: spacing.lg,
}

const $welcomeSection: ViewStyle = {
  marginBottom: spacing.xl,
}

const $welcomeText: ViewStyle = {
  marginBottom: spacing.xs,
}

const $subtitleText: ViewStyle = {
  marginBottom: spacing.lg,
}

const $featuresSection: ViewStyle = {
  marginBottom: spacing.xl,
}

const $sectionTitle: ViewStyle = {
  marginBottom: spacing.md,
}

const $featureButtons: ViewStyle = {
  gap: spacing.sm,
}

const $featureButton: ViewStyle = {
  minHeight: 48,
}