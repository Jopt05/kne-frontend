import Subtitle from '@/components/Subtitle'
import { colors } from '@/constants/styles'
import { AuthContext } from '@/context/AuthContext'
import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

const HomeScreen = () => {

  const { user, logOut } = useContext( AuthContext );

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
          <Text style={styles.isOnlineTitle}>
            ¿Está padre online?
          </Text>
          <Text style={styles.textUser}>
            No 
          </Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  isOnlineTitle: {
    fontSize: 20,
    color: colors.fourth,
  },
  isOnlineSubtitle: {
    fontSize: 16,
    color: colors.fourth,
  }
})

export default HomeScreen