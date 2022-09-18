import React, { useState, useEffect } from 'react'
import { View , Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import Color from '../utils/Color'
import * as Method from '../utils/Method'
import { SERVER_URL } from '../utils/Constant'
import { Picker } from '@react-native-picker/picker'

const CustomPicker = (props) => {
    const [approvals, setApprovals] = useState([])
    const [selectedValue, setSelectedValue] = useState()
    const [index, setIndex]=useState(0)

  


    useEffect(()=>{
        loadData()
    },[])

    return (
         <Picker 
            selectedValue={selectedValue}
            onValueChange={(itemValue, itemIndex)=>{
                setSelectedValue(itemValue)
                setIndex(itemIndex)
            }}>
                {approvals.map(item=>
                <Picker.Item key={item.id} label={item.name_approval} value={item.id}></Picker.Item>
            )}
         </Picker>
 
    )
}
export default CustomPicker