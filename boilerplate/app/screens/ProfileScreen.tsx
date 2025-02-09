import React from "react"
import { ViewStyle, View } from "react-native"
import { Screen, Text, Button } from "@/components"
import { TourTabScreenProps } from "@/navigators"
import { useAppTheme } from "@/utils/useAppTheme"
import { spacing } from "@/theme"

export interface ProfileScreenProps extends TourTabScreenProps<"Profile"> {}

export function ProfileScreen(props: ProfileScreenProps) {
  const { theme } = useAppTheme()

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={[$container, { backgroundColor: theme.colors.background }]}
      safeAreaEdges={["top"]}
    >
      <View style={$header}>
        <Text preset="heading" tx="profileScreen.title" style={$title} />
      </View>

      <View style={$section}>
        <Text preset="subheading" text="个人信息" style={$sectionTitle} />
        <View style={$infoItem}>
          <Text preset="default" text="用户名：" style={$label} />
          <Text preset="default" text="游客" />
        </View>
        <View style={$infoItem}>
          <Text preset="default" text="偏好语言：" style={$label} />
          <Text preset="default" text="中文" />
        </View>
      </View>

      <View style={$section}>
        <Text preset="subheading" text="应用设置" style={$sectionTitle} />
        <Button
          tx="common.settings"
          preset="default"
          style={$button}
        />
      </View>
    </Screen>
  )
}

const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.medium,
  paddingTop: spacing.medium,
}

const $header: ViewStyle = {
  marginBottom: spacing.large,
}

const $title: ViewStyle = {
  marginBottom: spacing.small,
}

const $section: ViewStyle = {
  marginBottom: spacing.large,
}

const $sectionTitle: ViewStyle = {
  marginBottom: spacing.medium,
}

const $infoItem: ViewStyle = {
  flexDirection: "row",
  marginBottom: spacing.small,
}

const $label: ViewStyle = {
  width: 100,
}

const $button: ViewStyle = {
  marginTop: spacing.small,
}