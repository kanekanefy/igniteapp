import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import { ComponentProps } from "react"
import { TextStyle, ViewStyle } from "react-native"
import { Icon } from "@/components"
import { translate } from "@/i18n"
import { colors, spacing, typography } from "@/theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { useAppTheme } from "@/utils/useAppTheme"
import { HomeScreen, SpotsScreen, MapScreen, ProfileScreen } from "@/screens"

export type TourTabParamList = {
  Home: undefined
  Spots: undefined
  Map: undefined
  Profile: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 */
export type TourTabScreenProps<T extends keyof TourTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TourTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<TourTabParamList>()

export function TourNavigator() {
  const { theme } = useAppTheme()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { backgroundColor: theme.colors.background }],
        tabBarActiveTintColor: theme.colors.tint,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: translate("tourNavigator.homeTab"),
          tabBarIcon: ({ focused, color }) => (
            <Icon icon="home" color={color} size={24} focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Spots"
        component={SpotsScreen}
        options={{
          tabBarLabel: translate("tourNavigator.spotsTab"),
          tabBarIcon: ({ focused, color }) => (
            <Icon icon="components" color={color} size={24} focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: translate("tourNavigator.mapTab"),
          tabBarIcon: ({ focused, color }) => (
            <Icon icon="view" color={color} size={24} focused={focused} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: translate("tourNavigator.profileTab"),
          tabBarIcon: ({ focused, color }) => (
            <Icon icon="settings" color={color} size={24} focused={focused} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}