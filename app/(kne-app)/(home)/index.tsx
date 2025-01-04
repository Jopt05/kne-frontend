import kneApi from '@/api/kneapi'
import Subtitle from '@/components/Subtitle'
import { colors } from '@/constants/styles'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import { isLoading } from 'expo-font'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'

const HomeScreen = () => {

  const { user, logOut } = useContext( AuthContext );

  const [streamingState, setStreamingState] = useState({
    isStreaming: false,
    isLoading: true
  });
  const [streamInfo, setSetstreamInfo] = useState<any>({
    isLoading: true,
    info: null
  });

  const getStreamStatus = async() => {
    const response = await axios.get('https://www.twitch.tv/knekro');
    const sourceCode = response.data;
    const isStreaming = sourceCode.includes('isLiveBroadcast');

    setStreamingState({
      ...streamingState,
      isStreaming,
      isLoading: false
    })
  }

  const getStreamInfo = async() => {
    const response = await kneApi.get('/twitch/stream-info');
    if ( response.status != 200 ) {
      setSetstreamInfo({
        info: null,
        isLoading: false
      })
      return;
    } 

    setSetstreamInfo({
      info: response.data.data,
      isLoading: false
    })
  }

  useEffect(() => {
    getStreamStatus();
    getStreamInfo();
  }, [])
  

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.welcomeMessageContainer}>
          <Text style={styles.text}>
            Bienvenido, 
          </Text>
          <Text style={styles.textUser}>
            { user?.username }
          </Text>
          <Text style={styles.text}>
            .
          </Text>
        </View>
        <View style={styles.isOnlineContainer}>
          <View style={styles.isOnlineRow}>
            <Text style={styles.isOnlineTitle}>
              ¿Está padre online?
            </Text>
            <Text style={styles.textUser}>
              {
                (streamingState.isLoading)
                ? <ActivityIndicator size={20}/>
                : (streamingState.isStreaming)
                  ? 'Si'
                  : 'No'
              }
            </Text>
          </View>
          <View style={{
            ...styles.isOnlineRow,
            ...styles.secondRow
          }}>
            <Text style={styles.textUser}>
              Titulo actual
            </Text>
            {
              (streamInfo.isLoading)
              ? <ActivityIndicator size={20}/>
              : <Text style={styles.text}>
                { `" ${streamInfo.info.title.title} "` }
              </Text>
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  welcomeMessageContainer: {
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 20,
    color: colors.fourth,
    marginRight: 10,
  },
  textUser: {
    fontSize: 20,
    color: colors.fourth,
    fontWeight: 'bold',
  },
  isOnlineContainer: {
    width: 'auto',
    backgroundColor: colors.third,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 20,
    gap: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  isOnlineRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  secondRow: {
    flexDirection: 'column',
    gap: 5
  },
  isOnlineTitle: {
    flex: 1,
    fontSize: 20,
    color: colors.fourth,
  },
})

export default HomeScreen