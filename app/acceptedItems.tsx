import { FlatList, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAcceptedItemsSalesAsync, getAcceptedOrderDetailsSalesAsync } from '@/redux/slices/outwardSlice';
import { useRouter } from 'expo-router';



const TableRow = ({ item, index, type, assistant }: any) => {
  const dispatch = useDispatch();
  const [selectedAssistant, setSelectedAssitant] = useState();
  const [loading, setLoading] = useState(false);
  const [godownFilterFocus, setGodownFilterFocus] = useState(false);
  const router = useRouter();


  const handleClick = () =>{
    dispatch(getAcceptedOrderDetailsSalesAsync({customerId:item?.customer?._id, orderNumber:item?.orderNumber}))
    router.push("/acceptedOrder");
  }

  return (
      <TouchableOpacity
      className="rounded-md"
        onPress={handleClick}
      >
    <View className="bg-white rounded-lg shadow-md p-4 mb-4 w-[90%] mx-auto">
      <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
        <Text className="text-gray-700 font-medium">{index + 1}</Text>
        <Text className="text-gray-700 font-medium">
          {item.orderNumber}
        </Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-gray-700">{item?.customer?.customerName} {item?.customer?.customercode}</Text>
        <Text className="text-gray-700">{item.date}</Text>
      
      </View>
     
     
        
    </View>
      </TouchableOpacity>
  );
};

const acceptedItems = () => {

const acceptedOrder = useSelector((state:any)=> state?.outward?.acceptedOrder);
const orderDetail = useSelector((state:any)=> state?.outward?.orderDetail);
const dispatch = useDispatch();

useEffect(()=>{
  console.log("acccccccccccccccccccc ", acceptedOrder);
},[acceptedOrder])


useEffect(()=>{
  console.log("order details    ff ", orderDetail)
},[orderDetail])

useEffect(()=>{
  dispatch(getAcceptedItemsSalesAsync());
},[])

  return (
    <View>
      <View className="w-[90%] mx-auto my-4">
        <TextInput 
          placeholder="Search Customer..." 
          className="border w-full mx-auto px-2 py-1 rounded-md bg-white"
        />
      </View>

      <View className='h-[90%]'>
      <FlatList
        data={acceptedOrder?.length > 0 ? acceptedOrder : []}
        renderItem={({ item, index }) => (
          <TableRow
            item={item}
            index={index}
          />
        )}
      />
      </View>
    </View>
  )
}



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


export default acceptedItems;
