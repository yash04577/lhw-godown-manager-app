import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
// import { getSalesOrderCustomerWithItemAsync } from '@src/Redux/Slice/GodownManager/getByMaanagerSlice';j
// import { usePDF } from '@react-pdf/renderer';
// import { PrinterIcon } from 'react-native-heroicons/outline';

const acceptedOrder = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // const { state } = route.params;
  // const slipsgetting = state;
  const dispatch = useDispatch();
  const SlipsData = useSelector((state: any) => state.outward?.orderDetail);

 
 

  const acceptedItems = SlipsData?.item?.filter(
    (element: any) =>
      element.status[element.status.length - 1].value === "accepted"
  );

  const hidePrintButton = () => {
    // toPDF();
  };

  const totalNum = SlipsData?.loadingNumber
    ?.map((loading: any) => loading?.num)
    ?.join(", ");
  const vehicleNumbers = SlipsData?.loadingNumber
    ?.map((loading: any) => loading?.vehicleNumber)
    ?.join(", ");
  const totalValue = SlipsData?.loadingNumber?.reduce(
    (acc: any, loading: any) => acc + loading?.value,
    0
  );

  const createdAt = SlipsData?.createdAt;
  const dateObject = new Date(createdAt);

  const acceptedTime =
    acceptedItems?.length > 0
      ? acceptedItems[0]?.status[acceptedItems[0]?.status?.length - 1]?.date
      : null;
  const AccepteddateObject = new Date(acceptedTime);

  const options:any = { year: "numeric", month: "long", day: "numeric" };
  const date = dateObject?.toLocaleDateString(undefined, options);
  const AcceptedDate = AccepteddateObject?.toLocaleDateString(
    undefined,
    options
  );

  const timeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
  const time = dateObject?.toLocaleTimeString(undefined, timeOptions);
  const AcceptedTime = AccepteddateObject?.toLocaleTimeString(
    undefined,
    timeOptions
  );

  return (
    <ScrollView>
      <View className="flex px-4 flex-col">
        <View className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 flex mt-3 flex-col relative">
          {/* <TouchableOpacity
    onPress={hidePrintButton}
    className="myPrintButtonClass absolute top-4 right-4 flex justify-center gap-2 px-[12px] py-[10px] text-[14px] font-medium text-white bg-[#005D7F] rounded-lg hover:bg-white hover:text-[#005D7F] border border-[#005D7F] duration-300 cursor-pointer"
  >
    <Text>Print</Text>
  </TouchableOpacity> */}

          <View className="flex flex-row justify-between items-start">
            <View className="flex flex-col gap-4">
              <View className="flex flex-row items-center">
                <Text className="text-[16px] font-bold text-gray-800">
                  Date:
                </Text>
                <Text className="text-[16px] text-gray-600 ml-2">
                  {date} at {time}
                </Text>
              </View>

              <View className="flex flex-row items-center">
                <Text className="text-[16px] font-bold text-gray-800">
                  Order Number:
                </Text>
                <Text className="text-[16px] text-gray-600 ml-2">
                  {SlipsData?.orderNumber}
                </Text>
              </View>
            </View>

            {/* {SlipsData?.priority && (
              <View className="flex flex-row gap-2 items-center">
                <Text className="font-bold text-[16px] text-gray-800">
                  Priority:
                </Text>
                <Text
                  className={`capitalize font-bold text-[16px] ${
                    SlipsData?.priority === "high"
                      ? "text-red-500"
                      : SlipsData?.priority === "normal"
                      ? "text-green-500"
                      : SlipsData?.priority === "low"
                      ? "text-yellow-500"
                      : ""
                  }`}
                >
                  {SlipsData?.priority}
                </Text>
              </View>
            )} */}
          </View>
          {/* <View className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 flex flex-col relative"> */}
          <View className="flex flex-row justify-between items-start flex-wrap mt-5">
            <View className="flex flex-col gap-4">
              {SlipsData?.voucher && (
                <View className="flex flex-row items-center">
                  <Text className="text-[16px] font-bold text-gray-800">
                    Voucher Numbers:
                  </Text>
                  <Text className="text-[16px] text-gray-600 ml-2">
                    {SlipsData.voucher}
                  </Text>
                </View>
              )}
              {SlipsData?.paymentMethod && (
                <View className="flex flex-row items-center">
                  <Text className="text-[16px] font-bold text-gray-800">
                    Payment Method:
                  </Text>
                  <Text className="text-[16px] text-gray-600 ml-2">
                    {SlipsData.paymentMethod}
                  </Text>
                </View>
              )}
              {SlipsData?.remark && (
                <View className="flex flex-row items-center">
                  <Text className="text-[16px] font-bold text-gray-800">
                    Remark:
                  </Text>
                  <Text className="text-[16px] text-gray-600 ml-2">
                    {SlipsData.remark}
                  </Text>
                </View>
              )}
            </View>

            <View className="flex flex-col gap-4">
              {SlipsData?.PoDate && (
                <View className="flex flex-row items-center">
                  <Text className="text-[16px] font-bold text-gray-800">
                    Po Date:
                  </Text>
                  <Text className="text-[16px] text-gray-600 ml-2">
                    {new Date(SlipsData.PoDate).toLocaleDateString()}
                  </Text>
                </View>
              )}
              {SlipsData?.PoNumber && (
                <View className="flex flex-row items-center">
                  <Text className="text-[16px] font-bold text-gray-800">
                    Po Number:
                  </Text>
                  <Text className="text-[16px] text-gray-600 ml-2">
                    {SlipsData.PoNumber}
                  </Text>
                </View>
              )}
              {SlipsData?.PaymentDay && (
                <View className="flex flex-row items-center">
                  <Text className="text-[16px] font-bold text-gray-800">
                    Payment Days:
                  </Text>
                  <Text className="text-[16px] text-gray-600 ml-2">
                    {SlipsData.PaymentDay}
                  </Text>
                </View>
              )}
            </View>
          </View>
          {/* </View> */}
        </View>

        <View className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-wrap mt-5">
          {SlipsData?.shippingAddress && (
            <View className="flex flex-col w-full border-r border-gray-300">
              <View className="border-b border-gray-300">
                <Text className="font-bold text-[22px] p-4">
                  Shipping Address
                </Text>
              </View>
              <View className="p-4 flex flex-col gap-2">
                {SlipsData?.shippingAddress?.contactPerson && (
                  <Text className="text-[20px] text-gray-700">
                    {SlipsData.shippingAddress.contactPerson}
                  </Text>
                )}
                {SlipsData?.shippingAddress?.state && (
                  <Text className="text-[16px] text-gray-600">
                    <Text className="font-bold">State:</Text>{" "}
                    {SlipsData.shippingAddress.state}
                  </Text>
                )}
                {SlipsData?.shippingAddress?.city && (
                  <Text className="text-[16px] text-gray-600">
                    <Text className="font-bold">City:</Text>{" "}
                    {SlipsData.shippingAddress.city}
                  </Text>
                )}
                {SlipsData?.shippingAddress?.address && (
                  <Text className="text-[16px] text-gray-600">
                    <Text className="font-bold">Address:</Text>{" "}
                    {SlipsData.shippingAddress.address}
                  </Text>
                )}
                {SlipsData?.shippingAddress?.contactPersonPhoneNo && (
                  <Text className="text-[16px] text-gray-600">
                    <Text className="font-bold">Phone No:</Text>{" "}
                    {SlipsData.shippingAddress.contactPersonPhoneNo}
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>
        <View className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-wrap mt-5">
          <View className="border-b w-full border-gray-300">
            <Text className="font-bold text-[22px] p-4">Customer Details</Text>
          </View>
          <View className="p-4 flex flex-col gap-4">
            <View className="flex flex-row justify-between">
              <View className="flex flex-col gap-2">
                {SlipsData?.customer?.customerName && (
                  <Text className="text-[20px] font-bold text-gray-700">
                    <Text className="text-[16px] font-bold">
                      Customer Name:
                    </Text>{" "}
                    {SlipsData.customer.customerName}
                  </Text>
                )}
                {SlipsData?.customer?.state && (
                  <Text className="text-[16px] text-gray-600">
                    <Text className="font-bold">State:</Text>{" "}
                    {SlipsData.customer.state}
                  </Text>
                )}
                {SlipsData?.customer?.phoneNumber && (
                  <Text className="text-[16px] text-gray-600">
                    <Text className="font-bold">Phone No:</Text>{" "}
                    {SlipsData.customer.phoneNumber}
                  </Text>
                )}
                {SlipsData?.customer?.address1 && (
                  <Text className="text-[16px] text-gray-600">
                    <Text className="font-bold">Address:</Text>{" "}
                    {SlipsData.customer.address1}
                  </Text>
                )}
              </View>
              <View className="flex flex-col gap-2">
                {SlipsData?.customer?.gstNumber && (
                  <Text className="text-[16px] text-gray-600">
                    <Text className="font-bold">GST No:</Text>{" "}
                    {SlipsData.customer.gstNumber}
                  </Text>
                )}
                {SlipsData?.customer?.email && (
                  <Text className="text-[16px] text-gray-600">
                    <Text className="font-bold">Email:</Text>{" "}
                    {SlipsData.customer.email}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-wrap mt-5">
          {SlipsData?.shippingAddress && (
            <View className="flex flex-col w-full border-r border-gray-300">
              <View className="border-b border-gray-300">
                <Text className="font-bold text-[22px] p-4">
                  Additional Pricing
                </Text>
              </View>
              <View className="p-4 flex flex-col gap-2">
                {SlipsData?.additionalPrice?.map((price: any, index: any) => {
                  if (price.unitName !== "Freight") {
                    return (
                      <Text key={index}>
                        {price.unitName}: {price.price}
                      </Text>
                    );
                  }
                })}
              </View>
            </View>
          )}
        </View>

        <View className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-wrap mt-5">
          {SlipsData?.loadingNumber && (
            <View className="flex flex-col w-full border-r border-gray-300">
              <View className="border-b border-gray-300">
                <Text className="font-bold text-[22px] p-4">
                  Loading Details
                </Text>
              </View>
              <View className="p-4 flex flex-col gap-2">
                {SlipsData?.loadingDetails.length > 0 &&
                  SlipsData?.loadingDetails?.map(
                    (element: any, index: number) => {
                      return (
                        <View>
                          <Text>Loading No: {element?.loadingNumber}</Text>
                          <Text>Vehicle Type: {element?.vehicleType}</Text>
                          <Text>Vehicle No: {element?.vehicleNumber}</Text>
                          <Text>Driver: {element?.driverName}</Text>
                          <Text>Driver Ph: {element?.driverPhoneNumber}</Text>
                          <Text>Distance: {element?.distance}</Text>
                          <Text>
                            Distance:{" "}
                            {element?.overload == false ? "No" : "Yes"}
                          </Text>
                          <Text>
                            Customer Fright: {element?.customerFreight}
                          </Text>
                        </View>
                      );
                    }
                  )}
              </View>
            </View>
          )}
        </View>

        <View className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-wrap mt-5">
          {SlipsData?.shippingAddress && (
            <View className="flex flex-col w-full border-r border-gray-300">
              <View className="border-b border-gray-300">
                <Text className="font-bold text-[22px] p-4">
                  Accepted Details
                </Text>
              </View>
              <View className="p-4 flex flex-col gap-2">
                <Text className="text-[16px] text-gray-600">
                  <Text className="font-bold">Accepted At :</Text>
                  {AcceptedDate} {AcceptedTime}
                </Text>
                <View className="flex flex-row justify-between">
                  <Text className="text-[16px] text-gray-600">
                    <Text className="font-bold">Total Items :</Text>
                    {SlipsData?.item?.length}
                  </Text>
                  <Text className="text-[16px] text-gray-600">
                    <Text className="font-bold">Accepted Items :</Text>
                    {acceptedItems?.length}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        <View className="flex gap-3 mt-5">
          {acceptedItems &&
            acceptedItems.length > 0 &&
            acceptedItems.map((element: any, index: any) => (
              <View
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-200 flex flex-wrap"
              >
                <View className="flex flex-col w-full border-r border-gray-300">
                  <View className="p-4 flex flex-col gap-2">
                    <View className={"flex flex-col gap-2"}>
                      <View className={"flex flex-row items-center gap-1"}>
                        <Text className={"text-blue-800 font-bold"}>
                          Item Name :
                        </Text>
                        <Text className={"font-extrabold"}>
                          {element.item?.name} {element.item?.cid?.name}{" "}
                          {element?.company?.name}
                        </Text>
                      </View>
                      <View className={"flex flex-row items-center gap-1"}>
                        <Text className={"text-blue-800 font-bold w-24"}>
                          Item Code :
                        </Text>
                        <Text className={"text-gray-800 text-sm"}>
                          {element?.item?.code}
                        </Text>
                      </View>
                      <View className={"flex flex-row items-center gap-1"}>
                        <Text className={"text-blue-800 font-bold w-24"}>
                          Godown :
                        </Text>
                        <Text className={"text-gray-800 text-sm"}>
                          {element?.godown?.godownName || "-"}
                        </Text>
                      </View>
                      <View className={"flex flex-row items-center gap-1"}>
                        <Text className={"text-blue-800 font-bold w-24"}>
                          Remark :
                        </Text>
                        <Text className={"font-extrabold w-1/2"}>
                          {element.remark || "-"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View className={"flex flex-row"}>
                  <View className="w-[50%] flex gap-2 pl-8">
                    <View className="flex flex-row">
                      <Text className={"text-blue-800 font-bold"}>
                        Rate :
                      </Text>
                      <Text>{element?.taxableValue}</Text>
                    </View>
                    <View className="flex flex-row">
                      <Text className={"text-blue-800 font-bold"}>
                        GST :
                      </Text>
                      <Text>{element.gst || 0}</Text>
                    </View>
                    <View className="flex flex-row">
                      <Text className={"text-blue-800 font-bold"}>
                        QTY :
                      </Text>
                      <Text>{element.quantity} {element.unit}</Text>
                    </View>
                    <View className={"flex flex-row items-center gap-1"}>
                        <Text className={"text-blue-800 font-bold"}>
                          Assigned To :
                        </Text>
                        <Text
                          className={"text-gray-800 text-sm w-1/2 capitalize"}
                        >
                          {element.loadingPerson
                            ? element.loadingPerson.name
                            : "-"}
                        </Text>
                      </View>
                  </View>
                  <View className="w-[50%]">
                    <Image
                      className={"w-full h-[200px] rounded-lg"}
                      source={{ uri: element.qrCode }}
                      alt={`QR Code for ${element.item?.name}`}
                    />
                  </View>
                </View>
              </View>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default acceptedOrder;