import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NewEmployee from '../components/NewEmployee';
import { Employee } from '../types';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import FilterEmployeee from '../components/FilterEmployeee';

const AttandancePage = ({ empData, }: { empData: Employee[] }): JSX.Element => {
    const navigation = useNavigation()
    const [employees, setEmployees] = useState<Employee[]>([])
    const [employeeType, setEmployeeType] = useState('')

    const [attandance, setAttandance] = useState([{

    }])

    useEffect(() => {
        //getting default filtered employees type to all 
        if (employeeType === 'All') {
            setEmployees(empData)
        }
        else {
            //getting filtered employees type
            const emp = empData?.filter(emp => emp?.field === employeeType)
            setEmployees(emp)
        }
    }, [employeeType])

    return (
        <>
            <View style={styles.topSection}>
                <View style={styles.textContainer}>
                    <Text onPress={() => navigation.navigate('Home')} style={styles.backBtn}>←-</Text>
                    <Text style={styles.topHeading} >Attandance Page </Text>
                </View>

                <View style={{ marginTop: 30, flexDirection: 'row', gap: 20 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('NewEmployeeForm')} style={styles.button}>
                        <Text style={styles.addText}>New</Text>
                        <Text style={styles.addIcon}>+</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('AttandancePage')} style={[styles.button, { width: 170 }]}>
                        <Text style={{ color: 'black', textAlign: 'center', fontSize: 15, width: 170, fontWeight: '500' }}>Attandance Page</Text>
                    </TouchableOpacity> */}

                </View>
            </View >
            <View style={{ paddingHorizontal: 10 }}>

                <FilterEmployeee field={''} setEmployeeType={setEmployeeType} />

                <View style={styles.container}>
                    <View style={styles.header}>
                        <View ><Text style={[styles.headingText,]}>Employee Id</Text></View>
                        <View ><Text style={[styles.headingText,]}>Name</Text></View>
                        <View ><Text style={[styles.headingText,]}>Attandance</Text></View>
                    </View >
                    <ScrollView style={{ height: 500, backgroundColor: "white" }}>
                        {
                            employees.length !== 0 ?
                                (employees.map((employee: Employee) => (<NewEmployee key={employee.id} employee={employee} removeEmployee={''} AttandanceForm />)))
                                :
                                (<Text style={styles.emptyEmpText}>No {employeeType === 'All' ? '' : employeeType} Employees Added!</Text>)
                        }
                    </ScrollView>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity disabled={true} style={styles.submitButton}><Text style={styles.submitText}>Submit</Text></TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const mapStateToProps = (state: { Employee: { employee: Employee[] } }) => {
    return {
        empData: state?.Employee?.employee || []
    }
}

export default connect(mapStateToProps)(AttandancePage)

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row', gap: 10, marginTop: 12
    }, backBtn: {
        color: 'white', fontSize: 23, fontWeight: 'bold', marginBottom: 10
    },
    container: {
        // flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
        overflow: 'hidden',
        marginHorizontal: 10
    },
    header: {
        backgroundColor: '#F8F8FF',
        flexDirection: 'row',
        alignItems: 'center',
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
        fontSize: 13

    },
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
    submitButton: { marginTop: 15, marginEnd: 20, width: 100 },
    submitText: { color: 'white', backgroundColor: 'blue', width: 100, padding: 10, textAlign: 'center', borderRadius: 10 }
    , emptyEmpText: { color: 'black', textAlign: 'center', fontWeight: '600', fontSize: 16, marginTop: 30 }
})

