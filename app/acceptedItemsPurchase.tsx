import { FlatList, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const TableRow = ({ item, index, type, assistant }: any) => {
  const [selectedAssistant, setSelectedAssitant] = useState();
  const [loading, setLoading] = useState(false);
  const [godownFilterFocus, setGodownFilterFocus] = useState(false);
  // const dispatch = useDispatch();
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
      <TouchableOpacity
      className="rounded-md"
        onPress={() => console.log("pressed on ", item)}
      >
    <View className="bg-white rounded-lg shadow-md p-4 mb-4 w-[90%] mx-auto">
      <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
        <Text className="text-gray-700 font-medium">{index + 1}</Text>
        <Text className="text-gray-700 font-medium">
          {item.orderNumber}
        </Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-gray-700">{item.customerName} {item.customercode}</Text>
        <Text className="text-gray-700">{item.date}</Text>
      
      </View>
     
     
        
    </View>
      </TouchableOpacity>
  );
};

const acceptedItemsPurchase = () => {

  const orders = [
    { date: '15-08-2024', customerName: 'Rohit', customercode: 'p1234', orderNumber: 's/vijay/04/7-24/034' },
    { date: '02-11-2024', customerName: 'Ananya', customercode: 'p5678', orderNumber: 's/vijay/06/3-24/097' },
    { date: '30-03-2024', customerName: 'Priya', customercode: 'p9101', orderNumber: 's/vijay/09/5-24/045' },
    { date: '21-09-2024', customerName: 'Vikram', customercode: 'p2345', orderNumber: 's/vijay/02/4-24/122' },
    { date: '12-05-2024', customerName: 'Sneha', customercode: 'p6789', orderNumber: 's/vijay/08/6-24/066' },
    { date: '05-12-2024', customerName: 'Aditya', customercode: 'p3456', orderNumber: 's/vijay/11/7-24/089' },
    { date: '18-07-2024', customerName: 'Meera', customercode: 'p7890', orderNumber: 's/vijay/03/8-24/054' },
    { date: '29-10-2024', customerName: 'Karan', customercode: 'p4567', orderNumber: 's/vijay/07/1-24/011' },
    { date: '11-04-2024', customerName: 'Yash', customercode: 'p8901', orderNumber: 's/vijay/01/9-24/027' },
    { date: '23-02-2024', customerName: 'Sara', customercode: 'p5678', orderNumber: 's/vijay/10/0-24/003' },
];

  return (
    <View>
      <View className="w-[90%] mx-auto my-4">
        <TextInput 
          placeholder="Search Customer..." 
          className="border w-full mx-auto px-2 py-1 rounded-md bg-white"
        />
      </View>

      <View>
      <FlatList
        data={orders}
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
