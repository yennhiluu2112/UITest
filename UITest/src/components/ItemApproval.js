import React, { useEffect, useState } from 'react'
import { View , Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Color from '../utils/Color' 
import { SERVER_URL } from '../utils/Constant'
import * as Method from '../utils/Method'

const ItemApproval = (props) => {
    const item = props.itemApproval
    const deleteMatrix = props.delete
    const navigation = props.navigation_
    const [approvers, setApprovers] = useState()    

    const loadApprovers = async (id) => {
        try{
            const resp = await Method.makeRequest(SERVER_URL+`approval/getListByMatrixId.php?id_matrix=${id}`,'GET',null)
            setApprovers(resp.data)
        }
        catch(e){
            console.log('Error:',e)
        }   
    }

    const navigateUpdate = (itemUpdate) => {
        navigation.navigate('CreateScreen', {itemUpdate})
    }


    useEffect(()=>{
        loadApprovers(item.id)
    }, [item])
    return (
        <View style={styles.approvalContainer}>
        <View style={styles.approvalItem}>
            <View style={styles.rangeView}>
                <Text style={styles.titleRange}>Range Limite Of Approval</Text>
                <View>
                    <View style={styles.smallRangeView}>
                        <Text style={styles.text1}>Minimum</Text>
                        <Text style={styles.text2}>IDR</Text>
                        <Text style={styles.text3}>{item.minimum_range}</Text>
                    </View>
                    <View style={styles.smallRangeView}>
                        <Text style={styles.text1}>Maximum</Text>
                        <Text style={styles.text2}>IDR</Text>
                        <Text style={styles.text3}>{item.maximum_range}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.line_}></View>
            <View style={styles.rangeView}>
                <Text style={styles.titleRange}>Number Of Approval</Text>
                <Text style={styles.textNumber}>{item.approval_number}</Text>
            </View>
            <View style={styles.line_}></View>
            <FlatList 
                data={approvers}
                keyExtractor={item => item.id}
                renderItem={({item, index})=>
                    <View style={styles.approverView}>
                        <Text style={styles.titleRange}>Approver {index+1}</Text>
                        <Text style={styles.textNumber}>{item.name_approval}</Text>
                    </View>
            }
            />
            <View style={{flexDirection:'row', justifyContent: 'flex-end'}}>
                <TouchableOpacity 
                    style={styles.otherBtn}
                    onPress={()=>navigateUpdate(item)}>
                    <Icon name='create-outline' size={23} color={Color.branding_blue}/>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.otherBtn}
                    onPress={()=>{
                        deleteMatrix(item.id)
                    }}
                >
                    <Icon name='trash-outline' size={23} color={'red'}/>
                </TouchableOpacity>
            </View>

        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    approvalContainer:{
        width: '100%',
        marginBottom: 10,
    },
    approvalItem:{
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: Color.branding_gray
    },
    rangeView:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    titleRange:{
        fontSize: 12,
        fontWeight:'400',
        color: Color.text_black,
    },
    smallRangeView:{
        marginStart: 15,
        flexDirection: 'row',
    },
    text1:{
        width: 60,
        fontSize: 12,
        marginEnd: 5,
        color: Color.branding_blue
    },
    text2:{
        width: 20,
        fontSize: 12,
        marginEnd: 5,
        color: Color.branding_blue
    },
    text3:{
        width: 50,
        textAlign: 'right',
        fontSize: 12,
        color: Color.branding_blue,
        fontWeight: '700',
    },
    line_:{
        width: '100%',
        height: 1,
        backgroundColor: '#F4F5F7',
        marginVertical: 10,
    },
    textNumber:{
        flex:5,
        marginEnd: 5,
        fontSize: 12,
        color: Color.branding_blue,
        textAlign: 'right'
    },
    approverView:{
        flexDirection: 'row',
        marginBottom: 15,
        flex: 10,
    },
    otherBtn:{
        paddingStart: 10
    }

})

export default ItemApproval