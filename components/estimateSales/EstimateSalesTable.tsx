import { MaterialIcons } from '@expo/vector-icons';
import React, {useState} from 'react';
import { FlatList, View, Text, TouchableOpacity, ScrollView, TouchableNativeFeedback, StyleSheet} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
    {
      srNo: 1,
      orderNumber: 'S/Pawan 8/2024/0127',
      billNumber: 's10/2024/0127',
      customerName: 'Cash Sale Yatin',
      godownName: 'Teen Pani Godown',
      item: '12MM Jindal Panther Ms Tint Bar',
      creditDate: '2024-08-23',
      status: 'complete',
      voucher: 'GST SALE ONLINE',
      total: '102934',
    },
    {
      srNo: 2,
      orderNumber: 'S11/2024/5645',
      billNumber: 'S/Pawan 8/2024/0127',
      customerName: 'Cash Sale Yatin',
      godownName: 'Teen Pani Godown',
      item: '12MM Jindal Panther Ms Tint Bar',
      creditDate: '2024-08-23',
      status: 'complete',
      voucher: 'GST SALE ONLINE',
      total: '102934',
    },
    {
      srNo: 1,
      orderNumber: 'S/Pawan 8/2024/0127',
      billNumber: 'S/Pawan 8/2024/0127',
      customerName: 'Cash Sale Yatin',
      godownName: 'Teen Pani Godown',
      item: '12MM Jindal Panther Ms Tint Bar',
      creditDate: '2024-08-23',
      status: 'complete',
      voucher: 'GST SALE ONLINE',
      total: '102934',
    },
    {
      srNo: 2,
      orderNumber: 'S/Pawan 8/2024/0127',
      billNumber: 'S/Pawan 8/2024/0127',
      customerName: 'Cash Sale Yatin',
      godownName: 'Teen Pani Godown',
      item: '12MM Jindal Panther Ms Tint Bar',
      creditDate: '2024-08-23',
      status: 'cancel',
      voucher: 'GST SALE ONLINE',
      total: '102934',
    },
    {
      srNo: 1,
      orderNumber: 'S/Pawan 8/2024/0127',
      billNumber: 'S/Pawan 8/2024/0127',
      customerName: 'Cash Sale Yatin',
      godownName: 'Teen Pani Godown',
      item: '12MM Jindal Panther Ms Tint Bar',
      creditDate: '2024-08-23',
      status: 'complete',
      voucher: 'GST SALE ONLINE',
      total: '102934',
    },
    {
      srNo: 2,
      orderNumber: 'S/Pawan 8/2024/0127',
      billNumber: 'S/Pawan 8/2024/0127',
      customerName: 'Cash Sale Yatin',
      godownName: 'Teen Pani Godown',
      item: '12MM Jindal Panther Ms Tint Bar',
      creditDate: '2024-08-23',
      status: 'complete',
      voucher: 'GST SALE ONLINE',
      total: '102934',
    },
    {
      srNo: 1,
      orderNumber: 'S/Pawan 8/2024/0127',
      billNumber: 'S/Pawan 8/2024/0127',
      customerName: 'Cash Sale Yatin',
      godownName: 'Teen Pani Godown',
      item: '12MM Jindal Panther Ms Tint Bar',
      creditDate: '2024-08-23',
      status: 'cancel',
      voucher: 'GST SALE ONLINE',
      total: '102934',
    },
    {
      srNo: 2,
      orderNumber: 'S/Pawan 8/2024/0127',
      billNumber: 'S/Pawan 8/2024/0127',
      customerName: 'Cash Sale Yatin',
      godownName: 'Teen Pani Godown',
      item: '12MM Jindal Panther Ms Tint Bar',
      creditDate: '2024-08-23',
      status: 'cancel',
      voucher: 'GST SALE ONLINE',
      total: '102934',
    },
    {
      srNo: 1,
      orderNumber: 'S/Pawan 8/2024/0127',
      billNumber: 'S/Pawan 8/2024/0127',
      customerName: 'Cash Sale Yatin',
      godownName: 'Teen Pani Godown',
      item: '12MM Jindal Panther Ms Tint Bar',
      creditDate: '2024-08-23',
      status: 'cancel',
      voucher: 'GST SALE ONLINE',
      total: '102934',
    },
    {
      srNo: 2,
      orderNumber: 'S/Pawan 8/2024/0127',
      billNumber: 'S/Pawan 8/2024/0127',
      customerName: 'Cash Sale Yatin',
      godownName: 'Teen Pani Godown',
      item: '12MM Jindal Panther Ms Tint Bar',
      creditDate: '2024-08-23',
      status: 'complete',
      voucher: 'GST SALE ONLINE',
      total: '102934',
    },
    
  ];
  

const TableRow = ({ item }:any) => {

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
    

<View className={`${item.status == "complete" ? "bg-green-300" : "bg-red-300" } bg-white rounded-lg shadow-md p-4 mb-4 w-[90%] mx-auto`}>
      <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
        <Text className="text-gray-700 font-medium">{item.srNo}</Text>
        <Text className="text-gray-700">{item.godownName}</Text>
        <Text className="text-gray-700 font-medium">{item.billNumber}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-gray-700">{item.customerName}</Text>
        <Text className="text-gray-700">{item.orderNumber}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-gray-700">{item.creditDate}</Text>
        {/* <Text className="text-gray-700">{item.status}</Text> */}
        <Text className="text-gray-700">{item.total}</Text>
      </View>
    </View>
    
  );
};

const EstimateSalesTable = () => {
  return (
    <View>

    {/* <ScrollView horizontal className='w-[90%] mx-auto'>
    <View className={('flex-row justify-between gap-2 items-center px-2 py-4 border-b bg-[#ECEDFE] border-gray-200')}>
      <Text className={('text-gray-700 font-medium')}>SR</Text>
      <Text className={('text-gray-700 font-medium')}>Order Number</Text>
      <Text className={('text-gray-700 font-medium')}>Customer Name</Text>
      <Text className={('text-gray-700 font-medium')}>Godown Name</Text>
      <Text className={('text-gray-700 font-medium')}>Item Name</Text>
      <Text className={('text-gray-700 font-medium')}>Date</Text>
      <Text className={('text-gray-700 font-medium')}>Status</Text>
      <TouchableOpacity className={('text-gray-700 font-medium')} onPress={() => console.log('Accept pressed')}>
        <Text className={('text-gray-700 font-medium')}>Action</Text>
      </TouchableOpacity>
      <Text className={('text-gray-700 font-medium')}>Assistant</Text>
    </View>
    </ScrollView> */}


    <FlatList
      data={data}
      renderItem={({ item }) => <TableRow item={item} />}
      keyExtractor={(item) => item.srNo.toString()}
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