import kneApi from '@/api/kneapi'
import StreamInfoContainer from '@/components/home/StreamInfoContainer'
import Subtitle from '@/components/Subtitle'
import { colors } from '@/constants/styles'
import { AuthContext } from '@/context/AuthContext'
import axios from 'axios'
import { isLoading } from 'expo-font'
import React, { useContext, useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'

const HomeScreen = () => {

  const { user } = useContext( AuthContext );
  
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
        <StreamInfoContainer />
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
    fontWeight: 'bold'
  }
})

export default HomeScreen