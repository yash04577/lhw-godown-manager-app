import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const purchaseBill = () => {
  const purchaseBill = useSelector(
    (state: any) => state?.purchase?.purchaseBill
  );

  const status = useSelector((state:any)=>state?.purchase?.status);
  const getNetRate = (rate: any, dispatchQuantity: any, gst: any) => {

    try {
      const taxableValue = rate * dispatchQuantity;
    const netRate = taxableValue + (taxableValue * gst) / 100;
    return netRate?.toFixed(0);
    } catch (error) {
      return -1;
    }

    
  };

  return (
    <ScrollView>

    {
      status == "loading" ? <View className="w-screen h-screen flex flex-row justify-center items-center">
      <Text>Loading...</Text>
    </View>

    :
    

      <View className="w-[90%] mx-auto">
        <View className="bg-white rounded-lg p-5 my-5">
          <Text className="font-bold text-black text-xl">Estimate Details</Text>
          <View className="flex my-2 border-t border-gray-200">
            {/* Bill Number and Status */}
            <View className="flex flex-row justify-between my-2">
              <Text>Bill Number:</Text>
              <Text className="text-gray-700">{purchaseBill?.billNumber}</Text>
            </View>
            <View className="flex flex-row justify-between my-2">
              <Text>Status:</Text>
              <Text className="text-gray-700">{purchaseBill?.status}</Text>
            </View>

            {/* Bill To Section */}
            <View className="flex flex-row justify-between my-2">
              <Text>Bill To:</Text>
              <View className="text-gray-700">
                <Text>{purchaseBill?.customer?.customerName}</Text>
                <Text>{purchaseBill?.customer?.address1}</Text>
                <Text>{purchaseBill?.customer?.address2}</Text>
                <Text>{purchaseBill?.customer?.phoneNumber}</Text>
              </View>
            </View>

            {/* Sales Order Info */}
            <View className="flex flex-row justify-between my-2">
              <Text>Order Number:</Text>
              <Text className="text-gray-700">
                {purchaseBill?.items[0]?.purchaseOrder?.orderNumber}
              </Text>
            </View>
            {
              purchaseBill?.items[0]?.purchaseOrder?.PoNumber && <View className="flex flex-row justify-between my-2">
              <Text>PO Number:</Text>
              <Text className="text-gray-700">
                {purchaseBill?.items[0]?.purchaseOrder?.PoNumber}
              </Text>
            </View>
            }
            
            <View className="flex flex-row justify-between my-2">
              <Text>Date:</Text>
              <Text className="text-gray-700">
                {purchaseBill?.date?.slice(0, 10)}
              </Text>
            </View>

            {/* Shipping Address Info */}
            {/* <View className="flex flex-row justify-between my-2">
              <Text>Shipping Contact:</Text>
              <View className="text-gray-700">
                <Text>
                  {
                    purchaseBill?.items[0]?.salesOrder?.shippingAddress
                      ?.contactPerson
                  }
                </Text>
                <Text>
                  {purchaseBill?.items[0]?.salesOrder?.shippingAddress?.address}
                </Text>
                <Text>
                  {
                    purchaseBill?.items[0]?.salesOrder?.shippingAddress
                      ?.contactPersonPhoneNo
                  }
                </Text>
              </View>
            </View> */}

            {/* Payment Info */}
          </View>
        </View>

        {/* <View className="bg-white rounded-lg p-5">
          <Text className="font-bold text-black text-xl">Loading Details</Text>
          <View className="flex my-2 border-t border-gray-200">
            <View className="flex flex-row justify-between">
              <Text>Loading No: </Text>
              <Text className="text-gray-700">
                {
                  purchaseBill?.items[0]?.salesOrder?.loadingDetails[0]
                    ?.loadingNumber
                }
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Vehicle No: </Text>
              <Text className="text-gray-700">
                {
                  purchaseBill?.items[0]?.salesOrder?.loadingDetails[0]
                    ?.vehicleNumber
                }
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Driver No: </Text>
              <Text className="text-gray-700">
                {
                  purchaseBill?.items[0]?.salesOrder?.loadingDetails[0]
                    ?.driverPhoneNumber
                }
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Overload: </Text>
              <Text className="text-gray-700">
                {purchaseBill?.items[0]?.salesOrder?.loadingDetails[0]?.overload}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Type: </Text>
              <Text className="text-gray-700">
                {
                  purchaseBill?.items[0]?.salesOrder?.loadingDetails[0]
                    ?.vehicleType
                }
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Driver: </Text>
              <Text className="text-gray-700">
                {purchaseBill?.items[0]?.salesOrder?.loadingDetails[0]?.driverName}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Distance: </Text>
              <Text className="text-gray-700">
                {purchaseBill?.items[0]?.salesOrder?.loadingDetails[0]?.distance}
              </Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text>Freight: </Text>
              <Text className="text-gray-700">
                {
                  purchaseBill?.items[0]?.salesOrder?.loadingDetails[0]
                    ?.customerFreight
                }
              </Text>
            </View>
          </View>
        </View> */}

        <View className="w-full my-5 bg-white p-5 rounded-lg">
          <View className="flex-row justify-between items-center border-b border-gray-200 pb-2 mb-2">
            <Text className="font-bold text-black text-xl">
              Additional Pricing
            </Text>
          </View>

          <View>
            {purchaseBill?.additionalPrice?.map((element: any) => (
              <View className="flex flex-row gap-5 justify-between">
                <Text>{element?.fieldName}:</Text>
                <Text>{element?.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View>
          <FlatList
            data={purchaseBill?.items?.length > 0 ? purchaseBill?.items : []}
            renderItem={({ item, index }) => (
              <View
                className={`bg-white rounded-lg shadow-md p-4 mb-4 w-full mx-auto`}
              >
                <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
                  <Text className="text-gray-700 font-medium">{index + 1}</Text>
                  <Text className="text-gray-700 font-medium">
                    {item?.item?.name} ({item?.item?.code})
                  </Text>
                </View>
                <View className="flex mt-2">
                  <View className="flex flex-row justify-between">
                    <Text>Godown: </Text>
                    <Text className="text-gray-700">
                      {item?.godown?.godownName}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text>Ordered Quantity: </Text>
                    <Text className="text-gray-700">
                      {item?.quantity}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text>Received Quantity: </Text>
                    <Text className="text-gray-700">
                      {item?.receiveQuantity}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text>Rate: </Text>
                    <Text className="text-gray-700">{item?.taxableValue}</Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text>Taxable Value: </Text>
                    <Text className="text-gray-700">
                      {(Number(item?.taxableValue) * Number(item?.receiveQuantity))?.toFixed(0)}
                    </Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text>Gst: </Text>
                    <Text className="text-gray-700">{item?.gst}</Text>
                  </View>
                  <View className="flex flex-row justify-between">
                    <Text>Net Rate: </Text>
                    <Text className="text-gray-700">
                        {
                            getNetRate(Number(item?.taxableValue), Number(item?.receiveQuantity), Number(item?.gst))
                        }
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>

        <View
          className={`bg-white rounded-lg shadow-md p-4 mb-4 w-full mx-auto`}
        >
          <View className="flex-row justify-between items-center border-b border-gray-200 pb-2">
            <Text className="text-gray-700 font-medium">Total:</Text>
            <Text className="text-gray-700 font-medium">
              &#8377; {purchaseBill?.total?.toFixed(0)}
            </Text>
          </View>
        </View>
      </View>
      }
    </ScrollView>
  );
};

export default purchaseBill;

const styles = StyleSheet.create({});
