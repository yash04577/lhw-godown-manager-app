import { getOutwardSlipAsync } from '@/redux/slices/outwardSlice';
import { MaterialIcons } from '@expo/vector-icons';
import React, {useState} from 'react';
import { FlatList, View, Text, TouchableOpacity, ScrollView, TouchableNativeFeedback, StyleSheet} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch } from 'react-redux';
  
const TableRow = ({ item, index, type }:any) => {

    const [godownAssistantData, setGodownAssistantData] = useState([
        { name: 'Bansi', _id: '98098jkhkh' },
        { name: 'Danish', _id: '98098qwert' },
        { name: 'Rakesh', _id: '98098zxcvb' },
        { name: 'Mukesh', _id: '98098asdfg' },
        { name: 'Sandeep', _id: '98098yuioh' },
      ]);

      const [selectedAssistant, setSelectedAssitant] = useState("");
      const [loading, setLoading] = useState(false);
      const [godownFilterFocus, setGodownFilterFocus] = useState(false);

  return (
    

<View className="bg-white rounded-lg shadow-md p-4 mb-4 w-[90%] mx-auto">
      <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
        <Text className="text-gray-700 font-medium">{index+1}</Text>
        <Text className="text-gray-700 font-medium">{type == "outward" ? item.orderNumber : item.purchaseOrderNumber}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-gray-700">{item.customerName}</Text>
        <Text className="text-gray-700">{item.godown}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-gray-700">{item.itemName}</Text>
        <Text className="text-gray-700">{item?.createdAt?.slice(0,10)}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2 h-[40px]">
        <Text className="text-gray-700">{item.status[0]?.value}</Text>
         { type == "outward" && <Dropdown
              style={[]}
              className="border w-[150px] px-2 py-2 rounded-md"
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemContainerStyle}
              containerStyle={{ width: 100, borderRadius: 5, marginTop: 5 }}
              data={godownAssistantData}
              disable={loading}
              maxHeight={220}
              labelField="name"
              valueField="_id" // need to ask ?
              placeholder={"Assistant"}
              value={selectedAssistant}
            //   onFocus={() => setIsFocus2(true)}
            //   onBlur={() => setIsFocus2(false)}
              onChange={(assistant: any) => {
                setGodownFilterFocus(!godownFilterFocus);
                setSelectedAssitant(assistant)
              }}
              renderLeftIcon={() => {
                return (
                  <>
                    {selectedAssistant != "" && (
                      <TouchableNativeFeedback
                        onPress={() => setSelectedAssitant("")}
                      >
                        <MaterialIcons
                          name="cancel"
                          size={20}
                          color={"black"}
                        />
                      </TouchableNativeFeedback>
                    )}
                  </>
                );
              }}
            /> }
        {/* <Text className="text-gray-700">{item.godownAssistant}</Text> */}
      </View>
      <TouchableOpacity
        className="bg-blue-500 p-2 rounded-md mt-4"
        onPress={() => console.log('Accept pressed')}
      >
        <Text className="text-white text-center">Accept</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const OutwardSlipTable = ({data, type}:any) => {

  const dispatch = useDispatch();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async() =>{
    setIsRefreshing(true);
    // dispatch(getOutwardSlipAsync({limit:20, page:1}));
    setIsRefreshing(false)
  } 

  return (
    <View>
    <FlatList
      data={data}
      renderItem={({ item, index}) => <TableRow item={item} index={index} type={type} />}
      keyExtractor={(index) => index}
      onRefresh={handleRefresh}
      refreshing={isRefreshing}
      />
      </View>
  );
};

const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    stepContainer: {
      gap: 8,
      marginBottom: 8,
    },
    reactLogo: {
      height: 178,
      width: 290,
      bottom: 0,
      left: 0,
      position: "absolute",
    },
    searchIcon: {
      marginRight: 5,
      marginLeft: 5,
    },
    searchInput: {
      flex: 1,
    },
    container: {
      flexDirection: "row",
      width: "92%",
      borderWidth: 1,
      borderColor: "#CFD3D4",
      borderRadius: 4,
      gap: 10,
      padding: 8,
      alignItems: "center",
      position: "relative",
      zIndex: 9999,
      marginHorizontal: "3%",
      shadowOpacity: 1,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      marginTop: "3%",
    },
    input: {
      flexGrow: 1,
      flexShrink: 1,
      fontFamily: "Inter-Regular",
      padding: 0,
      color: "black",
    },
    shadow: {
      shadowColor: "#171717",
      shadowRadius: 1,
    },
    dropdown: {
      borderColor: "#DEDEDE",
      borderWidth: 1,
      borderRadius: 50,
      paddingHorizontal: 8,
      width: "33%",
      height: 40,
    },
    customerdropdown: {
      borderColor: "#DEDEDE",
      borderWidth: 1,
      borderRadius: 50,
      paddingHorizontal: 8,
      width: "100%",
      height: 40,
    },
    placeholderStyle: {
      fontSize: 14,
      fontWeight: "500",
      color: "#004EBA",
    },
    selectedTextStyle: {
      fontSize: 16,
      color: "#004EBA",
    },
    inputSearchStyle: {
      borderRadius: 5,
      height: 40,
      color: "black",
      fontSize: 16,
    },
    itemContainerStyle: {
      color: "black",
      fontWeight: "500",
    },
  });
  

export default OutwardSlipTable;