import { StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { data, formdata } from '../types';

const FilterEmployeee = ({ setEmployeeType, newForm, field }: { setEmployeeType: Dispatch<SetStateAction<string>>, newForm?: boolean, field: string }) => {


    const [value, setValue] = useState('All')

    useEffect(() => {
        if (field && value === 'All') {
            setEmployeeType(field)
        } else {
            setEmployeeType(value)
        }
    }, [value, field])

    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center", marginVertical: 10, marginTop: 20 }}>
            <Text style={{ color: 'black', fontSize: 15 }} >
                Field Of The Employee  {newForm ? '*' : ':'}
            </Text>

            <View style={{ marginLeft: 10 }}>
                <Dropdown
                    style={styles.dropdown}
                    placeholder='Working Field'
                    placeholderStyle={{ color: 'gray', fontSize: 14, marginStart: 8 }}
                    selectedTextStyle={{ color: "black", marginStart: 10, fontSize: 13 }}
                    inputSearchStyle={{ color: 'black', fontSize: 14 }}
                    itemTextStyle={{ color: 'black', fontSize: 14 }}
                    data={newForm ? formdata : data}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    searchPlaceholder="Search..."
                    value={newForm ? (field ? field : '') : value}
                    onChange={item => {
                        setValue(item.value);
                    }}

                ></Dropdown>
            </View>

        </View>
    )
}

export default FilterEmployeee

const styles = StyleSheet.create({
    dropdown: {
        backgroundColor: 'white',
        width: 150,
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 10
    }
})