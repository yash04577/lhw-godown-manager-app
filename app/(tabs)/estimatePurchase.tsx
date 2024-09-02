import Pagination from "@/components/commanComponents/Pagination";
import EstimateSalesTable from "@/components/estimateSales/EstimateSalesTable";
import OutwardSlipCard from "@/components/outwardSlip/OutwardSlipCard";
import OutwardSlipTable from "@/components/outwardSlip/OutwardSlipTable";
import { getEstimatePurchaseAsync } from "@/redux/slices/estimatePurchaseSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";

const estimatePurchase = ()=> {
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

  const [loading, setLoading] = useState(false);
  const [selectedGodown, setSelectedGodown] = useState("");
  const [godownFilterFocus, setGodownFilterFocus] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<String>("");
  const purchaseBills = useSelector((state:any)=>state?.purchase?.data)

  const dispatch = useDispatch();

  const formatDate = (date: Date): string => {
    return date.toISOString().substring(0, 10);
  };

  const handleDateChange = (date: any) => {
    try {
      if (date != null) {
        // console.log("if called here")
        setSelectedDate(formatDate(date));
      } else {
        setSelectedDate("");
      }
    } catch (error) {
      console.log("error on date change on past history", error);
    }
  };

  useEffect(()=>{
    dispatch(getEstimatePurchaseAsync({page:1, limit:10, customer:"", godownId:""}));
  },[])


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
                className={`flex-row py-2 rounded-md border items-center justify-between px-2 ${
                  selectedDate === "" ? "bg-white" : "bg-primary"
                }`}
                style={{ borderWidth: 1 }}
              >
                {selectedDate !== "" && (
                  <TouchableNativeFeedback onPress={() => handleDateChange("")}>
                    <MaterialIcons name="cancel" size={20} color={"white"} />
                  </TouchableNativeFeedback>
                )}
                <Text
                  className={`${
                    selectedDate === "" ? " text-[#004EBA]" : " text-white"
                  } font-semibold`}
                >
                  {selectedDate ? (selectedDate as String) : "Date"}
                </Text>
                <MaterialIcons
                  name="date-range"
                  size={20}
                  color={selectedDate ? "white" : "black"}
                />
              </View>
            </TouchableOpacity>
            <DatePicker
              modal
              open={dateModalOpen}
              mode="date"
              date={new Date()}
              onConfirm={(date: any) => {
                handleDateChange(date);
                setDateModalOpen(false);
              }}
              onCancel={() => {
                setDateModalOpen(false);
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
          </View>
        </ScrollView>
        <View className="w-[90%] flex flex-row">
        <TextInput 
          placeholder="Search Customer..." 
          className="border w-[65%] mx-auto px-2 py-1 rounded-md bg-white"
        />
        <TouchableOpacity className="bg-[#283093] flex justify-center items-center rounded-md"><Text className="text-white px-4 font-medium">Add Purchase</Text></TouchableOpacity>
      </View>
      </View>


      {/* cards are here */}
      {/* <ScrollView> */}
      <View className="my-4 h-[75%]">
        <EstimateSalesTable data={purchaseBills} type={"purchase"}/>
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
              data={godownData}
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


export default estimatePurchase;
