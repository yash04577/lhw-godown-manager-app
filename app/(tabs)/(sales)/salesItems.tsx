import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

const salesItems = () => {
  const router = useRouter();
  const items = useSelector((state: any) => state?.estimateSales?.items.data);
  const [orderNumbers, setOrderNumbers] = useState([]);
  const [filteredItems, setFilteredItem] = useState(items);
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const  { customer } = useLocalSearchParams();
  const [isRefreshing, setIsRefreshing] = useState(false);
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

  const [filterStatus, setFilterStatus] = useState([
    { id: 1, value: "pending" },
    { id: 2, value: "accepted" },
    { id: 3, value: "scanned" },
    { id: 4, value: "loading" },
    { id: 5, value: "weightDone" },
  ]);


  const [filterQuery, setFilterQuery] = useState({
    orderNumber: "",
    godown: "",
    status: "",
  });
  



  const handleCheckboxChange = (item: any) => {
    const isSelected = selectedRows?.some(
      (selectedItem: any) => selectedItem.elementId === item.elementId
    );

    if (isSelected) {
      setSelectedRows((prevSelectedRows: any) =>
        prevSelectedRows.filter(
          (selectedItem: any) => selectedItem.elementId !== item.elementId
        )
      );
    } else {
      setSelectedRows((prevSelectedRows: any) => [...prevSelectedRows, item]);
    }
  };


  const AddBillingClick = () => {
    const hasPendingItems = selectedRows?.some(
      (row: any) => row.status[row.status.length - 1]?.value !== "weightDone"
    );
    if (hasPendingItems) {
      alert("Select Only Weight Done status");
    } else if (selectedRows.length > 0) {
    
      router.push({
        pathname: "/addSales",
        params: { items: JSON.stringify(selectedRows), customer: customer },
      });

    } else {
      alert("Please select at least one item for billing.");
    }
  }


  useEffect(()=>{
    let filterItem = items;

    if(filterQuery.godown != ""){
      filterItem = filterItem?.filter((item:any)=>(
        item?.godown == filterQuery?.godown
        ))
    }

    if(filterQuery.status != ""){
      filterItem = filterItem?.filter((item:any)=>(
        item?.status[item?.status?.length - 1]?.value == filterQuery?.status
        ))
    }

    if(filterQuery.orderNumber != ""){
      filterItem = filterItem?.filter((item:any)=>(
        item?.orderNumber == filterQuery?.orderNumber
        ))
    }

    setFilteredItem(filterItem)
  },[filterQuery])

  useEffect(() => {

    const uniqueOrders = items?.reduce((acc: any, current: any) => {
      if (
        !acc.some((order: any) => order.orderNumber === current.orderNumber)
      ) {
        acc.push(current);
      }
      return acc;
    }, []);

    setOrderNumbers(uniqueOrders);
  }, [items]);

  const handleRefresh = () =>{
    setFilterQuery({
      godown:"",
      status:"",
      orderNumber:""
    })

  }


  return (
    <View>
      <View className="w-full flex justify-center h-[50px] items-center gap-2">
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
              maxHeight={220}
              labelField="godownName"
              valueField="godownName" // need to ask ?
              placeholder={"Godown"}
              value={filterQuery?.godown}
              
              // onFocus={() => setIsFocus2(true)}
              // onBlur={() => setIsFocus2(false)}
              onChange={(godown: any) => {
                setFilterQuery((query) => ({
                  ...query,
                  godown: godown.godownName,
                }));
              }}
              renderLeftIcon={() => {
                return (
                  <>
                    {filterQuery?.godown != "" && (
                      <TouchableNativeFeedback
                        onPress={() =>
                          setFilterQuery((query: any) => ({
                            ...query,
                            godown: "",
                          }))
                        }
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
              data={filterStatus}
              maxHeight={220}
              labelField="value"
              valueField="value" // need to ask ?
              placeholder={"status"}
              value={filterQuery?.status}
              // onFocus={() => setIsFocus2(true)}
              // onBlur={() => setIsFocus2(false)}
              onChange={(status: any) => {
                setFilterQuery((query) => ({
                  ...query,
                  status: status.value,
                }));
              }}
              renderLeftIcon={() => {
                return (
                  <>
                    {filterQuery?.status != "" && (
                      <TouchableNativeFeedback
                        onPress={() =>
                          setFilterQuery((query: any) => ({
                            ...query,
                            status: "",
                          }))
                        }
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
              data={orderNumbers}
              maxHeight={220}
              search
              labelField="orderNumber"
              valueField="orderNumber" // need to ask ?
              placeholder={"Order Number"}
              value={filterQuery?.orderNumber}
              // onFocus={() => setIsFocus2(true)}
              // onBlur={() => setIsFocus2(false)}
              onChange={(orderNumber: any) => {
                setFilterQuery((query) => ({
                  ...query,
                  orderNumber: orderNumber.orderNumber,
                }));
              }}
              renderLeftIcon={() => {
                return (
                  <>
                    {filterQuery?.orderNumber != "" && (
                      <TouchableNativeFeedback
                        onPress={() =>
                          setFilterQuery((query: any) => ({
                            ...query,
                            orderNumber: "",
                          }))
                        }
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
            <TouchableOpacity onPress={AddBillingClick} className="rounded-md flex justify-center items-center">
              <Text className=" text-black font-bold">Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View>
        <FlatList
        
          data={filteredItems}
          onRefresh={handleRefresh}
          refreshing={isRefreshing}
          renderItem={({ item, index }) => (

            <TouchableOpacity onPress={()=>handleCheckboxChange(item)}>

           

            <View
              className={`bg-white rounded-lg shadow-md p-4 mb-4 w-[90%] mt-2 mx-auto ${selectedRows.some((selectedItem: any) =>selectedItem?.elementId === item?.elementId) ? "bg-blue-200" : ""}`}
            >
              <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
                <Text className="text-gray-700 font-medium">{index + 1}</Text>
                <Text className="text-gray-700 font-medium">
                  {item?.itemName}
                </Text>
              </View>
              <View className="flex mt-2">
                <View className="flex flex-row justify-between">
                  <Text>Order No: </Text>
                  <Text className="text-gray-700">{item?.orderNumber}</Text>
                </View>
                <View className="flex flex-row justify-between">
                  <Text>Godown: </Text>
                  <Text className="text-gray-700">{item?.godown}</Text>
                </View>
                <View className="flex flex-row justify-between">
                  <Text>Ordered Quantity: </Text>
                  <Text className="text-gray-700">
                    {item?.quantity} {item?.unit}
                  </Text>
                </View>
                <View className="flex flex-row justify-between">
                  <Text>Dispatch Quantity: </Text>
                  <Text className="text-gray-700">
                    {item?.dispatchQuantity} {item?.unit}
                  </Text>
                </View>
                <View className="flex flex-row justify-between">
                  <Text>Remark: </Text>
                  <Text className="text-gray-700">{item?.itemRemark}</Text>
                </View>
                <View className="flex flex-row justify-between">
                  <Text>Status: </Text>
                  <Text className="px-4 py-2 rounded-md" style={{
                              backgroundColor:
                                item.status[item.status.length - 1]?.value ===
                                  "pending"
                                  ? "#FFE5E5"
                                  : item.status[item.status.length - 1]?.value ===
                                    "scanned"
                                    ? "#E6EBFF"
                                    : item.status[item.status.length - 1]?.value ===
                                      "weightDone"
                                      ? "#FFF2DC"
                                      : item.status[item.status.length - 1]?.value ===
                                        "accepted"
                                        ? "#D7FFF3"
                                        : item.status[item.status.length - 1]?.value ===
                                          "unloading"
                                          ? "#FFCEF7"
                                          : item.status[item.status.length - 1]?.value ===
                                            "complete"
                                            ? "#D7FFF3"
                                            : "",
                              color:
                                item.status[item.status.length - 1]?.value === "pending" ? "#DC2626"
                                  : item.status[item.status.length - 1]?.value ===
                                    "scanned"
                                    ? "#0A6FFF"
                                    : item.status[item.status.length - 1]?.value ===
                                      "weightDone"
                                      ? "#F59E0B"
                                      : item.status[item.status.length - 1]?.value ===
                                        "accepted"
                                        ? "#059669"
                                        : item.status[item.status.length - 1]?.value ===
                                          "unloading"
                                          ? "#C200B1"
                                          : item.status[item.status.length - 1]?.value ===
                                            "complete"
                                            ? "#059669"
                                            : "",
                            }}>
                    {item?.status[item?.status?.length - 1]?.value}
                  </Text>
                </View>
              </View>
            </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default salesItems;

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
