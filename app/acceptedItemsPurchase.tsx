import { FlatList, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { acceptedOrderDetailsPurchaseAsync, acceptedPurchaseOrderAsync } from '@/redux/slices/inwardSlice';
import { useRouter } from 'expo-router';

const TableRow = ({ item, index, type, assistant }: any) => {
  const [selectedAssistant, setSelectedAssitant] = useState();
  const [loading, setLoading] = useState(false);
  const [godownFilterFocus, setGodownFilterFocus] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (orderNumber:any, customerId:any) =>{

    dispatch(acceptedOrderDetailsPurchaseAsync({orderNumber:orderNumber, customerId:customerId}))
    router.push("/acceptedOrderPurchase")
  }
  // const router = useRouter();

  // const handleAccept = async(item:any) =>{
  //   try {

  //     const payload = {
  //       elementId: item.elementId,
  //       loadingPerson: selectedAssistant?._id,
  //       orderId: item.orderId,
  //       status: "accepted",
  //     }

  //     dispatch(acceptItemAsync(payload));
      
  //   } catch (error) {
  //     console.log("my error ", error)
  //   }
  // }
  

  return (

    item.orders.map((order: any, orderIndex: any) => (
      

<TouchableOpacity
className="rounded-md"
  onPress={() => handleClick(order?.orderNumber, item?.customer?._id)}
>
<View className="bg-white rounded-lg shadow-md p-4 mb-4 w-[90%] mx-auto">
<View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
  <Text className="text-gray-700 font-medium">{index + 1}</Text>
  <Text className="text-gray-700">{order?.updatedAt?.slice(0, 10)}</Text>
  <Text className="text-gray-700 font-medium">
    {order?.orderNumber}
  </Text>
</View>
<View className="flex-row justify-between items-center mt-2">
  <Text className="text-gray-700">{item?.customer?.customerName} {item?.customer?.customerCode}</Text>
</View>


  
</View>
</TouchableOpacity>
  ))

      
  );
};

const acceptedItemsPurchase = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(acceptedPurchaseOrderAsync());
  },[])

  const data = useSelector((state:any)=>state?.inward?.acceptedOrders);
  const PurchaseslipsDataByCustomer = data?.data
  const [searchQuery, setSearchQuery] = useState('');
  const status = useSelector((state:any)=>state?.inward?.status)

  const filteredData = PurchaseslipsDataByCustomer && PurchaseslipsDataByCustomer.length > 0 && PurchaseslipsDataByCustomer?.filter((element: any) => {
    const customerName = element?.customer?.customerName?.toLowerCase();
    const customerCode = element?.customer?.customerCode?.toLowerCase();
    const orderNumber = element?.orders?.map((order: any) => order?.orderNumber?.toLowerCase());
    const query = searchQuery?.toLowerCase();

    return (
        (customerName?.includes(query) || customerCode?.includes(query) || orderNumber?.includes(query))
    );
});


  return (
    

    status == "loading" ? <View className="w-screen h-screen flex flex-row justify-center items-center">
    <Text>Loading...</Text>
  </View>

  :

    <View>
      <View className="w-[90%] mx-auto my-4">
        <TextInput 
          placeholder="Search Customer..." 
          className="border w-full mx-auto px-2 py-1 rounded-md bg-white"
        />
      </View>

      <View>
      <FlatList
        data={filteredData && filteredData.length > 0 ? filteredData : [] }
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


export default acceptedItemsPurchase;
