import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/styles';

interface Props {
    text: string;
}

export default function Subtitle({ text }: Props) {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>
            {text}
        </Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 10
    },
    text: {
        fontSize: 24,
        fontWeight: 'light',
        color: colors.third
    }
})
