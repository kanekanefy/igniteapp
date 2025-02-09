import { ViewStyle, View, Image, ImageStyle } from "react-native"
import { Card, Text } from "@/components"
import { spacing } from "@/theme"
import type { ThemedStyle } from "@/theme"
import { useAppTheme } from "@/utils/useAppTheme"

export interface SpotCardProps {
  id: string
  name: string
  description: string
  image: string
  onPress?: () => void
}

export function SpotCard(props: SpotCardProps) {
  const { name, description, image, onPress } = props
  const { themed } = useAppTheme()

  return (
    <Card
      style={$spotCard}
      onPress={onPress}
      HeadingComponent={
        <View style={$cardHeader}>
          <Image source={{ uri: image }} style={themed($spotImage)} />
          <Text preset="heading" text={name} style={$spotName} />
        </View>
      }
      ContentComponent={
        <Text
          style={$cardContent}
          text={description}
          size="sm"
        />
      }
    />
  )
}

const $spotCard: ViewStyle = {
  marginBottom: spacing.md,
}

const $cardHeader: ViewStyle = {
  paddingVertical: spacing.xs,
}

const $spotImage: ThemedStyle<ImageStyle> = ({ colors }) => ({
  width: "100%",
  height: 200,
  borderRadius: 8,
  marginBottom: spacing.xs,
  backgroundColor: colors.palette.neutral300,
})

const $spotName: ViewStyle = {
  marginTop: spacing.xs,
}

const $cardContent: ViewStyle = {
  marginTop: spacing.xs,
}