import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { formatProdErrorMessage } from '@reduxjs/toolkit'

const CustomCheckBox = ({ inputHeading, formData, setFormData, setGenderType, genderType,
    genderBox }: any) => {

    const genderColour = () => {
        if (genderBox === 'Male') {
            return (genderType.Male ? '#e60033' : 'white')
        }
        else if (genderBox === 'Female') {
            return (genderType.Female ? '#ff1fd7' : 'white')
        }
        else {
            return (genderType.Other ? 'black' : 'white')
        }
    }

    const genderChecked = () => {
        if (genderBox === 'Male') {
            // setGenderType({ Male: true, Female: false, Other: false })
            // setFormData({ ...formData, gender:'Male' })
            setGenderType({ Male: !genderType.Male, Female: false, Other: false })
            setFormData({ ...formData, gender: genderType.Male ? '' : 'Male' })
        }
        else if (genderBox === 'Female') {
            // setGenderType({ Male: false, Female: true, Other: false })
            // setFormData({ ...formData, gender: 'Female' })
            setGenderType({ Male: false, Female: !genderType.Female, Other: false })
            setFormData({ ...formData, gender: genderType.Female ? '' : 'Female' })
        }
        else {
            // setGenderType({ Male: false, Female: false, Other: true })
            // setFormData({ ...formData, gender: 'Other' })
            setGenderType({ Male: false, Female: false, Other: !genderType.Other })
            setFormData({ ...formData, gender: genderType.Other ? '' : 'Other' })
        }
    }

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Text style={inputHeading}>{genderBox}</Text>
            <TouchableOpacity
                style={{
                    width: 25,
                    borderRadius: 5,
                    height: 25,
                    backgroundColor: genderColour(),
                    borderColor: 'gray',
                    borderWidth: 1,
                }}
                onPress={() => genderChecked()}
            >
                <Text style={{ color: 'white', textAlign: 'center' }}>✓</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CustomCheckBox