import { colors } from '@/constants/styles';
import { AuthContext } from '@/context/AuthContext'
import { Redirect, Stack } from 'expo-router';
import React, { useContext } from 'react'
import { ActivityIndicator, View } from 'react-native';

const CheckAuthLayout = () => {

    const { status } = useContext( AuthContext );

    if (status === 'checking') {
        return (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}
          >
            <ActivityIndicator size={60}/>
          </View>
        );
    }

    if( status == 'not-authenticated' ) {
        return <Redirect href="/auth/login/"></Redirect>
    }
  
    return(
        <Stack
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen 
                name='(home)/index'
                options={{
                    title: 'Inicio'
                }}
            />
        </Stack>
    )
}

export default CheckAuthLayout;