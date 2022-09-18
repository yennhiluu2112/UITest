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

    const loadData = async () => {
        try{
            const resp2 = await Method.makeRequest(SERVER_URL+'approval/getAll.php','GET',null)
            setApprovals(resp2.data)
        }
        catch(e){
            console.log('Error:',e)
        }
    }


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