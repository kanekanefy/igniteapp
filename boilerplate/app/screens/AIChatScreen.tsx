import { observer } from "mobx-react-lite"
import { FC, useState, useCallback, useEffect } from "react"
import { ViewStyle, View, TextInput, FlatList, KeyboardAvoidingView, Platform, Alert } from "react-native"
import { Screen, Text, Button, Icon } from "@/components"
import { AppStackScreenProps } from "@/navigators"
import { spacing } from "@/theme"
import { useHeader } from "@/utils/useHeader"

// OpenAI API 配置
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || ''
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

export interface AIChatScreenProps extends AppStackScreenProps<"AIChat"> {}

interface ChatMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export const AIChatScreen: FC<AIChatScreenProps> = observer(function AIChatScreen(props) {
  const { route } = props
  const { spot } = route.params

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: `欢迎来到${spot.name}！我是您的 AI 导游助手。请问有什么我可以帮您的吗？`,
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  useHeader({
    title: 'AI 导游助手',
    titleMode: 'center',
    leftIcon: 'back',
    onLeftPress: () => props.navigation.goBack(),
  })

  const renderMessage = ({ item }: { item: ChatMessage }) => (
    <View style={[item.isUser ? $userMessage : $aiMessage]}>
      <Text
        text={item.text}
        style={[item.isUser ? $messageText : $aiMessageText]}
      />
      <Text
        text={item.timestamp.toLocaleTimeString()}
        style={$timeText}
      />
      {isLoading && !item.isUser && item.id === messages[messages.length - 1].id && (
        <Text text="正在输入..." style={$loadingText} />
      )}
    </View>
  )

  const generateAIResponse = useCallback(async (userInput: string) => {
    if (!OPENAI_API_KEY) {
      Alert.alert('错误', '请配置 OpenAI API Key')
      return null
    }

    try {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `你是一个专业的景点导游，正在为游客介绍${spot.name}。你需要根据景点的特点和游客的问题提供专业、友好的解答。以下是景点的基本信息：${spot.description}`,
            },
            {
              role: 'user',
              content: userInput,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      })

      const data = await response.json()
      return data.choices[0]?.message?.content
    } catch (error) {
      console.error('AI Response Error:', error)
      return null
    }
  }, [spot])

  const handleVoiceInput = async () => {
    try {
      if (isListening) {
        // 停止语音识别
        setIsListening(false)
        // TODO: 调用 Voice.stop() 停止语音识别
      } else {
        setIsListening(true)
        // TODO: 调用 Voice.start('zh-CN') 开始语音识别
      }
    } catch (error) {
      console.error('Voice input error:', error)
      Alert.alert('错误', '语音输入出现问题，请稍后再试')
      setIsListening(false)
    }
  }

  const handleSpeakMessage = async (text: string) => {
    try {
      if (isSpeaking) {
        // TODO: 调用 Tts.stop() 停止语音播报
        setIsSpeaking(false)
      } else {
        setIsSpeaking(true)
        // TODO: 调用 Tts.speak(text) 开始语音播报
      }
    } catch (error) {
      console.error('TTS error:', error)
      Alert.alert('错误', '语音播报出现问题，请稍后再试')
      setIsSpeaking(false)
    }
  }

  const handleSend = async () => {
    if (!inputText.trim()) return
  
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    }
  
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsLoading(true)
  
    const aiResponse = await generateAIResponse(inputText)
    
    const aiMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: aiResponse || '抱歉，我现在无法回答您的问题。请稍后再试。',
      isUser: false,
      timestamp: new Date(),
    }
    
    setMessages(prev => [...prev, aiMessage])
    setIsLoading(false)

    // 自动播报 AI 回复
    if (aiResponse) {
      handleSpeakMessage(aiResponse)
    }
  }

  const $timeText: ViewStyle = {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: spacing.xs,
    alignSelf: 'flex-end',
  }

  const $loadingText: ViewStyle = {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: spacing.xs,
    fontStyle: 'italic',
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={$keyboardAvoid}
      >
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={item => item.id}
          contentContainerStyle={$messageList}
          inverted={false}
        />
        <View style={$inputContainer}>
          <TextInput
            style={$input}
            value={inputText}
            onChangeText={setInputText}
            placeholder="输入您的问题..."
            multiline
          />
          <View style={$buttonContainer}>
            <Button
              onPress={handleVoiceInput}
              style={[isListening ? $activeIconButton : $iconButton]}
            >
              <Icon icon="mic" size={24} color={isListening ? "#007AFF" : undefined} />
            </Button>
            <Button
              onPress={handleSend}
              style={$sendButton}
              disabled={!inputText.trim()}
              tx="common.send"
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
}

const $keyboardAvoid: ViewStyle = {
  flex: 1,
}

const $messageList: ViewStyle = {
  flexGrow: 1,
  padding: spacing.sm,
}

const $message: ViewStyle = {
  borderRadius: 8,
  padding: spacing.sm,
  marginVertical: spacing.xs,
  maxWidth: '80%',
}

const $userMessage: ViewStyle = {
  ...$message,
  backgroundColor: '#007AFF',
  alignSelf: 'flex-end',
  marginLeft: '20%',
}

const $aiMessage: ViewStyle = {
  ...$message,
  backgroundColor: '#E9E9EB',
  alignSelf: 'flex-start',
  marginRight: '20%',
}

const $messageText: ViewStyle = {
  fontSize: 16,
  color: '#FFFFFF',
}

const $aiMessageText: ViewStyle = {
  color: '#000000',
}

const $inputContainer: ViewStyle = {
  flexDirection: 'row',
  padding: spacing.sm,
  borderTopWidth: 1,
  borderTopColor: '#E9E9EB',
  backgroundColor: '#FFFFFF',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 5,
}

const $input: ViewStyle = {
  flex: 1,
  borderWidth: 1,
  borderColor: '#E9E9EB',
  borderRadius: 20,
  paddingHorizontal: spacing.sm,
  paddingVertical: spacing.xs,
  marginRight: spacing.xs,
  maxHeight: 100,
}

const $buttonContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

const $iconButton: ViewStyle = {
  marginRight: spacing.xs,
  paddingHorizontal: spacing.xs,
}

const $sendButton: ViewStyle = {
  paddingHorizontal: spacing.md,
}

const $activeIconButton: ViewStyle = {
  ....$iconButton,
  backgroundColor: "rgba(0, 122, 255, 0.1)",
}