import React, {useEffect, useState} from 'react'
import { View , Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Color from '../utils/Color'
import ItemApproval from './ItemApproval'
import * as Method from '../utils/Method'
import { SERVER_URL } from '../utils/Constant'
const ItemFeature = (props) => {
    const {item, onPress, navigation_} = props
    const [listMatrix, setListMatrix] = useState([])
    const colorSelect = item.isSelected ? Color.branding_orange : Color.branding_gray
    const iconName = item.isSelected ? "chevron-up" : "chevron-down"

    const loadMatrixByFeatureId = async (id) => {
        try{
            const resp = await Method.makeRequest(SERVER_URL+`matrix/getListByFeatureId.php?id=${id}`,'GET',null)
            setListMatrix(resp.data)
        }
        catch(e){
            console.log('Error:',e)
        }
    }

    const deleteApprovalMatrix = async (id) => {
        try{
            await Method.makeRequest(SERVER_URL+`matrix/delete.php`,'DELETE',{
                id_matrix: id
            }).then(loadMatrixByFeatureId(item.id))
        }
        catch(e){
            console.log('Error:',e)
        }   
    }

    useEffect(()=>{
        if(item.isSelected){
            loadMatrixByFeatureId(item.id)
        }
        else{
            setListMatrix([])
        }
    }, [item])


    return (
        <View>
            <TouchableOpacity 
                style={styles.featureContainer}
                onPress={onPress}>
                <View style={[styles.featureView,{borderColor: colorSelect}]}>
                    <Text style={[styles.featureName,{color: colorSelect}]}>{item.name_feature}</Text>
                    <View style={[styles.line_,{backgroundColor: colorSelect}]}></View>
                    <Text style={[styles.featureName,{color: colorSelect}]}>{item.name_feature}</Text>
                    <Icon style={styles.iconArrow} name={iconName} color={colorSelect} size={20}/>
                </View>
            </TouchableOpacity>
            {listMatrix && 
                <FlatList
                    data={listMatrix}
                    keyExtractor={(itemApproval) => itemApproval.id}
                    renderItem={({item, index})=>{
                            return <ItemApproval navigation_={navigation_} delete={deleteApprovalMatrix} itemApproval={item}/>
                        }    
                    }
                />
            }

        </View>
        
    )

}

const styles = StyleSheet.create({
    featureContainer:{
        width: '100%',
        marginBottom: 20,
    },
    featureView:{
        flexDirection: 'row',
        paddingVertical: 10,
        paddingStart: 20,
        paddingEnd: 10,
        borderColor: Color.branding_gray,
        borderWidth: 1,
        borderRadius: 20,
        alignItems: 'center'
    },
    featureName:{
        width: '45%',
        fontSize: 15,
        fontWeight: '400',
        color: Color.text_black,
        marginVertical: 10,
    },
    line_:{
        marginEnd: 11,
        height: '100%',
        width: 1,
        backgroundColor: Color.branding_gray,
    },
    iconArrow:{
    }
})

export default ItemFeature