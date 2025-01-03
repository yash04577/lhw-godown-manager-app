import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TouchableNativeFeedback,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  generateBillAsync,
  getNextBillNoAsync,
  getVoucherAsync,
  updateDispatchQtyAsync,
} from "@/redux/slices/estimateSalesSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const addSales = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { customer, items } = useLocalSearchParams();
  const customerString = Array.isArray(customer) ? customer[0] : customer;
  const router = useRouter();
  const [selectedVoucher, setSelectedVoucher] = useState();
  const [showDateInput, setShowDateInput] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [AddGst, setAddGst] = useState(18);

  const [user, setUser] = useState();

  const getUserId = async () => {
    let userr = await AsyncStorage.getItem("loginData");
    let parsedUser = JSON.parse(userr);
    setUser(parsedUser);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getVoucherAsync());
    getUserId();
  }, []);

  let parsedCustomer: object;
  try {
    parsedCustomer = customerString ? JSON.parse(customerString) : null;
  } catch (error) {
    console.error("Failed to parse customer: ", error);
  }

  const [parsedItems, setParsedItems] = useState([]);

  useEffect(() => {
    setParsedItems(JSON.parse(items));
  }, [items]);

  const vouchers = useSelector(
    (state: any) => state?.estimateSales?.voucher?.vouchers
  );
  const salesVouchers = vouchers?.filter(
    (voucher: any) => voucher?.typeOfVoucher == "sales"
  );

  const salesBill = useSelector(
    (state: any) => state?.estimateSales?.salesBill
  );

  const status = useSelector((state: any) => state?.estimateSales?.status);

  const [additionalPrice, setAdditionalPrice] = useState({
    loading: 0,
    unloading: 0,
    freight: 0,
    cutting: 0,
    tcs: 0,
  });

  // Convert totalNetRate to a state variable
  const [totalNetRate, setTotalNetRate] = useState(0);

  const [finalAdditionalPriceWithGst, setFinalAdditionalPriceWithGst] =
    useState(0);

    useEffect(() => {
      let finalAdditionalPriceWithoutGst =
        Number(additionalPrice.cutting || 0) +
        Number(additionalPrice.freight || 0) +
        Number(additionalPrice.loading || 0) +
        Number(additionalPrice.unloading || 0);
      setFinalAdditionalPriceWithGst(
        finalAdditionalPriceWithoutGst +
          (finalAdditionalPriceWithoutGst * AddGst) / 100 +
          Number(additionalPrice.tcs || 0)
      );
    }, [additionalPrice, AddGst]);

  const getNetRate = (rate: any, dispatchQuantity: any, gst: any) => {
    try {
      const taxableValue = rate * dispatchQuantity;
      const netRate = taxableValue + (taxableValue * gst) / 100;
      return netRate;
    } catch (error) {
      return -1;
    }
  };

 

  // Update totalNetRate whenever parsedItems or additionalPrice change
  useEffect(() => {
    let tempTotal = 0;
    parsedItems?.forEach((element: any) => {
      tempTotal += Number(
        getNetRate(
          element?.taxableValue,
          element?.dispatchQuantity,
          element?.gst
        )
      );
    });


    setTotalNetRate(tempTotal + finalAdditionalPriceWithGst); // Add additionalPrice to totalNetRate
  }, [parsedItems, additionalPrice, finalAdditionalPriceWithGst]);

  

  const targetVouchers = [
    "664702668cda5ec69b639387",
    "6647006b8cda5ec69b57bd86",
    "664701838cda5ec69b5ca68d",
  ];

  

  const formatDate = (date: Date): string => {
    return date.toISOString().substring(0, 10);
  };

  const handleDateChange = (event: any, selectedDate: any) => {
    if (selectedDate) {
      const offsetDate = new Date(
        selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000
      );
      setDate(offsetDate);
    }

    setShowDateInput(false);
  };

  useEffect(() => {
    if (targetVouchers.includes(selectedVoucher?._id)) {
      setShowDateInput(true);
    }

    dispatch(getNextBillNoAsync(selectedVoucher?._id));
  }, [selectedVoucher]);

  const nextBillNumber = useSelector(
    (state: any) => state?.estimateSales?.billNumber
  );

  const handleDataInput = (e: any) => {
    setDate(e.target.value);
  };

  let payload = {
    additionPriceGst: 18,
    additionalPrice: {
      loading: "",
      unloading: "",
      freight: "",
      cutting: "",
      tcs: "",
    },
    billNumber: "",
    createdBy: "",
    customerId: "",
    date: "",
    finalAdditionalPrice: 0,
    items: [],
    status: "complete",
    total: 0,
    voucher: "66486b47b85dff24fa07af40",
  };

  

  const generateBill = async () => {
    try {
      if (!selectedVoucher) {
        alert("Please select voucher first!");
      } else {
        // console.log("total nr 2 ", totalNetRate);
        payload.additionPriceGst = AddGst;
        payload.billNumber = nextBillNumber?.nextBillNumber;
        (payload.createdBy = user?.userId),
          (payload.customerId = parsedCustomer._id),
          (payload.finalAdditionalPrice = finalAdditionalPriceWithGst),
          (payload.additionalPrice = additionalPrice);
        (payload.date = formatDate(new Date())),
          // payload.date = date ? date : new Date(),
          (payload.status = "complete"),
          (payload.voucher = selectedVoucher?._id),
          (payload.total = totalNetRate);
        (payload.items = parsedItems.map((item: any) => ({
          item: item?.itemId,
          salesOrder: item?.orderId,
          godown: item?.godownId,
          taxableValue: item?.taxableValue,
          gst: item?.gst,
          quantity: item?.quantity,
          unit: item?.unit,
          dispatchQuantity: item?.dispatchQuantity,
          _id: item?.elementId,
        }))),
          dispatch(generateBillAsync(payload))
            .then((res: any) => router.replace("/"))
            .cath((error: any) => console.log("payload ", error));

          // console.log("payload ", payload)
      }
    } catch (error) {
      return error;
    }
  };

  const [selectedQuantity, setSelectedQuantity] = useState({});

  const [editIndex, setEditIndex] = useState(-1);

  const handleModalChange = async (item: any, ind: number) => {
    setModalVisible(!modalVisible);
    setSelectedQuantity(item);
    setUpdateQtyPayload((prev) => ({
      ...prev,
      elementId: item.elementId,
      id: item.orderId,
    }));
    setEditIndex(Number(ind));
  };

  const [updateQtyPayload, setUpdateQtyPayload] = useState({});


  const handleSaveQuantity = async() =>{
    setParsedItems((prev) => {
      const newItems: any = [...prev];
      newItems[editIndex] = {
        ...newItems[editIndex],
        dispatchQuantity: Number(updateQtyPayload.dispatchQuantity),
      };
      return newItems;
    });
    setModalVisible(false);
    dispatch(updateDispatchQtyAsync(updateQtyPayload));
  }

  return (
    <ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 items-center justify-center bg-black bg-opacity-50">
          <View className="bg-white w-11/12 rounded-lg p-6 shadow-lg">
            <View className="flex flex-row items-center gap-5 mb-4">
              <Text className="text-lg font-semibold text-gray-700">
                Previous Quantity:
              </Text>
              <Text className="text-lg font-semibold text-blue-600">
                {selectedQuantity?.dispatchQuantity}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-4 mb-6">
              <Text className="text-lg font-medium text-gray-700">
                New Quantity:
              </Text>
              <TextInput
                className="flex-1 border border-gray-300 rounded-lg p-2 text-gray-700"
                keyboardType="number-pad"
                onChangeText={(value: any) =>
                  setUpdateQtyPayload((prev) => ({
                    ...prev,
                    dispatchQuantity: value,
                  }))
                }
              />
            </View>
            <View className="flex flex-row justify-end gap-4">
              <Pressable
                className="bg-red-500 py-2 px-4 rounded-lg"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white text-center font-medium">
                  Cancel
                </Text>
              </Pressable>
              <Pressable
                className="bg-green-500 py-2 px-4 rounded-lg"
                onPress={() => handleSaveQuantity()}
              >
                <Text className="text-white text-center font-medium">Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {status == "loading" ? (
        <View className="w-screen h-screen flex flex-row justify-center items-center">
          <Text>Loading...</Text>
        </View>
      ) : (
        <View className="w-[90%] mx-auto">
          <View>
            <Dropdown
              style={[]}
              className="text-2xl h-[40px] w-[150px] rounded mt-2 bg-white border placeholder:pl-2"
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              itemTextStyle={styles.itemContainerStyle}
              containerStyle={{ width: 100, borderRadius: 5, marginTop: 5 }}
              data={salesVouchers}
              maxHeight={220}
              labelField="voucherName"
              valueField="voucherCode" // need to ask ?
              placeholder={"Voucher"}
              value={selectedVoucher}
              // onFocus={() => setIsFocus2(true)}
              // onBlur={() => setIsFocus2(false)}
              onChange={(voucher: any) => {
                setSelectedVoucher(voucher);
              }}
              renderLeftIcon={() => {
                return (
                  <>
                    {selectedVoucher && (
                      <TouchableNativeFeedback>
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

          {showDateInput && (
            <View className="">
              <TouchableOpacity onPress={() => setShowDateInput(true)}>
                <View
                  className={`flex-row py-2 rounded-md border items-center justify-between px-2`}
                  style={{ borderWidth: 1 }}
                >
                  {date.toString() !== "" && (
                    <TouchableNativeFeedback
                      onPress={() => setDate(new Date(Date.now()))}
                    >
                      <MaterialIcons name="cancel" size={20} color={"white"} />
                    </TouchableNativeFeedback>
                  )}
                  <Text>{date ? (formatDate(date) as string) : "Date"}</Text>
                  <MaterialIcons name="date-range" size={20} color={"black"} />
                </View>
              </TouchableOpacity>
              {showDateInput && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  is24Hour={false}
                  onChange={handleDateChange}
                />
              )}
            </View>
          )}

          <View className="bg-white rounded-lg p-5 my-5">
            <Text className="font-bold text-black text-xl">
              Estimate Details
            </Text>
            <View className="flex my-2 border-t border-gray-200">
              {/* Bill Number and Status */}
              <View className="flex flex-row justify-between my-2">
                <Text>Bill Number:</Text>
                <Text className="text-gray-700">
                  {nextBillNumber?.nextBillNumber}
                </Text>
              </View>
              <View className="flex flex-row justify-between my-2">
                <Text>Status:</Text>
                <Text className="text-gray-700 bg-green-400 px-4 py-2 rounded">
                  complete
                </Text>
              </View>

              {/* Bill To Section */}
              <View className="flex flex-row my-2">
                <View className="text-gray-700">
                  <View className="flex flex-row w-full justify-between my-2">
                    <Text>Customer:</Text>
                    <Text className="text-gray-700">
                      {parsedCustomer?.name} {parsedCustomer?.code}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between my-2">
                    <Text>Contact:</Text>
                    <Text className="text-gray-700">
                      {parsedCustomer?.phoneNumber}
                    </Text>
                  </View>
                  <View className="flex flex-row my-2 justify-between">
                    <Text>Address:</Text>
                    <Text className="text-gray-700">
                      {parsedCustomer?.address1} {parsedCustomer?.address2}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between my-2">
                    <Text>Pincode:</Text>
                    <Text className="text-gray-700">
                      {parsedCustomer?.postalCode}
                    </Text>
                  </View>
                  <Text className="text-right">
                    {salesBill?.customer?.customerName}
                  </Text>
                  <Text className="text-right">
                    {salesBill?.customer?.address1}
                  </Text>
                  <Text className="text-right">
                    {salesBill?.customer?.address2}
                  </Text>
                  <Text className="text-right">
                    {salesBill?.customer?.phoneNumber}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <FlatList
              data={parsedItems?.length > 0 ? parsedItems : []}
              renderItem={({ item, index }) => (
                <View
                  className={`bg-white rounded-lg shadow-md p-4 mb-4 w-full mx-auto`}
                >
                  <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
                    <Text className="text-gray-700 font-medium">
                      {index + 1}
                    </Text>
                    <Text className="text-gray-700 font-medium">
                      {item?.itemName}
                    </Text>
                  </View>
                  <View className="flex mt-2">
                    <View className="flex flex-row justify-between">
                      <Text>Godown: </Text>
                      <Text className="text-gray-700">{item?.godown}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Dispatch Quantity: </Text>
                      <TouchableOpacity
                        onPress={() => handleModalChange(item, index)}
                      >
                        <Text className="text-gray-700">
                          {item?.dispatchQuantity}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Rate: </Text>
                      <Text className="text-gray-700">
                        {item?.taxableValue}
                      </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Taxable Value: </Text>
                      <Text className="text-gray-700">
                        {(item?.taxableValue * item?.dispatchQuantity).toFixed(
                          0
                        )}
                      </Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Gst: </Text>
                      <Text className="text-gray-700">{item?.gst}</Text>
                    </View>
                    <View className="flex flex-row justify-between">
                      <Text>Net Rate: </Text>
                      <Text className="text-gray-700">
                        {getNetRate(
                          Number(item?.taxableValue),
                          Number(item?.dispatchQuantity),
                          Number(item?.gst)
                        ).toFixed(3)}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>

          <View className="w-full my-5 bg-white p-5 rounded-lg">
            <View className="flex-row justify-between items-center border-b border-gray-200 pb-2 mb-2">
              <Text className="font-bold text-black text-xl">
                Additional Pricing {(finalAdditionalPriceWithGst)}
              </Text>
            </View>

            <View>
              <View className="flex flex-row gap-5 justify-between">
                <Text>Loading:</Text>
                <TextInput
                  style={styles.input}
                  value={additionalPrice?.loading}
                  onChangeText={(value) =>
                    setAdditionalPrice((prevPrices: any) => ({
                      ...prevPrices,
                      loading: value,
                    }))
                  }
                  keyboardType="numeric" // This sets the keyboard to numeric input
                  placeholder="0"
                />
              </View>
              <View className="flex flex-row gap-5 justify-between">
                <Text>Unloading:</Text>
                <TextInput
                  style={styles.input}
                  value={additionalPrice?.unloading}
                  onChangeText={(value) =>
                    setAdditionalPrice((prevPrices: any) => ({
                      ...prevPrices,
                      unloading: value,
                    }))
                  }
                  keyboardType="numeric" // This sets the keyboard to numeric input
                  placeholder="0"
                />
              </View>
              <View className="flex flex-row gap-5 justify-between">
                <Text>Freight:</Text>
                <TextInput
                  style={styles.input}
                  value={additionalPrice?.freight}
                  onChangeText={(value) =>
                    setAdditionalPrice((prevPrices: any) => ({
                      ...prevPrices,
                      freight: value,
                    }))
                  }
                  keyboardType="numeric" // This sets the keyboard to numeric input
                  placeholder="0"
                />
              </View>
              <View className="flex flex-row gap-5 justify-between">
                <Text>Cutting:</Text>
                <TextInput
                  style={styles.input}
                  value={additionalPrice?.cutting}
                  onChangeText={(value) =>
                    setAdditionalPrice((prevPrices: any) => ({
                      ...prevPrices,
                      cutting: value,
                    }))
                  }
                  keyboardType="numeric" // This sets the keyboard to numeric input
                  placeholder="0"
                />
              </View>
              <View className="flex flex-row gap-5 justify-between">
                <Text>TCS:</Text>
                <TextInput
                  style={styles.input}
                  value={additionalPrice?.tcs}
                  onChangeText={(value) =>
                    setAdditionalPrice((prevPrices: any) => ({
                      ...prevPrices,
                      tcs: value,
                    }))
                  }
                  keyboardType="numeric" // This sets the keyboard to numeric input
                  placeholder="0"
                />
              </View>
              <View className="flex flex-row gap-5 justify-between">
                <Text>GST:</Text>
                <TextInput
                  style={styles.input}
                  value={AddGst}
                  onChangeText={(value) => setAddGst(Number(value))}
                  keyboardType="numeric" // This sets the keyboard to numeric input
                  placeholder="18"
                />
              </View>
            </View>
          </View>

          <View
            className={`bg-white rounded-lg shadow-md p-4 mb-4 w-full mx-auto`}
          >
            <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
              <Text className="text-gray-700 font-medium">Total:</Text>
              <Text className="text-gray-700 font-medium">
                &#8377; {totalNetRate.toFixed(0)}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className={`bg-blue-400 rounded-lg shadow-md p-4 mb-4 w-full mx-auto flex justify-center items-center`}
            onPress={generateBill}
          >
            <Text className="text-white text-2xl font-medium">
              Generate Bill
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default addSales;

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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
