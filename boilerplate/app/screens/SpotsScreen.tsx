import { observer } from "mobx-react-lite"
import { FC } from "react"
import { ViewStyle, FlatList } from "react-native"
import { Screen, SpotCard } from "@/components"
import { TourTabScreenProps } from "@/navigators/TourNavigator"
import { spacing } from "@/theme"
import { useHeader } from "@/utils/useHeader"

interface SpotsScreenProps extends TourTabScreenProps<"Spots"> {}

interface SpotItem {
  id: string
  name: string
  description: string
  image: string
}

const mockSpots: SpotItem[] = [
  {
    id: "1",
    name: "西湖",
    description: "杭州市区最著名的景点，有着悠久的历史和美丽的自然风光。西湖三面环山，一面临城，湖中点缀着许多亭台楼阁，是游客必访的景点之一。",
    image: "https://images.unsplash.com/photo-1598887142487-3c854d51d1c7"
  },
  {
    id: "2",
    name: "灵隐寺",
    description: "始建于东晋，是杭州最古老的寺院之一。寺院依山而建，环境清幽，是体验佛教文化的理想去处。",
    image: "https://images.unsplash.com/photo-1599888384589-5cae656cc89c"
  },
  {
    id: "3",
    name: "千岛湖",
    description: "位于淳安县，是世界上岛屿最多的湖泊之一。这里水质清澈，空气清新，是休闲度假的绝佳选择。",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  },
  {
    id: "4",
    name: "宋城",
    description: "以宋朝文化为主题的大型主题公园，在这里可以体验到丰富的宋代文化和精彩的表演节目。",
    image: "https://images.unsplash.com/photo-1533727937480-da3a97967e95"
  },
  {
    id: "5",
    name: "河坊街",
    description: "杭州著名的古街，保留了明清时期的建筑风格。街道两旁有许多特色小店和老字号，是感受杭州传统文化的好去处。",
    image: "https://images.unsplash.com/photo-1518563222397-1875011bbf5a"
  }
]

export const SpotsScreen: FC<SpotsScreenProps> = observer(function SpotsScreen(_props) {
  useHeader({
    title: "景点列表",
    titleMode: "center",
  })

  const renderSpotItem = ({ item }: { item: SpotItem }) => (
    <SpotCard
      {...item}
      onPress={() => _props.navigation.navigate("SpotDetail", { spot: item })}
    />
  )

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <FlatList
        data={mockSpots}
        keyExtractor={(item) => item.id}
        renderItem={renderSpotItem}
        contentContainerStyle={$listContainer}
      />
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
}

const $listContainer: ViewStyle = {
  padding: spacing.md,
}