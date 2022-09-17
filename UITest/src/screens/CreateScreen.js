import React from 'react'
import { View , Text, StyleSheet, SafeAreaView, TextInput, ScrollView, TouchableOpacity} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { UIHeader, CustomButton, InputRange, InputField } from '../components'
import Color from '../utils/Color'
const CreateScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <UIHeader 
                iconShow={true}
                iconPress={()=>navigation.navigate("HomeScreen")}/>
            <View style={styles.body}>
                <Text style={styles.title}>Create New Approval Matrix</Text>
                <View style={styles.line}></View>

                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <InputField label={'Approval Matrix Alias'} placeholder={'Input Matrix Name'}/>

                    <View style={styles.inputItem}>
                        <Text style={styles.label}>Approval Matrix Alias</Text>
                        <View style={styles.pickerView}>
                            <Picker>
                                <Picker.Item label="Java" value="Java"></Picker.Item>
                                <Picker.Item label="Java" value="Java"></Picker.Item>
                                <Picker.Item label="Java" value="Java"></Picker.Item>
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.line_}></View>
                    <InputRange label={'Maximum'}/>
                    <InputRange label={'Minimum'}/>

                    <InputField label={'Number of Approval'} placeholder={'Input Number'}/>

                    <View style={{marginTop: 20}}></View>
                    <CustomButton label={'ADD TO LIST'}/>
                    <CustomButton label={'RESET'}/>
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
    pickerView:{
        borderRadius: 15,
        borderColor: Color.branding_gray,
        borderWidth: 1,
        marginTop: 8
    },
    line_:{
        width: '100%',
        height: 1,
        backgroundColor: '#F4F5F7',
        marginBottom: 20,
    },
    smallText:{
        marginEnd: 10,
        color: Color.text_black,
        fontSize: 15,
        fontWeight: '400'
    },

})
export default CreateScreen