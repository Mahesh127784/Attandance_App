import { Text, StyleSheet, View, TextInput, Button, TouchableOpacity, Touchable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Header = (): JSX.Element => {
    const navigation = useNavigation()

    return (
        <View style={styles.topSection}>
            <Text style={styles.topHeading}>Employees Data</Text>

            <View style={{ marginTop: 30, flexDirection: 'row', gap: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate('NewEmployeeForm')} style={styles.button}>
                    <Text style={styles.addText}>New</Text>
                    <Text style={styles.addIcon}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AttandancePage')} style={[styles.button, { width: 170 }]}>
                    <Text style={{ color: 'black', textAlign: 'center', fontSize: 15, width: 170, fontWeight: '500' }}>Attandance Page</Text>
                </TouchableOpacity>

            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    topSection: {
        backgroundColor: 'blue',
        // height: 100,
        padding: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: "center",
        paddingLeft: 20
    },
    topHeading: {
        fontSize: 28,
        fontWeight: '600',
        color: '#fff'
    },
    button:
        { paddingVertical: 8, backgroundColor: 'white', width: 90, alignItems: 'center', borderRadius: 10, flexDirection: 'row' },
    addIcon: { color: 'black', fontSize: 20, fontWeight: '500' },
    addText: { color: 'black', fontSize: 15, paddingHorizontal: 10, textAlign: 'center', fontWeight: '500' },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
})

export default Header