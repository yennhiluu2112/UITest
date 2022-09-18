import React, {useState, useEffect} from 'react'
import { View , Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { UIHeader, CustomButton, InputRange, InputField, CustomPicker } from '../components'
import Color from '../utils/Color'
import * as Method from '../utils/Method'
import { SERVER_URL } from '../utils/Constant'

const CreateScreen = ({navigation, route}) => {
    const [isUpdate, setUpdate] = useState(false)
    const [id, setId] = useState('')
    const [approvalNum, setApprovalNum] = useState('')
    const [name, setName] = useState('')
    const [minimum, setMinimum] = useState('')
    const [maximum, setMaximum] = useState('')

    const [errorName, setErrorName] = useState('')
    const [errorMaximum, setErrorMaximum] = useState('')
    const [errorApprovalNum, setErrorApprovalNum] = useState('')

    const [selectedFeature, setSelectedFeature] = useState('')
    const [features, setFeatures] = useState([])
    const [number, setNumber] = useState([])
    const [approvers, setApprovers] = useState()
    const isValidationOK = name.length>0 && maximum>minimum && approvalNum>0


    const loadData = async () => {
        try{
            const resp1 = await Method.makeRequest(SERVER_URL+'feature/getAll.php','GET',null)
            setFeatures(resp1.data)
        }
        catch(e){
            console.log('Error:',e)
        }
    }

    const addData = async (approvers) => {
        try{
            if(!isUpdate){
                const resp = await Method.makeRequest(SERVER_URL+'matrix/create.php','POST',
                {
                    name : name,
                    minimum : minimum,
                    maximum : maximum,
                    approval_number : approvalNum,
                    feature: selectedFeature.id,
                    id_approvals: approvers
                })
                if(resp.message=='success'){
                    alert('Successfully created matrix')
                    setName('')
                    setMinimum('')
                    setMaximum('')
                    setApprovalNum('')
                }
            }
            else{
                const resp = await Method.makeRequest(SERVER_URL+'matrix/update.php','POST',
                {
                    id_matrix:id,
                    name : name,
                    minimum : minimum,
                    maximum : maximum,
                    approval_number : approvalNum,
                    feature: selectedFeature.id,
                })
                if(resp.message=='success'){
                    alert('Successfully updated matrix')
                }
            }
            
        }
        catch(e){
            console.log('Error:',e)
        }
    }

    useEffect(()=>{
        loadData()
        try{
            const {itemUpdate} = route.params
            if (itemUpdate){
                setId(itemUpdate.id)
                setUpdate(true)
                setName(itemUpdate.name_matrix)
                setMinimum(itemUpdate.minimum_range)
                setMaximum(itemUpdate.maximum_range)
                setApprovalNum(itemUpdate.approval_number)   
                features.map(item=>{
                    if(item.id == itemUpdate.feature){
                        setSelectedFeature(item)
                    }
                })   
            }
        }
        catch(e){
            console.log('Error:',e)
        }


    },[])

    useEffect(()=>{
        const list=[]
        for(i=0; i<approvalNum; i++){
            list.push(i)
        }
        setNumber(list)
    },[approvalNum])

    return (
        <SafeAreaView style={styles.container}>
            <UIHeader 
                iconShow={true}
                iconPress={()=>navigation.navigate("HomeScreen")}/>
            <View style={styles.body}>
                <Text style={styles.title}>{isUpdate ? "Update" : "Create New"} Approval Matrix</Text>
                <View style={styles.line}></View>

                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <InputField 
                        label={'Approval Matrix Alias'} 
                        placeholder={'Input Matrix Name'}
                        value={name}
                        onChangeText={text=>{
                            setErrorName(text.length >0? 
                                '' : 'Please enter matrix name')
                            setName(text)
                        }}
                        
                    />
                    <Text style={styles.errorText}>{errorName}</Text>

                    <View style={styles.inputItem}>
                        <Text style={styles.label}>Approval Matrix Alias</Text>
                        <View style={styles.pickerView}>
                            <Picker 
                                selectedValue={selectedFeature}
                                onValueChange={(itemValue, itemIndex)=>{
                                    setSelectedFeature(itemValue)
                            }}
                                >
                                {features.map(item=>
                                    <Picker.Item key={item.id} label={item.name_feature} value={item}></Picker.Item>
                                )}
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.line_}></View>

                    <InputRange 
                        label={'Maximum'}
                        onChangeText={text=>{
                            setMinimum(text)
                        }}
                        value={minimum}/>

                    <View style={{marginBottom: 44}}/>

                    <InputRange 
                        label={'Maximum'}
                        onChangeText={text=>{
                            setErrorMaximum(text>minimum ? 
                                '' : 'Maximum must be higher than minimum')
                            setMaximum(text)
                        }}
                        value={maximum}/>
                    <Text style={styles.errorText}>{errorMaximum}</Text>

                    <InputField 
                        label={'Number of Approval'} 
                        placeholder={'Input Number'}
                        value={approvalNum}
                        onChangeText={text=>{
                            setErrorApprovalNum(text>0 ? 
                                '' : 'Approval number must be higher than 0')
                            setApprovalNum(text)
                        }}
                        keyboardType={'numeric'}/>
                    <Text style={styles.errorText}>{errorApprovalNum}</Text>

                    {approvalNum>0 && number.map(({item,index}) => 
                        {
                            return (
                            <View key={index} style={styles.inputItem} >
                                <Text style={styles.label}>Approval Matrix Alias</Text>
                            <View style={styles.pickerView}>
                                <CustomPicker/>
                            </View>
                            </View>
                        )}
                    )}

                    <View style={{marginTop: 20}}></View>

                    <CustomButton 
                        label={isUpdate ? 'UPDATE' :'ADD TO LIST'} 
                        isValidationOK={isValidationOK}
                        onPress={()=>{
                            addData(approvers)
                        }}
                    />

                    <CustomButton 
                        label={'RESET'}
                        onPress={()=>{
                            setName('')
                            setMinimum('')
                            setMaximum('')
                            setApprovalNum('')
                        }}
                    />
                </ScrollView>
            </View>
            
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 100,
        backgroundColor: 'white',
    },
    body:{
        flex: 92,
        paddingHorizontal: 30,
    },
    title:{
        fontWeight: '900',
        fontSize: 22,
        color: Color.branding_orange,
        textAlign: 'center',
        marginTop: 21,

    },
    line:{
        width: '100%',
        height: 1,
        backgroundColor: Color.branding_gray,
        marginTop: 20,
        marginBottom: 40,
    },
    scrollView:{
        marginBottom: 30,

    },
    label:{
        color: Color.text_black,
        fontSize: 15,
        fontWeight: '400'
    },
    inputItem:{
        marginBottom: 44,
    },
    inputView:{
        borderRadius: 15,
        borderColor: Color.branding_gray,
        borderWidth: 1,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,

    },
    textInput:{
        fontWeight: '400',
        fontSize: 15,
        paddingVertical: 14,
    },

    line_:{
        width: '100%',
        height: 1,
        backgroundColor: '#F4F5F7',
        marginBottom: 20,
    },
    errorText:{
        color: 'red', 
        fontSize: 13, 
        marginBottom: 44, 
        marginTop:5,
        marginStart: 20
    },
    pickerView:{
        borderRadius: 15,
        borderColor: Color.branding_gray,
        borderWidth: 1,
        marginTop: 8
    },

})
export default CreateScreen