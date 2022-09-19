import React, { useEffect, useState } from 'react'
import { View , Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, StatusBar} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Color from '../utils/Color' 
import { SERVER_URL, WIDTH } from '../utils/Constant'
import { UIHeader, ItemFeature, ItemApproval } from '../components'
import * as Method from '../utils/Method'
import ConfirmModal from '../components/ConfirmModal'

const HomeScreen = ({navigation,route}) => {
    const [features, setFeatures] = useState()
    const [modalVisible, setModalVisible] = useState(false)
    const [listener, setLitsener] = useState(()=>()=>{})
    const [deleteId, setDeleteID] = useState(()=>()=>{})

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
    },[route.params?.render])

    const clickDelete = (id) => {
        setDeleteID(id)
        setLitsener(()=>()=>deleteAM(id))
        setModalVisible(true)
    }

    const deleteAM = async (id) => {
        try{
            await Method.makeRequest(SERVER_URL+`matrix/delete.php`,'DELETE',{
                id_matrix: id
            }).then(loadFeatures())
        }
        catch(e){
            console.log('Error:',e)
        }   
    }

    return (
            <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Color.branding_orange}/>
            <ConfirmModal visible={modalVisible} setVisible={setModalVisible} listener={listener}/>
            <UIHeader/>
            <View style={styles.bodyContainer}>
                <View style={styles.body}>
                    <View style={styles.btnAddView}>
                        <TouchableOpacity 
                            style={styles.addButton}
                            onPress={()=>{navigation.navigate('CreateScreen',{render:route.params.render})}}>
                            <Icon name='add-circle' color='white' size={21} style={styles.addIcon}/>
                            <Text style={styles.addText}>Tambah New Matrix</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.line}></View>
                    <FlatList 
                        clickDelete={clickDelete}
                        data={features}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({item, index})=>
                            <ItemFeature 
                                route={route}
                                clickDelete={clickDelete}
                                navigation_={navigation}
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
        backgroundColor: 'white',
    },
    bodyContainer:{
        flex: 1,
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
    btnAddView:{
        width: WIDTH*0.8
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