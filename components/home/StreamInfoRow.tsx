import { colors, textTypes } from '@/constants/styles';
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface Props {
    title: string;
    value?: string;
    isLoading?: boolean;
    color?: string;
}

const StreamInfoRow = ({ title, value, isLoading, color }: Props) => {
  return (
    <View style={styles.row}>
        <Text style={styles.rowTitle}>
            { title }
        </Text>
        {
            (isLoading) 
            ? <ActivityIndicator />
            : <Text style={{
                ...styles.rowInfo,
                color: color ? color : colors.fourth
            }}>
                    {value}
                </Text>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rowTitle: {
        flex: 1,
        fontSize: 16,
        color: colors.fourth,
        // fontWeight: 'bold',
        fontFamily: textTypes.bold
    },
    rowInfo: {
        fontSize: 12,
        color: colors.fourth,
        fontFamily: textTypes.regular,
        width: '50%'
    }
})

export default StreamInfoRow