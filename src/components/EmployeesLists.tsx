import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NewEmployee from './NewEmployee';
import { Employee, HomeProps } from '../types';
import { connect } from 'react-redux';
import { removeEmployee } from '../redux';

const EmployeesLists = ({ employeeType, empData, removeEmployee }: { employeeType: string, empData: Employee[], removeEmployee: (id: string) => {} }): JSX.Element => {
    const [employees, setEmployees] = useState<Employee[]>([])
    // const update = (emp) => { 

    // }

    useEffect(() => {

        if (employeeType === 'All') {
            setEmployees(empData)
        }
        else {
            const emp = empData?.filter(emp => emp?.field === employeeType)
            setEmployees(emp)
        }
    }, [employeeType, empData])

    return (
        <View>
            <ScrollView horizontal >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View ><Text style={[styles.headingText,]}>Employee Id</Text></View>
                        <View ><Text style={[styles.headingText,]}>Name</Text></View>
                        <View ><Text style={[styles.headingText,]}>Gender</Text></View>
                        <View ><Text style={[styles.headingText,]}>Field of Work</Text></View>
                        <View ><Text style={[styles.headingText, { width: 230 }]}>Joining date and time</Text></View>
                        <View ><Text style={[styles.headingText,]}>Attandance %</Text></View>
                        <View ><Text style={[styles.headingText, { width: 180 }]}>Actions</Text></View>
                    </View >
                    <ScrollView style={{ height: 500, backgroundColor: "white" }}>
                        {
                            employees.length !== 0 ?
                                (employees.map((employee: Employee, i) => (<NewEmployee key={i} employee={employee} removeEmployee={removeEmployee} />)))
                                :
                                (<Text style={{ color: 'black', textAlign: 'center', fontWeight: '600', fontSize: 16, marginTop: 30 }}>No {employeeType === 'All' ? '' : employeeType} Employees Added!</Text>)
                        }
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    )
}


const mapStateToProps = (state: { Employee: { employee: Employee[] } }) => {
    return {
        empData: state?.Employee?.employee || []
    }
}

const mapDispatchToProps = {
    removeEmployee
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesLists)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
        marginEnd: 20,
        overflow: 'hidden'
    },
    header: {
        backgroundColor: '#F8F8FF',
        flexDirection: 'row',
        alignItems: 'center',
        height: 100
    },
    headingText: {
        // height: 60,
        paddingVertical: 20,
        paddingHorizontal: 10,
        color: '#000',
        width: 150,
        textAlign: 'center',
        fontWeight: 'bold',
        borderBottomWidth: 1,
        fontSize: 15

    },

})

