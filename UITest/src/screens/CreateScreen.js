import React, {useState, useEffect} from 'react'
import { View , Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { UIHeader, CustomButton, InputRange, InputField, CheckBox } from '../components'
import Color from '../utils/Color'
import * as Method from '../utils/Method'
import { HEIGHT, SERVER_URL } from '../utils/Constant'

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
    const [selected, setSelected] = useState([])
    const [approvers, setApprovers] = useState([])

    const isValidationOK = name.length>0 && maximum>minimum && approvalNum>0

    const [visible, setVisible] = useState(false)

    const loadData = async () => {
        try{
            const resp1 = await Method.makeRequest(SERVER_URL+'feature/getAll.php','GET',null)
            setFeatures(resp1.data)
            const resp2 = await Method.makeRequest(SERVER_URL+'approval/getAll.php','GET',null)
            setApprovers(resp2.data)
        }
        catch(e){
            console.log('Error:',e)
        }
    }

    const loadApprovers = async (id) => {
        try{
            const resp = await Method.makeRequest(SERVER_URL+`approval/getListByMatrixId.php?id_matrix=${id}`,'GET',null)
            list = []
            resp.data.map(item => {
                list.push(item.id)
            })
            setSelected(list)
        }
        catch(e){
            console.log('Error:',e)
        }
    }
    const addData = async () => {
        try{
            let list = []
            selected.map(item=>{
                list.push(+item)
            })
            console.log(list)
            if(!isUpdate){
                const resp = await Method.makeRequest(SERVER_URL+'matrix/create.php','POST',
                {
                    name : name,
                    minimum : minimum,
                    maximum : maximum,
                    approval_number : approvalNum,
                    feature: selectedFeature.id,
                    id_approvals: list
                })
                if(resp.message=='success'){
                    alert('Successfully created matrix')
                    setName('')
                    setMinimum('')
                    setMaximum('')
                    setApprovalNum('')
                    setSelectedFeature('')
                    setSelected([])
                }
            }
            else{
                const resp = await Method.makeRequest(SERVER_URL+'matrix/update.php','PUT',
                {
                    id_matrix:id,
                    name : name,
                    minimum : minimum,
                    maximum : maximum,
                    approval_number : approvalNum,
                    feature: selectedFeature.id,
                    id_approvals: list
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
                loadApprovers(itemUpdate.id)
                console.log('Selected: ', selected)   
            } 
        }
        catch(e){
            console.log('Error:',e)
        }

    },[])

    return (
        <SafeAreaView style={styles.container}>
            <CheckBox options={approvers} visible={visible} setVisible={setVisible} selected={selected} setSelected={setSelected}/>
            <ScrollView showsVerticalScrollIndicator={false}>

            <UIHeader 
                iconShow={true}
                iconPress={()=>{navigation.goBack()
                    route.params.render=!route.params.render
                }}/>

            <View style={styles.body}>
                <Text style={styles.title}>{isUpdate ? "Update" : "Create New"} Approval Matrix</Text>
                <View style={styles.line}></View>

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
                        <Text style={styles.label}>Feature</Text>
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
                        label={'Minimum'}
                        onChangeText={text=>{
                            setMinimum(text)
                        }}
                        value={minimum}/>
        
                    <Text style={styles.errorText}></Text>

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

                    <View style={styles.inputItem}>
                        <Text style={styles.label}>Approvers</Text>
                        <TouchableOpacity 
                            style={styles.inputView}
                            onPress={()=>{setVisible(true)}}>
                            <Text style={styles.text} numberOfLines={1}>SELECT APPROVER</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{marginTop: 20}}></View>

                    <CustomButton 
                        label={isUpdate ? 'UPDATE' : 'ADD TO LIST'} 
                        isValidationOK={isUpdate ? true : isValidationOK}
                        onPress={()=>{
                            addData()
                            if(isUpdate){
                                navigation.navigate('HomeScreen', {render:!route.params.render})
                            }
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
            </View>
            </ScrollView>



        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    body:{
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
        marginBottom: 35, 
        marginTop:5,
        marginStart: 20
    },
    pickerView:{
        borderRadius: 15,
        borderColor: Color.branding_gray,
        borderWidth: 1,
        marginTop: 8
    },
    text:{
        paddingVertical: 19,
        color: Color.branding_blue,
        fontWeight: '400',
    }

})
export default CreateScreen