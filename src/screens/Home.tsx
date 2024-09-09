import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Header from '../components/Header'
import FilterEmployeee from '../components/FilterEmployeee'
import EmployeesLists from '../components/EmployeesLists'


export default function Home(): JSX.Element {
    const [employeeType, setEmployeeType] = useState('')
    return (
        <View style={styles.parentContanier}>
            <Header />
            <View style={{ paddingHorizontal: 10 }}>
                <FilterEmployeee field={''} newForm={false} setEmployeeType={setEmployeeType} />
                <EmployeesLists employeeType={employeeType} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    parentContanier: {
        backgroundColor: '#faf0e6',
        flex: 1,
    },

})