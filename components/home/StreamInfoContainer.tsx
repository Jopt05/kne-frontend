import kneApi from '@/api/kneapi';
import { colors, textTypes } from '@/constants/styles'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import StreamInfoRow from './StreamInfoRow';

const StreamInfoContainer = () => {

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
    
    const handleGoStream = () => {
        Linking.openURL('https://www.twitch.tv/knekro');
    }
    
    useEffect(() => {
        getStreamStatus();
        getStreamInfo();
    }, [])


  return (
    <View style={styles.container}>
        <Text style={styles.title}>
            Información del stream
        </Text>
        <StreamInfoRow 
            title='Estado:' 
            value={ streamingState.isStreaming ? 'En vivo' : 'Fuera de línea' } 
            isLoading={streamingState.isLoading}
            color={ (streamingState.isStreaming) ? 'green' : 'red' }
        />
        <StreamInfoRow 
            title='Titulo:' 
            value={ streamInfo?.info?.title?.title } 
            isLoading={streamInfo.isLoading}
        />
        <StreamInfoRow 
            title='Categoría:' 
            value={ streamInfo?.info?.title?.game_name } 
            isLoading={streamInfo.isLoading}
        />
        {
            (streamingState.isStreaming) && (
                <TouchableOpacity
                    onPress={() => handleGoStream()}
                >
                    <View style={styles.streamButton}>
                        <Text style={styles.streamButtonText}>
                            Ir al stream
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        }
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: colors.third,
        borderRadius: 20,
        padding: 20,
        marginTop: 20,
        gap: 10
    },
    title: {
        fontSize: 20,
        color: colors.fourth,
        fontFamily: textTypes.bold
    },
    streamButton: {
        backgroundColor: colors.secondary,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10
    },
    streamButtonText: {
        color: colors.fourth ,
        fontFamily: textTypes.regular
    }
})

export default StreamInfoContainer