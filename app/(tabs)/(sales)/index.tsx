import Pagination from "@/components/commanComponents/Pagination";
import EstimateSalesTable from "@/components/estimateSales/EstimateSalesTable";
import OutwardSlipCard from "@/components/outwardSlip/OutwardSlipCard";
import OutwardSlipTable from "@/components/outwardSlip/OutwardSlipTable";
import { getEstimateSalesAsync, getSalesBillAsync, getSalesFilterAsync, getVoucherAsync } from "@/redux/slices/estimateSalesSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";

const TableRow = ({ item, index }:any) => {

    const dispatch = useDispatch();
  
        const router = useRouter();
  
        const handleClick = (item:any) =>{
         
            dispatch(getSalesBillAsync({id: item.salesId}))
            router.push("/salesBill")
        
        }
  
    return (
      
  <TouchableOpacity onPress={()=>handleClick(item)}>
  
  <View className={`bg-white rounded-lg shadow-md p-4 mb-4 w-[90%] mx-auto`}>
        <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
          <Text className="text-gray-700 font-medium">{index+1}</Text>
          <Text className="text-gray-700">{item?.godown}</Text>
          <Text className="text-gray-700 font-medium">{item?.billNumber}</Text>
        </View>
        <View className="mt-2 ">
          <Text className="text-gray-700">{item?.customerName}</Text>
          <Text className="text-gray-700">{ item?.salesOrderNumber}</Text>
        </View>
        <View className="flex-row justify-between items-center mt-2 flex-1 flex-wrap">
          <Text className="text-gray-700">{item?.createdDate?.slice(0,10)}</Text>
          {/* <Text className="text-gray-700">{item.status}</Text> */}
          <Text className="text-gray-700">&#8377; {item?.total?.toFixed(0)}</Text>
        </View>
      </View>
  </TouchableOpacity>
      
    );
  };

const estimateSales = ()=> {

  const [refreshing, setRefreshing] = useState(false);

  const [godownData, setGodownData] = useState([
    {
      _id: "65dc15c87d442240671928e6",
      godownName: "virtual godown",
    },
    {
      _id: "658fc1b672dd0a9107005aa9",
      godownName: "Teen paani godown",
    },
    {
      _id: "658a90b26c98a5c5a0de53b1",
      godownName: "galla mandiii",
    },
    {
      _id: "658a51342810a2d1d05f8082",
      godownName: "sidcul godown",
    },
    {
      _id: "6586aecb69943d8ed6a7d2c8",
      godownName: "BYPASS ROAD",
    },
  ]);

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [selectedGodown, setSelectedGodown] = useState("");
  const [godownFilterFocus, setGodownFilterFocus] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<String>("");
  const estimateSales = useSelector((state:any)=>state?.estimateSales?.data);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const filters = useSelector((state:any)=>state?.estimateSales?.filters)
  const vourcher = useSelector((state:any)=>state?.estimateSales?.voucher);
  let selectedVoucher = [];

  const dispatch = useDispatch();

  const formatDate = (date: Date): string => {
    return date.toISOString().substring(0, 10);
  };

  const handleDateChange = (event:any, selectedDate:any) => {


    if (selectedDate) {
        // Adjust for local time
        const offsetDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
        setDate(offsetDate)
    }

    setDateModalOpen(false)
    let formattedDate = formatDate(date);
    // setQuery((query:any)=>({
    //   ...query,
    //   date: formattedDate
    // }))

    dispatch(dispatch(getEstimateSalesAsync({page:1, limit:10, date: formattedDate})));

};


  useEffect(()=>{
    dispatch(getSalesFilterAsync());
    dispatch(getEstimateSalesAsync({page:1, limit:10}));
    dispatch(getVoucherAsync());
  },[])

  const handleRefresh = () =>{
    console.log("refresh called")
    setSelectedCustomer(null);
    dispatch(getEstimateSalesAsync({page:1, limit:10}));
  }

  const [date, setDate] = useState(new Date(Date.now()));

  useEffect(()=>{
    console.log("a lo g ", vourcher)
  },[vourcher])
 

  return (
    <View className="flex-1 h-screen mt-2">

      {/* //filters are here */}
      <View className="w-full flex justify-center items-center gap-2">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex flex-row gap-2"
        >
          <View className="border rounded-md flex justify-center items-center px-2 bg-white">
            <Dropdown
              style={[]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemContainerStyle}
              containerStyle={{ width: 100, borderRadius: 5, marginTop: 5 }}
              data={vourcher?.vouchers?.length > 0 ? vourcher?.vouchers?.filter((voucher:any)=>voucher.typeOfVoucher == "sales") : []}
              disable={loading}
              maxHeight={220}
              labelField="voucherName"
              valueField="_id" // need to ask ?
              placeholder={"Voucher"}
              value={selectedVoucher[0]}
              // onFocus={() => setIsFocus2(true)}
              // onBlur={() => setIsFocus2(false)}
              onChange={(voucher: any) => {
                selectedVoucher.push(voucher._id)
                dispatch(
                  getEstimateSalesAsync({
                    limit: 10,
                    page: 1,
                    voucher: selectedVoucher,
                  })
                );
              }}
              renderLeftIcon={() => {
                return (
                  <>
                    {selectedVoucher.length > 0 && (
                      <TouchableNativeFeedback
                        onPress={() => setSelectedGodown("")}
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
          </View>
          <View className="border rounded-md flex justify-center items-center px-2 bg-white">
            <Dropdown
              style={[]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemContainerStyle}
              containerStyle={{ width: 100, borderRadius: 5, marginTop: 5 }}
              data={godownData}
              disable={loading}
              maxHeight={220}
              labelField="godownName"
              valueField="_id" // need to ask ?
              placeholder={"Godown"}
              value={selectedGodown}
              // onFocus={() => setIsFocus2(true)}
              // onBlur={() => setIsFocus2(false)}
              onChange={(godown: any) => {
                setGodownFilterFocus(!godownFilterFocus);
                setSelectedGodown(godown);
                dispatch(
                  getEstimateSalesAsync({
                    limit: 10,
                    page: 1,
                    godownId: godown._id,
                  })
                );
              }}
              renderLeftIcon={() => {
                return (
                  <>
                    {selectedGodown != "" && (
                      <TouchableNativeFeedback
                        onPress={() => setSelectedGodown("")}
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
          </View>
          <View className="">
            <TouchableOpacity onPress={() => setDateModalOpen(true)}>
              <View
                className={`flex-row py-2 rounded-md border items-center justify-between px-2`}
                style={{ borderWidth: 1 }}
              >
                {date !== "" && (
                  <TouchableNativeFeedback onPress={() => setDate(new Date(Date.now()))}>
                    <MaterialIcons name="cancel" size={20} color={"white"} />
                  </TouchableNativeFeedback>
                )}
                <Text
                >
                  {date ? (formatDate(date) as string) : "Date"}
                </Text>
                <MaterialIcons
                  name="date-range"
                  size={20}
                  color={"black"}
                />
              </View>
            </TouchableOpacity>
            {dateModalOpen && (
          <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={false}
          onChange={handleDateChange}
      />
      )}
          </View>

          {/* <View className="border rounded-md flex justify-center items-center px-2 bg-white">
            <Dropdown
              style={[]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemContainerStyle}
              containerStyle={{ width: 100, borderRadius: 5, marginTop: 5 }}
              data={godownData}
              disable={loading}
              maxHeight={220}
              search
              labelField="godownName"
              valueField="_id" // need to ask ?
              placeholder={"Status"}
              value={selectedGodown}
              // onFocus={() => setIsFocus2(true)}
              // onBlur={() => setIsFocus2(false)}
              onChange={(godown: any) => {
                setGodownFilterFocus(!godownFilterFocus);
                setSelectedGodown(godown);
              }}
              renderLeftIcon={() => {
                return (
                  <>
                    {selectedGodown != "" && (
                      <TouchableNativeFeedback
                        onPress={() => setSelectedGodown("")}
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
          </View> */}
        </ScrollView>
        <View className="w-[90%] flex flex-row">
        <View className="border flex justify-center items-center w-[68%] h-[50px] rounded-md px-2 bg-white">
            <Dropdown
              style={{width:"100%"}}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemContainerStyle}
              containerStyle={{ width: 300, borderRadius: 5, marginTop: 5 }}
              data={ filters?.Customer?.length > 0 ? filters?.Customer : []}
              disable={false}
              maxHeight={220}
              search
              labelField="customerName"
              valueField="_id" // need to ask ?
              placeholder={"Search Customers..."}
              value={selectedCustomer}
              onChange={(customer: any) => {
                setSelectedCustomer(customer);
                dispatch(
                  getEstimateSalesAsync({
                    limit: 10,
                    page: 1,
                    customerId: customer._id,
                  })
                );
              }}
              renderLeftIcon={() => {
                return (
                  <>
                    {selectedCustomer != null && (
                      <TouchableNativeFeedback
                        onPress={() => setSelectedCustomer(null)}
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
          </View>
        <TouchableOpacity onPress={()=> router.push("/customerSales")} className="bg-[#283093] flex justify-center items-center rounded-md ml-2"><Text className="text-white px-4 font-medium">Add Sales</Text></TouchableOpacity>
      </View>
      </View>


      {/* cards are here */}
      {/* <ScrollView> */}
      <View className="my-4 h-[85%]">
      <FlatList
      data={estimateSales}
      onRefresh={handleRefresh}
      refreshing={refreshing}
      renderItem={({ item, index }) => <TableRow item={item} index={index} />}
      />
      </View>

      {/* </ScrollView> */}
    </View>
  );
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


export default estimateSales;
