import Pagination from "@/components/commanComponents/Pagination";
import EstimateSalesTable from "@/components/estimateSales/EstimateSalesTable";
import OutwardSlipCard from "@/components/outwardSlip/OutwardSlipCard";
import OutwardSlipTable from "@/components/outwardSlip/OutwardSlipTable";
import { getCustomersForSalesAsync, getCustomersOrdersForSalesAsync, getEstimateSalesAsync, getSalesBillAsync } from "@/redux/slices/estimateSalesSlice";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
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
            // console.log("cid ", item?._id)
            dispatch(getCustomersOrdersForSalesAsync({customerId:item?._id}))
            // router.push("/salesItems")

            router.push({
              pathname: "/salesItems",
              params: { customer: JSON.stringify(item) },
            });
        
        }
  
    return (
      
  <TouchableOpacity onPress={()=>handleClick(item)}>
  
  <View className={`bg-white rounded-lg shadow-md p-4 mb-4 w-[90%] mx-auto`}>
        <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
          <Text className="text-gray-700 font-medium">{index+1}</Text>
          <Text className="text-gray-700">Total Orders: {item?.countOfSalesOrder}</Text>
        </View>
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-gray-700">{item?.name} {(item?.code)}</Text>
        </View>
      </View>
  </TouchableOpacity>
      
    );
  };

const estimateSales = ()=> {
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
  const estimateSales = useSelector((state:any)=>state?.estimateSales?.data);
  const [query, setQuery] = useState('');

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
    dispatch(getCustomersForSalesAsync({query:query}));
  },[query])

  const customers = useSelector((state:any)=>state?.estimateSales?.customers)

//   useEffect(()=>{
//     console.log("customerrrrr ", customers)
// },[customers])

 

  return (
    <View className="flex-1 h-screen mt-2">

      {/* //filters are here */}
      <View className="w-full flex justify-center items-center gap-2">
       
        <View className="w-[90%] flex flex-row">
        <TextInput 
            onChangeText={(customer)=>setQuery(customer)}
          placeholder="Search Customer..." 
          className="border w-[100%] mx-auto px-2 py-1 rounded-md bg-white"
        />
      </View>
      </View>


      {/* cards are here */}
      {/* <ScrollView> */}
      <View className="my-4 h-[90%]">
      <FlatList
      data={customers}
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
