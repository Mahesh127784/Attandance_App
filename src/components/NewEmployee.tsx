import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Employee } from '../types'
import Snackbar from 'react-native-snackbar'
import { useNavigation } from '@react-navigation/native'

const NewEmployee = ({ employee, removeEmployee, AttandanceForm }: { employee: Employee, removeEmployee: any, AttandanceForm: boolean, }) => {
    const navigation = useNavigation()
    const removeEmp = (empl: Employee) => {
        Alert.alert(
            "",
            `Delete employee ${empl.name + "'s"} data from the table?`,
            [
                {
                    text: "Cancel",
                },
                {
                    text: "Delete",
                    onPress: () => {

                        removeEmployee(empl.id)

                        Snackbar.show({
                            text: `successfully deleted employee ${empl.name + "'s"} data from the table...!`,
                            duration: Snackbar.LENGTH_SHORT
                        })
                    }
                },
            ],
            { cancelable: true }
        );
    };

    const [attandance, setAttandance] = useState(false)
    const changeAttandance = () => {
        setAttandance(!attandance)
    }

    return (
        <View style={styles.body}>
            <View ><Text style={[styles.bodyText,]}>{employee.id}</Text></View>
            <View ><Text style={[styles.bodyText,]}>{employee.name}</Text></View>
            {!AttandanceForm && <>
                <View ><Text style={[styles.bodyText,]}>{employee.gender}</Text></View>
                <View ><Text style={[styles.bodyText,]}>{employee.field}</Text></View>
                <View ><Text style={[styles.bodyText, { width: 230 }]}>{employee.joiningDate + " -" + employee.joiningTime}</Text></View>
                <View ><Text style={[styles.bodyText,]}>Calculating...</Text></View>
                <View style={[styles.bodyText, styles.costomBtn]} >
                    <TouchableOpacity onPress={() => navigation.navigate('NewEmployeeForm', { data: employee })} >
                        <Text style={[styles.buttons, { backgroundColor: 'green' }]} >Update</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeEmp(employee)
                    }>
                        <Text style={[styles.buttons, { backgroundColor: 'red' }]} >Delete</Text>
                    </TouchableOpacity>
                </View>
            </>}
            {AttandanceForm && <View style={[styles.bodyText, { width: 150, alignItems: 'center' }]}>
                <TouchableOpacity
                    style={{
                        width: 25,
                        borderRadius: 5,
                        height: 25,
                        backgroundColor: attandance ? "blue" : 'white',
                        borderColor: 'gray',
                        borderWidth: 1,
                    }}
                    onPress={() => changeAttandance()}
                >
                    <Text style={{ color: 'white', textAlign: 'center' }}>✓</Text>
                </TouchableOpacity>
            </View>}
        </View >
    )
}

export default NewEmployee

const styles = StyleSheet.create({
    body: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    bodyText: {
        paddingVertical: 15,
        color: '#000',
        width: 150,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderColor: 'lightgray',
        fontSize: 15
    },
    buttons: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 10,
        fontSize: 13,
        color: '#fff',
        borderWidth: 1,
    },
    costomBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 13,
        width: 160,
        paddingStart: 10
    }
})