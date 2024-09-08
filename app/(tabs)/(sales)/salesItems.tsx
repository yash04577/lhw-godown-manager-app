import { FlatList, ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Dropdown } from 'react-native-element-dropdown'
import { MaterialIcons } from '@expo/vector-icons'

const salesItems = () => {

    const items = useSelector((state:any)=>state?.estimateSales?.items.data)
    const [loading, setLoading] = useState(false);
  const [selectedGodown, setSelectedGodown] = useState("");
  const [godownFilterFocus, setGodownFilterFocus] = useState(false);
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<String>("");

    useEffect(() => {
      console.log("itemsssssss ", items)
    
    }, [items])
    

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
              data={[]}
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
              data={[]}
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
              data={[]}
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

        <View>
            <TouchableOpacity className='rounded-md flex justify-center items-center'>
                <Text className=' text-black font-bold'>
                    Done
                </Text>
            </TouchableOpacity>
        </View>

        </ScrollView>
       
      </View>

      <View>
          <FlatList
            data={items}
            renderItem={({ item, index }) => (
              <View
                className={`bg-white rounded-lg shadow-md p-4 mb-4 w-full mx-auto`}
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
                    <Text className="text-gray-700">
                      {item?.orderNumber}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text>Godown: </Text>
                    <Text className="text-gray-700">
                      {item?.godown}
                    </Text>
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
                    <Text className="text-gray-700">
                      {item?.status[item?.status?.length -1]?.value}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
    </View>
  )
}

export default salesItems

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
  
  

  