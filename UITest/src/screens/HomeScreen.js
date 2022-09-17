import React, { useEffect, useState } from 'react'
import { View , Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Color from '../utils/Color' 
import { SERVER_URL } from '../utils/Constant'
import { UIHeader, ItemFeature, ItemApproval } from '../components'
import * as Method from '../utils/Method'

const HomeScreen = ({navigation}) => {
    const [features, setFeatures] = useState()
    const loadFeatures = async () => {
        try{
            const resp = await Method.makeRequest(SERVER_URL+'feature/getAll.php','GET',null)
            setFeatures(resp.data)
        }
        catch(e){
            console.log('Error:',e)
        }
        
    }
    useEffect(()=>{
        loadFeatures()
    },[])

    return (
        <SafeAreaView style={styles.container}>
            <UIHeader/>
            <View style={styles.bodyContainer}>
                <View style={styles.body}>
                    <TouchableOpacity 
                        style={styles.addButton}
                        onPress={()=>navigation.navigate('CreateScreen')}>
                        <Icon name='add-circle' color='white' size={21} style={styles.addIcon}/>
                        <Text style={styles.addText}>Tambah New Matrix</Text>
                    </TouchableOpacity>
                    <View style={styles.line}></View>
                    <FlatList 
                        data={features}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({item, index})=>
                            <ItemFeature 
                                item={item}
                                onPress={()=>{
                                    let newFeatures = features.map(eachFeature => {
                                        if (item.id == eachFeature.id){
                                            return {...eachFeature, isSelected: true}
                                        }
                                        else{
                                            return {...eachFeature, isSelected: false}
                                        }
                                    })
                                    setFeatures(newFeatures)
                                }}
                            />
                        }
                    />
                    
                   
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.branding_orange,
    },
    bodyContainer:{
        flex: 92,
        backgroundColor: Color.branding_orange    
    },
    body:{
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 30,
        flexDirection: 'column',
        alignItems: 'center',
    },
    addButton:{
        backgroundColor: '#171C8F',
        marginTop: 24,
        alignSelf: 'flex-end',
        alignItems: 'center',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addIcon:{
        marginVertical: 5,
        marginLeft: 10
    },
    addText:{
        color: 'white',
        marginVertical: 7,
        marginHorizontal: 10,
        fontSize: 12,
        fontWeight: '700',
    },
    line:{
        width: '100%',
        height: 1,
        backgroundColor: '#F4F5F7',
        marginVertical: 20,
    },
    
    
})

export default HomeScreen