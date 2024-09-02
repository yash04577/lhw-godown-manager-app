import Pagination from "@/components/commanComponents/Pagination";
import OutwardSlipCard from "@/components/outwardSlip/OutwardSlipCard";
import OutwardSlipTable from "@/components/outwardSlip/OutwardSlipTable";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { Dropdown } from "react-native-element-dropdown";
import {
  getAssistantAsync,
  getOutwardSlipAsync,
  getOutwardSlipFiltersAsync,
} from "@/redux/slices/outwardSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";

export default function HomeScreen() {
  
  const [loading, setLoading] = useState(false);
  const [selectedGodown, setSelectedGodown] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(null);
  const [date, setDate] = useState(new Date(Date.now()));
  
  const [godownFilterFocus, setGodownFilterFocus] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const outwardSlips = useSelector((state: any) => state?.outward?.data);
  const assistants = useSelector((state: any) => state?.outward?.assistant);
  const refreshData = useSelector((state: any) => state?.outward?.refreshData);
  // const godownData = useSelector((state:any)=>state?.outward?.filters?.Godown)
  const filters = useSelector((state: any) => state?.outward?.filters);
  const [filterStatus, setFilterStatus] = useState([
    { id: 1, value: "pending" },
    { id: 2, value: "accepted" },
    { id: 3, value: "scanned" },
    { id: 4, value: "loading" },
    { id: 5, value: "weightDone" },
  ]);
  const dispatch = useDispatch();
  const router = useRouter();

  const formatDate = (date: Date): string => {
    return date.toISOString().substring(0, 10);
  };

  

  useEffect(() => {
    dispatch(getOutwardSlipAsync({ limit: 20, page: 1 }));
    dispatch(getAssistantAsync());
  }, [refreshData]);

  useEffect(() => {
    console.log("ye h wo ", filters);
  }, [filters]);

  useEffect(() => {
    dispatch(getOutwardSlipFiltersAsync());
  }, []);


  const handleDateChange = (event:any, selectedDate:any) => {
    if (selectedDate) {
        // Adjust for local time
        const offsetDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000);
        setDate(offsetDate)
    }

    setDateModalOpen(false)
    let formattedDate = formatDate(date);
    dispatch(getOutwardSlipAsync({ limit: 20, page: 1, date:formattedDate}));

};

useEffect(()=>{
  console.log("fix date ", date)
},[date])

  

useEffect(()=>{
  console.log("selected godown ", selectedGodown)
},[selectedGodown])

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
              containerStyle={{ width: 200, borderRadius: 5, marginTop: 5 }}
              data={filters?.Godown?.length > 0 ? filters.Godown : []}
              disable={false}
              maxHeight={220}
              labelField="godownName"
              valueField="_id" // need to ask ?
              placeholder={"Godown"}
              value={selectedGodown}
              onChange={(godown: any) => {
                setSelectedGodown(godown);
                dispatch(getOutwardSlipAsync({ limit: 20, page: 1, godownId:godown._id }));
              }}
              renderLeftIcon={() => {
                return (
                  <>
                    {selectedGodown != null && (
                      <TouchableNativeFeedback
                        onPress={() => setSelectedGodown(null)}
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
              containerStyle={{ width: 250, borderRadius: 5, marginTop: 5 }}
              data={filters?.SalesOrder?.length > 0 ? filters.SalesOrder : []}
              disable={false}
              maxHeight={220}
              search
              labelField="orderNumber"
              valueField="_id" // need to ask ?
              placeholder={"Order No"}
              value={selectedOrderNumber}
              onChange={(orderNumber: any) => {
                setSelectedOrderNumber(orderNumber)
                console.log("order number ", orderNumber)
                dispatch(getOutwardSlipAsync({ limit: 20, page: 1, orderNumber:orderNumber.orderNumber }));
              }}
              onChangeText={(orderNumber:any)=>{
                dispatch(getOutwardSlipFiltersAsync({orderNumber:orderNumber}));
              }}
              renderLeftIcon={() => {
                return (
                  <>
                    {selectedOrderNumber != null && (
                      <TouchableNativeFeedback
                        onPress={() => setSelectedOrderNumber(null)}
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

          <View className="border rounded-md flex justify-center items-center px-2 bg-white">
            <Dropdown
              style={[]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemContainerStyle}
              containerStyle={{ width: 100, borderRadius: 5, marginTop: 5 }}
              data={filterStatus}
              disable={loading}
              maxHeight={220}
              labelField="value"
              valueField="value" // need to ask ?
              placeholder={"Status"}
              value={selectedGodown}
              onChange={(status: any) => {
                setSelectedStatus(status);
                dispatch(getOutwardSlipAsync({ limit: 20, page: 1, status:status.value }));
              }}
              renderLeftIcon={() => {
                return (
                  <>
                    {selectedGodown != null && (
                      <TouchableNativeFeedback
                        onPress={() => setSelectedStatus(null)}
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
        </ScrollView>
        <View className="w-[90%] flex flex-row gap-2">
        <View className="border flex justify-center items-center w-[65%] rounded-md px-2 bg-white">
            <Dropdown
              style={[]}
              className="w-full"
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemContainerStyle}
              containerStyle={{ width: 300, borderRadius: 5, marginTop: 5 }}
              data={filters?.Customer?.length > 0 ? filters.Customer : []}
              disable={false}
              maxHeight={220}
              search
              labelField="name"
              valueField="_id" // need to ask ?
              placeholder={"Search Customers..."}
              value={selectedCustomer}
              onChange={(customer: any) => {
                setSelectedCustomer(customer)
                dispatch(getOutwardSlipAsync({ limit: 20, page: 1, customerId:customer._id }));
              }}
              onChangeText={(customer:any)=>{
                dispatch(getOutwardSlipFiltersAsync({customer:customer}));
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
          <View>
            <TouchableOpacity
              className="bg-green-400 rounded-md p-3"
              onPress={() => router.push("../acceptedItems")}
            >
              <Text className="text-black font-medium">Accepted Items</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* cards are here */}
      {/* <ScrollView> */}
      <View className="my-4 h-[75%]">
        <OutwardSlipTable
          data={outwardSlips}
          assistant={assistants}
          type={"outward"}
        />
      </View>

      {/* pagination starts here */}
      <View className="w-[90%] mx-auto flex flex-row justify-between">
        <View className="w-[150px]">
          <Pagination />
        </View>

        <View className="w-[150px]">
          <Dropdown
            className="flex-row justify-center items-center bg-white rounded-full px-4 py-2 border text-lg text-blue-700 font-semibold mx-2"
            style={[]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.itemContainerStyle}
            containerStyle={{ width: 100, borderRadius: 5, marginTop: 5 }}
            data={[]}
            disable={loading}
            maxHeight={220}
            labelField="godownName"
            valueField="_id" // need to ask ?
            placeholder={"Limit 10"}
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
                      <MaterialIcons name="cancel" size={20} color={"black"} />
                    </TouchableNativeFeedback>
                  )}
                </>
              );
            }}
          />
        </View>
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
