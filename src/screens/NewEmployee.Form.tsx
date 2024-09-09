import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import FilterEmployeee from '../components/FilterEmployeee'
import DatePicker, { getToday, getFormatedDate } from 'react-native-modern-datepicker'
import { connect } from 'react-redux'
import { addEmployee, updateEmployee } from '../redux'
import { Employee, StateData } from '../types'
import CustomCheckBox from '../components/CustomCheckBox'
import Snackbar from 'react-native-snackbar'
import { useNavigation } from '@react-navigation/native'

const NewEmployee = ({ addEmployee, updateEmployee, empData, route, }: { addEmployee: Function, updateEmployee: Function, empData: Employee[], route: any, }) => {
    const navigation = useNavigation()

    // check box values finder
    const [genderType, setGenderType] = useState({
        Male: false,
        Female: false,
        Other: false
    });
    const today = new Date()
    // start date on calander chart
    const startDate = getFormatedDate(today.setDate(today.getDate()), 'YYYY/MM/DD')

    //default today selected in modal
    const [date, setDate] = useState(getToday());

    //employee data from form
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        gender: '',
        joiningDate: '',
        joiningTime: '',
        attandance: [{
            date: date,
            attandance: false
        }]
    })

    const [field, setField] = useState('')

    //date modal visibility
    const [open, setOpen] = useState({
        calander: false,
        time: false
    })

    // employee form submit
    const handleSubmit = () => {
        const data = { ...formData, field }

        let validData = true
        // check for empty data from form
        for (const key in data) {
            if (data[key] === '' || data[key] === 'All') {
                validData = false
                Snackbar.show({
                    text: `Please enter ${key} of the employee...!`,
                    duration: Snackbar.LENGTH_SHORT
                })
                break
            }
        }

        if (validData) {
            //checking if the old data is updating or new data is adding, by checking the id of the data with all the saved employees data 
            const empType = empData?.filter(emp => emp?.id === formData.id)

            //data sending to action reducer
            if (empType.length !== 0) {
                //updating the data
                updateEmployee(data)
                Snackbar.show({
                    text: `Updadted employee ${data.name} data successfully`,
                    duration: Snackbar.LENGTH_SHORT
                })
                navigation.navigate('Home')
            } else {
                //adding new data 
                addEmployee(data)
                Snackbar.show({
                    text: `Added employee ${data.name} data successfully in the table`,
                    duration: Snackbar.LENGTH_SHORT
                })
                navigation.navigate('Home')

                //creating the new id for next employee
                // const newId = String(Number(formData.id) + 1)

                // setFormData({
                //     id: newId,
                //     name: '',
                //     gender: '',
                //     joiningDate: '',
                //     joiningTime: ''
                // })
                // setField('')
                // setGenderType({
                //     Male: false,
                //     Female: false,
                //     Other: false
                // })
            }
        }
    }

    useEffect(() => {

        //navigating to the form through updating purpous
        if (route?.params?.data) {

            // get the value from params sent through navigating page
            const { data } = route?.params
            const { id, name, joiningDate, gender, joiningTime, attandance } = data

            //set input form with employee data
            setFormData({
                id, name, joiningDate, joiningTime, gender, attandance
            })
            setField(data.field)

            Object.keys(genderType).forEach((keyVal) => {
                if (gender === keyVal) {
                    setGenderType({ ...genderType, [keyVal]: true })
                }
            })

        }

        //new empl is adding
        else {
            //handling employee id dinamically according to previous employee id
            if (empData.length !== 0) {
                //making new emp id in incrementing order with previos emp id
                const prevId = Number(empData[empData.length - 1].id)
                const newId = String(prevId + 1)

                setFormData({ ...formData, id: newId })
            } else {
                //first employee is adding
                setFormData({ ...formData, id: '100' })
            }
        }
    }, [empData])

    return (
        <View >
            <View style={styles.formHeader}>
                <View style={styles.textContainer}>
                    <Text onPress={() => navigation.navigate('Home')} style={styles.backBtn}>←-</Text>
                    <Text style={styles.headerText} >Add New Employee </Text>
                </View>
            </View>
            <View style={styles.formContainer}>
                <View >
                    <Text style={styles.inputHeading}>
                        Employer Id *
                    </Text>
                    <TextInput
                        readOnly
                        style={[styles.inputDiv, { paddingStart: 20, backgroundColor: 'lightgray' }]}
                        defaultValue={formData.id}
                    />
                </View>
                <View >
                    <Text style={styles.inputHeading}>
                        Name *
                    </Text>
                    <TextInput
                        placeholderTextColor='gray'
                        style={styles.inputDiv}
                        placeholder="Employee Name"
                        onChangeText={newText => setFormData({ ...formData, name: newText })}
                        defaultValue={formData.name}
                    />
                </View>
                <View>
                    <Text style={styles.inputHeading}>Gender *</Text>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        {['Male', 'Female', 'Other'].map((gend) => (<CustomCheckBox
                            setFormData={setFormData}
                            formData={formData}
                            key={gend}
                            setGenderType={setGenderType}
                            inputHeading={styles.inputHeading}
                            genderType={genderType}
                            genderBox={gend}
                        />))}
                    </View>
                </View>
                <FilterEmployeee field={field} setEmployeeType={setField} newForm />

                <View>
                    <Text style={styles.inputHeading}>
                        Joined On *
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 20 }}>
                        <TouchableOpacity onPress={() => setOpen({ time: false, calander: true })} >
                            <TextInput
                                readOnly
                                placeholderTextColor='gray'
                                style={styles.datePickers}
                                placeholder="Date"
                                defaultValue={formData.joiningDate}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setOpen({ time: true, calander: false })} >
                            <TextInput
                                readOnly
                                placeholderTextColor='gray'
                                style={[styles.datePickers, { width: 100, }]}
                                placeholder="Time"
                                defaultValue={formData.joiningTime}
                            />
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={open.calander}
                    >
                        <View style={styles.centered}>
                            <View style={styles.modal}>

                                <DatePicker
                                    mode='calendar'
                                    selected={date}
                                    maximumDate={startDate}
                                    onDateChange={(dateString) => { setDate(dateString); setFormData({ ...formData, joiningDate: dateString }) }}
                                />

                                <TouchableOpacity onPress={() => {
                                    setOpen({ time: false, calander: false })
                                    if (formData.joiningDate === '') setFormData({ ...formData, joiningDate: date })
                                }} >
                                    <Text style={{ color: 'black', paddingHorizontal: 25, paddingVertical: 10, backgroundColor: '#66D3FA', borderRadius: 10 }} >OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={open.time}
                    >
                        <View style={styles.centered}>

                            <View style={styles.modal}>
                                <DatePicker
                                    mode='time'
                                    selected={formData.joiningTime}
                                    minuteInterval={1}
                                    onTimeChange={selectedTme => setFormData({ ...formData, joiningTime: selectedTme })}

                                />
                                <TouchableOpacity onPress={() => {
                                    setOpen({ time: false, calander: false })
                                    if (formData.joiningTime === '') setFormData({ ...formData, joiningTime: '00:00' })
                                }} >
                                    <Text style={{ color: 'black', paddingHorizontal: 25, paddingVertical: 10, backgroundColor: '#66D3FA', borderRadius: 10 }} >OK</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Modal>
                </View>
                <Button title='Submit' onPress={handleSubmit} ></Button>
            </View>
        </View >

    )
}
const mapStateToProps = (state: StateData) => {
    return {
        empData: state?.Employee?.employee || []
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addEmployee: (empData: Employee) => dispatch(addEmployee(empData)),
//         updateEmployee: (empData: Employee) => dispatch(updateEmployee(empData))
//     }
// }



const mapDispatchToProps = {
    addEmployee,
    updateEmployee,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewEmployee)

const styles = StyleSheet.create({
    formHeader: { paddingLeft: 20, paddingTop: 10, backgroundColor: 'blue', height: 100, },
    textContainer: {
        flexDirection: 'row', gap: 10, marginTop: 12
    },
    headerText: {
        color: 'white', fontSize: 18, fontWeight: '700', marginTop: 5
    },
    backBtn: {
        color: 'white', fontSize: 23, fontWeight: 'bold', marginBottom: 10
    },
    formContainer: {
        gap: 20,
        backgroundColor: '#faf0e6',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 50,
        paddingVertical: 30,
        margin: 30
    },
    inputHeading: { color: 'black', padding: 5 },
    inputDiv: { padding: 12, backgroundColor: 'white', color: 'black', borderRadius: 10, borderWidth: 1, },
    datePickers: { padding: 12, backgroundColor: 'white', width: 150, textAlign: 'center', color: 'black', borderRadius: 10, borderWidth: 1, },
    dropdown: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 13
    },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 22 }
    ,
    modal: { margin: 20, backgroundColor: 'white', borderRadius: 20, width: '80%', padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },


})
