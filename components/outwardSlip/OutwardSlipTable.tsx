import { MaterialIcons } from '@expo/vector-icons';
import React, {useState} from 'react';
import { FlatList, View, Text, TouchableOpacity, ScrollView, TouchableNativeFeedback, StyleSheet} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const data = [
    {
      srNo: 1,
      orderNumber: 'S/Pawan 8/2024/0127',
      customerName: 'Cash Sale Yatin',
      godownName: 'Teen Pani Godown',
      item: '12MM Jindal Panther Ms Tint Bar',
      creditDate: '2024-08-23',
      status: 'Pending',
      action: 'Accept',
      godownAssistant: 'Danish',
    },
    {
      srNo: 2,
      orderNumber: 'S/Amit 8/2024/0128',
      customerName: 'Sharma & Co',
      godownName: 'Teen Pani Godown',
      item: '10MM Tata Tiscon Rod',
      creditDate: '2024-08-24',
      status: 'Approved',
      action: 'Complete',
      godownAssistant: 'Rakesh',
    },
    {
      srNo: 3,
      orderNumber: 'S/Rajesh 8/2024/0129',
      customerName: 'Quick Build Supplies',
      godownName: 'Main Godown',
      item: '8MM Sail Steel Bar',
      creditDate: '2024-08-25',
      status: 'Rejected',
      action: 'Review',
      godownAssistant: 'Mukesh',
    },
    {
      srNo: 4,
      orderNumber: 'S/Rohit 8/2024/0130',
      customerName: 'Verma Steel Works',
      godownName: 'West Zone Godown',
      item: '6MM JSW Rebars',
      creditDate: '2024-08-26',
      status: 'Pending',
      action: 'Accept',
      godownAssistant: 'Sandeep',
    },
    {
      srNo: 5,
      orderNumber: 'S/Anil 8/2024/0131',
      customerName: 'Metro Constructions',
      godownName: 'East End Godown',
      item: '16MM Rathi Steel Rod',
      creditDate: '2024-08-27',
      status: 'Approved',
      action: 'Complete',
      godownAssistant: 'Vikram',
    },
    {
      srNo: 6,
      orderNumber: 'S/Vijay 8/2024/0132',
      customerName: 'Quick Fix Hardware',
      godownName: 'Teen Pani Godown',
      item: '20MM JSPL Steel Bar',
      creditDate: '2024-08-28',
      status: 'Pending',
      action: 'Accept',
      godownAssistant: 'Ravi',
    },
    {
      srNo: 7,
      orderNumber: 'S/Suresh 8/2024/0133',
      customerName: 'Global Builders',
      godownName: 'Main Godown',
      item: '25MM Tata TMT Bar',
      creditDate: '2024-08-29',
      status: 'Pending',
      action: 'Accept',
      godownAssistant: 'Arjun',
    },
    {
      srNo: 8,
      orderNumber: 'S/Sunil 8/2024/0134',
      customerName: 'Naveen Infrastructure',
      godownName: 'West Zone Godown',
      item: '32MM Jindal Steel Rod',
      creditDate: '2024-08-30',
      status: 'Approved',
      action: 'Complete',
      godownAssistant: 'Amit',
    },
    {
      srNo: 9,
      orderNumber: 'S/Vikash 8/2024/0135',
      customerName: 'Elite Constructions',
      godownName: 'East End Godown',
      item: '40MM Tata Steel Rebar',
      creditDate: '2024-08-31',
      status: 'Rejected',
      action: 'Review',
      godownAssistant: 'Krishna',
    },
    {
      srNo: 10,
      orderNumber: 'S/Deepak 8/2024/0136',
      customerName: 'City Builders',
      godownName: 'Teen Pani Godown',
      item: '18MM Sail TMT Bar',
      creditDate: '2024-09-01',
      status: 'Pending',
      action: 'Accept',
      godownAssistant: 'Hari',
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
    

<View className="bg-white rounded-lg shadow-md p-4 mb-4 w-[90%] mx-auto">
      <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
        <Text className="text-gray-700 font-medium">{item.srNo}</Text>
        <Text className="text-gray-700 font-medium">{item.orderNumber}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-gray-700">{item.customerName}</Text>
        <Text className="text-gray-700">{item.godownName}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-gray-700">{item.item}</Text>
        <Text className="text-gray-700">{item.creditDate}</Text>
      </View>
      <View className="flex-row justify-between items-center mt-2 h-[40px]">
        <Text className="text-gray-700">{item.status}</Text>
        <Dropdown
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
            />
        {/* <Text className="text-gray-700">{item.godownAssistant}</Text> */}
      </View>
      <TouchableOpacity
        className="bg-blue-500 p-2 rounded-md mt-4"
        onPress={() => console.log('Accept pressed')}
      >
        <Text className="text-white text-center">{item.action}</Text>
      </TouchableOpacity>
    </View>
    
  );
};

const OutwardSlipTable = () => {
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
  

export default OutwardSlipTable;