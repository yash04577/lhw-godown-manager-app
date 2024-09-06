import { getSalesBillAsync } from '@/redux/slices/estimateSalesSlice';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, {useState} from 'react';
import { FlatList, View, Text, TouchableOpacity, ScrollView, TouchableNativeFeedback, StyleSheet} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch } from 'react-redux';
  

const TableRow = ({ item, type, index }:any) => {

  const dispatch = useDispatch();


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


      const router = useRouter();

      const handleClick = (item:any) =>{
        dispatch(getSalesBillAsync({id: item.salesId}))
        console.log("itemmmmmmmmmm ", item)
        router.push("/acceptedOrderPurchase")
      }

  return (
    
<TouchableOpacity onPress={()=>handleClick(item)}>

<View className={`bg-white rounded-lg shadow-md p-4 mb-4 w-[90%] mx-auto`}>
      <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
        <Text className="text-gray-700 font-medium">{index+1}</Text>
        <Text className="text-gray-700">{item?.godown}</Text>
        <Text className="text-gray-700 font-medium">{item?.billNumber}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-gray-700">{item?.customerName}</Text>
        <Text className="text-gray-700">{ item?.salesOrderNumber}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-gray-700">{item?.createdDate?.slice(0,10)}</Text>
        {/* <Text className="text-gray-700">{item.status}</Text> */}
        <Text className="text-gray-700">&#8377; {item?.total?.toFixed(0)}</Text>
      </View>
    </View>
</TouchableOpacity>
    
  );
};

const EstimateSalesTable = ({data, type}:any) => {
  return (
    <View>

    <FlatList
      data={data}
      renderItem={({ item, index }) => <TableRow item={item} type={type} index={index} />}
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
  

export default EstimateSalesTable;